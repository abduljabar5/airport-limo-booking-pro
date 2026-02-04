# Minneapolis Limo - HTML/CSS/JS Version

This is a converted version of the Minneapolis Limo React website, now running entirely on HTML, CSS, and JavaScript.

## Features

### ✅ Complete Conversion
- **Home Page**: All sections converted (Hero, Price Estimator, About, Services, Fleet, Testimonials, FAQ, Footer)
- **Booking Page**: Full booking form with price estimation
- **Detailed Booking Page**: Complete booking form with validation
- **404 Page**: Custom error page
- **Responsive Design**: Works on all devices
- **Client-side Routing**: SPA-style navigation without page reloads

### 🎨 Styling
- **Tailwind CSS**: Complete styling with custom gold theme
- **Lucide Icons**: Vector icons throughout the interface
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Hover effects and transitions
- **Modern UI**: Glass-morphism effects and gradients

### 🚀 Functionality
- **Price Calculation**: Real-time price estimation based on distance and vehicle type
- **Form Validation**: Client-side validation for all forms
- **Smooth Scrolling**: Navigation to sections within the page
- **Mobile Menu**: Collapsible mobile navigation
- **FAQ Accordion**: Expandable FAQ sections
- **Booking Flow**: Multi-step booking process

## Files Structure

```
├── index.html          # Main HTML file
├── styles.css          # Main CSS file with Tailwind and custom styles
├── app.js             # Main JavaScript file with all functionality
├── public/            # Static assets (images, icons)
└── README-HTML.md     # This file
```

## How to Run

