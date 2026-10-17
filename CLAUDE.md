# Total Town Car Service (totaltowncar.com)

Static site + Netlify Functions. Deploys from `main` via Netlify site **ttcs2**. Separate business from MSP Chauffeur Service (`~/limosite`): keep this site's name, obsidian/gold palette, Cormorant Garamond + Outfit, logo, prices.

## After ANY change to HTML, JS or the page generator: rebuild the CSS

Tailwind is **compiled**, not loaded from a CDN. New utility classes only exist after a rebuild:

```
npm run css        # writes css/tailwind.css (commit it; Netlify has no build step)
```

Run it before committing whenever you add or change class names anywhere (pages, `app.js`, `nav.js`, `tools/service-pages/*`). If a new class "does nothing", this is why.

## Generated pages (do not hand-edit)

`tools/service-pages/build_pages.py` rebuilds the 33 service, city and contact pages from `specs_*.py` (copy), `faq_extra.py` (extra Q&A), `quote_widget.html` (the instant-quote form) and the skeleton `about.html` (head, header, footer). Edit the spec, then:

```
python3 tools/service-pages/build_pages.py
python3 tools/service-pages/inject.py      # hand-written pages: quote widget, FAQ + schema (faq_bank.py), mobile bar
npm run css
```

Changing the header: edit it in `about.html` first (the generator copies it), then run `tools/service-pages/inject.py` is NOT enough; the header in the other hand-written pages was installed by a one-off script, so re-copy the `<header>…</header>` block from `about.html` into them.

## Shared pieces

- `nav.js`: header/mobile menu/mega-menu, active links, `?h1=` dynamic headline, `phone_click` GTM event. Included on every page.
- `app.js`: pricing config (`CONFIG.rates`, hourly rates, fees), instant quote widget, GTM events. Included on every page that has the quote form.
- `css/quote-widget.css`: styles for the quote form on pages other than index.html.
- Pricing lives only in `app.js` `CONFIG` (plus the fallback table in `book-a-ride.html`). Point-to-point: Sedan $49 / Executive Sedan $59 / SUV $69. Hourly: $75 / $90 / $110, 3-hour minimum. Do not change prices without the owner.

## Fleet and wording rules

Three bookable vehicles, always in this order: SUV (Cadillac Escalade), Executive Sedan (Mercedes S-Class), Sedan (Lincoln Continental). The Sprinter van exists but is disabled for online booking. Never use the words taxi, cab or stretch limo in copy. Internal vehicle keys are `suv`, `sedan` (S-Class), `taxi` (Lincoln), `van`; keep them stable.

## Images

Generated with Gemini (`/tmp/gen/gen.py`, key in `~/.gemini_key`). Vehicles must be current-generation with dark tinted windows; people face the camera; cars parallel-parked at the curb; no readable text. Never reuse one image on two pages. Fleet renders: `images/fleet/`; scenes: `images/site/`; city landmark photos: `images/site/place-*.webp`.

## Google Ads

- GTM (`GTM-TV2HRJQP`) is on every page. Site pushes `phone_click`, `quote_generated`, `quote_to_booking`, `booking_step`, `booking_submit`, `quote_lead_saved`, `dynamic_headline` to the dataLayer; map them to conversions in GTM.
- Dynamic headline: final URL suffix `h1={keyword}` at campaign level swaps the H1 to the matched keyword.

## Backend

Netlify Functions in `functions/`: `process-booking` (email/SMS/calendar/reminders/blob record; exports `scheduleReminders`), `create-stripe-session` + `stripe-webhook`, `cancel-booking` (owner only, admin token), `save-lead` (quote follow-up text), `manage-booking` (customer self-service: GET summary / `mode=prefill` for rebook links, POST edits to date, time, passengers, flight, notes, contact; no cancel, no re-pricing), `sms-reply` (Twilio inbound webhook: "1"/"confirm" marks a pay-driver ride confirmed and cancels the owner's not-confirmed alert; other texts are forwarded to the owner), `nudges` (scheduled daily 16:00 UTC: day-after return-ride text for airport dropoffs, 90-day text, pre-peak-season text; SMS-consented customers only, max one nudge per 14 days). Shared helpers in `lib/booking-links.js`: signed manage/rebook links (HMAC of the confirmation number with `MANAGE_LINK_SECRET`, falling back to `CANCEL_ADMIN_TOKEN`), phone index store, vehicle name mapping. Blob stores: `bookings`, `leads`, `phone-index`, `nudges`. Twilio Messaging Service must point its incoming-message webhook at `/.netlify/functions/sms-reply`. Twilio sends use the site API key (`TWILIO_API_KEY_SID` + `TWILIO_API_KEY_SECRET`, revocable on its own) via `twilioBasicAuth()`, falling back to the account auth token; the auth token is still required for webhook signature checks (`sms-reply`, `twilio-alert`). Twilio usage triggers call `twilio-alert`, which emails the owner. Customer-facing pages: `manage.html` (edit a ride), `book-a-ride.html?rebook=<conf>&t=<token>[&return=1]` prefills from a past booking. Never edit `.env`; check `netlify env:list` before deploys. The user pushes; do not push unless told.
