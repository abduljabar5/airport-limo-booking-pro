
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickup: '',
    destination: '',
    date: '',
    time: '',
    vehicleType: ''
  });
  const [quoteData, setQuoteData] = useState<{distance: number, cost: number} | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple calculation logic
    const baseDistance = Math.floor(Math.random() * 25) + 5; // 5-30 miles
    const baseCost = baseDistance * 3.5; // $3.50 per mile base
    
    const vehicleMultipliers = {
      sedan: 1.0,
      suv: 1.3,
      limo: 2.2,
      sprinter: 1.8
    };
    
    const multiplier = vehicleMultipliers[formData.vehicleType as keyof typeof vehicleMultipliers] || 1.0;
    const finalCost = Math.round(baseCost * multiplier);
    
    setQuoteData({ distance: baseDistance, cost: finalCost });
  };

  const handleBookNow = () => {
    navigate('/detailed-booking', { state: { formData, quoteData } });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Hero Text */}
          <div className="text-center lg:text-left">
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
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
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

          {/* Booking Form */}
          <div className="bg-white/10 backdrop-blur-sm border border-gold/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gold mb-6 text-center">Quick Booking</h3>
            <form onSubmit={calculateQuote} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Pick-up location"
                  value={formData.pickup}
                  onChange={(e) => handleInputChange('pickup', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
                  required
                />
                <input
                  type="text"
                  placeholder="Destination"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-gold"
                  required
                />
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-gold"
                  required
                />
              </div>

              <select 
                value={formData.vehicleType}
                onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-gold"
                required
              >
                <option value="" className="text-black">Select Vehicle Type</option>
                <option value="sedan" className="text-black">Luxury Sedan (1-3 passengers)</option>
                <option value="suv" className="text-black">Premium SUV (1-6 passengers)</option>
                <option value="limo" className="text-black">Stretch Limousine (1-8 passengers)</option>
                <option value="sprinter" className="text-black">Executive Van (1-14 passengers)</option>
              </select>

              {quoteData && (
                <div className="bg-gold/20 border border-gold/50 rounded-lg p-4 text-center">
                  <div className="text-white text-lg font-semibold mb-2">
                    Distance: {quoteData.distance} miles
                  </div>
                  <div className="text-gold text-2xl font-bold">
                    Cost: ${quoteData.cost}
                  </div>
                </div>
              )}

              {!quoteData ? (
                <Button 
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-600 text-black font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  Get Instant Quote
                </Button>
              ) : (
                <Button 
                  type="button"
                  onClick={handleBookNow}
                  className="w-full bg-gold hover:bg-gold-600 text-black font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  Book Now
                </Button>
              )}
            </form>
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
