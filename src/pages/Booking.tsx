
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Booking = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [estimate, setEstimate] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const calculateEstimate = () => {
    if (!pickupLocation || !dropoffLocation || !vehicleType) return;
    
    let basePrice = 45;
    
    const multipliers = {
      sedan: 1.0,
      suv: 1.3,
      sprinter: 1.8,
      limo: 2.2
    };

    const isAirportRoute = 
      pickupLocation.toLowerCase().includes('msp') || 
      pickupLocation.toLowerCase().includes('airport') ||
      dropoffLocation.toLowerCase().includes('msp') || 
      dropoffLocation.toLowerCase().includes('airport');

    if (isAirportRoute) {
      basePrice = 65;
    }

    const multiplier = multipliers[vehicleType as keyof typeof multipliers] || 1.0;
    const finalPrice = Math.round(basePrice * multiplier);
    
    setEstimate(finalPrice);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
          <div className="max-w-md mx-auto text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
            <p className="text-slate-600 mb-4">
              Thank you for your booking. We'll contact you shortly to confirm your ride details.
            </p>
            <p className="text-sm text-slate-500 mb-6">
              Reference: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
            >
              Back to Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left side - Form */}
                <div className="p-8 lg:p-12">
                  <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                      Book a limo ride
                    </h1>
                    <p className="text-slate-600">
                      Fill out the details below to book your luxury ride
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Location Fields */}
                    <div className="space-y-4">
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <Input
                          placeholder="Pickup location"
                          value={pickupLocation}
                          onChange={(e) => {
                            setPickupLocation(e.target.value);
                            calculateEstimate();
                          }}
                          className="pl-10 h-12 bg-slate-50 border-slate-200 rounded-xl"
                          required
                        />
                      </div>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <Input
                          placeholder="Drop-off location"
                          value={dropoffLocation}
                          onChange={(e) => {
                            setDropoffLocation(e.target.value);
                            calculateEstimate();
                          }}
                          className="pl-10 h-12 bg-slate-50 border-slate-200 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full h-12 justify-start text-left font-normal bg-slate-50 border-slate-200 rounded-xl",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-3 h-4 w-4" />
                              {date ? format(date, "PPP") : <span>Date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="pl-10 h-12 bg-slate-50 border-slate-200 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    {/* Vehicle Selection */}
                    <div>
                      <Select value={vehicleType} onValueChange={(value) => {
                        setVehicleType(value);
                        calculateEstimate();
                      }}>
                        <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl">
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedan">Sedan (1-3 passengers)</SelectItem>
                          <SelectItem value="suv">SUV (1-6 passengers)</SelectItem>
                          <SelectItem value="sprinter">Sprinter Van (1-14 passengers)</SelectItem>
                          <SelectItem value="limo">Stretch Limo (1-8 passengers)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <Input
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                        required
                      />
                      <Input
                        type="tel"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                        required
                      />
                    </div>

                    {/* Optional Fields */}
                    <div className="space-y-4">
                      <Input
                        placeholder="Flight number (optional)"
                        value={flightNumber}
                        onChange={(e) => setFlightNumber(e.target.value)}
                        className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                      />
                      <Textarea
                        placeholder="Special instructions (optional)"
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="bg-slate-50 border-slate-200 rounded-xl"
                        rows={3}
                      />
                    </div>

                    {/* Price Estimate */}
                    {estimate && (
                      <div className="bg-slate-900 text-white p-4 rounded-xl">
                        <div className="text-center">
                          <div className="text-xl font-bold text-amber-400">
                            Estimated Fare: ${estimate}
                          </div>
                          <p className="text-sm text-slate-300 mt-1">
                            *Final price may vary based on actual route and wait time
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting || !pickupLocation || !dropoffLocation || !date || !time || !vehicleType || !name || !phone || !email}
                      className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-semibold"
                    >
                      {isSubmitting ? "Processing..." : "Book Ride"}
                    </Button>
                  </form>
                </div>

                {/* Right side - Image */}
                <div className="hidden lg:block relative">
                  <img
                    src="/lovable-uploads/8a9981fc-afe7-4aa1-9ded-02715980b188.png"
                    alt="Luxury sedan"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
