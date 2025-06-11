
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

  const handleSearch = () => {
    console.log("Search clicked", { pickupLocation, dropoffLocation, date, time });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-200 to-pink-200 relative overflow-hidden pt-16">
        {/* Main Content Container */}
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 relative">
          
          {/* Outer Container with frosted glass effect */}
          <div className="relative w-full max-w-6xl">
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 relative overflow-hidden"
                 style={{
                   boxShadow: '0 25px 50px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                 }}>
              
              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
                
                {/* Left Side - Booking Form */}
                <div className="relative z-30">
                  <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-8 leading-tight">
                    Book a limo ride
                  </h1>
                  
                  {/* Inner Form Container with enhanced styling */}
                  <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40 relative z-40" 
                       style={{
                         boxShadow: '0 20px 40px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                       }}>
                    <div className="space-y-6">
                      
                      {/* Pickup Location */}
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-600" />
                        <Input
                          placeholder="Pickup location"
                          value={pickupLocation}
                          onChange={(e) => setPickupLocation(e.target.value)}
                          className="pl-12 h-14 bg-white/70 border-0 rounded-2xl text-lg placeholder:text-slate-500 focus:bg-white/90 transition-all backdrop-blur-sm"
                        />
                      </div>

                      {/* Drop-off Location */}
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-600" />
                        <Input
                          placeholder="Drop-off location"
                          value={dropoffLocation}
                          onChange={(e) => setDropoffLocation(e.target.value)}
                          className="pl-12 h-14 bg-white/70 border-0 rounded-2xl text-lg placeholder:text-slate-500 focus:bg-white/90 transition-all backdrop-blur-sm"
                        />
                      </div>

                      {/* Date and Time Row */}
                      <div className="grid grid-cols-2 gap-4">
                        
                        {/* Date Picker */}
                        <div className="relative">
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
                        <div className="relative">
                          <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-600" />
                          <Input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="pl-12 h-14 bg-white/70 border-0 rounded-2xl text-lg focus:bg-white/90 transition-all backdrop-blur-sm"
                          />
                        </div>
                      </div>

                      {/* Search Button */}
                      <Button
                        onClick={handleSearch}
                        className="w-full h-16 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                      >
                        Search
                      </Button>
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
                    className="w-auto h-80 object-contain transform translate-x-32"
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
