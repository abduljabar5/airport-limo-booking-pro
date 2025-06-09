
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      title: "Airport Transfers",
      description: "Reliable transportation to and from MSP Airport with flight tracking",
      features: ["Flight monitoring", "Meet & greet service", "Free waiting time", "Fixed rates"]
    },
    {
      title: "Point-to-Point",
      description: "Direct transportation between any two locations in the Twin Cities",
      features: ["Door-to-door service", "Professional chauffeurs", "Luxury vehicles", "Competitive pricing"]
    },
    {
      title: "Hourly Charters",
      description: "Flexible hourly service for business meetings, shopping, or events",
      features: ["Minimum 2 hours", "Wait time included", "Multiple stops", "Professional discretion"]
    },
    {
      title: "Corporate & Events",
      description: "Group transportation for business events, weddings, and special occasions",
      features: ["Group discounts", "Event coordination", "Multiple vehicles", "Custom packages"]
    }
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-slate-600">
              Professional transportation solutions for every need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">{service.title}</CardTitle>
                  <p className="text-slate-600">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
