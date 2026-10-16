// SMS Reply - Twilio inbound webhook.
//
// Point the Messaging Service's "Incoming messages" webhook at
//   https://totaltowncar.com/.netlify/functions/sms-reply   (HTTP POST)
//
// - "1", "confirm", "yes", "y", "ok", "c" from a customer with an upcoming
//   pay-driver ride marks it confirmed, cancels the pending "please confirm"
//   text and the owner's "not confirmed" alert, and tells the owner.
// - Anything else is forwarded to the owner's phone so replies to the
//   confirmation text ("can we make it 9:30?") actually reach a human.
// STOP / HELP never get here: the Messaging Service handles opt-outs itself.
import crypto from 'crypto';
import { getStore } from '@netlify/blobs';
import { bookingsForPhone, normalizePhone, sendSms, isTestBooking } from '../lib/booking-links.js';
import { parseBookingDateTime, centralToUTCISO } from './process-booking.js';
import { cancelTwilioMessage } from './cancel-booking.js';

const OWNER_PHONE = process.env.OWNER_PHONE || '+16129995382';
const PUBLIC_URL = 'https://totaltowncar.com/.netlify/functions/sms-reply';
const CONFIRM_RE = /^\s*(1|confirm|confirmed|yes|yep|yeah|y|ok|okay|c)\s*[.!]*\s*$/i;

const twiml = (msg) => new Response(
  `<?xml version="1.0" encoding="UTF-8"?><Response>${msg ? `<Message>${escapeXml(msg)}</Message>` : ''}</Response>`,
  { status: 200, headers: { 'Content-Type': 'text/xml' } });
const escapeXml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Twilio signs requests with the account auth token: HMAC-SHA1 over the URL
// plus the POST params sorted by name, base64 encoded.
function validSignature(signature, url, params) {
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!token || !signature) return false;
  const data = url + Object.keys(params).sort().map((k) => k + params[k]).join('');
  const expected = crypto.createHmac('sha1', token).update(Buffer.from(data, 'utf8')).digest('base64');
  try { return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature)); } catch (_) { return false; }
}

function pickupInstant(b) {
  const d = parseBookingDateTime(b.date || '', b.time || '');
  return d ? new Date(centralToUTCISO(d)).getTime() : 0;
}

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  const raw = await req.text();
  const params = Object.fromEntries(new URLSearchParams(raw));
  const sig = req.headers.get('x-twilio-signature') || '';
  // Netlify may present the request under the deploy URL; validate against the
  // public URL Twilio was configured with, then fall back to the request URL.
  if (!validSignature(sig, PUBLIC_URL, params) && !validSignature(sig, req.url, params)) {
    console.error('sms-reply: bad Twilio signature');
    return new Response('Forbidden', { status: 403 });
  }

  const from = normalizePhone(params.From);
  const body = String(params.Body || '').trim();
  if (!from) return twiml('');

  const records = (await bookingsForPhone(from)).filter((r) => !isTestBooking(r) || from === normalizePhone(process.env.TEST_PHONE || ''));
  const upcoming = records
    .filter((r) => r && r.booking && !r.cancelled && pickupInstant(r.booking) > Date.now())
    .sort((a, b) => pickupInstant(a.booking) - pickupInstant(b.booking));
  const name = (records[0] && records[0].booking && records[0].booking.name) || '';

  if (CONFIRM_RE.test(body)) {
    const target = upcoming.find((r) => !r.confirmedByCustomer) || upcoming[0];
    if (!target) {
      return twiml(`We couldn't find an upcoming ride for this number. Need help? Call (612) 999-5382.`);
    }
    const b = target.booking;
    if (!target.confirmedByCustomer) {
      target.confirmedByCustomer = true;
      target.confirmedAt = new Date().toISOString();
      // The reminder-to-confirm and the owner's not-confirmed alert are no longer needed.
      const keep = [];
      for (const item of target.scheduledItems || []) {
        if (item.kind === 'sms' && (item.purpose === 'confirm_request' || item.purpose === 'unconfirmed_alert')) {
          await cancelTwilioMessage(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, item.sid);
          keep.push({ ...item, status: 'cancelled_confirmed' });
        } else keep.push(item);
      }
      target.scheduledItems = keep;
      try { await getStore('bookings').setJSON(target.confirmationNumber, target); } catch (e) { console.error('Confirm store error:', e); }
      await sendSms(OWNER_PHONE, `✅ CONFIRMED by customer\n\n#${target.confirmationNumber} — ${b.name}\n${b.date} at ${b.time}\n📍 ${b.pickup}\n🏁 ${b.dropoff}\n📞 ${b.phone}`);
    }
    return twiml(`Thanks ${b.name ? b.name.split(' ')[0] : ''}! You're confirmed for ${b.date} at ${b.time}.\nPickup: ${b.pickup}\nYour driver will be on time. Questions? (612) 999-5382`);
  }

  // Anything else: hand it to the owner with context, acknowledge the customer.
  const ctx = upcoming[0]
    ? `\nNext ride: #${upcoming[0].confirmationNumber} ${upcoming[0].booking.date} ${upcoming[0].booking.time}`
    : (records.length ? '\n(no upcoming ride)' : '\n(unknown number)');
  await sendSms(OWNER_PHONE, `📩 Text from ${name ? name + ' ' : ''}${from}:${ctx}\n\n"${body.slice(0, 600)}"\n\nReply to them directly at ${from}.`);
  return twiml(`Thanks, we got your message and will text you back shortly. Urgent? Call (612) 999-5382.`);
};
