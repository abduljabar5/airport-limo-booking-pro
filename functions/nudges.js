// Nudges - scheduled daily (11 AM Central during DST, 10 AM otherwise).
//
// Three rebooking texts, each tied to a real moment, never more than one per
// customer in any 14-day span, SMS-consented customers only:
//   day_after  - the day after an airport dropoff: "need a ride home when you land?"
//   ninety_day - 90 days after a customer's most recent ride with nothing booked since
//   peak       - a week or two before Thanksgiving, Christmas, spring break and MEA,
//                to everyone who rode in the past year
// Also backfills the "reply 1 to confirm" texts for pay-driver bookings that
// were made more than 30 days out (Twilio cannot schedule that far ahead).
//
// Run by hand for a dry run: GET /.netlify/functions/nudges?dry=1&token=<CANCEL_ADMIN_TOKEN>
import { getStore } from '@netlify/blobs';
import {
  normalizePhone, firstName, sendSms, isTestBooking, isAirportAddress,
  bookAgainUrl, returnTripUrl
} from '../lib/booking-links.js';
import { parseBookingDateTime, centralToUTCISO, scheduleReminders } from './process-booking.js';

export const config = { schedule: '0 16 * * *' };

const MIN_GAP_DAYS = 14;
const DAY = 86400 * 1000;

// Month-day the peak text goes out, and how the season is named in the text.
const PEAKS = [
  { on: '10-06', key: 'mea', label: 'MEA weekend' },
  { on: '11-10', key: 'thanksgiving', label: 'Thanksgiving' },
  { on: '12-08', key: 'holidays', label: 'Holiday' },
  { on: '03-04', key: 'springbreak', label: 'Spring break' }
];

function centralNow() {
  // Current wall-clock time in Central as a Date whose fields read as Central.
  const s = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
  return new Date(s);
}
const dayKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const pickupLocal = (b) => parseBookingDateTime(b.date || '', b.time || '');

