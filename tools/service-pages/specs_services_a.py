# Page specs for Total Town Car Service, service pages group A.
# All copy is original. Consumed by the static-site page generator.

R = {
 'airport':   ('airport-service.html', 'Airport Transfers', 'MSP arrivals and departures, flight-tracked.'),
 'black':     ('msp-airport-black-car-service.html', 'MSP Airport Black Car', 'Terminal-by-terminal pickup, fixed fares.'),
 'pickup':    ('airport-pickup.html', 'Airport Pickup', 'Baggage claim to your door, timed to your flight.'),
 'mpls':      ('minneapolis-car-service.html', 'Minneapolis Black Car', 'Private, pre-arranged, chauffeur-driven.'),
 'corp':      ('corporate-transportation.html', 'Corporate Travel', 'Executive rides, accounts and invoicing.'),
 'limo':      ('limousine-service-minneapolis.html', 'Limo Service', 'The chauffeured standard in an Escalade or S-Class.'),
 'hourly':    ('hourly-car-service.html', 'Hourly Car Service', 'A car and chauffeur for a block of time.'),
 'chauffeur': ('private-chauffeur-service.html', 'Private Chauffeur', 'As-directed driving for a full day.'),
 'p2p':       ('point-to-point-transportation.html', 'Point to Point', 'Door to door, one flat rate.'),
 'group':     ('group-transportation.html', 'Group Transportation', 'Multi-vehicle coordination for larger parties.'),
 'downtown':  ('downtown-minneapolis.html', 'Downtown Minneapolis', 'Hotels, stadiums, theaters, curb to door.'),
 'crew':      ('flight-crew-charter-service.html', 'Flight Crew Charter', 'Crew transport built around report times.'),
 'mayo':      ('rochester-mayo-clinic.html', 'Rochester & Mayo Clinic', 'Twin Cities to Rochester, private and direct.'),
 'chmpls':    ('chauffeur-service-minneapolis.html', 'Chauffeur Service', 'A dedicated professional, not just a ride.'),
 'moa':       ('mall-of-america-car-service.html', 'Mall of America', 'Bloomington, MOA and MSP, door to door.'),
 'area':      ('service-areas.html', 'Service Area', 'Every city we serve, with a page for each.'),
 'prom':      ('prom-homecoming.html', 'Prom & Homecoming', 'Safe, stylish rides for the big night.'),
 'concert':   ('concert-events.html', 'Concerts & Events', 'Arrive and leave without the parking.'),
 'wine':      ('wine-brewery-tours.html', 'Wine & Brewery Tours', 'A chauffeur for the whole tasting day.'),
 'contact':   ('contact.html', 'Contact', 'Dispatch answers 24/7.'),
}

LINK = 'class="text-gold-400 hover:text-gold-300 underline underline-offset-2"'
END = ('Photorealistic editorial photograph, natural light, shot on a full-frame camera with a 35mm lens, '
       'fine film grain. No text, no logos, no watermarks, no readable signage.')

