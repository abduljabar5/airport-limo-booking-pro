// Real booking counts for the social-proof line on the booking page.
// process-booking.js increments a per-day counter in the 'stats' blob store; this returns
// today's and the last 7 days' totals. Nothing here is invented: if no bookings were made,
// the numbers are zero and the page falls back to the long-run figures.
import { getStore } from '@netlify/blobs';

function dayKey(d) {
  // Central time, since that is the business's day
  const c = new Date(d.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
  return `day:${c.getFullYear()}-${String(c.getMonth() + 1).padStart(2, '0')}-${String(c.getDate()).padStart(2, '0')}`;
}

export default async () => {
  let today = 0, week = 0;
  try {
    const store = getStore('stats');
    const now = Date.now();
    const keys = Array.from({ length: 7 }, (_, i) => dayKey(new Date(now - i * 86400000)));
    const counts = await Promise.all(keys.map(k => store.get(k, { type: 'json' }).catch(() => null)));
    counts.forEach((c, i) => { const n = (c && c.count) || 0; week += n; if (i === 0) today = n; });
  } catch (e) { /* no store yet */ }
  return new Response(JSON.stringify({ today, week }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=120' }
  });
};
