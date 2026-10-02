# Fleet page spec for Total Town Car Service.
R = {
 'black':  ('msp-airport-black-car-service.html', 'MSP Airport Black Car', 'Terminal-by-terminal pickup, fixed fares.'),
 'hourly': ('hourly-car-service.html', 'Hourly Car Service', 'A car and chauffeur for a block of time.'),
 'group':  ('group-transportation.html', 'Group Transportation', 'Multi-vehicle coordination for larger parties.'),
 'corp':   ('corporate-transportation.html', 'Corporate Travel', 'Executive rides, accounts and invoicing.'),
}
PAGES = [
dict(file='fleet.html', fleet=True, title='Our Fleet | Escalade, S-Class and Continental | Total Town Car Service', title_short='Our Fleet',
     meta='The Total Town Car fleet: Cadillac Escalade SUV from $69, Mercedes-Benz S-Class executive sedan from $59 and Lincoln Continental sedan from $49. Capacities, luggage room, hourly rates and what each is best for.',
     keywords='Total Town Car fleet, Cadillac Escalade car service Minneapolis, Mercedes S-Class chauffeur Minneapolis, Lincoln Continental black car, luxury fleet Minneapolis', service_type='Chauffeured car service',
     eyebrow='The Fleet · Late-Model · Detailed Before Every Ride', h1='Three Cars. <span class="gold-text">One Standard.</span>',
     lede='Every vehicle is a current-model black car with dark tinted glass, detailed before each pickup and driven by a licensed, background-checked chauffeur. Pick by passengers and bags; the service is the same in all three.',
     image='images/fleet/suv-escalade.webp', image_alt='Black Cadillac Escalade studio photograph', image_caption='',
     faq=[('Which vehicle should I book for an airport trip?', 'For one to three people with carry-ons or two checked bags, the Lincoln Continental sedan from $49 or the Mercedes-Benz S-Class from $59. For four to six people, or three people with a lot of luggage, the Cadillac Escalade from $69 with room for six full-size bags.'),
          ('How many bags fit in each vehicle?', 'The Escalade carries six full-size bags behind the third row. The S-Class and the Continental each carry three bags in the trunk. Golf bags, skis and oversized items usually mean the Escalade; tell dispatch when you book and we will confirm it fits.'),
          ('Are the cars really current models?', 'Yes. The fleet is late-model, maintained on the manufacturer schedule, non-smoking, and detailed inside and out before every pickup. Dark window tint is standard on all three. If a vehicle is ever substituted, it is for an equal or larger one at the same fare.'),
          ('Do you have a van or a vehicle for more than six people?', 'We own a 14-passenger Mercedes-Benz Sprinter, but it is temporarily unavailable for online booking. Groups larger than six are served with two or three vehicles dispatched together under one confirmation. Call (612) 999-5382 and dispatch will arrange it.'),
          ('Can I request a specific vehicle or chauffeur?', 'You choose the vehicle class on the booking form and it is reserved for you. Regular clients can ask for the same chauffeur and we accommodate it whenever the schedule allows. Child seats, up to four at $25 each, can be installed in any of the three vehicles.'),
          ('What do the hourly rates include?', 'Hourly service is $75 per hour in the Continental, $90 in the S-Class and $110 in the Escalade, with a 3-hour minimum. The chauffeur and car stay with you, every stop and all waiting inside the Twin Cities is included, and there is no mileage charge on top.'),
          ('Are the vehicles licensed and insured for commercial service?', 'Yes. Every vehicle is commercially licensed and insured for passenger transport, and every chauffeur holds the required licensing and passes a background check. Total Town Car Service has operated in Minneapolis since 1991 with more than 10,000 rides completed.')],
     related=[R['black'], R['hourly'], R['corp'], R['group']],
     cta_h2='Pick the car. We handle the rest.', cta_p='Fares are shown before you confirm. Book online in two minutes or call dispatch any hour.'),
]
