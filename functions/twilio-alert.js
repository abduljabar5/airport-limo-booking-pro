// Twilio Alert - callback for Twilio usage triggers.
//
// Twilio calls this URL when a usage trigger fires (for example: more than
// $5 of messaging in a day). It emails the owner and the backup address so a
// leaked credential or a runaway loop is noticed within the hour, not on the
// next invoice. Request signatures are verified with the account auth token.
import crypto from 'crypto';

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'totaltowncarservice@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'bookings@totaltowncar.com';
const PUBLIC_URL = 'https://totaltowncar.com/.netlify/functions/twilio-alert';

function validSignature(signature, url, params) {
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!token || !signature) return false;
  const data = url + Object.keys(params).sort().map((k) => k + params[k]).join('');
  const expected = crypto.createHmac('sha1', token).update(Buffer.from(data, 'utf8')).digest('base64');
  try { return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature)); } catch (_) { return false; }
}

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  const raw = await req.text();
  const p = Object.fromEntries(new URLSearchParams(raw));
  const sig = req.headers.get('x-twilio-signature') || '';
  if (!validSignature(sig, PUBLIC_URL, p) && !validSignature(sig, req.url, p)) {
    return new Response('Forbidden', { status: 403 });
  }

  const lines = [
    `Trigger: ${p.FriendlyName || p.UsageTriggerSid || ''}`,
    `Category: ${p.UsageCategory || ''}`,
    `Threshold: ${p.TriggerValue || ''} (${p.TriggerBy || ''}, ${p.Recurring || 'one-time'})`,
    `Current value: ${p.CurrentValue || ''}`,
    `Fired at: ${p.DateFired || new Date().toISOString()}`,
    '',
    'If this is not expected traffic, revoke the site API key in the Twilio console (Account > API keys & tokens) and check the Messaging logs.'
  ];
  const subject = `⚠️ Twilio usage alert: ${p.FriendlyName || p.UsageCategory || 'threshold crossed'}`;
  const to = [OWNER_EMAIL, process.env.OWNER_BACKUP_EMAIL].filter(Boolean);
  let email = 'skipped';
  if (process.env.RESEND_API_KEY && to.length) {
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: `Total Town Car Service <${FROM_EMAIL}>`, to, subject, text: lines.join('\n') })
      });
      email = r.ok ? 'sent' : 'failed';
    } catch (e) { console.error('Alert email error:', e); email = 'error'; }
  }
  console.log('Twilio usage alert', p.FriendlyName, p.CurrentValue, email);
  return new Response('ok', { status: 200 });
};
