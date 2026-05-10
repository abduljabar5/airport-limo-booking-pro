// List Bookings - Admin endpoint that returns all booking records
// from the 'bookings' Netlify Blob store. Used by cancel-booking.html
// so the owner can see and cancel without going to Google Sheets.
import crypto from 'crypto';
import { getStore } from '@netlify/blobs';

function tokensMatch(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  try { return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b)); } catch (_) { return false; }
}

export const handler = async (event) => {
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const authHeader = event.headers['authorization'] || event.headers['Authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const expected = process.env.CANCEL_ADMIN_TOKEN;
  if (!expected) {
    return { statusCode: 500, body: JSON.stringify({ error: 'CANCEL_ADMIN_TOKEN not configured' }) };
  }
  if (!tokensMatch(token, expected)) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  try {
    const store = getStore('bookings');
    const { blobs } = await store.list();
    const records = await Promise.all(
      (blobs || []).map(async (b) => {
        try {
          const rec = await store.get(b.key, { type: 'json' });
          if (!rec) return null;
          // Return only the fields the UI needs (keeps response small)
          return {
            confirmationNumber: rec.confirmationNumber || b.key,
            createdAt: rec.createdAt || null,
            cancelled: !!rec.cancelled,
            cancelledAt: rec.cancelledAt || null,
            cancelReason: rec.cancelReason || null,
            booking: {
              name: rec.booking?.name || '',
              email: rec.booking?.email || '',
              phone: rec.booking?.phone || '',
              date: rec.booking?.date || '',
              time: rec.booking?.time || '',
              pickup: rec.booking?.pickup || '',
              dropoff: rec.booking?.dropoff || '',
              vehicle: rec.booking?.vehicle || '',
              passengers: rec.booking?.passengers || '',
              total: rec.booking?.total || 0,
              paymentMethod: rec.booking?.paymentMethod || '',
              roundTrip: !!rec.booking?.roundTrip,
              returnDate: rec.booking?.returnDate || '',
              returnTime: rec.booking?.returnTime || ''
            }
          };
        } catch (e) {
          console.error('Failed to load blob', b.key, e);
          return null;
        }
      })
    );

    const list = records.filter(Boolean);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ count: list.length, bookings: list })
    };
  } catch (e) {
    console.error('list-bookings error:', e);
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
