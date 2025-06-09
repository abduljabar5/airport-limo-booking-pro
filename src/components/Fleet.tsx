
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Fleet = () => {
  const vehicles = [
    {
      name: "Executive Sedan",
      description: "Perfect for airport transfers and business trips",
      capacity: "1-3 passengers",
      features: ["Leather seating", "Climate control", "WiFi available", "Phone chargers"],
      image: "🚗"
    },
    {
      name: "Luxury SUV", 
      description: "Spacious and comfortable for families or small groups",
      capacity: "1-6 passengers",
      features: ["Extra luggage space", "Premium sound system", "Tinted windows", "All-weather capable"],
      image: "🚙"
    },
    {
      name: "Sprinter Van",
      description: "Ideal for group transportation and corporate events",
      capacity: "1-14 passengers", 
      features: ["Group seating", "Entertainment system", "Large luggage area", "Professional driver"],
      image: "🚐"
    },
    {
      name: "Stretch Limousine",
      description: "Ultimate luxury for special occasions and events",
      capacity: "1-8 passengers",
      features: ["Bar service", "Entertainment system", "Mood lighting", "Red carpet service"],
      image: "🚖"
    }
  ];

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="fleet" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Premium Fleet
            </h2>
            <p className="text-lg text-slate-600">
              Choose from our selection of luxury vehicles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vehicles.map((vehicle, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{vehicle.image}</div>
                  <CardTitle className="text-xl text-slate-900">{vehicle.name}</CardTitle>
                  <p className="text-slate-600">{vehicle.description}</p>
                  <div className="text-amber-600 font-semibold">{vehicle.capacity}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {vehicle.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={scrollToBooking}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                  >
                    Book This Vehicle
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fleet;
