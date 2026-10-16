// Manage Booking - customer self-service for an existing reservation.
//
//   GET  ?c=TTC-XXXX&t=<token>            -> booking summary + whether it can be edited
//   GET  ?c=TTC-XXXX&t=<token>&mode=prefill -> the fields the booking page needs to prefill a rebook
//   POST { c, t, date, time, passengers, flight, notes, phone, email }
//
// Customers may change the pickup date/time, passenger count, flight, notes
// and contact details. Anything that re-prices the ride (addresses, stops,
// vehicle, hourly duration, round trip) is not editable here; the page tells
// them to call. Cancellation is also phone-only for now.
import { getStore } from '@netlify/blobs';
import {
  verifyManageToken, manageUrl, vehicleKey, VEHICLE_MAX_PASSENGERS,
  normalizePhone, formatBookingDate, formatBookingTime, sendSms
} from '../lib/booking-links.js';
import {
  parseBookingDateTime, centralToUTCISO, scheduleReminders, getGoogleAccessToken, htmlToText
} from './process-booking.js';
import { cancelResendEmail, cancelTwilioMessage } from './cancel-booking.js';

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'totaltowncarservice@gmail.com';
const OWNER_PHONE = process.env.OWNER_PHONE || '+16129995382';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'bookings@totaltowncar.com';
const FROM_NAME = 'Total Town Car Service';
const CALENDAR_ID = 'totaltowncarservice@gmail.com';

const MAX_EDITS = 2;
const LOCK_HOURS = 24;        // no self-serve edits inside this window
const MIN_LEAD_HOURS = 3;     // new pickup must be at least this far out
const MAX_DAYS_OUT = 365;

const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

function pickupInstant(b) {
  const d = parseBookingDateTime(b.date || '', b.time || '');
  return d ? new Date(centralToUTCISO(d)) : null;
}

function editability(rec) {
  const b = rec.booking || {};
  if (rec.cancelled) return { editable: false, reason: 'cancelled' };
  const at = pickupInstant(b);
  if (!at) return { editable: false, reason: 'unparseable' };
  if (at.getTime() < Date.now()) return { editable: false, reason: 'past' };
  if (at.getTime() - Date.now() < LOCK_HOURS * 3600 * 1000) return { editable: false, reason: 'within24h' };
  if ((rec.editCount || 0) >= MAX_EDITS) return { editable: false, reason: 'edits_exhausted' };
  return { editable: true, reason: null };
}

function summary(rec) {
  const b = rec.booking || {};
  const key = vehicleKey(b.vehicle);
  const e = editability(rec);
  return {
    confirmationNumber: rec.confirmationNumber,
    name: b.name || '', email: b.email || '', phone: b.phone || '',
    date: b.date || '', time: b.time || '',
    pickup: b.pickup || '', dropoff: b.dropoff || '', stops: Array.isArray(b.stops) ? b.stops : [],
    vehicle: b.vehicle || '', vehicleKey: key, maxPassengers: VEHICLE_MAX_PASSENGERS[key] || 6,
    passengers: parseInt(b.passengers) || 1,
    flight: b.flight || '', notes: b.notes || '',
    paymentMethod: b.paymentMethod || 'cash', total: b.total || 0,
    serviceType: b.serviceType || 'transfer', hours: b.hours || 0,
    roundTrip: !!b.roundTrip, returnDate: b.returnDate || '', returnTime: b.returnTime || '',
    carSeats: parseInt(b.carSeats) || 0,
    distance: rec.distance || b.distance || 0, duration: rec.duration || b.duration || 0,
    confirmedByCustomer: !!rec.confirmedByCustomer,
    editable: e.editable, reason: e.reason, editsLeft: Math.max(0, MAX_EDITS - (rec.editCount || 0)),
    cancelled: !!rec.cancelled
  };
}

