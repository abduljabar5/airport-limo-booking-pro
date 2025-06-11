
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Clock, Users, Car } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Booking = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [passengerCount, setPassengerCount] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [estimate, setEstimate] = useState<number | null>(null);

  const calculateEstimate = () => {
    // Simple estimation logic for MVP
    let basePrice = 45;
    
    // Vehicle type multipliers
    const multipliers = {
      sedan: 1.0,
      suv: 1.3,
      sprinter: 1.8,
      limo: 2.2
    };

    // Airport routes
    const isAirportRoute = 
      pickupLocation.toLowerCase().includes('msp') || 
      pickupLocation.toLowerCase().includes('airport') ||
      dropoffLocation.toLowerCase().includes('msp') || 
      dropoffLocation.toLowerCase().includes('airport');

    if (isAirportRoute) {
      basePrice = 65; // Airport base rate
    }

    const multiplier = multipliers[vehicleType as keyof typeof multipliers] || 1.0;
    const finalPrice = Math.round(basePrice * multiplier);
    
    setEstimate(finalPrice);
  };

  const handleSearch = () => {
    console.log("Search clicked", { 
      pickupLocation, 
      dropoffLocation, 
      date, 
      time, 
      vehicleType, 
      passengerCount, 
      specialRequests 
    });
    calculateEstimate();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-200 to-pink-200 relative overflow-hidden pt-16">
        {/* Main Content Container with extra padding for car spillout and centering */}
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 lg:px-32 relative">
          
          {/* Outer Container with extended width to accommodate car spillout */}
          <div className="relative w-full max-w-6xl lg:max-w-7xl mx-auto">
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 relative overflow-visible"
                 style={{
                   boxShadow: '0 25px 50px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                 }}>
              
              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
                
                {/* Left Side - Booking Form */}
                <div className="relative z-30 mx-auto w-full max-w-lg lg:max-w-none">
                  <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-8 leading-tight text-center lg:text-left">
                    Book a limo ride
                  </h1>
                  
                  {/* Inner Form Container with enhanced styling */}
                  <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40 relative z-40" 
                       style={{
                         boxShadow: '0 20px 40px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                       }}>
                    <div className="space-y-6">
                      
                      {/* Pickup Location */}
                      <div className="space-y-2">
                        <Label htmlFor="pickup" className="text-slate-700 font-medium">From</Label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-600" />
                          <Input
                            id="pickup"
                            placeholder="Pickup location"
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                            className="pl-12 h-14 bg-white/70 border-0 rounded-2xl text-lg placeholder:text-slate-500 focus:bg-white/90 transition-all backdrop-blur-sm"
                          />
                        </div>
                      </div>

                      {/* Drop-off Location */}
                      <div className="space-y-2">
                        <Label htmlFor="dropoff" className="text-slate-700 font-medium">To</Label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-600" />
                          <Input
                            id="dropoff"
                            placeholder="Drop-off location (e.g., MSP Airport)"
                            value={dropoffLocation}
                            onChange={(e) => setDropoffLocation(e.target.value)}
                            className="pl-12 h-14 bg-white/70 border-0 rounded-2xl text-lg placeholder:text-slate-500 focus:bg-white/90 transition-all backdrop-blur-sm"
                          />
                        </div>
                      </div>

                      {/* Date and Time Row */}
                      <div className="grid grid-cols-2 gap-4">
                        
                        {/* Date Picker */}
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-medium">Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full h-14 justify-start text-left font-normal bg-white/70 border-0 rounded-2xl pl-12 text-lg hover:bg-white/90 transition-all backdrop-blur-sm",
                                  !date && "text-slate-500"
                                )}
                              >
                                <CalendarIcon className="absolute left-4 h-5 w-5 text-slate-600" />
                                {date ? format(date, "MMM dd, yyyy") : <span>Date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-white/90 backdrop-blur-lg border-0 rounded-2xl shadow-2xl" align="start">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        {/* Time Input */}
                        <div className="space-y-2">
                          <Label htmlFor="time" className="text-slate-700 font-medium">Time</Label>
                          <div className="relative">
                            <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-600" />
                            <Input
                              id="time"
                              type="time"
                              value={time}
                              onChange={(e) => setTime(e.target.value)}
                              className="pl-12 h-14 bg-white/70 border-0 rounded-2xl text-lg focus:bg-white/90 transition-all backdrop-blur-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Vehicle Type and Passenger Count Row */}
                      <div className="grid grid-cols-2 gap-4">
                        
                        {/* Vehicle Type */}
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-medium">Vehicle Type</Label>
                          <div className="relative">
                            <Car className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-600 z-10" />
                            <Select value={vehicleType} onValueChange={setVehicleType}>
                              <SelectTrigger className="h-14 bg-white/70 border-0 rounded-2xl pl-12 text-lg focus:bg-white/90 transition-all backdrop-blur-sm">
                                <SelectValue placeholder="Select vehicle" />
                              </SelectTrigger>
                              <SelectContent className="bg-white/90 backdrop-blur-lg border-0 rounded-2xl shadow-2xl">
                                <SelectItem value="sedan">Sedan (1-3 passengers)</SelectItem>
                                <SelectItem value="suv">SUV (1-6 passengers)</SelectItem>
                                <SelectItem value="sprinter">Sprinter Van (1-14 passengers)</SelectItem>
                                <SelectItem value="limo">Stretch Limo (1-8 passengers)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Passenger Count */}
                        <div className="space-y-2">
                          <Label htmlFor="passengers" className="text-slate-700 font-medium">Passengers</Label>
                          <div className="relative">
                            <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-600" />
                            <Input
                              id="passengers"
                              type="number"
                              min="1"
                              max="14"
                              placeholder="1"
                              value={passengerCount}
                              onChange={(e) => setPassengerCount(e.target.value)}
                              className="pl-12 h-14 bg-white/70 border-0 rounded-2xl text-lg placeholder:text-slate-500 focus:bg-white/90 transition-all backdrop-blur-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Special Requests */}
                      <div className="space-y-2">
                        <Label htmlFor="requests" className="text-slate-700 font-medium">Special Requests (Optional)</Label>
                        <Textarea
                          id="requests"
                          placeholder="Any special requests or requirements..."
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          className="bg-white/70 border-0 rounded-2xl text-lg placeholder:text-slate-500 focus:bg-white/90 transition-all backdrop-blur-sm min-h-[100px]"
                        />
                      </div>

                      {/* Estimate Price & Search Button */}
                      <div className="space-y-4">
                        <Button
                          onClick={handleSearch}
                          className="w-full h-16 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                          disabled={!pickupLocation || !dropoffLocation || !vehicleType}
                        >
                          Get Price Estimate
                        </Button>

                        {/* Price Estimate Display */}
                        {estimate && (
                          <div className="bg-slate-900 text-white p-6 rounded-2xl text-center">
                            <div className="text-2xl font-bold text-amber-400 mb-2">
                              Estimated Fare: ${estimate}
                            </div>
                            <p className="text-slate-300 mb-4">
                              *Estimate includes taxes and fees. Final price may vary based on actual route and wait time.
                            </p>
                            <Button 
                              className="w-full bg-amber-500 hover:bg-amber-600 text-white h-12 rounded-xl font-semibold"
                            >
                              Confirm Booking
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Car positioning area */}
                <div className="relative flex justify-end hidden lg:block">
                  <div className="w-full max-w-lg h-96"></div>
                </div>
              </div>

              {/* Car Image - Positioned to stick out from the container with 3D effect */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
                <div className="relative">
                  <img
                    src="/lovable-uploads/ef093fe4-551a-4289-814e-cda095220354.png"
                    alt="Luxury black limousine"
                    className="w-auto h-80 object-contain transform translate-x-24"
                    style={{
                      filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.3))',
                      transformStyle: 'preserve-3d',
                      perspective: '1000px'
                    }}
                  />
                  {/* 3D effect overlay for the front portion */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent 60%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0.2) 80%, transparent 100%)',
                      transform: 'perspective(1000px) rotateY(-5deg)',
                      transformOrigin: 'center right'
                    }}
                  ></div>
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
