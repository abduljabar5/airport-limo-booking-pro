// Save an in-progress booking ("quote lead") when the customer enters a phone number on
// step 2 and opts in to a follow-up text. Stores the lead in Netlify Blobs and, when a
// Twilio Messaging Service is configured, schedules ONE text 30 minutes later with the
// quote and a resume link. process-booking.js cancels that text if the booking completes.
import { getStore } from '@netlify/blobs';

const SITE = 'https://totaltowncar.com';
const DELAY_MIN = 30;

function json(status, body) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  let b;
  try { b = await req.json(); } catch (_) { return json(400, { error: 'Bad JSON' }); }

  const digits = String(b.phone || '').replace(/\D/g, '');
  const phone = digits.length === 10 ? '+1' + digits : (digits.length === 11 && digits.startsWith('1') ? '+' + digits : '');
  if (!phone || !b.optIn) return json(400, { error: 'Phone and opt-in required' });

  const lead = {
    phone,
    name: String(b.name || '').slice(0, 80),
    pickup: String(b.pickup || '').slice(0, 200),
    dropoff: String(b.dropoff || '').slice(0, 200),
    date: String(b.date || '').slice(0, 40),
    time: String(b.time || '').slice(0, 20),
    vehicle: String(b.vehicle || '').slice(0, 40),
    serviceType: b.serviceType === 'hourly' ? 'hourly' : 'transfer',
    hours: parseInt(b.hours) || 0,
    fare: Math.max(0, Math.round(parseFloat(b.fare) || 0)),
    page: String(b.page || '').slice(0, 120),
    createdAt: new Date().toISOString(),
    converted: false,
    followUp: { status: 'not_scheduled', sid: null }
  };

  let store;
  try { store = getStore('leads'); } catch (e) { console.error('Blobs unavailable:', e); return json(200, { saved: false }); }

  // One follow-up per phone per 24 hours
  try {
    const prev = await store.get(phone, { type: 'json' });
    if (prev && prev.followUp && prev.followUp.sid && Date.now() - Date.parse(prev.createdAt) < 24 * 3600 * 1000) {
      await store.setJSON(phone, { ...prev, ...lead, followUp: prev.followUp, createdAt: prev.createdAt });
      return json(200, { saved: true, followUp: 'already_scheduled' });
    }
  } catch (_) { /* first lead for this phone */ }

  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_MESSAGING_SERVICE_SID } = process.env;
  if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_MESSAGING_SERVICE_SID && lead.fare > 0) {
    const route = lead.serviceType === 'hourly'
      ? `${lead.hours} hrs as directed from ${lead.pickup}`
      : `${lead.pickup} to ${lead.dropoff}`;
    const body = `Total Town Car Service: your quote for ${route} on ${lead.date} is $${lead.fare}${lead.vehicle ? ` (${lead.vehicle})` : ''}. Finish booking in a minute: ${SITE}/book-a-ride.html?continue=true\nQuestions? (612) 999-5382\nReply STOP to opt out`;
    const sendAt = new Date(Date.now() + DELAY_MIN * 60 * 1000).toISOString();
    try {
      const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64');
      const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
        method: 'POST',
        headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ MessagingServiceSid: TWILIO_MESSAGING_SERVICE_SID, To: phone, Body: body, ScheduleType: 'fixed', SendAt: sendAt })
      });
      if (r.ok) { const d = await r.json(); lead.followUp = { status: 'scheduled', sid: d.sid || null, sendAt }; }
      else { console.error('Lead follow-up schedule failed:', r.status, (await r.text()).slice(0, 300)); lead.followUp = { status: 'failed', sid: null }; }
    } catch (e) { console.error('Lead follow-up error:', e); lead.followUp = { status: 'error', sid: null }; }
  } else {
    lead.followUp = { status: TWILIO_MESSAGING_SERVICE_SID ? 'skipped' : 'no_messaging_service', sid: null };
  }

  try { await store.setJSON(phone, lead); } catch (e) { console.error('Lead store error:', e); return json(200, { saved: false, followUp: lead.followUp.status }); }
  return json(200, { saved: true, followUp: lead.followUp.status });
};
