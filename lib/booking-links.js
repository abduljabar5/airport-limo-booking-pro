// Shared helpers for the customer-facing booking links and lookups.
// Imported by the Netlify functions (process-booking, manage-booking,
// sms-reply, nudges, create-stripe-session). Not a function itself.
import crypto from 'crypto';
import { getStore } from '@netlify/blobs';

export const SITE = 'https://totaltowncar.com';
export const OWNER_PHONE_DISPLAY = '(612) 999-5382';

// ----- Signed "manage your ride" links -----
// The token is an HMAC of the confirmation number. Anyone holding the link can
// edit that one booking (date/time/contact details only); nobody can derive a
// link for another booking. The secret is MANAGE_LINK_SECRET, falling back to
// CANCEL_ADMIN_TOKEN so no new env var is required.
const secret = () => process.env.MANAGE_LINK_SECRET || process.env.CANCEL_ADMIN_TOKEN || '';

export function makeManageToken(confirmationNumber) {
  const s = secret();
  const c = String(confirmationNumber || '').trim().toUpperCase();
  if (!s || !c) return null;
  return crypto.createHmac('sha256', s).update(c).digest('hex').slice(0, 32);
}

export function verifyManageToken(confirmationNumber, token) {
  const expected = makeManageToken(confirmationNumber);
  const got = String(token || '');
  if (!expected || !got || expected.length !== got.length) return false;
  try { return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(got)); } catch (_) { return false; }
}

export function manageUrl(confirmationNumber) {
  const t = makeManageToken(confirmationNumber);
  if (!t) return null;
  return `${SITE}/manage.html?c=${encodeURIComponent(String(confirmationNumber).toUpperCase())}&t=${t}`;
}

// "Book again" links reuse the signed token: the booking page fetches the
// saved trip through manage-booking and prefills itself. Keeps addresses out
// of the URL and the SMS short.
export function bookAgainUrl(confirmationNumber) {
  const t = makeManageToken(confirmationNumber);
  if (!t) return `${SITE}/book-a-ride.html`;
  return `${SITE}/book-a-ride.html?rebook=${encodeURIComponent(String(confirmationNumber).toUpperCase())}&t=${t}`;
}

export function returnTripUrl(confirmationNumber) {
  const t = makeManageToken(confirmationNumber);
  if (!t) return `${SITE}/book-a-ride.html`;
  return `${SITE}/book-a-ride.html?rebook=${encodeURIComponent(String(confirmationNumber).toUpperCase())}&t=${t}&return=1`;
}

// ----- Vehicle naming -----
// The booking flow stores display names ("SUV", "Executive Sedan", "Sedan");
// the form uses internal keys (suv, sedan, taxi, van).
const DISPLAY_TO_KEY = { 'SUV': 'suv', 'Executive Sedan': 'sedan', 'Sedan': 'taxi', 'Sprinter Van': 'van' };
export const VEHICLE_MAX_PASSENGERS = { suv: 6, sedan: 3, taxi: 3, van: 14 };

export function vehicleKey(vehicle) {
  const v = String(vehicle || '').trim();
  if (DISPLAY_TO_KEY[v]) return DISPLAY_TO_KEY[v];
  const l = v.toLowerCase();
  if (['suv', 'sedan', 'taxi', 'van'].includes(l)) return l;
  if (l.includes('escalade') || l.includes('suv')) return 'suv';
  if (l.includes('s-class') || l.includes('executive')) return 'sedan';
  if (l.includes('lincoln') || l.includes('continental')) return 'taxi';
  if (l.includes('sprinter') || l.includes('van')) return 'van';
  return 'suv';
}

// ----- Misc -----
export function isAirportAddress(address) {
  if (!address) return false;
  const lower = String(address).toLowerCase();
  return lower.includes('airport') || lower.includes('msp') || lower.includes('terminal');
}

export function normalizePhone(phone) {
  const raw = String(phone || '');
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  if (raw.trim().startsWith('+') && digits.length > 10) return '+' + digits;
  return '+1' + digits.slice(-10);
}

export function firstName(name) {
  return String(name || '').trim().split(/\s+/)[0] || 'there';
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Format a local Date the way the booking flow does: "Fri, Oct 10, 2026" / "10:00 AM".
export function formatBookingDate(d) {
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
export function formatBookingTime(d) {
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  const period = h >= 12 ? 'PM' : 'AM';
  h = h % 12; if (h === 0) h = 12;
  return `${h}:${m} ${period}`;
}

// ----- Twilio one-off send (not scheduled) -----
export async function sendSms(to, body) {
  const sid = process.env.TWILIO_ACCOUNT_SID, token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token || !to) return 'skipped';
  const auth = Buffer.from(`${sid}:${token}`).toString('base64');
  const sender = process.env.TWILIO_MESSAGING_SERVICE_SID
    ? { MessagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID }
    : { From: process.env.TWILIO_FROM_NUMBER || '+16129991462' };
  try {
    const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST',
      headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ ...sender, To: to, Body: body })
    });
    if (!r.ok) { console.error('SMS send failed:', to, r.status, (await r.text()).slice(0, 200)); return 'failed'; }
    return 'sent';
  } catch (e) { console.error('SMS send error:', e); return 'error'; }
}

// ----- Phone index: normalized phone -> confirmation numbers -----
// Lets the SMS reply handler and the nudge job find a customer's bookings
// without scanning the whole store.
export async function addPhoneIndex(phone, confirmationNumber) {
  const key = normalizePhone(phone);
  if (!key || !confirmationNumber) return;
  try {
    const store = getStore('phone-index');
    const cur = (await store.get(key, { type: 'json' })) || { numbers: [] };
    if (!cur.numbers.includes(confirmationNumber)) cur.numbers.push(confirmationNumber);
    await store.setJSON(key, cur);
  } catch (e) { console.error('Phone index error:', e); }
}

export async function bookingsForPhone(phone) {
  const key = normalizePhone(phone);
  if (!key) return [];
  const bookings = getStore('bookings');
  let numbers = [];
  try {
    const idx = await getStore('phone-index').get(key, { type: 'json' });
    numbers = (idx && idx.numbers) || [];
  } catch (_) {}
  if (!numbers.length) {
    // Older bookings predate the index: scan (the store is small).
    try {
      const { blobs } = await bookings.list();
      for (const b of blobs) {
        const rec = await bookings.get(b.key, { type: 'json' });
        if (rec && rec.booking && normalizePhone(rec.booking.phone) === key) numbers.push(rec.confirmationNumber);
      }
    } catch (e) { console.error('Phone scan error:', e); }
  }
  const out = [];
  for (const n of numbers) {
    try { const rec = await bookings.get(n, { type: 'json' }); if (rec) out.push(rec); } catch (_) {}
  }
  return out;
}

export function isTestBooking(rec) {
  const c = String((rec && rec.confirmationNumber) || '');
  const n = String((rec && rec.booking && rec.booking.name) || '');
  return /TEST/i.test(c) || /^TEST\b/i.test(n);
}