PAGES = [

# ---------------------------------------------------------------- 1. MSP Airport Black Car Service
dict(
    file=R['black'][0],
    title='MSP Airport Black Car Service from $49 | Total Town Car Service',
    title_short='MSP Airport Black Car Service',
    meta='MSP Airport black car service with fixed fares from $49, real-time flight tracking, Meet & Greet at Terminal 1 or 2, and 24/7 dispatch. Book online in a minute.',
    keywords='MSP airport black car service, MSP black car, Minneapolis airport car service, Terminal 1 pickup, Terminal 2 pickup, airport chauffeur MSP',
    service_type='Airport black car service',
    eyebrow='MSP · Terminal 1 · Terminal 2',
    h1='MSP Airport <span class="gold-text">Black Car Service</span>',
    lede='A chauffeur assigned before you land, a fare fixed before you book, and a car that is already at the curb when you walk out. That is the whole idea.',
    image='images/site/svc-msp-black-car.webp',
    image_alt='Chauffeur holding the rear door of a black Cadillac Escalade at the MSP Terminal 1 arrivals curb as a traveler with a roller bag walks up',
    image_caption='Lindbergh · Humphrey · Flight-Tracked',
    image_prompt=('a brand-new 2026 black Cadillac Escalade (tall thin vertical LED headlights down the front corners, large mesh grille, dark limousine-tinted windows) parallel-parked at the arrivals curb outside Terminal 1 at Minneapolis-Saint Paul International Airport, parking structure overhead, a uniformed chauffeur holding the front-hinged rear door open, facing the camera and smiling, a businesswoman in a camel coat with a roller bag on the sidewalk in three-quarter view, face visible, crisp late-winter morning light. ' + END),
    intro_eyebrow='How It Works At MSP',
    intro_h2='Two terminals, one standard',
    intro=[
        'Minneapolis-Saint Paul International has two terminals that do not connect inside security, so knowing which one you are landing at matters. '
        'Terminal 1 Lindbergh handles most major carriers and is the larger of the two. Terminal 2 Humphrey is smaller, quicker to clear, and home to the '
        'low-cost airlines. When you book, we ask for your flight number, and from that we know your terminal, your scheduled arrival, and any change to it. '
        'Your chauffeur is watching the same feed dispatch is, so an early landing or a two-hour delay changes nothing on your end.',
        'At Terminal 1, most clients ask us to meet them at baggage claim on the lower level. With Meet & Greet, your chauffeur is standing there with a '
        'name sign when you come down the escalator. Otherwise, they text you the exact door and pull to the curb as you walk out. Terminal 2 works the '
        'same way, only faster, since baggage claim and the pickup curb are a short walk apart. Either way you are never guessing where the car is.',
        'Fares are fixed. A Sedan starts at $49, an Executive Sedan at $59, and an SUV at $69, and the number you see on the booking form is the number '
        'you pay. No surge, no meter, no adjustment because a game let out downtown. Departures work the same way in reverse: we recommend a pickup time '
        'based on your flight and the time of day, and your chauffeur is at your door a few minutes early.'
    ],
    bullets_eyebrow='Included',
    bullets_h2='What comes with every airport ride',
    bullets_lede='These are not add-ons or upgrades. They are simply how we run an airport transfer.',
    bullets=[
        ('Real-time flight tracking', 'We monitor your flight from departure to touchdown, so your chauffeur is timed to when you actually land, not when you were supposed to.'),
        ('Complimentary wait time', 'Thirty minutes of waiting is included on domestic arrivals and sixty on international, enough to clear customs and collect bags without watching the clock.'),
        ('Meet & Greet', 'For $15, your chauffeur waits inside at baggage claim with a name sign, takes your bags, and walks you to the car.'),
        ('Fixed fares, quoted first', 'The fare is calculated and shown before you confirm. It does not change with traffic, weather, or demand.'),
        ('Three vehicle classes', 'A Cadillac Escalade for up to six passengers, a Mercedes-Benz S-Class for three, or a Lincoln Continental for three. All late-model, all black.'),
        ('24/7 dispatch', 'Red-eyes and 5 AM departures are ordinary for us. A human answers the phone at any hour, and someone is always watching the flights.'),
    ],
    steps_eyebrow='Arrival Day',
    steps_h2='From booking to the back seat',
    steps=[
        ('Book with your flight number', 'Online in about a minute, or by phone. Choose your vehicle, add Meet & Greet or a car seat if you need one, and see your fixed fare before confirming.'),
        ('We track your flight', 'From the moment it departs, dispatch and your chauffeur watch its progress. Delays, early arrivals, and gate changes are handled without a call from you.'),
        ('Your chauffeur stages at the terminal', 'As your plane touches down, your chauffeur is already positioned and sends you a text with their name, the vehicle, and where to meet.'),
        ('Walk out and go', 'Collect your bags, step outside or meet your chauffeur at baggage claim, and settle in. The fare is already set, and the route is already planned.'),
    ],
    faq=[
        ('Where exactly do I meet my chauffeur at Terminal 1?', 'With Meet & Greet, at baggage claim on the lower level, where your chauffeur will be holding a sign with your name. Without it, your chauffeur texts you a specific door number on the arrivals level and pulls up to the curb as you step outside.'),
        ('How is Terminal 2 different?', 'Terminal 2 Humphrey is smaller and faster to move through. Baggage claim and the pickup curb are a short walk apart, so most clients simply walk out and find the car waiting. Meet & Greet is available there as well.'),
        ('What happens if my flight is delayed or lands early?', 'Nothing on your end. We track the flight in real time and adjust your chauffeur automatically. Your complimentary wait time starts from the actual arrival, thirty minutes for domestic flights and sixty for international.'),
        ('How much does an airport black car cost?', 'Fixed fares start at $49 for the Lincoln Continental, $59 for the Mercedes-Benz S-Class, and $69 for the Cadillac Escalade, depending on your destination. The booking form shows the exact fare before you confirm.'),
        ('Can I book for a departure as well?', 'Yes. Tell us your flight time and we will recommend a pickup window that accounts for the time of day and terminal. Booking the round trip together saves 10 percent on the total.'),
        ('How far ahead do I need to book?', 'Online bookings need at least two hours of notice. For anything sooner, call dispatch at (612) 999-5382 and we will do our best to send a car. Cancellations are free up to 24 hours before pickup.'),
    ],
    related=[R['pickup'], R['airport'], R['corp'], R['crew']],
    cta_h2='Your car is waiting before you land.',
    cta_p='Enter your flight number, pick a vehicle, and see your fixed fare in about a minute. Dispatch answers around the clock at (612) 999-5382.',
),

# ---------------------------------------------------------------- 2. Airport Pickup
dict(
    file=R['pickup'][0],
    title='MSP Airport Pickup | Baggage Claim to Door | Total Town Car Service',
    title_short='MSP Airport Pickup',
    meta='Private MSP airport pickup timed to your actual landing. Meet at baggage claim or the curb, flat fares from $49, free wait time, and both terminals covered.',
    keywords='MSP airport pickup, airport pickup Minneapolis, pickup from MSP, MSP arrivals car service, private airport pickup Twin Cities',
    service_type='Airport pickup service',
    eyebrow='Arrivals · Baggage Claim · Curbside',
    h1='MSP Airport <span class="gold-text">Pickup</span>',
    lede='Land, grab your bags, and get in. No app to refresh, no line at the ground transportation stand, no wondering which color of car to look for.',
    image='images/site/svc-airport-pickup.webp',
    image_alt='Traveler with a suitcase greeting a smiling chauffeur beside a black Lincoln Continental at the MSP Terminal 2 pickup curb',
    image_caption='Timed · To Your · Landing',
    image_prompt=('a brand-new 2026 black Lincoln Continental sedan (horizontal chrome mesh grille, full-width LED taillights, dark limousine-tinted windows) parallel-parked at the ground transportation curb outside Terminal 2 at Minneapolis-Saint Paul International Airport, light rail canopy behind, a smiling chauffeur facing the camera lifting a suitcase into the open trunk, a young man in a puffer jacket in three-quarter view, face visible, overcast winter morning light, soft snow on the planters. ' + END),
    intro_eyebrow='The Simple Version',
    intro_h2='A ride home that is ready when you are',
    intro=[
        'An airport pickup should be the easiest part of a trip, and most of the time it is the most annoying. You are tired, you are carrying more than you '
        'planned, and you are standing in a cold garage trying to match a license plate. We built this service to remove all of that. You give us a flight '
        'number, we watch it, and a chauffeur is at MSP when you land with your name and your destination already in hand. The fare was set when you booked.',
        'You choose how you want to be met. Curbside is the quickest: your chauffeur texts you the door to walk out of and pulls up as you appear. Meet & Greet '
        'puts your chauffeur inside at baggage claim with a name sign, which is the better choice for first-time visitors, older parents, kids traveling alone, '
        'or anyone with more bags than hands. Both work at Terminal 1 Lindbergh and Terminal 2 Humphrey, and dispatch is happy to explain which terminal your '
        'airline uses.',
        'From MSP we go anywhere in the Twin Cities and well beyond. Downtown Minneapolis is about fifteen minutes, Saint Paul about the same, and the western '
        'suburbs twenty-five to forty depending on where you are headed. Long-distance pickups to Rochester, Saint Cloud, Mankato, and Duluth are quoted as a '
        'flat fare too, so a late arrival never turns into a negotiation.'
    ],
    bullets_eyebrow='Why It Works',
    bullets_h2='The details that make a pickup painless',
    bullets=[
        ('Timed to the actual landing', 'Flight tracking means your chauffeur is staged when your wheels touch down, whether that is on schedule or two hours late.'),
        ('Free wait time', 'Thirty minutes on domestic arrivals and sixty on international are included, so a slow baggage carousel does not cost you anything.'),
        ('Baggage claim or the curb', 'Choose Meet & Greet with a name sign inside for $15, or a quick curbside pickup with a text telling you exactly where.'),
        ('One flat fare', 'Quoted before you confirm and unchanged by traffic or weather. Pay online in advance or pay your chauffeur at the end.'),
        ('Room for the bags', 'The Escalade takes six bags and six passengers. The S-Class and Continental take three of each. Pick what fits and nothing gets stacked on a lap.'),
        ('Car seats on request', 'Add up to four child car seats at $25 each when you book, installed and ready before your chauffeur leaves for the airport.'),
    ],
    steps_eyebrow='Arrival',
    steps_h2='Four steps from the gate to your door',
    steps=[
        ('Book with your flight details', 'Airline and flight number are all we need to find your terminal and arrival time. Choose curbside or Meet & Greet and pick your vehicle.'),
        ('We watch the flight', 'Dispatch tracks it from departure. If it lands early, your chauffeur is early. If it is delayed, no one is waiting and no one is charging you.'),
        ('Get a text on landing', 'Your chauffeur sends their name, the vehicle, and where to meet. Reply if you need a few extra minutes or want help with bags.'),
        ('Walk out and settle in', 'Bags go in the trunk, you go in the back, and the route home is already set. The fare has not changed since you booked.'),
    ],
    faq=[
        ('Do I need to call when I land?', 'No. Your chauffeur already knows you have landed and will text you first. If you would rather call, dispatch is available at (612) 999-5382 at any hour, but most clients simply follow the text.'),
        ('What if my bag takes a long time to come out?', 'Thirty minutes of wait time on domestic flights and sixty on international is built in from the actual arrival time. That covers nearly every baggage delay we see at MSP. If it runs longer, we stay in touch by text.'),
        ('Which terminal will I arrive at?', 'Terminal 1 Lindbergh serves most major airlines, and Terminal 2 Humphrey serves the low-cost carriers. Your flight number tells us which one, and you can always ask dispatch when you book if you are unsure.'),
        ('Can I be picked up at MSP and dropped in another city?', 'Yes. We regularly take arrivals to Rochester and Mayo Clinic, Saint Cloud, Mankato, Duluth, and everywhere in between. Long-distance pickups are quoted as a single flat fare before you confirm.'),
        ('How much is an airport pickup?', 'Flat fares start at $49 in the Lincoln Continental, $59 in the Mercedes-Benz S-Class, and $69 in the Cadillac Escalade, depending on where you are going. The exact fare appears on the booking form before you confirm.'),
    ],
    related=[R['black'], R['airport'], R['moa'], R['mayo']],
    cta_h2='Book the ride before you board.',
    cta_p='It takes about a minute online, and a chauffeur will be watching your flight from the moment it departs. Prefer to talk? Call (612) 999-5382.',
),

# ---------------------------------------------------------------- 3. Black Car Service in Minneapolis
dict(
    file=R['mpls'][0],
    title='Black Car Service in Minneapolis | Private | Total Town Car Service',
    title_short='Black Car Service in Minneapolis',
    meta='Private black car service in Minneapolis. Chauffeur and vehicle assigned in advance, flat fares with no surge, late-model Cadillac, Mercedes-Benz and Lincoln.',
    keywords='black car service Minneapolis, Minneapolis car service, private car service Minneapolis, luxury car service Twin Cities, chauffeured car Minneapolis',
    service_type='Black car service',
    eyebrow='Private · Pre-Arranged · Chauffeur-Driven',
    h1='Black Car Service in <span class="gold-text">Minneapolis</span>',
    lede='A car reserved for you, a chauffeur who knows the city, and a fare that was settled before the ride began. Since 1991, that has been the whole job.',
    image='images/site/svc-minneapolis-car.webp',
    image_alt='Woman in a wool coat stepping onto the Nicollet Mall sidewalk from a black Mercedes-Benz S-Class with downtown Minneapolis towers behind',
    image_caption='Downtown · North Loop · Uptown',
    image_prompt=('a brand-new 2026 black Mercedes-Benz S-Class sedan (current W223 generation, dark limousine-tinted windows) parallel-parked at the curb on Nicollet Mall in downtown Minneapolis, the glass IDS Center tower rising behind, a woman in a charcoal wool coat stepping from the front-hinged rear door onto the sidewalk in three-quarter view, face visible and smiling, a chauffeur holding the door and facing the camera, golden October afternoon light, yellow leaves on the pavement. ' + END),
    intro_eyebrow='What The Words Mean',
    intro_h2='Car service, black car, private car. Same thing, done properly.',
    intro=[
        'People search for this ride under several names. "Car service" is the general term for a pre-booked trip with a professional driver. "Black car" '
        'is what executive travelers tend to call it. "Private car service" and "luxury car service" describe the same thing from a different angle. Whatever '
        'you type into the booking form, you get the same product from us: a specific vehicle and a specific chauffeur reserved for your trip, and a flat '
        'fare you agreed to before anyone turned a key.',
        'The comparison that actually matters is with rideshare apps. An app matches you with whoever is nearby at the moment you request, at whatever price '
        'the algorithm decides. We assign your car and chauffeur in advance, often the day before, and the fare is fixed. It does not climb because it is '
        'snowing, because a concert just let out at Target Center, or because it is 5 AM. Your chauffeur is a career professional who has driven these '
        'streets for years, not someone following a phone.',
        'We cover all of Minneapolis: downtown and the North Loop, Uptown and the lakes, Northeast, the University area, Linden Hills, and every neighborhood '
        'in between. Saint Paul and the suburbs are a short drive further, and MSP Airport is fifteen minutes from downtown. Whether it is a ten-minute hop '
        'to a dinner reservation or a full evening of stops, the standard does not change.'
    ],
    bullets_eyebrow='Every Ride',
    bullets_h2='What you get, and what you never have to think about',
    bullets=[
        ('A dedicated vehicle', 'A Cadillac Escalade, Mercedes-Benz S-Class, or Lincoln Continental reserved for your trip alone. No shared rides, no unexpected passengers.'),
        ('A professional chauffeur', 'Background-checked, properly dressed, and experienced with Minneapolis traffic, event nights, and the fastest route around a closed bridge.'),
        ('A fixed fare', 'Shown on the booking form before you confirm, with no surge, no meter, and no surprise line items at the end.'),
        ('Extra stops when you need them', 'Add a stop for $15 each, as many as the day calls for, whether that is a pharmacy run or picking up a colleague.'),
        ('Pay your way', 'Settle up securely online when you book, or pay your chauffeur at the end of the ride. Either is fine with us.'),
        ('Free cancellation', 'Plans change. Cancel up to 24 hours before pickup at no charge, and reschedule with a quick call to dispatch.'),
    ],
    steps_eyebrow='Booking',
    steps_h2='How a black car ride comes together',
    steps=[
        ('Tell us the trip', 'Pickup address, destination, date, time, and passenger count. Online takes about a minute, or call (612) 999-5382 and dispatch will take it down.'),
        ('See the fare', 'The booking form calculates a flat fare for your vehicle choice and shows it before you confirm. What you see is what you pay.'),
        ('We assign the car', 'A specific chauffeur and vehicle are reserved for you and confirmed by email and text. On the day, your chauffeur texts when they are on the way.'),
        ('Ride and arrive', 'Your chauffeur arrives a few minutes early, loads the bags, and takes the best route. Add stops or change the destination along the way if needed.'),
    ],
    faq=[
        ('What is the difference between black car service and a rideshare app?', 'Timing and certainty. A rideshare matches you with an available driver when you request one, at a price that moves with demand. Black car service reserves a specific chauffeur and vehicle ahead of time at a fixed fare, so the car is there and the price is known.'),
        ('Which neighborhoods do you serve?', 'All of Minneapolis, including downtown, the North Loop, Uptown, Northeast, the University area, Linden Hills, and the lakes. We also cover Saint Paul, every Twin Cities suburb, and long-distance runs to Rochester, Duluth, Saint Cloud, and Mankato.'),
        ('How far ahead should I book?', 'Online bookings need at least two hours of notice, and a day ahead is ideal for busy weekends or event nights. For something sooner, call dispatch and we will tell you honestly whether a car is available.'),
        ('Is the fare really fixed?', 'Yes. The fare is calculated from your pickup and destination and shown before you confirm. Traffic, weather, and demand do not change it. Optional extras such as stops, Meet & Greet, or car seats are listed separately so you can see exactly what you are adding.'),
        ('What vehicles do you have?', 'Three. The Cadillac Escalade seats up to six with six bags, the Mercedes-Benz S-Class seats three with three bags, and the Lincoln Continental seats three with three bags. All are late-model and black, and all are detailed before every trip.'),
        ('Can I book a car for several hours instead of a single trip?', 'Yes. Hourly service keeps the car and chauffeur with you for a block of time with a three-hour minimum, quoted at booking. It suits evenings with multiple stops, client days, and anything where the schedule is still forming.'),
    ],
    related=[R['downtown'], R['chmpls'], R['p2p'], R['corp']],
    cta_h2='Your car, your chauffeur, your fare. All settled in advance.',
    cta_p='Book online in about a minute or call (612) 999-5382. Dispatch is awake whenever you are.',
),

# ---------------------------------------------------------------- 4. Limo Service in Minneapolis
dict(
    file=R['limo'][0],
    title='Limo Service Minneapolis | Escalade & S-Class | Total Town Car Service',
    title_short='Limo Service in Minneapolis',
    meta='Limo service in Minneapolis the modern way: a chauffeured Cadillac Escalade or Mercedes-Benz S-Class for nights out, galas and corporate evenings, fixed fare.',
    keywords='limo service Minneapolis, Minneapolis limo, chauffeured car Minneapolis, luxury car service Minneapolis, Escalade limo service, black car night out',
    service_type='Limo service',
    eyebrow='Nights Out · Galas · Anniversaries',
    h1='Limo Service in <span class="gold-text">Minneapolis</span>',
    lede='When people say "limo," they usually mean a chauffeured car that makes the evening feel like an occasion. That is exactly what we provide, in a Cadillac Escalade or a Mercedes-Benz S-Class.',
    image='images/site/svc-limousine.webp',
    image_alt='Couple in evening wear stepping onto the sidewalk from a black Cadillac Escalade near the Stone Arch Bridge in Minneapolis at dusk',
    image_caption='Dressed Up · Dropped Off · Picked Up',
    image_prompt=('a brand-new 2026 black Cadillac Escalade (tall thin vertical LED headlights down the front corners, large mesh grille, dark limousine-tinted windows) parallel-parked at the curb on cobblestoned Main Street Southeast in Minneapolis, the Stone Arch Bridge and Mississippi River behind, a couple in evening wear stepping from the front-hinged rear door onto the sidewalk in three-quarter view, faces visible and smiling, a chauffeur holding the door and facing the camera, deep blue summer dusk. ' + END),
    intro_eyebrow='A Word About The Word',
    intro_h2='Limo service, without the long car',
    intro=[
        'The word "limo" has drifted. It used to mean one specific body style. Today, when someone in Minneapolis says they booked a limo for the evening, '
        'they almost always mean a black chauffeured car that arrives on time, looks the part, and waits while they enjoy themselves. That is the service we '
        'have offered since 1991. We do not operate an elongated vehicle, and most of our clients are relieved to hear it. What you get instead is a current '
        'Cadillac Escalade or Mercedes-Benz S-Class with a professional at the wheel.',
        'The occasions are what you would expect. Anniversary dinners where nobody wants to be the designated driver. Galas at the Guthrie, the Walker, or a '
        'downtown hotel ballroom. Birthday nights out in the North Loop that end somewhere in Uptown. Corporate evenings where a client should not have to '
        'think about how they are getting back to the hotel. Concerts at the Armory or Target Center where the parking ramp would otherwise be the least '
        'pleasant part of the night. The car makes the evening simpler and the arrival better.',
        'You can book it as a single trip each way, or keep the car with you for the evening on an hourly basis with a three-hour minimum. The hourly option '
        'is the closest thing to the classic limo experience: your chauffeur waits outside the restaurant, brings the car around when you text, and moves on '
        'to the next stop without a second booking. Either way, the fare is fixed and shown before you confirm.'
    ],
    bullets_eyebrow='Occasions',
    bullets_h2='Evenings we drive most often',
    bullets=[
        ('Anniversaries and date nights', 'A chauffeured Escalade or S-Class waiting outside the restaurant turns dinner into an event and removes the argument over who drives home.'),
        ('Galas and black-tie evenings', 'Arrive at the Guthrie, the Walker, or a downtown ballroom rested and unhurried, and leave when you are ready, not when the valet line clears.'),
        ('Corporate dinners and client evenings', 'Your guests are collected from the hotel, driven to dinner, and returned without anyone checking an app. Invoicing available for company accounts.'),
        ('Birthday and celebration nights', 'Up to six friends in the Escalade, as many stops as the night calls for, and a sober professional handling the driving from start to finish.'),
        ('Concerts and shows', 'Curbside drop-off and a car waiting where you agreed afterward, so the parking ramp and the post-show crawl never become part of the evening.'),
        ('Airport send-offs and arrivals', 'The same chauffeured standard applied to MSP. Flight tracking, Meet & Greet, and fixed fares from $49 for a departure or return.'),
    ],
    faq=[
        ('Do you have a long, elongated limo?', 'No. We provide limo service in the way most people use the term today: a chauffeured luxury vehicle, specifically a Cadillac Escalade or a Mercedes-Benz S-Class. Both are current models, immaculately kept, and driven by career professionals.'),
        ('How many people can ride together?', 'The Cadillac Escalade seats up to six passengers, and the Mercedes-Benz S-Class seats three. For parties larger than six, we dispatch two or three vehicles together so everyone arrives at the same time.'),
        ('Can the chauffeur wait while we have dinner or attend an event?', 'Yes. Book hourly service with a three-hour minimum and the car and chauffeur stay with you for the evening, moving between stops on your schedule. The hourly rate is quoted at booking, and there is no need to arrange a separate return.'),
        ('What does limo service cost in Minneapolis?', 'Single trips are quoted as a fixed fare based on pickup and destination, starting at $59 for the S-Class and $69 for the Escalade. Hourly evenings are quoted at booking with a three-hour minimum. Every fare is shown before you confirm.'),
        ('Can we bring drinks in the car?', 'Minnesota law does not allow open containers in the passenger area of our vehicles, so we ask that you save the toast for the venue. Bottled water is always on board.'),
        ('How far ahead should I book for a Saturday night?', 'A few days ahead is wise for weekend evenings, gala season, and major concert dates. Online bookings need at least two hours of notice; for anything sooner, call dispatch at (612) 999-5382.'),
    ],
    related=[R['concert'], R['mpls'], R['chmpls'], R['hourly']],
    cta_h2='Make the evening an occasion.',
    cta_p='Reserve an Escalade or S-Class for the night, as a single trip or by the hour. Book online in a minute or call (612) 999-5382.',
),

# ---------------------------------------------------------------- 5. Hourly Car Service
dict(
    file=R['hourly'][0],
    title='Hourly Car Service in the Twin Cities | Total Town Car Service',
    title_short='Hourly Car Service',
    meta='Hourly car service in Minneapolis and Saint Paul. A chauffeur and car for a block of time, three-hour minimum, unlimited stops, as directed. Sedan $75, Executive Sedan $90, SUV $110 per hour.',
    keywords='hourly car service Minneapolis, as directed car service, hourly chauffeur Twin Cities, car and driver by the hour, multi-stop car service Minneapolis',
    service_type='Hourly car service',
    eyebrow='As Directed · Multi-Stop · 3-Hour Minimum',
    h1='Hourly <span class="gold-text">Car Service</span>',
    lede='A car and a chauffeur for a block of time, going wherever the day takes you. No second booking for the return, no meter running between stops.',
    image='images/site/svc-hourly.webp',
    image_alt='Chauffeur holding the rear door of a black Mercedes-Benz S-Class at the curb by the Minneapolis Sculpture Garden while a man with a garment bag smiles at the camera',
    image_caption='Your Route · Your Pace · Your Day',
    image_prompt=('a brand-new 2026 black Mercedes-Benz S-Class sedan (current W223 generation, dark limousine-tinted windows) parallel-parked at the curb beside the Minneapolis Sculpture Garden, the giant spoon and cherry sculpture and the Walker Art Center across the lawn, a man in a navy blazer with a garment bag on the sidewalk in three-quarter view, face visible and smiling, a chauffeur holding the front-hinged rear door open and facing the camera, bright early-summer afternoon light. ' + END),
    intro_eyebrow='How Hourly Works',
    intro_h2='One booking, as many stops as the day needs',
    intro=[
        'Hourly service, sometimes called as-directed service, means the vehicle and chauffeur are yours for a set number of hours rather than for a single '
        'trip. You decide where to go and when, and you can change your mind along the way. There is a three-hour minimum, and the rate is $75, $90 or $110 per hour depending on the vehicle '
        'based on the vehicle you choose. Within that block, stops are unlimited and waiting is simply part of the service. Your chauffeur stays nearby, keeps '
        'the car ready, and brings it around when you text.',
        'It suits days that do not fit neatly into point A and point B. A morning of showings with a realtor across Edina and Wayzata. A visiting executive '
        'with three meetings downtown and a dinner in Saint Paul. Parents in town for a weekend who want to see the campus, the lakes, and a grandchild\'s '
        'game without renting a car. A holiday shopping run through the Galleria and Mall of America. Any of these becomes one clean reservation instead of '
        'four separate rides.',
        'Hourly service covers roughly 25 miles around the Twin Cities, which includes Minneapolis, Saint Paul, MSP Airport, and every suburb from Blaine to '
        'Burnsville and Wayzata to Woodbury. Longer runs, such as a day trip to Rochester or Stillwater, are also available, and dispatch will simply quote '
        'them as a flat fare instead. Tell us what you have in mind and we will recommend whichever structure costs you less.'
    ],
    bullets_eyebrow='Included',
    bullets_h2='What an hourly booking covers',
    bullets=[
        ('Unlimited stops', 'Within your reserved time, go wherever the day requires. Stops are not counted or charged separately when you are booked by the hour.'),
        ('Waiting is part of the service', 'Your chauffeur waits outside the meeting, the restaurant, or the store and brings the car around when you are ready.'),
        ('Change the plan on the fly', 'Add a destination, skip one, or reverse the order. The chauffeur follows your direction, not a route fixed at booking.'),
        ('One vehicle, one chauffeur, all day', 'The same professional and the same car stay with you for the full block, so nothing needs re-explaining at each stop.'),
        ('Extend if you need to', 'Running long? Tell your chauffeur and we extend the booking in whole hours, subject to availability, at the rate quoted when you booked.'),
        ('Room for what you collect', 'Shopping bags, garment bags, sample cases, and luggage ride along in the trunk. The Escalade takes six bags, the sedans three.'),
    ],
    steps_eyebrow='Booking Hourly',
    steps_h2='How to reserve a car by the hour',
    steps=[
        ('Choose hourly service', 'Select hourly on the booking form, pick your vehicle, and enter your start time, starting address, and how many hours you expect to need. Three is the minimum.'),
        ('See your quote', 'The rate for your vehicle and hours is shown before you confirm. Book online in about a minute or call (612) 999-5382 and dispatch will build it with you.'),
        ('Share a rough plan', 'If you already know the stops, send them along so your chauffeur can think about the order and the parking. If you do not, that is fine too.'),
        ('Direct the day', 'Your chauffeur arrives a few minutes early and follows your lead from there. Text when you are ready to move on, and the car is at the door.'),
    ],
    faq=[
        ('What is the minimum for hourly service?', 'Three hours. That is enough for a couple of meetings and lunch, a shopping afternoon, or a dinner with a stop before and after. Beyond the minimum you can book any number of whole hours, and extending on the day is usually possible.'),
        ('How much does hourly car service cost?', 'Hourly service is $75 per hour in the Lincoln Continental sedan, $90 in the Mercedes-Benz S-Class and $110 in the Cadillac Escalade, with a three-hour minimum, shown before you confirm. There are no per-stop charges, no waiting charges, and no mileage adjustments within the Twin Cities service area.'),
        ('Can the chauffeur wait while I am inside?', 'Yes, and that is the point. Your chauffeur stays with the car nearby, keeps it comfortable, and returns to the door when you text. You never wait for a car to be dispatched between stops.'),
        ('How far can we go on an hourly booking?', 'Hourly service is designed for trips within roughly 25 miles of Minneapolis and Saint Paul, which covers the entire metro. For longer destinations such as Rochester, Duluth, or Saint Cloud, dispatch will quote a flat fare instead.'),
        ('Which vehicles are available by the hour?', 'All three. The Cadillac Escalade for up to six passengers, the Mercedes-Benz S-Class for three, and the Lincoln Continental for three. Choose based on your party size and how much you expect to carry.'),
        ('Is hourly cheaper than booking several separate rides?', 'Often, once you have three or more stops with waiting in between. Tell dispatch what the day looks like and we will honestly recommend hourly or point-to-point, whichever costs you less.'),
    ],
    related=[R['chauffeur'], R['wine'], R['concert'], R['p2p']],
    cta_h2='Reserve the car, then decide the rest as you go.',
    cta_p='Choose hourly on the booking form and see your quote in about a minute, or call (612) 999-5382 and dispatch will plan it with you.',
    cta1='Book Hourly',
    book_qs='?service=hourly',
),

# ---------------------------------------------------------------- 6. Private Chauffeur Service
dict(
    file=R['chauffeur'][0],
    title='Private Chauffeur Service in Minneapolis | Total Town Car Service',
    title_short='Private Chauffeur Service',
    meta='A private chauffeur and vehicle for the full day in Minneapolis and Saint Paul. As-directed driving for executives, families and tours, from $75 per hour.',
    keywords='private chauffeur Minneapolis, personal driver Twin Cities, chauffeur for the day, executive chauffeur Minneapolis, private driver service Saint Paul',
    service_type='Private chauffeur service',
    eyebrow='Full Day · As Directed · One Professional',
    h1='Private <span class="gold-text">Chauffeur</span> Service',
    lede='One chauffeur and one vehicle assigned to you for the day. They learn your schedule in the morning and handle everything about getting around from there.',
    image='images/site/svc-private-chauffeur.webp',
    image_alt='Family of four stepping onto the sidewalk from a black Lincoln Continental on Summit Avenue in Saint Paul while a chauffeur holds the door',
    image_caption='Executives · Families · Visitors',
    image_prompt=('a brand-new 2026 black Lincoln Continental sedan (horizontal chrome mesh grille, full-width LED taillights, dark limousine-tinted windows) parallel-parked at the curb on Summit Avenue in Saint Paul, Victorian mansions and mature elms lining the boulevard, a mother, father, and two school-age children stepping from the front-hinged rear door onto the sidewalk in three-quarter view, all faces visible and smiling, a chauffeur holding the door and facing the camera, soft late-spring morning light, lilacs blooming. ' + END),
    intro_eyebrow='What A Private Chauffeur Does',
    intro_h2='More than a series of rides',
    intro=[
        'A private chauffeur is not a driver you summon four times in a day. It is one professional who picks you up in the morning, understands the shape '
        'of your schedule, and stays with you until the last stop. Between appointments the car is outside, cool in July and warm in January, with your '
        'bags and coats already in it. When a meeting runs long the chauffeur waits. When it ends early the chauffeur is there. Nothing has to be requested, '
        'tracked, or matched. The day simply moves.',
        'Executives use it for site visits, board days, and back-to-back client meetings across Minneapolis, Saint Paul, and the suburbs, with a quiet back seat '
        'for calls in between. Families flying in for a graduation or a reunion use it to see the city without a rental counter, a parking ramp, or an '
        'unfamiliar highway. Visitors use it for a proper tour: the Chain of Lakes, the Stone Arch Bridge, Summit Avenue, the Cathedral, and dinner somewhere '
        'you would not find on your own. Wedding weekends, medical days, and campus visits all fit the same pattern.',
        'The service is booked as-directed with a three-hour minimum, and most full days run six to ten hours. The rate is $75, $90 or $110 per hour depending on the '
        'vehicle you select, and it covers all stops and waiting within the Twin Cities. Longer excursions, including a day in Stillwater or a run to Rochester, '
        'can be arranged with dispatch. Regular clients often request the same chauffeur, and we do our best to make that happen.'
    ],
    bullets_eyebrow='The Difference',
    bullets_h2='Why one chauffeur for the day beats four separate rides',
    bullets=[
        ('Continuity', 'The same professional all day means your preferences, your bags, and your schedule are already known at every stop. No re-explaining, no re-loading.'),
        ('Local knowledge', 'Our chauffeurs have driven the Twin Cities for years. They know which ramp to avoid, which entrance to use, and how long a crosstown run really takes.'),
        ('Discretion', 'Conversations stay in the car. Executives and public figures rely on us for that, and it is simply how our chauffeurs are trained.'),
        ('A quiet workspace', 'The back seat of an S-Class or Escalade is a good place to take a call or prepare for the next meeting. Chargers and water are on board.'),
        ('Room for everyone', 'The Escalade carries six passengers with six bags, ideal for a visiting family. The S-Class and Continental carry three in more intimate comfort.'),
        ('One clear rate', '$75 per hour for the Sedan, $90 for the Executive Sedan and $110 for the SUV, times the hours you choose, covering every stop and every minute of waiting inside the Twin Cities. No meter, no surprises.'),
    ],
    faq=[
        ('How is a private chauffeur different from hourly car service?', 'They use the same as-directed structure and the same three-hour minimum. Private chauffeur service is simply the full-day version, where a single professional plans around your whole schedule rather than a short block. Both are quoted at booking.'),
        ('Can I request the same chauffeur each time?', 'Yes. Regular clients often ask for a particular chauffeur, and dispatch will schedule them whenever availability allows. Tell us your preference when you book and we will note it on your account.'),
        ('Is this a good option for a family visiting Minneapolis?', 'It is one of the best. A chauffeur handles the driving, the parking, and the navigation while you focus on the visit. The Escalade seats six with luggage, and child car seats are available for $25 each, up to four.'),
        ('Will the chauffeur suggest places to see?', 'Happily, if you ask. Our chauffeurs know the lakes, the riverfront, Summit Avenue, the Cathedral, the sculpture garden, and the neighborhoods where locals actually eat. Give them a sense of what you enjoy and they will fill the gaps.'),
        ('How much does a private chauffeur cost for a day?', 'The rate is $75 per hour in the Sedan, $90 in the Executive Sedan and $110 in the SUV, times the number of hours, with a three-hour minimum. It includes all stops and waiting within the Twin Cities. Full days typically run six to ten hours, with a three-hour minimum.'),
        ('Can the day include a trip outside the Twin Cities?', 'Yes. Stillwater, Rochester and Mayo Clinic, Saint Cloud, and Duluth are all regular destinations. Tell dispatch the plan and we will quote it as an hourly day or a flat fare, whichever suits the itinerary.'),
    ],
    related=[R['hourly'], R['corp'], R['chmpls'], R['wine']],
    cta_h2='One professional, one car, the whole day.',
    cta_p='Reserve a private chauffeur online in about a minute, or call (612) 999-5382 and dispatch will plan the day with you.',
    book_qs='?service=hourly',
),

]
