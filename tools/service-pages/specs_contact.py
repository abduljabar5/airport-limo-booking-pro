# Contact page spec for Total Town Car Service.
R = {
 'area':      ('service-areas.html', 'Service Area', 'Every city we serve, with a page for each.'),
 'black':     ('msp-airport-black-car-service.html', 'MSP Airport Black Car', 'Terminal-by-terminal pickup, fixed fares.'),
 'corp':      ('corporate-transportation.html', 'Corporate Travel', 'Executive rides, accounts and invoicing.'),
 'group':     ('group-transportation.html', 'Group Transportation', 'Multi-vehicle coordination for larger parties.'),
}
PAGES = [
dict(file='contact.html', contact=True, title='Contact Total Town Car Service | Dispatch Answers 24/7 | Minneapolis', title_short='Contact',
     meta='Reach Total Town Car Service dispatch any hour at (612) 999-5382, email totaltowncarservice@gmail.com, or book online in two minutes. Minneapolis, Saint Paul, MSP Airport and beyond.',
     keywords='contact Total Town Car, Minneapolis car service phone, MSP airport car service dispatch, book black car Minneapolis', service_type='Chauffeured car service',
     eyebrow='Dispatch · 24 Hours · Every Day', h1='Talk to a <span class="gold-text">Dispatcher</span>, Not a Bot',
     lede='Call, text, email or book online. A real person answers the phone at any hour, knows both MSP terminals, and can have a car assigned before you hang up.',
     image='images/site/contact.webp', image_alt='Total Town Car dispatcher wearing a headset, smiling while taking a booking call at a night dispatch desk', image_caption='Dispatch · Minneapolis · Around the Clock',
     intro_eyebrow='Get in Touch', intro_h2='Quotes, changes, corporate accounts and same-day requests',
     intro=['The fastest route is the phone. Dispatch answers 24 hours a day and can quote a fare, confirm a chauffeur or move a pickup time in about a minute. For anything you would rather put in writing, email works too and is answered the same day.',
            'Booking online gives you an instant fare and a confirmation by email and text. If your pickup is less than two hours away, call instead and we will see what is possible.'],
     faq=[('How quickly can you have a car at my door?', 'Online bookings need two hours of notice. For sooner than that, call dispatch and we will tell you honestly what is available. Same-day airport runs are usually possible outside peak holiday travel.'),
          ('Can I change or cancel a booking?', 'Yes. Call or reply to your confirmation text or email. Cancellations are free up to 24 hours before pickup, and changes to time, address or vehicle are handled by dispatch at no charge.'),
          ('Do you offer corporate accounts?', 'Yes. Call or email and ask for a corporate account. We set up saved travelers, monthly invoicing and a dedicated contact, usually the same day.'),
          ('I need more than six seats. Who do I call?', 'Dispatch. Groups above six are handled by sending two or three vehicles together with one point of contact. Give us the headcount, luggage and schedule and we will build the plan.'),
          ('Will I get a text from my chauffeur?', 'Yes, when you check the SMS consent box at booking. You receive a confirmation, a reminder before pickup and a message when your chauffeur is staged. Reply STOP at any time to opt out.')],
     related=[R['black'], R['corp'], R['group'], R['area']],
     cta_h2='Ready when you are.', cta_p='Book online in two minutes or call dispatch at any hour.'),
]
