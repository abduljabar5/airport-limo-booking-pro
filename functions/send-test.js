// Temporary: one-off send check for the production Twilio and Resend credentials.
// POST { to, email } with the admin token. Removed after use.
import { sendSms } from '../lib/booking-links.js';
export default async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  const token = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  if (!process.env.CANCEL_ADMIN_TOKEN || token !== process.env.CANCEL_ADMIN_TOKEN) return new Response('Unauthorized', { status: 401 });
  const { to, email } = await req.json();
  const sms = await sendSms(to, 'Total Town Car Service: test message. Texting is working after the credential changes. Reply STOP to opt out');
  let mail = 'skipped';
  if (process.env.RESEND_API_KEY && email) {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: `Total Town Car Service <${process.env.RESEND_FROM_EMAIL || 'bookings@totaltowncar.com'}>`, to: [email], subject: 'Test: email is working', text: 'Total Town Car Service test email. Email sending is working after the credential changes.' })
    });
    mail = r.ok ? 'sent' : `failed ${r.status} ${(await r.text()).slice(0, 120)}`;
  }
  return new Response(JSON.stringify({ sms, email: mail }), { headers: { 'Content-Type': 'application/json' } });
};
