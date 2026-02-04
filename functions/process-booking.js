// Process Booking - Sends email and SMS confirmations
// Uses Mailjet for emails, Twilio for SMS

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const booking = JSON.parse(event.body);

    // Validate required fields
    if (!booking.email || !booking.phone || !booking.pickup || !booking.dropoff) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    // Owner details
    const OWNER_EMAIL = 'abduljabar.nur.5@gmail.com';
    const OWNER_PHONE = '+16128367123';
    const FROM_EMAIL = 'bookings@totaltowncar.com';
    const FROM_NAME = 'Total Town Car Service';
    const TWILIO_FROM = '+16129991462';

    // Format data
    const formattedTotal = '$' + (booking.total || 0);
    const formattedBase = '$' + (booking.baseFare || booking.total || 0);
    const formattedDiscount = '$' + (booking.discount || 0);
    const formattedTip = '$' + (booking.tip || 0);
    const formattedFee = '$' + (booking.processingFee || 0);
    const hasDiscount = (booking.discount || 0) > 0;
    const hasProcessingFee = (booking.processingFee || 0) > 0;
    const promoCode = booking.promoCode || '';
    const distance = booking.distance || 0;
    const estimatedMinutes = booking.duration || Math.round(distance * 1.5); // Use actual duration from Google Maps, fallback to estimate

    // Upsell data
    const isRoundTrip = booking.roundTrip || false;
    const roundTripDiscount = booking.roundTripDiscount || 0;
    const formattedRoundTripDiscount = '$' + roundTripDiscount;
    const returnDate = booking.returnDate || '';
    const returnTime = booking.returnTime || '';
    const hasMeetAndGreet = booking.meetAndGreet || false;
    const meetAndGreetPrice = booking.meetAndGreetPrice || 15;
    const formattedMeetAndGreet = '$' + meetAndGreetPrice;

    // Full links for email (more descriptive)
    const pickupLink = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(booking.pickup);
    const dropoffLink = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(booking.dropoff);

    // Short links for SMS (better clickability)
    const pickupLinkShort = 'https://maps.google.com/?q=' + encodeURIComponent(booking.pickup);
    const dropoffLinkShort = 'https://maps.google.com/?q=' + encodeURIComponent(booking.dropoff);

    // Results tracking
    const results = { email: null, sms: null };

    // ========================================
    // SEND EMAILS VIA MAILJET
    // ========================================
    if (process.env.MAILJET_API_KEY && process.env.MAILJET_SECRET_KEY) {
      const customerHtml = generateCustomerEmail(booking, formattedTotal, formattedBase, formattedDiscount, formattedTip, formattedFee, hasDiscount, hasProcessingFee, promoCode, distance, estimatedMinutes, pickupLink, dropoffLink, isRoundTrip, formattedRoundTripDiscount, returnDate, returnTime, hasMeetAndGreet, formattedMeetAndGreet);
      const ownerHtml = generateOwnerEmail(booking, formattedTotal, formattedBase, formattedDiscount, formattedTip, formattedFee, hasDiscount, hasProcessingFee, promoCode, distance, pickupLink, dropoffLink, isRoundTrip, formattedRoundTripDiscount, returnDate, returnTime, hasMeetAndGreet, formattedMeetAndGreet);

      const mailjetBody = {
        Messages: [
          {
            From: { Email: FROM_EMAIL, Name: FROM_NAME },
            To: [{ Email: booking.email, Name: booking.name }],
            Subject: `Booking Confirmation - ${booking.date}`,
            HTMLPart: customerHtml
          },
          {
            From: { Email: FROM_EMAIL, Name: FROM_NAME },
            To: [{ Email: OWNER_EMAIL, Name: 'Total Town Car Service' }],
            Subject: `NEW BOOKING - ${booking.name} - ${booking.date}`,
            HTMLPart: ownerHtml
          }
        ]
      };

      try {
        const mailjetAuth = Buffer.from(`${process.env.MAILJET_API_KEY}:${process.env.MAILJET_SECRET_KEY}`).toString('base64');
        const emailResponse = await fetch('https://api.mailjet.com/v3.1/send', {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${mailjetAuth}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(mailjetBody)
        });
        results.email = emailResponse.ok ? 'sent' : 'failed';
      } catch (e) {
        console.error('Email error:', e);
        results.email = 'error';
      }
    }

    // ========================================
    // SEND SMS VIA TWILIO
    // ========================================
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      // Premium customer SMS - clean and professional
      const roundTripLine = isRoundTrip ? `\n🔄 ROUND TRIP` : '';
      const returnLine = isRoundTrip && returnDate ? `\nRETURN: ${returnDate} at ${returnTime}` : '';
      const meetGreetLine = hasMeetAndGreet ? `\n👤 Meet & Greet included` : '';
      const discountLine = hasDiscount ? `\nDiscount (${promoCode}): -${formattedDiscount}` : '';
      const customerSms = `TOTAL TOWN CAR SERVICE
━━━━━━━━━━━━━━━━━━

Booking Confirmed
#${booking.confirmationNumber}

WHEN: ${booking.date} at ${booking.time}

PICKUP: ${booking.pickup}

DROPOFF: ${booking.dropoff}
${roundTripLine}${returnLine}${meetGreetLine}${discountLine}
Total: ${formattedTotal}${booking.paymentMethod === 'online' ? ' (Paid)' : ''}

Your driver will arrive on time.
Questions? (612) 999-5382`;

      // Driver SMS - clean format with full details
      const ownerDiscountLine = hasDiscount ? `\n🏷️ DISCOUNT: -${formattedDiscount} (${promoCode})` : '';
      const ownerRoundTripLine = isRoundTrip ? `\n🔄 ROUND TRIP` : '';
      const ownerReturnLine = isRoundTrip && returnDate ? `\n🔙 RETURN: ${returnDate} at ${returnTime}` : '';
      const ownerMeetGreetLine = hasMeetAndGreet ? `\n👤 MEET & GREET (+${formattedMeetAndGreet})` : '';
      const ownerSms = `🚨 NEW BOOKING 🚨

💰 FARE: ${formattedTotal}${ownerDiscountLine}${ownerRoundTripLine}${ownerMeetGreetLine}
🗓️ WHEN: ${booking.date} at ${booking.time}${ownerReturnLine}

📍 PICKUP: ${booking.pickup}
${pickupLinkShort}

🏁 DROPOFF: ${booking.dropoff}
${dropoffLinkShort}

👤 ${booking.name}
📞 ${booking.phone}
✉️ ${booking.email}

Vehicle: ${booking.vehicle}
Payment: ${booking.paymentMethod === 'online' ? 'Paid Online' : 'Cash'}${booking.flight ? `\nFlight: ${booking.flight}` : ''}${booking.notes ? `\nNotes: ${booking.notes}` : ''}`;

      const twilioAuth = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64');
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`;

      try {
        // SMS to customer
        const customerSmsResponse = await fetch(twilioUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${twilioAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            From: TWILIO_FROM,
            To: booking.phone.startsWith('+') ? booking.phone : '+1' + booking.phone.replace(/\D/g, ''),
            Body: customerSms
          })
        });

        if (!customerSmsResponse.ok) {
          const errorData = await customerSmsResponse.text();
          console.error('Customer SMS failed:', errorData);
        }

        // SMS to owner
        const ownerSmsResponse = await fetch(twilioUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${twilioAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            From: TWILIO_FROM,
            To: OWNER_PHONE,
            Body: ownerSms
          })
        });

        if (!ownerSmsResponse.ok) {
          const errorData = await ownerSmsResponse.text();
          console.error('Owner SMS failed:', errorData);
        }

        results.sms = customerSmsResponse.ok && ownerSmsResponse.ok ? 'sent' : 'partial';
      } catch (e) {
        console.error('SMS error:', e);
        results.sms = 'error';
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        confirmationNumber: booking.confirmationNumber,
        results
      })
    };

  } catch (error) {
    console.error('Process booking error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

// ========================================
// EMAIL TEMPLATES
// ========================================

function generateCustomerEmail(booking, total, baseFare, discount, tip, processingFee, hasDiscount, hasProcessingFee, promoCode, distance, estimatedMinutes, pickupLink, dropoffLink, isRoundTrip, roundTripDiscount, returnDate, returnTime, hasMeetAndGreet, meetAndGreetPrice) {
  const hasTip = parseFloat(tip.replace('$', '')) > 0;
  const durationText = estimatedMinutes < 60
    ? `~${estimatedMinutes} minutes`
    : `~${Math.floor(estimatedMinutes/60)}h ${estimatedMinutes % 60}m`;

  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0d0d0d;">

    <!-- HEADER -->
    <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); padding: 40px 30px; text-align: center; border-bottom: 2px solid #D4AF37;">
        <div style="color: #D4AF37; font-size: 28px; font-weight: 700; letter-spacing: 2px; margin-bottom: 10px;">TOTAL TOWN CAR SERVICE</div>
        <div style="color: #ffffff; font-size: 18px; font-weight: 400;">Booking Confirmed</div>
    </div>

    <!-- CONFIRMATION BADGE -->
    <div style="background-color: #1a1a1a; padding: 20px; text-align: center; border-bottom: 1px solid #333;">
        <div style="color: #888; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">✓ Confirmation Number</div>
        <div style="color: #D4AF37; font-size: 24px; font-weight: 700; margin-top: 5px;">${booking.confirmationNumber}</div>
    </div>

    <!-- MAIN CONTENT -->
    <div style="padding: 30px; color: #ffffff;">

        <!-- GREETING -->
        <div style="margin-bottom: 30px;">
            <div style="font-size: 22px; font-weight: 600; color: #ffffff; margin-bottom: 10px;">Dear ${booking.name},</div>
            <div style="color: #a0a0a0; font-size: 15px; line-height: 1.6;">Thank you for choosing Total Town Car Service. Your premium transportation has been confirmed and your driver will be ready at the scheduled time.</div>
        </div>

        <!-- TRIP AT A GLANCE -->
        <div style="background-color: #1a1a1a; border-radius: 12px; padding: 25px; margin-bottom: 25px; border: 1px solid #333;">
            <div style="color: #D4AF37; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">Trip Details</div>

            <!-- DATE & TIME -->
            <div style="display: table; width: 100%; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #333;">
                <div style="display: table-cell; width: 50%;">
                    <div style="color: #a0a0a0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Date</div>
                    <div style="color: #ffffff; font-size: 18px; font-weight: 600; margin-top: 5px;">${booking.date}</div>
                </div>
                <div style="display: table-cell; width: 50%;">
                    <div style="color: #a0a0a0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Pickup Time</div>
                    <div style="color: #D4AF37; font-size: 18px; font-weight: 600; margin-top: 5px;">${booking.time}</div>
                </div>
            </div>
            ${isRoundTrip && returnDate ? `
            <!-- RETURN DATE & TIME -->
            <div style="display: table; width: 100%; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #333; background: rgba(212, 175, 55, 0.05); border-radius: 8px; padding: 15px;">
                <div style="color: #D4AF37; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">🔄 Return Trip</div>
                <div style="display: table; width: 100%;">
                    <div style="display: table-cell; width: 50%;">
                        <div style="color: #a0a0a0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Return Date</div>
                        <div style="color: #ffffff; font-size: 16px; font-weight: 600; margin-top: 5px;">${returnDate}</div>
                    </div>
                    <div style="display: table-cell; width: 50%;">
                        <div style="color: #a0a0a0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Return Time</div>
                        <div style="color: #D4AF37; font-size: 16px; font-weight: 600; margin-top: 5px;">${returnTime}</div>
                    </div>
                </div>
            </div>` : ''}

            <!-- ROUTE -->
            <div style="margin-bottom: 20px;">
                <div style="margin-bottom: 15px;">
                    <div style="color: #D4AF37; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">📍 Pickup Location</div>
                    <div style="color: #ffffff; font-size: 15px; line-height: 1.4; margin-bottom: 8px;">${booking.pickup}</div>
                    <a href="${pickupLink}" style="color: #D4AF37; font-size: 13px; text-decoration: underline;">Open in Maps →</a>
                </div>
                <div style="border-left: 2px dotted #D4AF37; height: 15px; margin-left: 5px;"></div>
                <div>
                    <div style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">🏁 Dropoff Location</div>
                    <div style="color: #ffffff; font-size: 15px; line-height: 1.4; margin-bottom: 8px;">${booking.dropoff}</div>
                    <a href="${dropoffLink}" style="color: #D4AF37; font-size: 13px; text-decoration: underline;">Open in Maps →</a>
                </div>
            </div>

            <!-- DISTANCE & DURATION -->
            <div style="background-color: #0d0d0d; padding: 15px; border-radius: 8px; overflow: hidden;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="width: 50%; text-align: center; border-right: 1px solid #333; padding: 5px;">
                            <div style="color: #D4AF37; font-size: 20px; font-weight: 700;">${distance} mi</div>
                            <div style="color: #a0a0a0; font-size: 11px; text-transform: uppercase;">Distance</div>
                        </td>
                        <td style="width: 50%; text-align: center; padding: 5px;">
                            <div style="color: #D4AF37; font-size: 20px; font-weight: 700;">${durationText}</div>
                            <div style="color: #a0a0a0; font-size: 11px; text-transform: uppercase;">Est. Duration</div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <!-- VEHICLE & PASSENGERS -->
        <div style="background-color: #1a1a1a; border-radius: 12px; padding: 20px; margin-bottom: 25px; border: 1px solid #333;">
            <div style="display: table; width: 100%;">
                <div style="display: table-cell; width: 50%;">
                    <div style="color: #a0a0a0; font-size: 12px; text-transform: uppercase;">Vehicle</div>
                    <div style="color: #ffffff; font-size: 16px; font-weight: 600; margin-top: 5px;">${booking.vehicle}</div>
                </div>
                <div style="display: table-cell; width: 50%;">
                    <div style="color: #a0a0a0; font-size: 12px; text-transform: uppercase;">Passengers</div>
                    <div style="color: #ffffff; font-size: 16px; font-weight: 600; margin-top: 5px;">${booking.passengers || '1'}</div>
                </div>
            </div>
        </div>

        <!-- FARE BREAKDOWN -->
        <div style="background: linear-gradient(135deg, #D4AF37 0%, #b8962e 100%); border-radius: 12px; padding: 25px; margin-bottom: 25px; color: #0d0d0d;">
            <div style="text-align: center;">
                <div style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Total Fare</div>
                <div style="font-size: 40px; font-weight: 800;">${total}</div>
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(0,0,0,0.2);">
                    <span style="font-size: 14px;">Base: <strong>${baseFare}</strong></span>
                    ${isRoundTrip ? `<span style="font-size: 14px; margin-left: 20px;">Return: <strong>${baseFare}</strong></span>` : ''}
                    ${hasMeetAndGreet ? `<span style="font-size: 14px; margin-left: 20px;">Meet & Greet: <strong>${meetAndGreetPrice}</strong></span>` : ''}
                    ${hasTip ? `<span style="font-size: 14px; margin-left: 20px;">Tip: <strong>${tip}</strong></span>` : ''}
                    ${hasProcessingFee ? `<span style="font-size: 14px; margin-left: 20px;">Fee: <strong>${processingFee}</strong></span>` : ''}
                </div>
                <div style="margin-top: 10px;">
                    <span style="background-color: rgba(0,0,0,0.2); padding: 6px 15px; border-radius: 15px; font-size: 13px; font-weight: 600;">
                        ${booking.paymentMethod === 'online' ? '✓ Paid Online' : 'Pay Driver Upon Arrival'}
                    </span>
                </div>
            </div>
        </div>

        <!-- WHAT TO EXPECT -->
        <div style="background-color: #1a1a1a; border-radius: 12px; padding: 20px; margin-bottom: 25px; border: 1px solid #333;">
            <div style="color: #D4AF37; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px;">What to Expect</div>
            <ul style="color: #a0a0a0; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>Your driver will arrive at the pickup location on time</li>
                <li>Look for a clean, professional vehicle</li>
                <li>The driver may contact you upon arrival</li>
                <li>For airport pickups, the driver will meet you at the designated area</li>
            </ul>
        </div>

        <!-- CONTACT -->
        <div style="text-align: center; padding: 25px 0; border-top: 1px solid #333;">
            <div style="color: #ffffff; font-size: 16px; margin-bottom: 10px;">Questions or changes?</div>
            <a href="tel:6129995382" style="color: #D4AF37; font-size: 24px; font-weight: 700; text-decoration: none;">(612) 999-5382</a>
            <div style="color: #a0a0a0; font-size: 13px; margin-top: 10px;">Available 24/7 for your convenience</div>
        </div>
    </div>

    <!-- FOOTER -->
    <div style="background-color: #1a1a1a; padding: 25px; text-align: center; border-top: 1px solid #333;">
        <div style="color: #D4AF37; font-size: 16px; font-weight: 600; margin-bottom: 5px;">TOTAL TOWN CAR SERVICE</div>
        <div style="color: #666; font-size: 12px;">Premium Transportation in the Twin Cities</div>
        <div style="margin-top: 15px;">
            <a href="https://totaltowncar.com" style="color: #a0a0a0; font-size: 12px; text-decoration: none;">totaltowncar.com</a>
        </div>
    </div>
</div>`;
}

