import stripe from 'stripe';

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
  // We're only allowing POST requests to this function
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { amount, customer_email, success_url, cancel_url } = JSON.parse(event.body);

    // Basic validation
    if (typeof amount !== 'number' || amount <= 0 || !customer_email) {
      return { statusCode: 400, body: 'Invalid request body' };
    }

    // Create a Checkout Session with the amount and description
    const session = await stripeClient.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Limo Ride Booking',
            description: 'Book a limo ride for your next event.',
          },
          unit_amount: amount, // Amount is already in cents from the client
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: success_url,
      cancel_url: cancel_url,
      customer_email: customer_email,
      payment_intent_data: {
        description: `Limo ride for ${customer_email}`,
        metadata: {
          customer_email: customer_email,
          service_date: new Date().toISOString(),
        }
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }), // Return the session URL
    };
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}; 