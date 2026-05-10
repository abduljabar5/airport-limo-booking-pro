// Stripe webhook handler
// Triggered server-side by Stripe after payment completes.
// Owner notifications are no longer dependent on the customer's browser.
import Stripe from 'stripe';
import { processBooking } from './process-booking.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const signature = event.headers['stripe-signature'];
  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf8')
    : event.body;

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (stripeEvent.type !== 'checkout.session.completed') {
    return { statusCode: 200, body: JSON.stringify({ received: true, ignored: stripeEvent.type }) };
  }

  const session = stripeEvent.data.object;
  const m = session.metadata || {};

  const booking = {
    confirmationNumber: m.confirmationNumber,
    name: m.customerName,
    email: m.customerEmail || session.customer_email,
    phone: m.customerPhone,
    pickup: m.pickup,
    dropoff: m.dropoff,
    date: m.date,
    time: m.time,
    vehicle: m.vehicle,
    passengers: m.passengers,
    flight: m.flight || '',
    notes: m.notes || '',
    paymentMethod: 'online',
    baseFare: parseFloat(m.baseFare) || 0,
    roundTrip: m.roundTrip === 'true',
    roundTripDiscount: parseFloat(m.roundTripDiscount) || 0,
    returnDate: m.returnDate || '',
    returnTime: m.returnTime || '',
    meetAndGreet: m.meetAndGreet === 'true',
    meetAndGreetPrice: parseFloat(m.meetAndGreetPrice) || 0,
    discount: parseFloat(m.discount) || 0,
    promoCode: m.promoCode || '',
    tip: parseFloat(m.tip) || 0,
    processingFee: parseFloat(m.processingFee) || 0,
    total: parseFloat(m.total) || 0,
    distance: parseFloat(m.distance) || 0,
    duration: parseFloat(m.duration) || 0
  };

  if (!booking.email || !booking.phone || !booking.pickup || !booking.dropoff) {
    console.error('Webhook booking missing required fields:', booking);
    return { statusCode: 200, body: JSON.stringify({ received: true, error: 'Missing fields' }) };
  }

  try {
    const results = await processBooking(booking);
    console.log('Webhook booking processed:', booking.confirmationNumber, results);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ received: true, results })
    };
  } catch (error) {
    console.error('Webhook processing error:', error);
    // Return 500 so Stripe retries the webhook
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