// ----- Google Calendar: move the existing event -----
async function patchCalendarEvent(eventId, b, estimatedMinutes) {
  if (!eventId || !process.env.GOOGLE_SERVICE_ACCOUNT_JSON) return 'skipped';
  try {
    const accessToken = await getGoogleAccessToken(JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON));
    const start = parseBookingDateTime(b.date, b.time);
    const end = new Date(start.getTime() + estimatedMinutes * 60 * 1000);
    const pad = (n) => String(n).padStart(2, '0');
    const fmt = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
    const body = {
      summary: `🚗 ${b.name} - ${b.pickup} → ${b.dropoff}`,
      description: [
        `Confirmation: ${b.confirmationNumber}`, `Customer: ${b.name}`, `Phone: ${b.phone}`, `Email: ${b.email}`,
        `Vehicle: ${b.vehicle}`, `Passengers: ${b.passengers || '1'}`,
        `Fare: $${b.total}`, `Payment: ${b.paymentMethod === 'online' ? 'Paid Online' : 'Pay Driver'}`,
        b.flight ? `Flight: ${b.flight}` : '', b.notes ? `Notes: ${b.notes}` : '',
        `(Edited by customer ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC)`
      ].filter(Boolean).join('\n'),
      start: { dateTime: fmt(start), timeZone: 'America/Chicago' },
      end: { dateTime: fmt(end), timeZone: 'America/Chicago' }
    };
    const r = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events/${eventId}`, {
      method: 'PATCH', headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body)
    });
    if (!r.ok) { console.error('Calendar patch failed:', r.status, (await r.text()).slice(0, 200)); return 'failed'; }
    return 'updated';
  } catch (e) { console.error('Calendar patch error:', e); return 'error'; }
}

// ----- Notifications -----
function changeLines(before, after) {
  const fields = [['date', 'Date'], ['time', 'Time'], ['passengers', 'Passengers'], ['flight', 'Flight'], ['notes', 'Notes'], ['phone', 'Phone'], ['email', 'Email']];
  return fields
    .filter(([k]) => String(before[k] || '') !== String(after[k] || ''))
    .map(([k, label]) => `${label}: ${before[k] || '—'} → ${after[k] || '—'}`);
}

function customerUpdatedHtml(b, changes, manage) {
  const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0d0d0d;">
    <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); padding: 40px 30px; text-align: center; border-bottom: 2px solid #D4AF37;">
        <div style="color: #D4AF37; font-size: 28px; font-weight: 700; letter-spacing: 2px; margin-bottom: 10px;">TOTAL TOWN CAR SERVICE</div>
        <div style="color: #ffffff; font-size: 18px;">Your ride has been updated</div>
    </div>
    <div style="padding: 30px; color: #ffffff;">
        <div style="font-size: 22px; font-weight: 600; margin-bottom: 15px;">Hi ${esc(b.name)},</div>
        <div style="color: #a0a0a0; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">Here are the updated details for confirmation <strong style="color:#D4AF37;">${esc(b.confirmationNumber)}</strong>. Your reminders have been moved to the new time.</div>
        <div style="background-color: #1a1a1a; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #333;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #888; width: 35%;">Date</td><td style="padding: 8px 0; color: #D4AF37; font-weight: 700;">${esc(b.date)}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Time</td><td style="padding: 8px 0; color: #D4AF37; font-weight: 700;">${esc(b.time)}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Pickup</td><td style="padding: 8px 0; color: #fff;">${esc(b.pickup)}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Dropoff</td><td style="padding: 8px 0; color: #fff;">${esc(b.dropoff)}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Vehicle</td><td style="padding: 8px 0; color: #fff;">${esc(b.vehicle)} · ${esc(b.passengers)} passenger${b.passengers > 1 ? 's' : ''}</td></tr>
                ${b.flight ? `<tr><td style="padding: 8px 0; color: #888;">Flight</td><td style="padding: 8px 0; color: #fff;">${esc(b.flight)}</td></tr>` : ''}
                <tr><td style="padding: 8px 0; color: #888;">Total</td><td style="padding: 8px 0; color: #fff;">$${esc(b.total)} ${b.paymentMethod === 'online' ? '(paid online)' : '(pay driver)'}</td></tr>
            </table>
        </div>
        <div style="color: #a0a0a0; font-size: 13px; margin-bottom: 20px;">Changed: ${changes.map(esc).join(' · ')}</div>
        ${manage ? `<div style="text-align:center; margin: 20px 0;"><a href="${manage}" style="display:inline-block; color:#D4AF37; border:1px solid rgba(212,175,55,0.4); padding: 12px 24px; border-radius: 25px; text-decoration:none; font-weight:600; font-size:14px;">Manage this ride</a></div>` : ''}
        <div style="text-align: center; padding: 20px 0; border-top: 1px solid #333;">
            <div style="color: #ffffff; font-size: 15px; margin-bottom: 8px;">Need anything else?</div>
            <a href="tel:6129995382" style="color: #D4AF37; font-size: 22px; font-weight: 700; text-decoration: none;">(612) 999-5382</a>
        </div>
    </div>
</div>`;
}

