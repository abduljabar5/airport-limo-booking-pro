# EmailJS Setup Guide with Custom Templates

## Overview
Your application now uses **custom HTML email templates** instead of EmailJS's template system. This gives you full control over the email design and content.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Create a free account
3. Verify your email address

### 2. Add Email Service
1. Go to [Email Services](https://dashboard.emailjs.com/admin)
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. **Copy the Service ID** (you'll need this)

### 3. Create ONE Generic Template
Since we're using custom templates, you only need to create **one generic pass-through template**:

1.  Go to [Email Templates](https://dashboard.emailjs.com/admin/templates)
2.  Click "**Create New Template**"
3.  Click the **Settings** tab (next to the "Content" tab).
4.  Change the template **ID** to exactly `template_generic`.
5.  In the settings, find the **To Email** field and enter `{{to_email}}`. This is the most important step!
6.  (Recommended) In the **From Name** field, enter `{{from_name}}`.

    ![EmailJS Settings](https://i.imgur.com/your-screenshot-url.png) <!-- We can add a helpful image here later if needed -->

7.  Now, click the **Content** tab.
8.  For the **Subject**, enter `{{subject}}`.
9.  For the **Content**, enter `{{{html_content}}}`. **Important**: Use three braces `{{{...}}}` to allow the custom HTML to be passed through correctly.
10. Click **Save**.

Your final template configuration should look like this:

-   **ID**: `template_generic`
-   **Settings > To Email**: `{{to_email}}`
-   **Content > Subject**: `{{subject}}`
-   **Content > Body**: `{{{html_content}}}`

### 4. Get Your Public Key
1. Go to [Account Settings](https://dashboard.emailjs.com/admin/account)
2. Copy your **Public Key**

### 5. Update Your .env File
Add these two lines to your `.env` file:

```env
# EmailJS Configuration
EMAILJS_PUBLIC_KEY=your_actual_public_key_here
EMAILJS_SERVICE_ID=your_actual_service_id_here
```

### 6. Restart Your Server
```bash
netlify dev
```

## How It Works

### Custom Templates
Your application now includes two beautiful custom email templates:

1. **Customer Confirmation Email**
   - Professional design with your branding
   - Complete booking details
   - Thank you message

2. **Owner Notification Email**
   - Alert-style design for new bookings
   - All customer and trip information
   - Action required notice

### Template Variables
The templates use these variables:
- `{{customer_name}}`
- `{{customer_email}}`
- `{{customer_phone}}`
- `{{pickup_location}}`
- `{{dropoff_location}}`
- `{{pickup_date}}`
- `{{pickup_time}}`
- `{{passengers}}`
- `{{payment_method}}`
- `{{total_fare}}`
- `{{booking_time}}`

## Customizing Your Templates

### Option 1: Edit the Templates in Code
You can modify the templates directly in `book-a-ride.html` around line 810-900. Look for the `EMAIL_TEMPLATES` object.

### Option 2: Create External Template Files
For better organization, you could move templates to separate HTML files:

1. Create `templates/customer-email.html`
2. Create `templates/owner-email.html`
3. Load them via fetch() in your JavaScript

## Benefits of Custom Templates

✅ **Full Control**: Design emails exactly how you want them
✅ **No Template Limits**: EmailJS free plan has template limits, but you only need one
✅ **Easy Updates**: Change templates without logging into EmailJS
✅ **Consistent Branding**: Match your website's design
✅ **Rich HTML**: Use any HTML/CSS you want
✅ **Dynamic Content**: Easy to add new variables

## Troubleshooting

### "EmailJS not configured" Error
- Check that your `.env` file has both `EMAILJS_PUBLIC_KEY` and `EMAILJS_SERVICE_ID`
- Restart your server with `netlify dev`
- Check the browser console for specific error messages

### Emails Not Sending
- Verify your EmailJS service is connected and working.
- Check that the template ID in your dashboard is exactly `template_generic`.
- **Crucially, check that the "To Email" field in the template's *Settings* tab is `{{to_email}}`**.
- Make sure you're using `{{{html_content}}}` in the template's *Content* body (three braces).

### Template Not Rendering Properly
- Ensure your EmailJS template uses `{{{html_content}}}` (three braces for HTML)
- Check that the subject line is `{{subject}}` (two braces)

## Testing
1. Fill out the booking form
2. Submit it
3. Check your email for the confirmation
4. Check the business email for the notification

The custom templates will render beautifully with your booking information! 