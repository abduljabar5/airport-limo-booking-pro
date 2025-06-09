
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "Exceptional service! My chauffeur was punctual, professional, and the vehicle was immaculate. Will definitely use again for all my airport transfers.",
      rating: 5,
      location: "Minneapolis, MN"
    },
    {
      name: "Michael Chen",
      text: "Used Minneapolis Limo for a corporate event. The entire team was professional and helped make our client dinner a success. Highly recommended!",
      rating: 5,
      location: "St. Paul, MN"
    },
    {
      name: "Jennifer Williams",
      text: "Perfect for our wedding day! The stretch limo was beautiful and our driver made sure everything went smoothly. Thank you for making our day special!",
      rating: 5,
      location: "Bloomington, MN"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-amber-400" : "text-slate-300"}>
        ★
      </span>
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-slate-600">
              Don't just take our word for it
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-slate-700 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t border-slate-200 pt-4">
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
