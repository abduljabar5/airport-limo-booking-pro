// This file contains shared JavaScript functions for the application.

// =================================================================================
// EMAIL CONFIRMATION WITH EMAILJS
// =================================================================================

// EmailJS Configuration - Loaded from .env file via API
let EMAILJS_CONFIG = null;
let emailjsConfigured = false;
let GOOGLE_MAPS_API_KEY = null;

// Custom Email Templates
const EMAIL_TEMPLATES = {
    customer: {
        subject: 'Your Luxury Transportation is Confirmed - {{pickup_date}}',
        html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; max-width: 600px; margin: 40px auto; background-color: #0d0d0d; border: 1px solid #333; border-radius: 12px; overflow: hidden; color: #ffffff;">
                <!-- Header -->
                <div style="background-color: #1a1a1a; padding: 40px; text-align: center; border-bottom: 1px solid #333;">
                    <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px; color: #e4c570;">TOTAL TOWN CAR SERVICE</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px; color: #a0a0a0;">Your Premium Transportation is Confirmed</p>
        </div>
                
                <!-- Content -->
                <div style="padding: 40px 30px;">
                    <div style="margin-bottom: 30px;">
                        <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">Dear {{customer_name}},</h2>
                        <p style="color: #a0a0a0; margin: 10px 0 0 0; font-size: 16px; line-height: 1.6;">Thank you for booking with us. Your luxury ride is scheduled and confirmed. Please find the details of your upcoming trip below.</p>
                    </div>
                    
                    <!-- Trip Summary Card -->
                    <div style="background-color: #1a1a1a; border: 1px solid #333; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                        <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #e4c570; border-bottom: 1px solid #333; padding-bottom: 15px;">Trip Summary</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase; width: 20%;">From:</td>
                                <td style="padding: 10px 0; font-size: 16px; font-weight: 500; color: #ffffff;"><a href="{{pickup_location_url}}" style="color: #ffffff; text-decoration: underline;">{{pickup_location}}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase;">To:</td>
                                <td style="padding: 10px 0; font-size: 16px; font-weight: 500; color: #ffffff;"><a href="{{dropoff_location_url}}" style="color: #ffffff; text-decoration: underline;">{{dropoff_location}}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 15px 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase; vertical-align: top;">Date & Time:</td>
                                <td style="padding: 15px 0; font-size: 16px; font-weight: 500; color: #ffffff;">{{pickup_date}} at {{pickup_time}}</td>
                            </tr>
                             <tr>
                                <td style="padding: 10px 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase;">Service:</td>
                                <td style="padding: 10px 0; font-size: 16px; font-weight: 500; color: #ffffff;">{{service_type_formatted}}</td>
                            </tr>
                        </table>
                    </div>
                    
                    {{return_trip_section}}
                    
                    <!-- Booking Details -->
                    <div style="background-color: #1a1a1a; border: 1px solid #333; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                        <h3 style="margin: 0 0 20px 0; color: #e4c570; font-size: 18px; border-bottom: 1px solid #333; padding-bottom: 15px;">Booking Details</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px 0; color: #a0a0a0; width: 40%;">Contact Number:</td>
                                <td style="padding: 10px 0; color: #ffffff;">{{customer_phone}}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #a0a0a0;">Email Address:</td>
                                <td style="padding: 10px 0; color: #ffffff;">{{customer_email}}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #a0a0a0;">Passengers:</td>
                                <td style="padding: 10px 0; color: #ffffff;">{{passengers}}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #a0a0a0;">Vehicle Type:</td>
                                <td style="padding: 10px 0; color: #ffffff;">{{vehicle_type}}</td>
                            </tr>
                            {{flight_number_row}}
                        </table>
                    </div>
                    
                    <!-- Fare Information -->
                    <div style="background-color: #e4c570; color: #0d0d0d; padding: 25px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
                        <h3 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 600;">Total Fare</h3>
                        <p style="margin: 0; font-size: 32px; font-weight: 700;">{{total_fare}}</p>
                        <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">Prepaid Tip: {{tip}}</p>
                        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.8;">Payment Method: {{payment_method}}</p>
                        <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">Status: <strong>{{payment_status}}</strong></p>
                    </div>
                    
                    {{special_requests_section}}
                    
                    <!-- Important Information -->
                    <div style="background-color: #1c1c1c; border: 1px solid #333; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                        <h4 style="margin: 0 0 10px 0; color: #e4c570; font-size: 16px;">Important Information</h4>
                        <ul style="margin: 0; padding-left: 20px; color: #a0a0a0; font-size: 14px; line-height: 1.8;">
                            <li>Please be ready 5-10 minutes before your scheduled pickup time.</li>
                            <li>Your driver will contact you via text or call upon arrival.</li>
                            <li>For any changes, cancellations, or immediate assistance, please call us directly.</li>
                        </ul>
                    </div>
                    
                    <!-- Contact Information -->
                    <div style="text-align: center; margin-top: 40px;">
                        <h3 style="color: #ffffff; margin: 0 0 15px 0; font-size: 18px;">Need Assistance? We're Here 24/7</h3>
                        <p style="color: #e4c570; margin: 0; font-size: 22px; font-weight: 600;">(612) 999-5382</p>
                        <p style="color: #a0a0a0; margin: 10px 0; font-size: 14px;"><a href="mailto:totaltowncarservice@gmail.com" style="color: #e4c570;">totaltowncarservice@gmail.com</a></p>
                    </div>
                </div>
                
                <!-- Footer -->
                <div style="background-color: #1a1a1a; color: #a0a0a0; padding: 25px; text-align: center; border-top: 1px solid #333;">
                    <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500; color: #ffffff;">Thank you for choosing Total Town Car Service</p>
                    <p style="margin: 0; font-size: 12px;">Your trusted partner for premium transportation in Minneapolis</p>
                </div>
            </div>
        `
    },
    owner: {
        subject: '🚨 NEW BOOKING ALERT - {{customer_name}} - {{pickup_date}}',
        html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; max-width: 600px; margin: 40px auto; background-color: #0d0d0d; border: 1px solid #333; border-radius: 12px; overflow: hidden; color: #ffffff;">
                <!-- Header -->
                <div style="background-color: #1a1a1a; padding: 40px; text-align: center; border-bottom: 1px solid #333;">
                    <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px; color: #e4c570;">🚨 NEW BOOKING ALERT</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px; color: #a0a0a0;">A new ride has been scheduled.</p>
                </div>
                
                <!-- Content -->
                <div style="padding: 40px 30px;">
                    <!-- Customer Information Card -->
                    <div style="background-color: #1a1a1a; border: 1px solid #333; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                        <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #e4c570; border-bottom: 1px solid #333; padding-bottom: 15px;">👤 Customer Information</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px 0; color: #a0a0a0; width: 40%;">Name:</td>
                                <td style="padding: 10px 0; color: #ffffff; font-weight: 500;">{{customer_name}}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #a0a0a0;">Phone:</td>
                                <td style="padding: 10px 0; color: #ffffff; font-weight: 500;">
                                    <a href="tel:{{customer_phone}}" style="color: #e4c570; text-decoration: underline;">{{customer_phone}}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #a0a0a0;">Email:</td>
                                <td style="padding: 10px 0; color: #ffffff; font-weight: 500;">
                                    <a href="mailto:{{customer_email}}" style="color: #e4c570; text-decoration: underline;">{{customer_email}}</a>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <!-- Trip Details Card -->
                    <div style="background-color: #1a1a1a; border: 1px solid #333; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                        <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #e4c570; border-bottom: 1px solid #333; padding-bottom: 15px;">🎯 Trip Details</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase; width: 40%;">From:</td>
                                <td style="padding: 10px 0; font-size: 16px; font-weight: 500; color: #ffffff;"><a href="{{pickup_location_url}}" style="color: #ffffff; text-decoration: underline;">{{pickup_location}}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase;">To:</td>
                                <td style="padding: 10px 0; font-size: 16px; font-weight: 500; color: #ffffff;"><a href="{{dropoff_location_url}}" style="color: #ffffff; text-decoration: underline;">{{dropoff_location}}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #a0a0a0;">Date:</td>
                                <td style="padding: 10px 0; color: #ffffff; font-weight: 500;">{{pickup_date}}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #a0a0a0;">Time:</td>
                                <td style="padding: 10px 0; color: #ffffff; font-weight: 500;">{{pickup_time}}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #a0a0a0;">Passengers:</td>
                                <td style="padding: 10px 0; color: #ffffff; font-weight: 500;">{{passengers}}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #a0a0a0;">Vehicle:</td>
                                <td style="padding: 10px 0; color: #ffffff; font-weight: 500;">{{vehicle_type}}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #a0a0a0;">Service Type:</td>
                                <td style="padding: 10px 0; color: #ffffff; font-weight: 500;">{{service_type_formatted}}</td>
                            </tr>
                            {{flight_number_row}}
                        </table>
                    </div>

                    {{return_trip_section_owner}}

                    <!-- Payment Information -->
                    <div style="background-color: #e4c570; color: #0d0d0d; padding: 25px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
                        <h3 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 600;">💰 Payment Information</h3>
                        <p style="margin: 0; font-size: 32px; font-weight: 700;">{{total_fare}}</p>
                        <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">Tip: {{tip}}</p>
                        <p style="margin: 10px 0 0 0; font-size: 16px; font-weight: 500;">{{payment_method}}</p>
                        <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">Status: <strong>{{payment_status}}</strong></p>
                    </div>

                    {{special_requests_section_owner}}

                    <!-- Quick Actions -->
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h3 style="color: #ffffff; margin: 0 0 20px 0; font-size: 18px;">🔧 Quick Actions</h3>
                        <div style="display: inline-block; margin: 0 10px;">
                            <a href="tel:{{customer_phone}}" style="background-color: #e4c570; color: #0d0d0d; padding: 15px 25px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 16px; display: inline-block;">📞 Call Customer</a>
                        </div>
                        <div style="display: inline-block; margin: 0 10px;">
                            <a href="mailto:{{customer_email}}" style="background-color: #333333; color: #ffffff; padding: 15px 25px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 16px; display: inline-block;">📧 Email Customer</a>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div style="background-color: #1a1a1a; color: #a0a0a0; padding: 25px; text-align: center; border-top: 1px solid #333;">
                    <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500; color: #ffffff;">Total Town Car Service - Dispatch System</p>
                    <p style="margin: 0; font-size: 12px;">This is an automated booking notification.</p>
                </div>
            </div>
        `
    }
};