### Option 1: Simple HTTP Server
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Option 2: Live Server (VS Code Extension)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` and select "Open with Live Server"

### Option 3: Any Web Server
Deploy the files to any web server (Apache, Nginx, etc.)

## Key Features

### 🌟 Exact Replica
- **Identical Appearance**: Pixel-perfect recreation of the original React website
- **Same Functionality**: All interactive features work exactly the same
- **Performance**: Faster loading without React overhead

### 📱 Mobile Responsive
- **Responsive Design**: Works perfectly on all screen sizes
- **Touch-friendly**: Optimized for mobile interactions
- **Fast Loading**: No framework overhead

### 🎯 Interactive Elements
- **Price Estimator**: Calculate ride prices based on locations and vehicle type
- **Booking Forms**: Complete booking flow with validation
- **Navigation**: Smooth scrolling and routing
- **FAQ Section**: Collapsible questions and answers

## Technical Details

### Libraries Used
- **Tailwind CSS**: For styling (loaded via CDN)
- **Lucide Icons**: For vector icons (loaded via CDN)
- **Vanilla JavaScript**: No frameworks required

### Browser Compatibility
- **Modern Browsers**: Works in all modern browsers
- **ES6 Features**: Uses modern JavaScript features
- **Mobile Support**: Full mobile browser support

## Customization

### Colors
The gold theme can be customized in the `styles.css` file by modifying the CSS variables:
```css
:root {
    --gold: 45 100% 51%;
    --gold-dark: 38 92% 45%;
}
```

### Content
All content can be modified directly in the `app.js` file within the render functions.

### Styling
Additional styles can be added to `styles.css` or by modifying the Tailwind configuration in `index.html`.

## Advantages of HTML/CSS/JS Version

1. **No Build Process**: No compilation or bundling required
2. **Faster Loading**: No framework overhead
3. **SEO Friendly**: Better search engine optimization
4. **Easy Deployment**: Can be deployed anywhere
5. **Simple Maintenance**: Easy to understand and modify
6. **Lighter Weight**: Smaller file sizes
7. **Better Performance**: Faster rendering and interactions

## Original Features Preserved

- ✅ Smooth scrolling navigation
- ✅ Price calculation algorithms
- ✅ Form validation
- ✅ Responsive design
- ✅ Mobile menu
- ✅ FAQ accordion
- ✅ Booking flow
- ✅ Route handling
- ✅ Interactive elements
- ✅ Styling and animations

## Usage

1. Open `index.html` in a web browser
2. Navigate through the site using the header menu
3. Use the price estimator to get quotes
4. Complete the booking process
5. All functionality works exactly like the original React version

The website is now ready to use and deploy without any React dependencies! 

{
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "293e8ad0-ff16-45e7-91e7-6d64127b2a73",
        "responseMode": "responseNode",
        "options": {}
      },
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2.1,
      "position": [
        0,
        0
      ],
      "id": "6beca59f-39fb-439e-9b90-fa09eb3acf6d",
      "name": "Webhook",
      "webhookId": "293e8ad0-ff16-45e7-91e7-6d64127b2a73"
    },
    {
      "parameters": {
        "jsCode": "// ============================================================\n// BOOKING CONFIRMATION - EXACT APP.JS TEMPLATES\n// ============================================================\n\nvar OWNER_EMAIL = \"totaltowncarservice@gmail.com\";\nvar FROM_EMAIL = \"bookings@totaltowncar.com\"; \nvar FROM_NAME = \"Total Town Car Service\";\n\n// 1. Get incoming data\nvar incoming = $('Webhook').first().json.body;\n\n// 2. Navigate to tool call arguments\nvar toolCalls = [];\nif (incoming.body?.message?.toolCalls) {\n  toolCalls = incoming.body.message.toolCalls;\n} else if (incoming.message?.toolCalls) {\n  toolCalls = incoming.message.toolCalls;\n} else if (incoming.toolCalls) {\n  toolCalls = incoming.toolCalls;\n}\n\nif (!toolCalls.length) {\n  return [{ json: { error: \"No tool calls found in request.\" } }];\n}\n\n// 3. Get arguments\nvar args = toolCalls[0].function.arguments || {};\nif (typeof args === 'string') {\n  try {\n    args = JSON.parse(args);\n  } catch (e) {\n    return [{ json: { error: \"Failed to parse arguments JSON.\" } }];\n  }\n}\n\n// Check if agreed\nvar agreed = args[\"Agreed\"] || args[\"agreed\"] || false;\nif (!agreed) {\n  return [{ json: { status: \"skipped\", reason: \"Customer has not yet agreed.\" } }];\n}\n\n// 4. Extract booking details\nvar fare = args[\"Fair\"] || args[\"Fare\"] || args[\"fare\"] || \"\";\nvar customerEmail = args[\"Email\"] || args[\"email\"] || \"\";\nvar customerName = args[\"Names\"] || args[\"Name\"] || args[\"names\"] || \"Valued Customer\";\nvar pickupDate = args[\"PickUp-Date\"] || \"\";\nvar pickupTime = args[\"PickUp-Time\"] || \"\";\nvar phoneNumber = args[\"Phone Number\"] || args[\"phone\"] || \"\";\nvar pickupLocation = args[\"PickUp-Location\"] || \"\";\nvar dropoffLocation = args[\"DropOff-Loaction\"] || args[\"DropOff-Location\"] || \"\";\n\n// Validate\nif (!customerEmail || !pickupLocation || !dropoffLocation) {\n  return [{ json: { error: \"Missing fields (email, pickup, or dropoff).\" } }];\n}\n\n// 5. Formatting\nvar formattedFare = fare.toString().startsWith(\"$\") ? fare : \"$\" + fare;\n\n// Create Map Links\nvar pickupLink = \"https://www.google.com/maps/search/?api=1&query=\" + encodeURIComponent(pickupLocation);\nvar dropoffLink = \"https://www.google.com/maps/search/?api=1&query=\" + encodeURIComponent(dropoffLocation);\n\n// ------------------------------------------\n// CUSTOMER HTML (Exact Design from App.js)\n// ------------------------------------------\nvar customerHtml = `\n<div style=\"font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 40px auto; background-color: #0d0d0d; border: 1px solid #333; border-radius: 12px; overflow: hidden; color: #ffffff;\">\n    <div style=\"background-color: #1a1a1a; padding: 40px; text-align: center; border-bottom: 1px solid #333;\">\n        <h1 style=\"margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px; color: #e4c570;\">TOTAL TOWN CAR SERVICE</h1>\n        <p style=\"margin: 10px 0 0 0; font-size: 16px; color: #a0a0a0;\">Your Premium Transportation is Confirmed</p>\n    </div>\n    <div style=\"padding: 40px 30px;\">\n        <div style=\"margin-bottom: 30px;\">\n            <h2 style=\"color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;\">Dear ${customerName},</h2>\n            <p style=\"color: #a0a0a0; margin: 10px 0 0 0; font-size: 16px; line-height: 1.6;\">Thank you for booking with us. Your luxury ride is scheduled and confirmed.</p>\n        </div>\n        <div style=\"background-color: #1a1a1a; border: 1px solid #333; padding: 25px; border-radius: 12px; margin-bottom: 30px;\">\n            <h3 style=\"margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #e4c570; border-bottom: 1px solid #333; padding-bottom: 15px;\">Trip Summary</h3>\n            <table style=\"width: 100%; border-collapse: collapse;\">\n                <tr><td style=\"padding: 10px 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase; width: 30%;\">From:</td><td style=\"padding: 10px 0; font-size: 16px; font-weight: 500; color: #ffffff;\"><a href=\"${pickupLink}\" style=\"color: #ffffff; text-decoration: underline;\">${pickupLocation}</a></td></tr>\n                <tr><td style=\"padding: 10px 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase;\">To:</td><td style=\"padding: 10px 0; font-size: 16px; font-weight: 500; color: #ffffff;\"><a href=\"${dropoffLink}\" style=\"color: #ffffff; text-decoration: underline;\">${dropoffLocation}</a></td></tr>\n                <tr><td style=\"padding: 10px 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase;\">Date:</td><td style=\"padding: 10px 0; font-size: 16px; font-weight: 500; color: #ffffff;\">${pickupDate}</td></tr>\n                <tr><td style=\"padding: 10px 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase;\">Time:</td><td style=\"padding: 10px 0; font-size: 16px; font-weight: 500; color: #ffffff;\">${pickupTime}</td></tr>\n            </table>\n        </div>\n        <div style=\"background-color: #e4c570; color: #0d0d0d; padding: 25px; border-radius: 12px; text-align: center; margin-bottom: 30px;\">\n            <h3 style=\"margin: 0 0 10px 0; font-size: 20px; font-weight: 600;\">Total Fare</h3>\n            <p style=\"margin: 0; font-size: 32px; font-weight: 700;\">${formattedFare}</p>\n        </div>\n        <div style=\"text-align: center; margin-top: 40px;\">\n            <h3 style=\"color: #ffffff; margin: 0 0 15px 0; font-size: 18px;\">Need Assistance?</h3>\n            <p style=\"color: #e4c570; margin: 0; font-size: 22px; font-weight: 600;\">(612) 999-5382</p>\n        </div>\n    </div>\n</div>`;\n\n// ------------------------------------------\n// OWNER HTML (Exact Design from App.js with Buttons)\n// ------------------------------------------\nvar ownerHtml = `\n<div style=\"font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 40px auto; background-color: #0d0d0d; border: 1px solid #333; border-radius: 12px; overflow: hidden; color: #ffffff;\">\n    <div style=\"background-color: #1a1a1a; padding: 40px; text-align: center; border-bottom: 1px solid #333;\">\n        <h1 style=\"margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px; color: #e4c570;\">🚨 NEW BOOKING ALERT</h1>\n        <p style=\"margin: 10px 0 0 0; font-size: 16px; color: #a0a0a0;\">A new ride has been scheduled.</p>\n    </div>\n    <div style=\"padding: 40px 30px;\">\n        <div style=\"background-color: #1a1a1a; border: 1px solid #333; padding: 25px; border-radius: 12px; margin-bottom: 30px;\">\n            <h3 style=\"margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #e4c570; border-bottom: 1px solid #333; padding-bottom: 15px;\">👤 Customer Information</h3>\n            <table style=\"width: 100%; border-collapse: collapse;\">\n                <tr><td style=\"padding: 10px 0; color: #a0a0a0; width: 40%;\">Name:</td><td style=\"padding: 10px 0; color: #ffffff; font-weight: 500;\">${customerName}</td></tr>\n                <tr><td style=\"padding: 10px 0; color: #a0a0a0;\">Phone:</td><td style=\"padding: 10px 0; color: #ffffff; font-weight: 500;\"><a href=\"tel:${phoneNumber}\" style=\"color: #e4c570; text-decoration: underline;\">${phoneNumber}</a></td></tr>\n                <tr><td style=\"padding: 10px 0; color: #a0a0a0;\">Email:</td><td style=\"padding: 10px 0; color: #ffffff; font-weight: 500;\"><a href=\"mailto:${customerEmail}\" style=\"color: #e4c570; text-decoration: underline;\">${customerEmail}</a></td></tr>\n            </table>\n        </div>\n        <div style=\"background-color: #1a1a1a; border: 1px solid #333; padding: 25px; border-radius: 12px; margin-bottom: 30px;\">\n            <h3 style=\"margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #e4c570; border-bottom: 1px solid #333; padding-bottom: 15px;\">🎯 Trip Details</h3>\n            <table style=\"width: 100%; border-collapse: collapse;\">\n                <tr><td style=\"padding: 10px 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase; width: 40%;\">From:</td><td style=\"padding: 10px 0; font-size: 16px; font-weight: 500; color: #ffffff;\"><a href=\"${pickupLink}\" style=\"color: #ffffff; text-decoration: underline;\">${pickupLocation}</a></td></tr>\n                <tr><td style=\"padding: 10px 0; font-size: 14px; color: #a0a0a0; text-transform: uppercase;\">To:</td><td style=\"padding: 10px 0; font-size: 16px; font-weight: 500; color: #ffffff;\"><a href=\"${dropoffLink}\" style=\"color: #ffffff; text-decoration: underline;\">${dropoffLocation}</a></td></tr>\n                <tr><td style=\"padding: 10px 0; color: #a0a0a0;\">Date:</td><td style=\"padding: 10px 0; color: #ffffff; font-weight: 500;\">${pickupDate}</td></tr>\n                <tr><td style=\"padding: 10px 0; color: #a0a0a0;\">Time:</td><td style=\"padding: 10px 0; color: #ffffff; font-weight: 500;\">${pickupTime}</td></tr>\n            </table>\n        </div>\n        <div style=\"background-color: #e4c570; color: #0d0d0d; padding: 25px; border-radius: 12px; text-align: center; margin-bottom: 30px;\">\n            <h3 style=\"margin: 0 0 15px 0; font-size: 20px; font-weight: 600;\">💰 Fare</h3>\n            <p style=\"margin: 0; font-size: 32px; font-weight: 700;\">${formattedFare}</p>\n        </div>\n        <div style=\"text-align: center; margin-bottom: 30px;\">\n            <h3 style=\"color: #ffffff; margin: 0 0 20px 0; font-size: 18px;\">🔧 Quick Actions</h3>\n            <div style=\"display: inline-block; margin: 5px;\">\n                <a href=\"tel:${phoneNumber}\" style=\"background-color: #e4c570; color: #0d0d0d; padding: 15px 25px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 16px; display: inline-block;\">📞 Call Customer</a>\n            </div>\n            <div style=\"display: inline-block; margin: 5px;\">\n                <a href=\"mailto:${customerEmail}\" style=\"background-color: #333333; color: #ffffff; padding: 15px 25px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 16px; display: inline-block;\">📧 Email Customer</a>\n            </div>\n        </div>\n    </div>\n</div>`;\n\n// Construct Mailjet Body\nvar mailjetBody = {\n  Messages: [\n    {\n      From: { Email: FROM_EMAIL, Name: FROM_NAME },\n      To: [{ Email: customerEmail, Name: customerName }],\n      Subject: \"Booking Confirmation - \" + pickupDate,\n      HTMLPart: customerHtml\n    },\n    {\n      From: { Email: FROM_EMAIL, Name: FROM_NAME },\n      To: [{ Email: OWNER_EMAIL, Name: \"Total Town Car Service\" }],\n      Subject: \"NEW BOOKING - \" + customerName + \" - \" + pickupDate,\n      HTMLPart: ownerHtml\n    }\n  ]\n};\n\n// Return\nreturn [{ \n  json: { \n    success: true,\n    mailjetBody: mailjetBody \n  } \n}];"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        400,
        96
      ],
      "id": "2f287ada-88c6-47dd-9dc3-29c8b38ab938",
      "name": "Code in JavaScript1"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.mailjet.com/v3.1/send",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "mailjetEmailApi",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ $json.mailjetBody }}",
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        640,
        96
      ],
      "id": "aa94679e-35d0-4a0d-ac12-bd3398ea99dc",
      "name": "HTTP Request",
      "credentials": {
        "mailjetEmailApi": {
          "id": "Zal6dlzQRWKRJDrS",
          "name": "Mailjet Email account"
        }
      }
    },
    {
      "parameters": {
        "from": "+1 612 999 5382",
        "to": "={{ $('Webhook').item.json.body.message.toolCalls[0].function.arguments[\"Phone Number\"] }}",
        "message": "=Total Town Car - Booking Confirmed\n\nDate: {{ $('Webhook').item.json.body.message.toolCalls[0].function.arguments[\"PickUp-Date\"] }} at {{ $('Webhook').item.json.body.message.toolCalls[0].function.arguments[\"PickUp-Time\"] }}\nPickup: {{ $('Webhook').item.json.body.message.toolCalls[0].function.arguments[\"PickUp-Location\"] }}\nDropoff: {{ $('Webhook').item.json.body.message.toolCalls[0].function.arguments[\"DropOff-Loaction\"] }}\nFare: ${{ $('Webhook').item.json.body.message.toolCalls[0].function.arguments.Fair }}\n\nDriver will contact you upon arrival.\nQuestions? (612) 999-5382",
        "options": {}
      },
      "type": "n8n-nodes-base.twilio",
      "typeVersion": 1,
      "position": [
        384,
        -224
      ],
      "id": "7993efef-685b-4d73-ae9f-ca14699731b7",
      "name": "Send an SMS/MMS/WhatsApp message",
      "credentials": {
        "twilioApi": {
          "id": "cbds1xmA7ShrEs9E",
          "name": "Twilio account"
        }
      }
    },
    {
      "parameters": {
        "from": "+1 612 999 5382",
        "to": "=+16129995382",
        "message": "=🚨 NEW JOB ALERT 🚨\n\n💰 FARE: ${{ $('Webhook').item.json.body.message.toolCalls[0].function.arguments.Fair }}\n\n🗓️ WHEN: {{ $('Webhook').item.json.body.message.toolCalls[0].function.arguments[\"PickUp-Date\"] }} at {{ $('Webhook').item.json.body.message.toolCalls[0].function.arguments[\"PickUp-Time\"] }}\n\n📍 PICKUP:\n{{ $('Webhook').item.json.body.message.toolCalls[0].function.arguments[\"PickUp-Location\"] }}\nhttps://www.google.com/maps/search/?api=1&query={{ $('Webhook').item.json.body.message.toolCalls[0].function.arguments[\"PickUp-Location\"].toString().replace(/\\s/g, '+') }}\n\n🏁 DROPOFF:\n{{ $('Webhook').item.json.body.message.toolCalls[0].function.arguments[\"DropOff-Loaction\"] }}\nhttps://www.google.com/maps/search/?api=1&query={{ $('Webhook').item.json.body.message.toolCalls[0].function.arguments[\"DropOff-Loaction\"].toString().replace(/\\s/g, '+') }}\n\n👤 PASSENGER: {{ $('Webhook').item.json.body.message.toolCalls[0].function.arguments.Names }}\n📞 PHONE: {{ $('Webhook').item.json.body.message.toolCalls[0].function.arguments[\"Phone Number\"] }}",
        "options": {}
      },
      "type": "n8n-nodes-base.twilio",
      "typeVersion": 1,
      "position": [
        384,
        -48
      ],
      "id": "6d232809-2f4d-4b14-9df0-dc50184df8f3",
      "name": "Send an SMS/MMS/WhatsApp message1",
      "credentials": {
        "twilioApi": {
          "id": "cbds1xmA7ShrEs9E",
          "name": "Twilio account"
        }
      }
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": {
          "__rl": true,
          "value": "1D1PlDT-QmTwRVmf0fjdmMynMVPDE0TSZA3-usEoaONQ",
          "mode": "list",
          "cachedResultName": "2025 Rides Booked",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1D1PlDT-QmTwRVmf0fjdmMynMVPDE0TSZA3-usEoaONQ/edit?usp=drivesdk"
        },
        "sheetName": {
          "__rl": true,
          "value": "gid=0",
          "mode": "list",
          "cachedResultName": "Sheet1",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1D1PlDT-QmTwRVmf0fjdmMynMVPDE0TSZA3-usEoaONQ/edit#gid=0"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "Customer": "={{ $json.body.message.toolCalls[0].function.arguments.Names }}",
            "Phone Number": "={{ $json.body.message.toolCalls[0].function.arguments['Phone Number'] }}",
            "Price": "={{ $json.body.message.toolCalls[0].function.arguments.Fair }}",
            "Pick-Up Location": "={{ $json.body.message.toolCalls[0].function.arguments['PickUp-Location'] }}",
            "Drop-Off Location": "={{ $json.body.message.toolCalls[0].function.arguments['DropOff-Loaction'] }}",
            "Pick-Up Date": "={{ $json.body.message.toolCalls[0].function.arguments['PickUp-Date'] }}",
            "Pick-Up Time": "={{ $json.body.message.toolCalls[0].function.arguments['PickUp-Time'] }}",
            "Email": "={{ $json.body.message.toolCalls[0].function.arguments.Email }}"
          },
          "matchingColumns": [],
          "schema": [
            {
              "id": "Customer",
              "displayName": "Customer",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Email",
              "displayName": "Email",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Phone Number",
              "displayName": "Phone Number",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Price",
              "displayName": "Price",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Pick-Up Location",
              "displayName": "Pick-Up Location",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Drop-Off Location",
              "displayName": "Drop-Off Location",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Pick-Up Date",
              "displayName": "Pick-Up Date",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Pick-Up Time",
              "displayName": "Pick-Up Time",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Status",
              "displayName": "Status",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": true
            },
            {
              "id": "Notes",
              "displayName": "Notes",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": true
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4.7,
      "position": [
        400,
        224
      ],
      "id": "9cdf8087-cc03-44d7-9871-0d9f2156ea03",
      "name": "Append row in sheet",
      "credentials": {
        "googleSheetsOAuth2Api": {
          "id": "1uYp3NJp4jIXK1xw",
          "name": "Google Sheets account"
        }
      }
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={\n    \"results\": [\n        {\n            \"toolCallId\": \"{{ $('Webhook').item.json.body.message.toolCalls[0].id }}\",\n            \"result\": \"Ride booked! You will recieve a confermation text soon. If you you have any questions, please call your driver. His number is included in the text.\"\n        }\n    ]\n}\n",
        "options": {}
      },
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.4,
      "position": [
        672,
        -208
      ],
      "id": "40b5662d-b9ff-45d5-8de0-e32f4adc5f8c",
      "name": "Respond to Webhook"
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "Send an SMS/MMS/WhatsApp message",
            "type": "main",
            "index": 0
          },
          {
            "node": "Append row in sheet",
            "type": "main",
            "index": 0
          },
          {
            "node": "Send an SMS/MMS/WhatsApp message1",
            "type": "main",
            "index": 0
          },
          {
            "node": "Code in JavaScript1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Code in JavaScript1": {
      "main": [
        [
          {
            "node": "HTTP Request",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Send an SMS/MMS/WhatsApp message": {
      "main": [
        [
          {
            "node": "Respond to Webhook",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "ec3c656ca9b563a8a2247b02bf76a8a43985c6d27e4065bb79688fb5b78d8e7e"
  }
}