async function sendEmail(to, subject, html, refId) {
  if (!process.env.RESEND_API_KEY || !to) return 'skipped';
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: `${FROM_NAME} <${FROM_EMAIL}>`, to: [to], reply_to: OWNER_EMAIL, subject, html, text: htmlToText(html), headers: refId ? { 'X-Entity-Ref-ID': refId } : undefined })
    });
    return r.ok ? 'sent' : 'failed';
  } catch (e) { console.error('Email error:', e); return 'error'; }
}

// ----- Handler -----
export default async (req) => {
  const url = new URL(req.url);
  const store = getStore('bookings');

  if (req.method === 'GET') {
    const c = String(url.searchParams.get('c') || '').trim().toUpperCase();
    const t = String(url.searchParams.get('t') || '').trim();
    if (!c || !verifyManageToken(c, t)) return json(403, { error: 'This link is not valid.' });
    let rec;
    try { rec = await store.get(c, { type: 'json' }); } catch (e) { return json(500, { error: 'Lookup failed' }); }
    if (!rec) return json(404, { error: 'Booking not found' });
    const s = summary(rec);
    if (url.searchParams.get('mode') === 'prefill') {
      return json(200, { pickup: s.pickup, dropoff: s.dropoff, vehicleKey: s.vehicleKey, passengers: s.passengers, name: s.name, email: s.email, phone: s.phone, distance: s.distance, duration: s.duration, serviceType: s.serviceType });
    }
    return json(200, s);
  }

  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  let payload;
  try { payload = await req.json(); } catch (_) { return json(400, { error: 'Invalid JSON' }); }
  const c = String(payload.c || '').trim().toUpperCase();
  if (!c || !verifyManageToken(c, payload.t)) return json(403, { error: 'This link is not valid.' });

  let rec;
  try { rec = await store.get(c, { type: 'json' }); } catch (e) { return json(500, { error: 'Lookup failed' }); }
  if (!rec) return json(404, { error: 'Booking not found' });
  const e = editability(rec);
  if (!e.editable) return json(409, { error: 'This ride can no longer be changed online. Please call (612) 999-5382.', reason: e.reason, booking: summary(rec) });

  const before = { ...rec.booking };
  const after = { ...rec.booking };

  // Date/time: the page sends ISO date (YYYY-MM-DD) and 24h time (HH:MM).
  if (payload.date || payload.time) {
    const dateIso = String(payload.date || '').trim();
    const timeIso = String(payload.time || '').trim();
    const cur = parseBookingDateTime(before.date, before.time);
    let y = cur.getFullYear(), mo = cur.getMonth(), d = cur.getDate(), h = cur.getHours(), mi = cur.getMinutes();
    if (dateIso) {
      const m = dateIso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (!m) return json(400, { error: 'Please pick a valid date.' });
      y = +m[1]; mo = +m[2] - 1; d = +m[3];
    }
    if (timeIso) {
      const m = timeIso.match(/^(\d{1,2}):(\d{2})$/);
      if (!m) return json(400, { error: 'Please pick a valid time.' });
      h = +m[1]; mi = +m[2];
    }
    const local = new Date(y, mo, d, h, mi, 0);
    const instant = new Date(centralToUTCISO(local));
    const lead = instant.getTime() - Date.now();
    if (lead < MIN_LEAD_HOURS * 3600 * 1000) return json(400, { error: `New pickup time must be at least ${MIN_LEAD_HOURS} hours from now.` });
    if (lead > MAX_DAYS_OUT * 86400 * 1000) return json(400, { error: 'Please pick a date within the next year.' });
    after.date = formatBookingDate(local);
    after.time = formatBookingTime(local);
  }

  if (payload.passengers !== undefined && payload.passengers !== '') {
    const p = parseInt(payload.passengers, 10);
    const max = VEHICLE_MAX_PASSENGERS[vehicleKey(before.vehicle)] || 6;
    if (!(p >= 1 && p <= max)) return json(400, { error: `This vehicle seats up to ${max} passengers. For a larger group, call (612) 999-5382.` });
    after.passengers = String(p);
  }
  if (payload.flight !== undefined) after.flight = String(payload.flight).trim().slice(0, 40);
  if (payload.notes !== undefined) after.notes = String(payload.notes).trim().slice(0, 500);
  if (payload.phone !== undefined && String(payload.phone).trim()) {
    const digits = String(payload.phone).replace(/\D/g, '').slice(-10);
    if (digits.length !== 10) return json(400, { error: 'Please enter a 10-digit phone number.' });
    after.phone = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (payload.email !== undefined && String(payload.email).trim()) {
    const em = String(payload.email).trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return json(400, { error: 'Please enter a valid email address.' });
    after.email = em;
  }

  const changes = changeLines(before, after);
  if (!changes.length) return json(200, { ok: true, unchanged: true, booking: summary(rec) });

  // Reminders: drop the old scheduled messages, schedule fresh ones for the new time.
  const timeChanged = before.date !== after.date || before.time !== after.time;
  const contactChanged = before.phone !== after.phone || before.email !== after.email;
  let scheduledItems = rec.scheduledItems || [];
  let remindersSummary = 'unchanged';
  if (timeChanged || contactChanged) {
    await Promise.all(scheduledItems.map((item) =>
      item.kind === 'email' ? cancelResendEmail(process.env.RESEND_API_KEY, item.id)
      : item.kind === 'sms' ? cancelTwilioMessage(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, item.sid)
      : null));
    const estimatedMinutes = rec.estimatedMinutes || (after.serviceType === 'hourly' ? (parseInt(after.hours) || 3) * 60 : 60);
    const bookingForReminders = { ...after, confirmationNumber: c };
    const r = await scheduleReminders(bookingForReminders, {
      estimatedMinutes,
      pickupLink: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(after.pickup || ''),
      alreadyConfirmed: !!rec.confirmedByCustomer
    });
    scheduledItems = r.items || [];
    remindersSummary = r.summary;
  }

  const estimatedMinutes = rec.estimatedMinutes || 60;
  const calendar = timeChanged || contactChanged || before.passengers !== after.passengers || before.flight !== after.flight || before.notes !== after.notes
    ? await patchCalendarEvent(rec.calendarEventId, { ...after, confirmationNumber: c }, estimatedMinutes)
    : 'unchanged';

  // Persist
  rec.booking = after;
  rec.scheduledItems = scheduledItems;
  rec.editCount = (rec.editCount || 0) + 1;
  rec.edits = [...(rec.edits || []), { at: new Date().toISOString(), changes }];
  rec.lastEditResults = { reminders: remindersSummary, calendar };
  try { await store.setJSON(c, rec); } catch (e) { console.error('Store error:', e); return json(500, { error: 'Could not save changes. Please call (612) 999-5382.' }); }
  if (before.phone !== after.phone) {
    try { const { addPhoneIndex } = await import('../lib/booking-links.js'); await addPhoneIndex(after.phone, c); } catch (_) {}
  }

  // Notify customer + owner
  const manage = manageUrl(c);
  const b = { ...after, confirmationNumber: c };
  const customerSms = `TOTAL TOWN CAR SERVICE\n\nYour ride #${c} has been updated.\n\n${after.date} at ${after.time}\nPickup: ${after.pickup}\n${changes.join('\n')}\n\nQuestions? (612) 999-5382\nReply STOP to opt out`;
  const ownerSms = `✏️ BOOKING EDITED by customer\n\n#${c} — ${after.name}\n📞 ${after.phone}\n\n${changes.join('\n')}\n\nNOW: ${after.date} at ${after.time}\n📍 ${after.pickup}\n🏁 ${after.dropoff}\nVehicle: ${after.vehicle} · ${after.passengers} pax\nPayment: ${after.paymentMethod === 'online' ? 'Paid Online' : 'Cash'}`;
  const results = await Promise.all([
    sendEmail(after.email, `Your ride has been updated — ${c}`, customerUpdatedHtml(b, changes, manage), c),
    sendSms(normalizePhone(after.phone), customerSms),
    sendSms(OWNER_PHONE, ownerSms),
    sendEmail(OWNER_EMAIL, `✏️ Booking edited by customer — ${c} — ${after.date} ${after.time}`, `<pre style="font-family:monospace;font-size:14px;white-space:pre-wrap;">${ownerSms.replace(/</g, '&lt;')}</pre>`, c)
  ]);
  console.log('Manage edit:', c, changes, { reminders: remindersSummary, calendar, notify: results });

  return json(200, { ok: true, changes, booking: summary(rec) });
};