let googleMapsApiKeyLoaded = false;

async function loadGoogleMapsApiKey() {
  if (googleMapsApiKeyLoaded) return;
  try {
    const response = await fetch('/.netlify/functions/get-google-maps-api-key');
    const data = await response.json();
    if (data.googleMapsApiKey) {
      GOOGLE_MAPS_API_KEY = data.googleMapsApiKey;
      googleMapsApiKeyLoaded = true;
      console.log('Google Maps API Key loaded successfully.');
    } else {
      console.error('Google Maps API Key not found in server response.');
    }
  } catch (error) {
    console.error('Failed to load Google Maps API Key:', error);
  }
}

// Load EmailJS configuration from environment variables
async function loadEmailJSConfig() {
    try {
        const response = await fetch('/.netlify/functions/get-emailjs-config');
        const data = await response.json();
        
        if (data.configured) {
            EMAILJS_CONFIG = data.config;
            emailjsConfigured = true;
            emailjs.init(EMAILJS_CONFIG.publicKey);
            console.log('EmailJS configured successfully');
        } else {
            console.log('EmailJS not configured:', data.message);
            if (data.missingKeys) {
                console.log('Missing keys:', data.missingKeys);
            }
        }
    } catch (error) {
        console.error('Failed to load EmailJS config:', error);
    }
}

