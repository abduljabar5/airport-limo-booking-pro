import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DetailedBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, quoteData } = location.state || {};
  
  const [bookingData, setBookingData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    pickupAddress: formData?.pickup || '',
    destinationAddress: formData?.destination || '',
    flightNumber: '',
    passengers: '1',
    date: formData?.date || '',
    time: formData?.time || '',
    vehicleType: formData?.vehicleType || '',
    driverTip: '0',
    additionalDetails: '',
    meetAndGreet: false,
    roundTrip: false,
    payToDriver: false,
    termsAccepted: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.termsAccepted) {
      alert('Please accept the terms and conditions before booking.');
      return;
    }
    // Handle booking submission
    console.log('Booking submitted:', bookingData);
    alert('Booking submitted successfully!');
    navigate('/');
  };

  const vehicleOptions = [
    { value: 'sedan', label: 'Luxury Sedan (1-3 Bags)', price: quoteData?.cost || 0 },
    { value: 'suv', label: 'Premium SUV (1-6 Bags)', price: Math.round((quoteData?.cost || 0) * 1.3) },
    { value: 'limo', label: 'Stretch Limousine (1-8 Bags)', price: Math.round((quoteData?.cost || 0) * 2.2) },
    { value: 'sprinter', label: 'Executive Van (1-14 Bags)', price: Math.round((quoteData?.cost || 0) * 1.8) }
  ];

  const selectedVehicle = vehicleOptions.find(v => v.value === bookingData.vehicleType);
  const totalCost = (selectedVehicle?.price || 0) + parseInt(bookingData.driverTip || '0');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                Complete Your <span className="luxury-text-gradient">Booking</span>
              </h1>
              <p className="text-gray-300 text-lg">
                Please provide your details to finalize your luxury transportation
              </p>
            </div>

            {/* Booking Form */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-gold/30">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white font-medium">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={bookingData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="bg-white/20 border-gold/30 text-white placeholder:text-gray-400 focus:border-gold"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-white font-medium">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      placeholder="(555) 123-4567"
                      value={bookingData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className="bg-white/20 border-gold/30 text-white placeholder:text-gray-400 focus:border-gold"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">Contact Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={bookingData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-white/20 border-gold/30 text-white placeholder:text-gray-400 focus:border-gold"
                    required
                  />
                </div>

                {/* Trip Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="pickupAddress" className="text-white font-medium">Pickup Address *</Label>
                    <Input
                      id="pickupAddress"
                      placeholder="Enter pickup location"
                      value={bookingData.pickupAddress}
                      onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                      className="bg-white/20 border-gold/30 text-white placeholder:text-gray-400 focus:border-gold"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="destinationAddress" className="text-white font-medium">Destination Address *</Label>
                    <Input
                      id="destinationAddress"
                      placeholder="Enter destination"
                      value={bookingData.destinationAddress}
                      onChange={(e) => handleInputChange('destinationAddress', e.target.value)}
                      className="bg-white/20 border-gold/30 text-white placeholder:text-gray-400 focus:border-gold"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="flightNumber" className="text-white font-medium">Flight Number (Optional)</Label>
                  <Input
                    id="flightNumber"
                    placeholder="e.g., AA1234"
                    value={bookingData.flightNumber}
                    onChange={(e) => handleInputChange('flightNumber', e.target.value)}
                    className="bg-white/20 border-gold/30 text-white placeholder:text-gray-400 focus:border-gold"
                  />
                </div>

                {/* Date, Time, Passengers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="passengers" className="text-white font-medium">Passengers</Label>
                    <Select value={bookingData.passengers} onValueChange={(value) => handleInputChange('passengers', value)}>
                      <SelectTrigger className="bg-white/20 border-gold/30 text-white focus:border-gold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(num => (
                          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-white font-medium">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="bg-white/20 border-gold/30 text-white focus:border-gold"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-white font-medium">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={bookingData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="bg-white/20 border-gold/30 text-white focus:border-gold"
                      required
                    />
                  </div>
                </div>

                {/* Vehicle Selection */}
                <div className="space-y-2">
                  <Label className="text-white font-medium">Vehicle Type</Label>
                  <Select value={bookingData.vehicleType} onValueChange={(value) => handleInputChange('vehicleType', value)}>
                    <SelectTrigger className="bg-white/20 border-gold/30 text-white focus:border-gold">
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleOptions.map(vehicle => (
                        <SelectItem key={vehicle.value} value={vehicle.value}>
                          {vehicle.label} - ${vehicle.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Driver Tip */}
                <div className="space-y-2">
                  <Label htmlFor="driverTip" className="text-white font-medium">Driver Tip ($)</Label>
                  <Input
                    id="driverTip"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={bookingData.driverTip}
                    onChange={(e) => handleInputChange('driverTip', e.target.value)}
                    className="bg-white/20 border-gold/30 text-white placeholder:text-gray-400 focus:border-gold"
                  />
                </div>

                {/* Distance and Cost Display */}
                {quoteData && (
                  <div className="bg-gold/20 border border-gold/50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-white text-sm">Distance</div>
                        <div className="text-gold text-xl font-bold">{quoteData.distance} Miles</div>
                      </div>
                      <div>
                        <div className="text-white text-sm">Total Cost</div>
                        <div className="text-gold text-xl font-bold">${totalCost.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Options */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="meetAndGreet"
                      checked={bookingData.meetAndGreet}
                      onCheckedChange={(checked) => handleInputChange('meetAndGreet', checked as boolean)}
                    />
                    <Label htmlFor="meetAndGreet" className="text-white">Meet and Greet Service</Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="roundTrip"
                      checked={bookingData.roundTrip}
                      onCheckedChange={(checked) => handleInputChange('roundTrip', checked as boolean)}
                    />
                    <Label htmlFor="roundTrip" className="text-white">Round Trip Service</Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="payToDriver"
                      checked={bookingData.payToDriver}
                      onCheckedChange={(checked) => handleInputChange('payToDriver', checked as boolean)}
                    />
                    <Label htmlFor="payToDriver" className="text-white">Pay to Driver</Label>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-2">
                  <Label htmlFor="additionalDetails" className="text-white font-medium">Additional Travel Details</Label>
                  <Textarea
                    id="additionalDetails"
                    placeholder="Any special requests or additional information..."
                    value={bookingData.additionalDetails}
                    onChange={(e) => handleInputChange('additionalDetails', e.target.value)}
                    className="bg-white/20 border-gold/30 text-white placeholder:text-gray-400 focus:border-gold min-h-[100px]"
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="termsAccepted"
                    checked={bookingData.termsAccepted}
                    onCheckedChange={(checked) => handleInputChange('termsAccepted', checked as boolean)}
                  />
                  <Label htmlFor="termsAccepted" className="text-white">
                    I agree to the terms and conditions *
                  </Label>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  className="w-full h-16 bg-gradient-to-r from-gold to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black text-xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={!bookingData.termsAccepted}
                >
                  Complete Booking
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DetailedBooking;