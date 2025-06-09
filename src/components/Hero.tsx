
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.05)_1px,_transparent_0)] bg-[size:32px_32px]"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
            Minneapolis Airport
            <br />
            <span className="text-amber-400">Limo Service</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Fast, Reliable, Luxurious transportation to and from MSP Airport. 
            Professional chauffeurs, premium fleet, unbeatable service.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="tel:+16125551234">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 transition-all duration-300 flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Call Now: (612) 555-1234</span>
              </Button>
            </a>
            
            <Button 
              size="lg" 
              onClick={scrollToBooking}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Book Online Now
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-300">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">15+</div>
              <div className="text-sm">Years Experience</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">24/7</div>
              <div className="text-sm">Available Service</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">100%</div>
              <div className="text-sm">Licensed & Insured</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Animation */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;