// Helper function to replace template variables
function replaceTemplateVariables(template, data) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return data[key] || match;
    });
}

async function sendConfirmationEmails(bookingDetails) {
    // Skip email sending if EmailJS is not configured
    if (!emailjsConfigured || !EMAILJS_CONFIG) {
        // Wait for config to load if it hasn't already
        await loadEmailJSConfig();
        if (!emailjsConfigured || !EMAILJS_CONFIG) {
            console.log('EmailJS not configured. Skipping email sending.');
            return;
        }
    }

    await loadGoogleMapsApiKey();

    const now = new Date();
    
    const vehicleTypeText = bookingDetails.vehicle_type;
    
    const serviceType = bookingDetails.service_type;
    let serviceTypeFormatted = 'One-Way Transfer';
    if (serviceType === 'round-trip') {
        serviceTypeFormatted = 'Round Trip';
    } else if (serviceType === 'meet-greet') {
        serviceTypeFormatted = 'Meet and Greet';
    } else if (serviceType === 'hourly') {
        serviceTypeFormatted = 'Hourly Charter';
    } else if (serviceType === 'airport') {
        serviceTypeFormatted = 'Airport Transfer';
    }

    const payment_status = bookingDetails.payment_method === 'Online Payment' ? 'Paid in Full' : 'Payment due to driver';
    const pickupLocationUrl = GOOGLE_MAPS_API_KEY
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bookingDetails.pickup_location)}&key=${GOOGLE_MAPS_API_KEY}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bookingDetails.pickup_location)}`;

    const dropoffLocationUrl = GOOGLE_MAPS_API_KEY
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bookingDetails.dropoff_location)}&key=${GOOGLE_MAPS_API_KEY}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bookingDetails.dropoff_location)}`;


    const templateParams = {
        ...bookingDetails,
        payment_status,
        pickup_location_url: pickupLocationUrl,
        dropoff_location_url: dropoffLocationUrl,
        customer_phone: bookingDetails.phone_number,
        vehicle_type: vehicleTypeText,
        service_type_formatted: serviceTypeFormatted,
        booking_time: now.toLocaleString('en-US', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        }).replace(/[^\d]/g, '')
    };

    if (templateParams.tip === '$0.00' || templateParams.tip === '0' || !templateParams.tip) {
        templateParams.tip = 'No tip added';
    }

    // Generate flight number row if flight number is provided
    if (bookingDetails.flight_number && bookingDetails.flight_number.trim() !== '') {
        templateParams.flight_number_row = `
            <tr>
                <td style="padding: 10px 0; color: #a0a0a0;">Flight Number:</td>
                <td style="padding: 10px 0; color: #ffffff;">${bookingDetails.flight_number}</td>
            </tr>`;
    } else {
        templateParams.flight_number_row = '';
    }

    // Generate return trip section if round trip is selected
    if (bookingDetails.service_type === 'round-trip' && bookingDetails.return_date && bookingDetails.return_time) {
        // Customer email return trip section
        let returnFlightRow = '';
        if (bookingDetails.return_flight_number && bookingDetails.return_flight_number.trim() !== '') {
            returnFlightRow = `
                <tr>
                    <td style="padding: 10px 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase; width: 20%;">Flight Number:</td>
                    <td style="padding: 10px 0; font-size: 16px; font-weight: 500; color: #ffffff;">${bookingDetails.return_flight_number}</td>
                </tr>`;
        }
        
        templateParams.return_trip_section = `
            <!-- Return Trip Details -->
            <div style="background-color: #1a1a1a; border: 1px solid #333; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #e4c570; border-bottom: 1px solid #333; padding-bottom: 15px;">🔄 Return Trip Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 15px 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase; width: 20%;">Return Date:</td>
                        <td style="padding: 15px 0; font-size: 16px; font-weight: 500; color: #ffffff;">${bookingDetails.return_date}</td>
                    </tr>
                    <tr>
                        <td style="padding: 15px 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase;">Return Time:</td>
                        <td style="padding: 15px 0; font-size: 16px; font-weight: 500; color: #ffffff;">${bookingDetails.return_time}</td>
                    </tr>
                    ${returnFlightRow}
                </table>
            </div>`;

        // Owner email return trip section
        let ownerReturnFlightRow = '';
        if (bookingDetails.return_flight_number && bookingDetails.return_flight_number.trim() !== '') {
            ownerReturnFlightRow = `
                <tr>
                    <td style="padding: 10px 0; color: #a0a0a0; width: 40%;">Return Flight:</td>
                    <td style="padding: 10px 0; color: #ffffff; font-weight: 500;">${bookingDetails.return_flight_number}</td>
                </tr>`;
        }
        
        templateParams.return_trip_section_owner = `
            <!-- Return Trip Details Card -->
            <div style="background-color: #1a1a1a; border: 1px solid #333; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #e4c570; border-bottom: 1px solid #333; padding-bottom: 15px;">🔄 Return Trip Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; color: #a0a0a0; width: 40%;">Return Date:</td>
                        <td style="padding: 10px 0; color: #ffffff; font-weight: 500;">${bookingDetails.return_date}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; color: #a0a0a0;">Return Time:</td>
                        <td style="padding: 10px 0; color: #ffffff; font-weight: 500;">${bookingDetails.return_time}</td>
                    </tr>
                    ${ownerReturnFlightRow}
                </table>
            </div>`;
    } else {
        templateParams.return_trip_section = '';
        templateParams.return_trip_section_owner = '';
    }

    // Generate special requests section if special requests are provided
    if (bookingDetails.special_requests && bookingDetails.special_requests.trim() !== '') {
        // Customer email special requests section
        templateParams.special_requests_section = `
            <div style="background-color: #1a1a1a; border: 1px solid #333; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600; color: #e4c570; border-bottom: 1px solid #333; padding-bottom: 15px;">📝 Special Requests</h3>
                <p style="margin: 0; color: #ffffff; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${bookingDetails.special_requests}</p>
            </div>`;
        
        // Owner email special requests section
        templateParams.special_requests_section_owner = `
            <div style="background-color: #1a1a1a; border: 1px solid #333; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #e4c570; border-bottom: 1px solid #333; padding-bottom: 15px;">📝 Special Requests</h3>
                <p style="margin: 0; color: #ffffff; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${bookingDetails.special_requests}</p>
            </div>`;
    } else {
        templateParams.special_requests_section = '';
        templateParams.special_requests_section_owner = '';
    }


    try {
        const customerSubject = replaceTemplateVariables(EMAIL_TEMPLATES.customer.subject, templateParams);
        const customerHtml = replaceTemplateVariables(EMAIL_TEMPLATES.customer.html, templateParams);
        const ownerSubject = replaceTemplateVariables(EMAIL_TEMPLATES.owner.subject, templateParams);
        const ownerHtml = replaceTemplateVariables(EMAIL_TEMPLATES.owner.html, templateParams);

        const customerEmailParams = {
            to_name: templateParams.customer_name,
            to_email: templateParams.customer_email,
            subject: customerSubject,
            html_content: customerHtml,
            from_name: 'Total Town Car Service'
        };
        
        const ownerEmailParams = {
            to_name: 'Total Town Car Service',
            to_email: 'totaltowncarservice@gmail.com',
            subject: ownerSubject,
            html_content: ownerHtml,
            from_name: templateParams.customer_name
        };

        console.log('Sending emails...');
        
        await Promise.all([
            emailjs.send(EMAILJS_CONFIG.serviceId, 'template_generic', customerEmailParams),
            emailjs.send(EMAILJS_CONFIG.serviceId, 'template_generic', ownerEmailParams)
        ]);

        console.log('Confirmation email sent successfully to customer and owner.');

    } catch (error) {
        console.error('Failed to send confirmation emails:', error);
        throw error;
    }
}

// Initialize EmailJS configuration on page load
loadEmailJSConfig(); 

document.addEventListener('DOMContentLoaded', () => {
    // We can pre-load configurations on page load for faster email sending later.
    loadEmailJSConfig();
    loadGoogleMapsApiKey();
}); 