
const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Book Your Ride",
      description: "Call us or use our online booking form to schedule your transportation"
    },
    {
      number: "2", 
      title: "Get Confirmation",
      description: "Receive instant confirmation with your chauffeur details and vehicle info"
    },
    {
      number: "3",
      title: "Get Picked Up",
      description: "Your professional chauffeur arrives on time at your specified location"
    },
    {
      number: "4",
      title: "Arrive On Time",
      description: "Sit back and relax while we get you to your destination safely and promptly"
    }
  ];

  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-300">
              Simple, straightforward process for luxury transportation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-white">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-slate-700 -translate-y-0.5"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-amber-400">
                  {step.title}
                </h3>
                <p className="text-slate-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
