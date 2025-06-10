
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Booking = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");

  const handleSearch = () => {
    console.log("Search clicked", { pickupLocation, dropoffLocation, date, time });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-200 to-pink-200">
      {/* Minimal Navigation */}
      <nav className="absolute top-0 w-full z-50 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-slate-800">LIMO RIDE</div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-slate-700 hover:text-slate-900 transition-colors">About</a>
            <a href="#" className="text-slate-700 hover:text-slate-900 transition-colors">Services</a>
            <a href="#" className="text-slate-700 hover:text-slate-900 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Booking Form */}
          <div className="order-2 lg:order-1">
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-8 leading-tight">
              Book a limo ride
            </h1>
            
            {/* Frosted Glass Form Container */}
            <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="space-y-6">
                
                {/* Pickup Location */}
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-600" />
                  <Input
                    placeholder="Pickup location"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="pl-12 h-14 bg-white/50 border-0 rounded-2xl text-lg placeholder:text-slate-500 focus:bg-white/70 transition-all"
                  />
                </div>

                {/* Drop-off Location */}
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-600" />
                  <Input
                    placeholder="Drop-off location"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    className="pl-12 h-14 bg-white/50 border-0 rounded-2xl text-lg placeholder:text-slate-500 focus:bg-white/70 transition-all"
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
                            "w-full h-14 justify-start text-left font-normal bg-white/50 border-0 rounded-2xl pl-12 text-lg hover:bg-white/70 transition-all",
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
                      className="pl-12 h-14 bg-white/50 border-0 rounded-2xl text-lg focus:bg-white/70 transition-all"
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

          {/* Right Side - Car Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="/lovable-uploads/e4a05aab-e6a9-4e4f-8c18-0d17496ae374.png"
                alt="Luxury black limousine"
                className="w-full max-w-2xl h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
