"""Page-specific FAQ bank for Total Town Car Service.

FAQS maps an output file name to a list of (question, answer) tuples.
Answers are plain text, self-contained and front-loaded so they read well
in search snippets and answer engines. No HTML inside answers.
"""

FAQS = {
    "index.html": [
        (
            "How much does a car service cost in Minneapolis with Total Town Car?",
            "Total Town Car Service fares start at $49 in a Lincoln Continental sedan, $59 in a Mercedes-Benz S-Class executive sedan and $69 in a Cadillac Escalade SUV. Every fare is a flat rate quoted before you confirm, so there is no surge pricing. MSP Airport pickups add a $15 airport fee, and rides between 7 PM and 6 AM carry a $20 night surcharge.",
        ),
        (
            "How do I book a ride with Total Town Car Service?",
            "Book online at totaltowncar.com in about two minutes: enter pickup and drop-off addresses, choose a date and time, pick a vehicle and confirm. The flat fare is shown before you pay. Online bookings need at least 2 hours notice. For sooner pickups, call (612) 999-5382 and dispatch, which is staffed 24/7, will arrange the ride by phone.",
        ),
        (
            "Can I cancel a car service booking for free?",
            "Yes. Cancel up to 24 hours before your scheduled pickup and there is no charge. Cancellations inside 24 hours may be billed because a chauffeur and vehicle have already been reserved for you. To cancel or change a ride, call (612) 999-5382 or reply to your confirmation text or email, any time of day or night.",
        ),
        (
            "Does Total Town Car track my flight if it is delayed?",
            "Yes. Every airport pickup is matched to your flight number and tracked in real time, so your chauffeur adjusts to early arrivals and delays automatically. Complimentary wait time is 30 minutes after a domestic arrival and 60 minutes after an international arrival at MSP, which covers customs, baggage claim and the walk to the curb.",
        ),
        (
            "What is the meet and greet option at MSP Airport?",
            "Meet and greet costs $15 and means your chauffeur waits inside the terminal at baggage claim holding a sign with your name, then helps with bags and walks you to the car. It is popular with first-time visitors, older travelers, children flying alone and executives. Without it, your chauffeur meets you curbside at a pre-arranged door.",
        ),
        (
            "Can I add a child car seat or extra stops to my ride?",
            "Yes. Child car seats are $25 each, up to four per vehicle, and you can choose infant, convertible or booster when booking. Extra stops along the route are $15 each, useful for picking up a second passenger or a quick errand. Add both on the booking form or ask dispatch at (612) 999-5382.",
        ),
        (
            "Does Total Town Car offer hourly car service?",
            "Yes. Hourly or as-directed service has a 3-hour minimum and is quoted at booking based on the vehicle and date. It suits weddings, corporate roadshows, dinners with several stops and tours around the Twin Cities. The chauffeur stays with you for the entire block, so you never wait on a new car between stops.",
        ),
        (
            "Is there a discount for booking a round trip, and how do I pay?",
            "Yes. Booking your outbound and return rides together saves 10% on the total fare. This applies to airport round trips, Rochester and Mayo Clinic visits, event nights and any other pair of rides. You can pay online by card through Stripe when you book, or pay the chauffeur at the end of the ride.",
        ),
        (
            "Which vehicles does Total Town Car Service have and how many people fit?",
            "Three vehicles are bookable online: a Cadillac Escalade SUV for up to 6 passengers and 6 bags, a Mercedes-Benz S-Class for up to 3 passengers and 3 bags, and a Lincoln Continental sedan for up to 3 passengers and 3 bags. A 14-passenger Sprinter exists but is temporarily unavailable for online booking, so larger groups travel in two or three cars dispatched together.",
        ),
        (
            "Which areas does Total Town Car serve and how early should I book?",
            "Total Town Car serves Minneapolis, Saint Paul, every Twin Cities suburb and MSP Airport, plus long-distance trips to Rochester and Mayo Clinic, Duluth, St. Cloud and Mankato. Online bookings need at least 2 hours notice; call (612) 999-5382 for sooner. For holiday travel, early-morning flights or large events, booking a few days ahead secures your preferred vehicle.",
        ),
    ],

    "book-a-ride.html": [
        (
            "What happens after I book a ride online?",
            "You receive a confirmation by text and email within minutes showing your pickup time, addresses, vehicle and flat fare. The evening before, or a few hours before a same-day ride, you get a reminder. When your chauffeur is on the way, a text shares their name and vehicle, and another arrives when they are at your door.",
        ),
        (
            "When am I charged for a car service booking?",
            "If you choose to pay online, your card is charged through Stripe when you confirm the booking, for the flat fare shown on the form. If you choose to pay the driver, nothing is charged in advance and you settle by card or cash at the end of the ride. Either way the price does not change unless you change the trip.",
        ),
        (
            "Can I change or cancel my ride after booking?",
            "Yes. Changes and cancellations are free up to 24 hours before pickup. Call (612) 999-5382 or reply to your confirmation message with the new time, address or vehicle, and dispatch updates the reservation and sends a fresh confirmation. Inside 24 hours, call as early as possible; a fee may apply because a chauffeur has already been assigned.",
        ),
        (
            "Will I get a text message from my driver?",
            "Yes, if you opt in to SMS on the booking form. You will receive a booking confirmation, a reminder before pickup, a message with your chauffeur's name and vehicle when they depart, and an arrival text. Standard message rates apply, and you can reply STOP at any time to end texts without affecting your ride.",
        ),
        (
            "What if my flight lands late or early?",
            "Enter your flight number on the booking form and your pickup time follows the flight automatically. Your chauffeur tracks the arrival in real time and is at MSP when you land, whether the flight is early or delayed. Complimentary wait time runs 30 minutes after domestic arrivals and 60 minutes after international arrivals, so normal deplaning and baggage time costs nothing.",
        ),
        (
            "How is the fare calculated on the booking form?",
            "Fares are flat rates based on the distance between your pickup and drop-off addresses and the vehicle you choose. The Lincoln Continental starts at $49, the Mercedes-Benz S-Class at $59 and the Cadillac Escalade at $69. Add-ons show as line items: meet and greet $15, child seats $25 each, extra stops $15 each, a $15 MSP pickup fee and a $20 surcharge between 7 PM and 6 AM.",
        ),
        (
            "Is the price shown on the booking form the final price?",
            "Yes. The fare you see before you confirm is the fare you pay, including any add-ons you selected. There is no surge pricing, no running meter and no charge for traffic or weather delays. The total changes only if you change the trip, for example by adding a stop, switching vehicles or waiting beyond the complimentary window.",
        ),
        (
            "Can I book a ride for someone else?",
            "Yes. Enter the passenger's name and mobile number on the form so the chauffeur can reach them, and add your own contact details as the booker. You can pay online with your card while the passenger receives the pickup texts. Many clients book this way for parents, visiting colleagues, patients traveling to Mayo Clinic and teens heading to prom.",
        ),
    ],

    "about.html": [
        (
            "How long has Total Town Car Service been in business?",
            "Total Town Car Service has operated in Minneapolis since 1991, more than three decades of chauffeured rides across the Twin Cities. In that time the company has completed more than 10,000 rides, from daily MSP Airport transfers to weddings and Mayo Clinic trips, and holds a 5.0 star rating on Google from verified riders.",
        ),
        (
            "Is Total Town Car Service licensed and insured?",
            "Yes. Total Town Car Service is a licensed Minnesota chauffeured transportation company with commercial livery insurance covering every passenger on every ride. Vehicles are inspected and maintained on a regular schedule, and chauffeurs are background-checked and hold the required licensing. Proof of insurance is available on request for corporate accounts and event venues.",
        ),
        (
            "Who are the chauffeurs at Total Town Car Service?",
            "Chauffeurs are experienced professionals who know the Twin Cities, MSP Airport and the routes to Rochester, Duluth and St. Cloud. Each one is background-checked, trained in customer service and dressed in professional attire. Many have been with the company for years, and regular clients often request the same chauffeur by name.",
        ),
        (
            "What vehicles are in the Total Town Car fleet?",
            "The fleet includes a Cadillac Escalade SUV seating up to 6 passengers with 6 bags, a Mercedes-Benz S-Class executive sedan for up to 3 passengers, and a Lincoln Continental sedan for up to 3 passengers. All are late-model, black, detailed before every ride and stocked with bottled water and phone chargers. A 14-passenger Sprinter is temporarily unavailable for online booking.",
        ),
        (
            "What is Total Town Car Service rated on Google?",
            "Total Town Car Service holds a 5.0 star rating on Google. Reviews most often mention on-time pickups at MSP, chauffeurs who help with luggage, clean vehicles and fares that matched the quote. The company reads every review and follows up personally on any ride that fell short of that standard.",
        ),
        (
            "How is Total Town Car different from rideshare apps?",
            "Every ride is pre-arranged with a professional chauffeur, a flat fare quoted in advance and a specific late-model vehicle, rather than whichever driver happens to be closest. There is no surge pricing, flights are tracked, wait time is included at the airport and dispatch answers the phone 24/7. Rides can be booked weeks ahead and billed to a corporate account.",
        ),
    ],

    "airport-service.html": [
        (
            "What is the difference between Terminal 1 and Terminal 2 at MSP?",
            "Terminal 1 Lindbergh is the larger terminal and serves Delta, American, United, Alaska and most international flights. Terminal 2 Humphrey serves Sun Country, Southwest, Frontier, JetBlue and Icelandair. The terminals are about 2 miles apart and not walkable, so give us your airline or flight number and your chauffeur goes to the correct terminal.",
        ),
        (
            "Where do I meet my chauffeur at MSP Airport?",
            "At Terminal 1, your chauffeur meets you curbside at a pre-arranged door on the arrivals level after you collect your bags. At Terminal 2, pickups are curbside outside baggage claim. Your chauffeur texts the exact door and a vehicle description. With the $15 meet and greet, they wait at baggage claim holding a name sign instead.",
        ),
        (
            "How long will my chauffeur wait at the airport?",
            "Complimentary wait time is 30 minutes after a domestic flight lands and 60 minutes after an international flight lands, measured from the actual arrival time rather than the scheduled one. That covers deplaning, customs and baggage claim for nearly every traveler. If a bag is lost or you are held up longer, call (612) 999-5382 and the chauffeur will stay.",
        ),
        (
            "Do you track flights for airport pickups?",
            "Yes. When you enter your flight number, dispatch monitors it in real time from departure to landing. Your chauffeur is scheduled off the actual arrival time, so an early landing or a two-hour delay does not leave you waiting or paying for idle time. Tracking is automatic on every MSP pickup and costs nothing extra.",
        ),
        (
            "How much is a car service from MSP to downtown Minneapolis?",
            "MSP to downtown Minneapolis starts at $49 in a Lincoln Continental sedan, $59 in a Mercedes-Benz S-Class and $69 in a Cadillac Escalade SUV, with a $15 airport pickup fee added. Mall of America and Bloomington hotels are a short ride at similar rates, and suburbs like Edina, Eden Prairie, Maple Grove and Woodbury are quoted flat by distance before you confirm.",
        ),
        (
            "Can I book an early morning ride to the airport?",
            "Yes. Dispatch runs 24/7 and 4 AM and 5 AM pickups are routine. Rides between 7 PM and 6 AM carry a $20 night surcharge, shown before you confirm. Your chauffeur arrives a few minutes early and texts on arrival, so you can sleep until the last reasonable minute. Book the night before at the latest, or at least 2 hours ahead online.",
        ),
        (
            "How much luggage fits in each vehicle?",
            "The Cadillac Escalade holds up to 6 bags with 6 passengers, and the Mercedes-Benz S-Class and Lincoln Continental each hold 3 bags with 3 passengers. Standard checked suitcases and carry-ons are counted. For skis, golf clubs, large strollers or more than 3 bags with 2 or 3 passengers, choose the Escalade so everything rides in the vehicle with you.",
        ),
        (
            "How early should my pickup be for a departing flight from MSP?",
            "Plan to arrive at MSP 2 hours before a domestic departure and 3 hours before an international one, then add drive time. From downtown Minneapolis or Saint Paul allow about 25 minutes, from Maple Grove or Woodbury about 35 minutes, and more in winter or rush hour. Enter your flight time when booking and dispatch will suggest a pickup time.",
        ),
    ],

    "corporate-transportation.html": [
        (
            "Can my company set up a corporate account with Total Town Car?",
            "Yes. A corporate account gives your company a single point of contact, monthly consolidated invoicing, agreed rates and a preferred chauffeur roster. Executive assistants and travel managers can book by phone, email or online under the account without entering payment for each ride. Setup takes one short call to (612) 999-5382 and there is no minimum monthly volume.",
        ),
        (
            "How does invoicing work for business travel?",
            "Corporate accounts receive one itemized invoice each month listing every ride by date, passenger, route, vehicle and cost center or reference code, payable by ACH or card. Individual travelers who pay as they go receive an emailed receipt after each ride with the fare, gratuity and any add-ons broken out for expense reports.",
        ),
        (
            "Can you handle recurring bookings, like a weekly airport run?",
            "Yes. Standing reservations for weekly commuter flights, monthly board meetings or a daily executive commute are set up once and confirmed automatically. Dispatch assigns the same chauffeur whenever possible so the routine is familiar. Change any single date with a call or email, and the rest of the schedule stays in place.",
        ),
        (
            "What do you offer for visiting executives and clients?",
            "Visiting executives are met at MSP with the $15 meet and greet, a name sign and help with luggage, then driven in a Mercedes-Benz S-Class or Cadillac Escalade with water and chargers on board. You can also hold the chauffeur hourly for the day, with a 3-hour minimum, so the car is waiting outside every meeting and dinner.",
        ),
        (
            "Do you provide roadshow and multi-stop transportation?",
            "Yes. Investor roadshows, site visits and client days are booked as hourly or as-directed service with a 3-hour minimum, quoted at booking. Send the itinerary and the chauffeur handles routing across Minneapolis, Saint Paul and the suburbs, waits at each stop and adjusts when meetings run long. Hotel, airport and dinner transfers can all be folded in.",
        ),
        (
            "Is our travel kept confidential?",
            "Yes. Chauffeurs follow a strict discretion policy: no discussion of passengers, destinations or conversations overheard in the vehicle, and no photographs. Itineraries are shared only with the assigned chauffeur and dispatch. Non-disclosure agreements can be signed for account clients, and vehicles have tinted rear windows for privacy during calls.",
        ),
        (
            "Can you move a larger group, like a visiting team or board?",
            "Yes. Groups over 6 travel in two or three vehicles dispatched together with one point of contact, so everyone leaves and arrives at the same time. A 14-passenger Sprinter exists but is temporarily unavailable for online booking; ask dispatch about availability for your date. Multi-vehicle bookings are quoted as one package on one invoice.",
        ),
    ],

    "downtown-minneapolis.html": [
        (
            "Can you drop me off at US Bank Stadium for a Vikings game?",
            "Yes. Chauffeurs drop at the livery zone closest to your gate at US Bank Stadium, on the side dispatch confirms based on event-day street closures, and pick up at an agreed corner afterward. Book the return with a set time or text the chauffeur when you leave your seats. Round trips save 10%, and there is no surge on game days.",
        ),
        (
            "Do you serve Target Field and Target Center?",
            "Yes. Target Field for Twins games and Target Center for Timberwolves, Lynx and concerts are both in the Warehouse District, a few blocks apart. Chauffeurs drop close to the gates before the event and meet you afterward at a pre-arranged corner a block or two out, away from the heaviest crowd, with the exact spot sent by text.",
        ),
        (
            "Can I book a car to the Guthrie, Orpheum or Orchestra Hall?",
            "Yes. Theater and concert rides to the Guthrie on the riverfront, the Orpheum and State on Hennepin Avenue and Orchestra Hall on Nicollet Mall are common. Book a point-to-point ride each way, or hold the chauffeur hourly, 3-hour minimum, to include dinner before the show. Pickup is curbside at the theater doors when the curtain falls.",
        ),
        (
            "Which downtown Minneapolis hotels do you pick up from?",
            "All of them. Regular pickups include the Four Seasons, Hotel Ivy, the Loews, the Marquette, the Hyatt Regency, the Hilton, the Westin and the Hewing in the North Loop. Tell us the hotel and your chauffeur meets you at the main entrance or valet stand, texts on arrival and loads your bags. Hotel to MSP transfers start at $49.",
        ),
        (
            "Can the chauffeur find me if I am in the skyway?",
            "Yes. The skyway connects most downtown towers, so tell us which building you will exit and the chauffeur meets you at that street-level entrance, for example the IDS Center on Nicollet Mall or the Wells Fargo Center. Your chauffeur texts the exact door so you stay indoors until the car is at the curb, which matters in January.",
        ),
        (
            "Do your prices go up on event nights downtown?",
            "No. Fares are flat rates quoted before you confirm, so a ride after a Vikings game, a sold-out concert or New Year's Eve costs the same as any other night, apart from the standard $20 surcharge between 7 PM and 6 AM. Booking ahead for major events is recommended because vehicles are assigned in order of reservation.",
        ),
        (
            "Is a car service cheaper than parking downtown?",
            "Often, yes. Event parking near US Bank Stadium and Target Field can run $30 to $60, and overnight valet at downtown Minneapolis hotels is frequently $40 or more. A chauffeured ride from most of the metro starts at $49 each way, and a round trip saves 10%, with no walk from a ramp and no driving after drinks.",
        ),
    ],

    "rochester-mayo-clinic.html": [
        (
            "How much is a car service from Minneapolis to Mayo Clinic in Rochester?",
            "Minneapolis or MSP Airport to Mayo Clinic in Rochester is a flat fare quoted before you confirm, based on the vehicle you choose, and it does not change with traffic or weather. The trip is about 85 miles and roughly 90 minutes each way. Book the return with the outbound and the round trip saves 10%.",
        ),
        (
            "How long does it take to get from MSP to Mayo Clinic?",
            "About 90 minutes door to door in normal conditions, covering roughly 85 miles down Highway 52 through Cannon Falls and Zumbrota to downtown Rochester. Winter weather or rush-hour traffic leaving the Twin Cities can add 20 to 30 minutes, so dispatch schedules pickups with a buffer when you share your appointment time.",
        ),
        (
            "Will I make my Mayo Clinic appointment on time?",
            "Yes. Tell us your appointment time and building, and dispatch sets the pickup so you arrive with at least 30 minutes to spare, including a weather buffer in winter. Chauffeurs know the Gonda Building, Mayo Building and Charlton Building entrances, Saint Marys Hospital and the Methodist campus, and drop you at the right door rather than a distant lot.",
        ),
        (
            "Can the chauffeur wait during my appointment?",
            "Yes. For a single visit, book hourly or as-directed service with a 3-hour minimum, quoted at booking, and the chauffeur stays in Rochester and returns you the same day. For visits of several hours or multiple days, a round trip with separate pickup times is usually more economical, and the return can be adjusted by phone if the clinic runs late.",
        ),
        (
            "Do you offer round trips to Rochester?",
            "Yes, and round trips save 10% on the total fare. Book both legs together with your appointment dates, and the return chauffeur is scheduled for your Rochester pickup time. Many patients book the outbound from home or MSP and the return from the Kahler Grand, the Hilton or the DoubleTree after a multi-day stay.",
        ),
        (
            "Can you accommodate passengers with mobility needs?",
            "Yes. Chauffeurs help with walkers, folding wheelchairs and oxygen equipment, which travel in the trunk or cargo area, and assist at both doors. The Lincoln Continental and Mercedes-Benz S-Class have low seats that are easy to step into, while the Cadillac Escalade offers more room for equipment and a companion. Tell dispatch what you need when booking.",
        ),
        (
            "Where do you drop off at Mayo Clinic in downtown Rochester?",
            "At the entrance you name. Most patients use the Gonda Building on 2nd Street SW, which connects to the Mayo Building and the subway level, or the Charlton Building. Hotel drop-offs at the Kahler Grand, the Marriott and the Hilton are within two blocks of the clinic and linked by skyway and subway, so you can move between them indoors.",
        ),
        (
            "Is the drive to Rochester safe in winter?",
            "Yes. Chauffeurs drive the Highway 52 corridor year-round in vehicles equipped for Minnesota winters, and dispatch checks MnDOT road conditions before every trip. Pickups are moved earlier when snow is forecast, and the fare stays flat regardless of how long the drive takes. If conditions close the highway, you are notified early and rebooked at no charge.",
        ),
    ],

    "wedding-transportation.html": [
        (
            "Do you provide a getaway car for the couple?",
            "Yes. The most requested getaway car is the black Cadillac Escalade, with the Mercedes-Benz S-Class a close second for couples who want a sedan. Book point to point from the venue to your hotel, or hourly with a 3-hour minimum to include a stop for photos. The chauffeur waits at the exit with the door open at your send-off time.",
        ),
        (
            "Can you shuttle wedding guests between the hotel and the venue?",
            "Yes. Guests are moved in multiple vehicles running a loop between the hotel block and the ceremony or reception, coordinated by one dispatcher. Each Escalade carries 6 guests and each sedan carries 3, so a party of 24 is typically 4 Escalades on rotation. A 14-passenger Sprinter exists but is temporarily unavailable for online booking; ask dispatch about your date.",
        ),
        (
            "How far in advance should we book wedding transportation?",
            "Book 2 to 3 months ahead for a Saturday between May and October, when weekend vehicles are reserved first. Winter and weekday weddings can usually be arranged with a few weeks notice. Once booked, the day-of timeline can be adjusted up until the final week without changing the quote, as long as the total hours stay the same.",
        ),
        (
            "Can we decorate the car?",
            "Yes, within reason. Ribbons, magnetic signs, window markers and flowers inside the vehicle are welcome, and the chauffeur can help place them before the send-off. Please avoid tape on paint, anything tied to the exhaust and confetti or glitter inside. Tell us your plans when booking so the chauffeur arrives with time to set up.",
        ),
        (
            "How does hourly wedding service work?",
            "Hourly service has a 3-hour minimum and is quoted at booking based on the vehicle and date. The chauffeur and car stay with the wedding party for the whole block, so you can go from getting ready to the ceremony, then photos at the Stone Arch Bridge or Minnehaha Falls, then the reception without booking separate rides.",
        ),
        (
            "What is the deposit and cancellation policy for weddings?",
            "Wedding bookings are confirmed like any other ride: pay online when you book, or pay the chauffeur on the day. Cancellation is free up to 24 hours before the first pickup. Because wedding dates are reserved months out, we ask for as much notice as possible on changes so vehicles and chauffeurs can be reassigned.",
        ),
        (
            "Can the chauffeur stop for wedding photos?",
            "Yes. Hourly bookings include stops anywhere you like, and popular Twin Cities photo spots include the Stone Arch Bridge, Mill Ruins Park, the Minneapolis Sculpture Garden, Lake Harriet and Summit Avenue in Saint Paul. The black Escalade and S-Class photograph well, and the chauffeur can position the car and hold doors while your photographer works.",
        ),
    ],

    "prom-homecoming.html": [
        (
            "Can a parent book prom transportation for their teen?",
            "Yes, and most prom rides are booked by a parent. Enter yourself as the booker and your teen as the passenger, so you receive the confirmation and receipt while the chauffeur can text the student at pickup. You will know the chauffeur's name and the vehicle in advance, and dispatch is reachable at (612) 999-5382 all night.",
        ),
        (
            "What is your safety and alcohol policy for prom and homecoming?",
            "No alcohol, vaping or smoking is permitted in any vehicle, and the chauffeur will not make stops to purchase any. Chauffeurs are background-checked professionals, the route is fixed to the addresses the parent provides, and any change requires a call from the booking parent. A violation ends the ride, and the parent is contacted immediately.",
        ),
        (
            "How many students fit in one vehicle?",
            "The Cadillac Escalade seats up to 6 students and is the usual prom choice; the Mercedes-Benz S-Class or Lincoln Continental seats 3. A group of 12 rides in two Escalades leaving together. A 14-passenger Sprinter exists but is temporarily unavailable for online booking, so larger groups are coordinated across two or three vehicles with one dispatcher.",
        ),
        (
            "How is prom transportation priced?",
            "Prom night is usually booked as hourly service with a 3-hour minimum, quoted at booking based on the vehicle and date. The chauffeur stays with the group for the entire block, covering home pickups, photos, the venue and the return. One-way point-to-point rides are also available from $49 if you only need a drop-off or a pickup.",
        ),
        (
            "Can the chauffeur pick up several students at different homes?",
            "Yes. Give dispatch the list of home addresses and the order, and the chauffeur collects everyone before heading to photos or the venue. On hourly bookings the stops are included. On a point-to-point booking each additional home is a $15 extra stop. Parents at each house get a moment for photos with the car.",
        ),
        (
            "Does the chauffeur wait during the dance?",
            "Yes. On an hourly booking the chauffeur stays nearby for the whole event and is at the venue door when the students come out. For a dance that runs longer than the 3-hour minimum, book the full block you need so the return is covered. Alternatively, book two point-to-point rides with a set return time.",
        ),
        (
            "Can parents set a curfew or pickup time?",
            "Yes. The booking parent sets the pickup time, the return time and the drop-off addresses, and the chauffeur follows that plan rather than requests from the students. The booking phone receives the confirmation, a reminder before pickup and the chauffeur's arrival text, so the parent knows when the ride starts.",
        ),
    ],

    "concert-events.html": [
        (
            "Do you do rides to Xcel Energy Center in Saint Paul?",
            "Yes. Wild games and concerts at Xcel Energy Center are a core route from Minneapolis and the suburbs. Chauffeurs drop on the Kellogg Boulevard or West 7th Street side and meet you afterward at a pre-arranged spot a block or two out, so you skip the loading-zone crowd. Book the return leg with the outbound to save 10%.",
        ),
        (
            "Can you pick me up after a concert at US Bank Stadium or Target Center?",
            "Yes. Set a pickup time when you book, or text the chauffeur as the encore starts. For US Bank Stadium and Target Center the chauffeur waits at an agreed corner just outside the closure zone, and your text shows the exact spot and vehicle. Reasonable wait time for post-event pickups is built into the booking.",
        ),
        (
            "Do you serve smaller venues like First Avenue or the Fillmore?",
            "Yes. First Avenue and 7th Street Entry, the Fillmore in the North Loop, the Armory, the Varsity in Dinkytown, the Palace Theatre and the Fitzgerald in Saint Paul are all regular pickups. Chauffeurs drop at the entrance and meet you afterward at a spot dispatch confirms, since some of these venues sit on narrow one-way streets.",
        ),
        (
            "Can you take us to the Minnesota State Fair?",
            "Yes. During the fair in late August and early September, chauffeurs drop at the Snelling Avenue or Como Avenue gates and pick up at a set time and gate. It avoids fairground parking lots and park-and-ride buses. Six adults fit in the Escalade; larger parties go in two or three vehicles dispatched together.",
        ),
        (
            "Do you raise prices for big events?",
            "No. Fares are flat rates confirmed before you book, with no surge on concert nights, playoff games or the State Fair. The only additions are the standard ones you see on the form, such as the $20 surcharge between 7 PM and 6 AM. Because vehicles are assigned in reservation order, book early for major dates.",
        ),
        (
            "Should I book hourly or point to point for a concert?",
            "Point to point is best when you want a drop-off and a pickup at set times: two flat fares, and the round trip saves 10%. Hourly, with a 3-hour minimum quoted at booking, is better when you want dinner before, the show and a stop after with the same chauffeur waiting throughout. Dispatch can recommend based on your plan.",
        ),
        (
            "Where exactly will the chauffeur drop us off?",
            "As close to the entrance as the venue allows. Most large venues have a designated livery drop zone, and chauffeurs know them: the plaza side at US Bank Stadium, 1st Avenue at Target Center and Kellogg Boulevard at Xcel Energy Center. Your chauffeur texts the drop point and the after-event meeting spot before you arrive.",
        ),
    ],

    "wine-brewery-tours.html": [
        (
            "Do you offer wine tours to Stillwater and the St. Croix Valley?",
            "Yes. Stillwater and the St. Croix Valley are the most popular tour, about 35 minutes from Minneapolis, with stops like Saint Croix Vineyards, 7 Vines Vineyard in Dellwood, Lift Bridge Brewing and Maple Island Brewing. The chauffeur drives the whole day so everyone tastes. Tours are booked hourly with a 3-hour minimum, quoted at booking.",
        ),
        (
            "How is a wine or brewery tour priced?",
            "Tours are hourly or as-directed service with a 3-hour minimum, quoted at booking based on the vehicle, date and number of hours. The quote covers the chauffeur, the vehicle, fuel and all the driving between stops. Tasting fees, food and gratuity are separate. A typical Stillwater tour runs 4 to 6 hours.",
        ),
        (
            "Can we build our own tour itinerary?",
            "Yes. Send a list of wineries, breweries, distilleries or restaurants and dispatch maps the route and timing, or ask for a suggested plan. Popular combinations include Stillwater wineries plus dinner on Main Street, the Northeast Minneapolis brewery district, or Alexis Bailly Vineyard and Cannon River Winery to the south. You can change the plan mid-day.",
        ),
        (
            "How many stops can we make on a tour?",
            "Most groups fit 3 to 4 stops into a 4 to 5 hour tour, allowing about 45 minutes to an hour per tasting plus drive time. Stops are unlimited on an hourly booking, so the pace is yours. Book 6 hours for a full day with lunch, or the 3-hour minimum for a tight two-stop outing.",
        ),
        (
            "What group size can you take on a tour?",
            "The Cadillac Escalade takes up to 6 guests and is the usual tour vehicle; the Mercedes-Benz S-Class or Lincoln Continental suits a couple or trio. Groups of 7 to 12 ride in two Escalades on one itinerary. A 14-passenger Sprinter exists but is temporarily unavailable for online booking, so ask dispatch about larger parties.",
        ),
        (
            "Does the chauffeur act as our designated driver?",
            "Yes. The chauffeur does not drink, stays with the vehicle at each stop and is ready when you are, so nobody in the group has to skip tastings or drive home. Passengers may bring sealed purchases home in the cargo area. Open containers are not permitted in the vehicle under Minnesota law.",
        ),
        (
            "What is included in a tour booking?",
            "A late-model black vehicle detailed before pickup, a professional chauffeur for the full block, bottled water, phone chargers, door-to-door pickup at your homes or hotel, all driving between stops and the return. Extra stops are included on hourly bookings. Tasting fees and reservations at each winery are arranged by you, or by dispatch on request.",
        ),
    ],

    "service-areas.html": [
        (
            "Which cities does Total Town Car Service cover?",
            "The entire Twin Cities metro: Minneapolis, Saint Paul and every suburb, including Bloomington, Edina, Eden Prairie, Minnetonka, Plymouth, Maple Grove, Blaine, Woodbury, Eagan, Burnsville, Apple Valley, Lakeville, Roseville and Stillwater, plus MSP Airport. Dispatch runs 24/7, and each city has its own page with drive times and starting fares.",
        ),
        (
            "Do you go outside the Twin Cities?",
            "Yes. Long-distance rides to Rochester and Mayo Clinic, about 85 miles, Duluth, about 150 miles, St. Cloud, about 65 miles, and Mankato, about 80 miles, are quoted as flat fares before you confirm. Round trips save 10%, and the chauffeur can wait hourly at the destination, 3-hour minimum, for a same-day return.",
        ),
        (
            "How are fares calculated by distance?",
            "Every fare is a flat rate based on the distance between your addresses and the vehicle you choose, quoted before you confirm. Short rides start at $49 for the Lincoln Continental, $59 for the Mercedes-Benz S-Class and $69 for the Cadillac Escalade, and the price rises in steps with mileage. Traffic and weather never change the quote.",
        ),
        (
            "Is there a minimum fare?",
            "Yes. The minimum fare for any ride is $49 in the Lincoln Continental sedan, $59 in the Mercedes-Benz S-Class and $69 in the Cadillac Escalade, which covers short trips within Minneapolis or from MSP to Bloomington. Hourly bookings have a 3-hour minimum. Airport pickups add $15 and rides between 7 PM and 6 AM add $20.",
        ),
        (
            "Do you drive to Wisconsin or other states?",
            "Yes. Hudson, River Falls and Eau Claire in Wisconsin are frequent destinations, and longer out-of-state trips are arranged for clients who prefer a chauffeur to a regional flight. Out-of-state rides are quoted as flat fares by phone at (612) 999-5382, with the return trip saving 10% when booked together.",
        ),
        (
            "Which suburbs are closest to MSP and how long is the drive?",
            "From Bloomington and Richfield, MSP is about 10 minutes; Edina, Eagan and Saint Paul about 15 to 20 minutes; Minnetonka, Plymouth, Woodbury and Burnsville about 25 minutes; and Maple Grove, Blaine, Lakeville and Stillwater about 35 to 40 minutes. Fares are flat by distance, so the quote is set before you confirm.",
        ),
    ],
}
