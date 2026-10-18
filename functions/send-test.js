// Temporary: one-off send check for the production Twilio credentials. Removed after use.
import { sendSms } from '../lib/booking-links.js';
export default async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  const token = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  if (!process.env.CANCEL_ADMIN_TOKEN || token !== process.env.CANCEL_ADMIN_TOKEN) return new Response('Unauthorized', { status: 401 });
  const { to } = await req.json();
  const sms = await sendSms(to, 'Total Town Car Service: test message. Texting works with the restricted key. Reply STOP to opt out');
  return new Response(JSON.stringify({ sms, usingKey: !!process.env.TWILIO_API_KEY_SID }), { headers: { 'Content-Type': 'application/json' } });
};