export default async (req) => {
  const url = new URL(req.url);
  const dry = url.searchParams.get('dry') === '1';
  // The scheduler invokes this with a POST. Manual runs (netlify dev, or a
  // GET with the admin token) are for dry runs and debugging.
  if (req.method === 'GET' && url.searchParams.get('token') !== process.env.CANCEL_ADMIN_TOKEN) {
    return new Response('Forbidden', { status: 403 });
  }

  const bookings = getStore('bookings');
  const nudgeStore = getStore('nudges');
  const now = centralNow();
  const todayKey = dayKey(now);
  const yesterdayKey = dayKey(new Date(now.getTime() - DAY));
  const ninetyKey = dayKey(new Date(now.getTime() - 90 * DAY));
  const peak = PEAKS.find((p) => todayKey.slice(5) === p.on);

  // Load everything once (the store is small).
  const all = [];
  try {
    const { blobs } = await bookings.list();
    for (const b of blobs) {
      const rec = await bookings.get(b.key, { type: 'json' });
      if (rec && rec.booking && !isTestBooking(rec)) all.push(rec);
    }
  } catch (e) { console.error('nudges: list failed', e); return new Response('list failed', { status: 500 }); }

  // Group by phone.
  const byPhone = new Map();
  for (const rec of all) {
    const p = normalizePhone(rec.booking.phone);
    if (!p) continue;
    if (!byPhone.has(p)) byPhone.set(p, []);
    byPhone.get(p).push(rec);
  }

  const results = { day_after: [], ninety_day: [], peak: [], confirm_backfill: [], skipped: 0 };
  const nowMs = Date.now();

  for (const [phone, recs] of byPhone) {
    const consented = recs.some((r) => r.booking.smsConsent === true);
    if (!consented) { results.skipped++; continue; }
    const live = recs.filter((r) => !r.cancelled);
    if (!live.length) continue;
    const withTime = live.map((r) => ({ r, at: pickupLocal(r.booking) })).filter((x) => x.at);
    const upcoming = withTime.filter((x) => new Date(centralToUTCISO(x.at)).getTime() > nowMs);
    const past = withTime.filter((x) => new Date(centralToUTCISO(x.at)).getTime() <= nowMs).sort((a, b) => b.at - a.at);
    if (!past.length) continue;
    const last = past[0];

    let state = null;
    try { state = (await nudgeStore.get(phone, { type: 'json' })) || { history: [] }; } catch (_) { state = { history: [] }; }
    const lastSent = state.history.length ? Date.parse(state.history[state.history.length - 1].at) : 0;
    const recentlyNudged = nowMs - lastSent < MIN_GAP_DAYS * DAY;
    const already = (type, key) => state.history.some((h) => h.type === type && h.key === key);

    let send = null;
    const name = firstName(last.r.booking.name);
    if (!upcoming.length && !recentlyNudged) {
      const lb = last.r.booking;
      if (dayKey(last.at) === yesterdayKey && !lb.roundTrip && lb.serviceType !== 'hourly' && isAirportAddress(lb.dropoff) && !already('day_after', last.r.confirmationNumber)) {
        send = { type: 'day_after', key: last.r.confirmationNumber,
          body: `Hi ${name}, thanks again for riding with Total Town Car Service. Need a ride home when you land? Your trip is saved, book the return in one tap: ${returnTripUrl(last.r.confirmationNumber)}\nReply STOP to opt out` };
      } else if (dayKey(last.at) === ninetyKey && !already('ninety_day', last.r.confirmationNumber)) {
        send = { type: 'ninety_day', key: last.r.confirmationNumber,
          body: `Hi ${name}, it's Total Town Car Service. Flying again soon? Your details are saved, book your airport ride in one tap: ${bookAgainUrl(last.r.confirmationNumber)}\nReply STOP to opt out` };
      } else if (peak && nowMs - new Date(centralToUTCISO(last.at)).getTime() < 365 * DAY && !already('peak', `${peak.key}-${now.getFullYear()}`)) {
        send = { type: 'peak', key: `${peak.key}-${now.getFullYear()}`,
          body: `Hi ${name}, ${peak.label} travel fills up fast. Lock in your airport ride with Total Town Car Service now: ${bookAgainUrl(last.r.confirmationNumber)}\nReply STOP to opt out` };
      }
    }
    if (send) {
      const status = dry ? 'dry' : await sendSms(phone, send.body);
      results[send.type].push({ phone: phone.slice(-4), status });
      if (!dry && status === 'sent') {
        state.history.push({ type: send.type, key: send.key, at: new Date().toISOString() });
        try { await nudgeStore.setJSON(phone, state); } catch (e) { console.error('nudge store', e); }
      }
    }

    // Confirm-text backfill: pay-driver bookings now inside the 30-day window
    // whose confirm_request was never scheduled (booked too far out).
    for (const { r, at } of upcoming) {
      const b = r.booking;
      if (b.paymentMethod === 'online' || r.confirmedByCustomer || r.confirmBackfilled) continue;
      const hasConfirm = (r.scheduledItems || []).some((i) => i.purpose === 'confirm_request');
      const leadMs = new Date(centralToUTCISO(at)).getTime() - nowMs;
      if (hasConfirm || leadMs > 29 * DAY || leadMs < 2 * 3600 * 1000) continue;
      if (dry) { results.confirm_backfill.push({ c: r.confirmationNumber, status: 'dry' }); continue; }
      const out = await scheduleReminders({ ...b, confirmationNumber: r.confirmationNumber }, {
        estimatedMinutes: r.estimatedMinutes || 60, onlyConfirm: true,
        pickupLink: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(b.pickup || '')
      });
      r.scheduledItems = [...(r.scheduledItems || []), ...(out.items || [])];
      r.confirmBackfilled = true;
      try { await bookings.setJSON(r.confirmationNumber, r); } catch (e) { console.error('backfill store', e); }
      results.confirm_backfill.push({ c: r.confirmationNumber, status: out.summary });
    }
  }

  console.log('nudges run', todayKey, dry ? '(dry)' : '', JSON.stringify(results));
  return new Response(JSON.stringify({ date: todayKey, dry, peak: peak ? peak.key : null, results }), { status: 200, headers: { 'Content-Type': 'application/json' } });
};