function generateOwnerEmail(booking, total, baseFare, discount, tip, processingFee, hasDiscount, hasProcessingFee, promoCode, distance, pickupLink, dropoffLink, isRoundTrip, roundTripDiscount, returnDate, returnTime, hasMeetAndGreet, meetAndGreetPrice) {
  const hasTip = parseFloat(tip.replace('$', '')) > 0;
  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <!-- URGENT HEADER - GOLD ALERT BAR -->
    <div style="background: linear-gradient(135deg, #D4AF37 0%, #b8962e 100%); padding: 18px; text-align: center;">
        <span style="color: #0d0d0d; font-size: 26px; font-weight: 900; letter-spacing: 3px; text-transform: uppercase;">🚨 NEW BOOKING 🚨</span>
    </div>

    <!-- MONEY BOX - BLACK WITH GOLD TEXT FOR HIGH CONTRAST -->
    <div style="background-color: #0d0d0d; padding: 35px 30px; text-align: center; border-bottom: 4px solid #D4AF37;">
        <div style="color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">TOTAL EARNINGS</div>
        <div style="color: #D4AF37; font-size: 56px; font-weight: 900; letter-spacing: -1px;">${total}</div>
        ${isRoundTrip || hasMeetAndGreet ? `
        <div style="margin-top: 12px; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
            ${isRoundTrip ? `<span style="background-color: #1a5f1a; padding: 5px 12px; border-radius: 15px; font-size: 12px; font-weight: 600; color: #90EE90;">🔄 ROUND TRIP</span>` : ''}
            ${hasMeetAndGreet ? `<span style="background-color: #D4AF37; padding: 5px 12px; border-radius: 15px; font-size: 12px; font-weight: 600; color: #0d0d0d;">👤 MEET & GREET</span>` : ''}
        </div>` : ''}
        <div style="margin-top: 18px; padding-top: 18px; border-top: 1px solid #333;">
            <span style="color: #888; font-size: 15px;">Base: <strong style="color: #ffffff;">${baseFare}</strong></span>
            ${isRoundTrip ? `<span style="color: #888; font-size: 15px; margin-left: 25px;">Return: <strong style="color: #ffffff;">${baseFare}</strong></span>` : ''}
            ${isRoundTrip ? `<span style="color: #888; font-size: 15px; margin-left: 25px;">RT Savings: <strong style="color: #90EE90;">-${roundTripDiscount}</strong></span>` : ''}
            ${hasMeetAndGreet ? `<span style="color: #888; font-size: 15px; margin-left: 25px;">Meet & Greet: <strong style="color: #D4AF37;">${meetAndGreetPrice}</strong></span>` : ''}
            ${hasDiscount ? `<span style="color: #888; font-size: 15px; margin-left: 25px;">Discount: <strong style="color: #ff6b6b;">-${discount}</strong></span>` : ''}
            ${hasTip ? `<span style="color: #888; font-size: 15px; margin-left: 25px;">Tip: <strong style="color: #D4AF37;">${tip}</strong></span>` : ''}
            ${hasProcessingFee ? `<span style="color: #888; font-size: 15px; margin-left: 25px;">Fee: <strong style="color: #888;">${processingFee}</strong></span>` : ''}
        </div>
        ${hasDiscount ? `<div style="margin-top: 10px; color: #ff6b6b; font-size: 13px;">⚠️ Promo code used: ${promoCode}</div>` : ''}
        <div style="margin-top: 15px;">
            <span style="background-color: ${booking.paymentMethod === 'online' ? '#D4AF37' : '#ff9900'}; color: #0d0d0d; padding: 10px 25px; border-radius: 25px; font-size: 14px; font-weight: 800; display: inline-block;">
                ${booking.paymentMethod === 'online' ? '✅ PAID ONLINE' : '💵 COLLECT FROM CUSTOMER'}
            </span>
        </div>
    </div>

    <!-- QUICK GLANCE BOX -->
    <div style="background-color: #1a1a1a; padding: 25px; display: table; width: 100%; box-sizing: border-box;">
        <div style="display: table-cell; width: 50%; text-align: center; border-right: 1px solid #333;">
            <div style="color: #D4AF37; font-size: 36px; font-weight: 800;">${distance} mi</div>
            <div style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Distance</div>
        </div>
        <div style="display: table-cell; width: 50%; text-align: center;">
            <div style="color: #ffffff; font-size: 22px; font-weight: 700;">${booking.date}</div>
            <div style="color: #D4AF37; font-size: 22px; font-weight: 700;">${booking.time}</div>
        </div>
    </div>
    ${isRoundTrip && returnDate ? `
    <!-- RETURN INFO BAR -->
    <div style="background-color: #1a5f1a; padding: 15px 25px; text-align: center;">
        <span style="color: #90EE90; font-size: 14px; font-weight: 700;">🔄 RETURN: ${returnDate} at ${returnTime}</span>
    </div>` : ''}

    <!-- MAIN CONTENT -->
    <div style="background-color: #0d0d0d; padding: 30px; color: #ffffff;">

        <!-- CUSTOMER INFO -->
        <div style="background-color: #1a1a1a; border: 2px solid #D4AF37; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <div style="color: #D4AF37; font-size: 14px; font-weight: 700; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">👤 Customer</div>
            <div style="font-size: 24px; font-weight: 700; color: #ffffff; margin-bottom: 12px;">${booking.name}</div>
            <div style="margin-bottom: 8px;">
                <a href="tel:${booking.phone}" style="color: #D4AF37; font-size: 22px; font-weight: 700; text-decoration: none;">📞 ${booking.phone}</a>
            </div>
            <div>
                <a href="mailto:${booking.email}" style="color: #a0a0a0; font-size: 14px; text-decoration: none;">✉️ ${booking.email}</a>
            </div>
        </div>

        <!-- ROUTE INFO -->
        <div style="background-color: #1a1a1a; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <div style="color: #D4AF37; font-size: 14px; font-weight: 700; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">🗺️ Route</div>

            <div style="margin-bottom: 15px;">
                <div style="color: #D4AF37; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">📍 PICKUP</div>
                <div style="color: #ffffff; font-size: 16px; line-height: 1.4; margin-bottom: 8px;">${booking.pickup}</div>
                <a href="${pickupLink}" style="display: inline-block; background-color: #D4AF37; color: #0d0d0d; padding: 8px 15px; border-radius: 5px; font-size: 13px; font-weight: 600; text-decoration: none;">Open in Maps</a>
            </div>

            <div style="border-left: 2px dashed #D4AF37; height: 20px; margin-left: 6px;"></div>

            <div>
                <div style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">🏁 DROPOFF</div>
                <div style="color: #ffffff; font-size: 16px; line-height: 1.4; margin-bottom: 8px;">${booking.dropoff}</div>
                <a href="${dropoffLink}" style="display: inline-block; background-color: #D4AF37; color: #0d0d0d; padding: 8px 15px; border-radius: 5px; font-size: 13px; font-weight: 600; text-decoration: none;">Open in Maps</a>
            </div>
        </div>

        <!-- TRIP DETAILS -->
        <div style="background-color: #1a1a1a; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <div style="color: #D4AF37; font-size: 14px; font-weight: 700; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">📋 Details</div>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #888; width: 40%;">Confirmation:</td><td style="padding: 8px 0; color: #D4AF37; font-weight: 700;">${booking.confirmationNumber}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Vehicle:</td><td style="padding: 8px 0; color: #ffffff;">${booking.vehicle}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Passengers:</td><td style="padding: 8px 0; color: #ffffff;">${booking.passengers || '1'}</td></tr>
                ${isRoundTrip ? `<tr><td style="padding: 8px 0; color: #888;">Trip Type:</td><td style="padding: 8px 0; color: #90EE90; font-weight: 700;">🔄 ROUND TRIP</td></tr>` : ''}
                ${hasMeetAndGreet ? `<tr><td style="padding: 8px 0; color: #888;">Service:</td><td style="padding: 8px 0; color: #D4AF37; font-weight: 700;">👤 MEET & GREET</td></tr>` : ''}
                ${booking.flight ? `<tr><td style="padding: 8px 0; color: #888;">Flight #:</td><td style="padding: 8px 0; color: #ffffff;">${booking.flight}</td></tr>` : ''}
                ${booking.notes ? `<tr><td style="padding: 8px 0; color: #888;">Notes:</td><td style="padding: 8px 0; color: #D4AF37; font-weight: 600;">${booking.notes}</td></tr>` : ''}
            </table>
        </div>

        <!-- ACTION BUTTONS -->
        <div style="text-align: center; padding: 20px 0;">
            <a href="tel:${booking.phone}" style="display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #b8962e 100%); color: #0d0d0d; padding: 18px 45px; text-decoration: none; border-radius: 30px; font-weight: 800; font-size: 18px;">📞 CALL NOW</a>
        </div>
    </div>

    <!-- FOOTER -->
    <div style="background-color: #1a1a1a; padding: 20px; text-align: center; border-top: 1px solid #333;">
        <div style="color: #D4AF37; font-size: 14px; font-weight: 600;">TOTAL TOWN CAR SERVICE</div>
        <div style="color: #666; font-size: 12px; margin-top: 5px;">Premium Transportation</div>
    </div>
</div>`;
}
