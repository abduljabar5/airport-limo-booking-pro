
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Luxury Transportation
            <span className="block luxury-text-gradient">
              Redefined
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            Experience the pinnacle of comfort and style with our premium limousine service. 
            Professional chauffeurs, luxury vehicles, and unforgettable journeys.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/booking">
              <Button 
                size="lg" 
                className="bg-gold hover:bg-gold-600 text-black font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 border-0"
              >
                Book Now
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              className="border-gold text-gold hover:bg-gold hover:text-black px-8 py-4 text-lg rounded-full transition-all duration-300"
            >
              View Fleet
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;
