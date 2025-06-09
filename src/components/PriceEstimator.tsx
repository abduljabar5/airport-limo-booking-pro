
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PriceEstimator = () => {
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [vehicleType, setVehicleType] = useState("");
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
      fromAddress.toLowerCase().includes('msp') || 
      fromAddress.toLowerCase().includes('airport') ||
      toAddress.toLowerCase().includes('msp') || 
      toAddress.toLowerCase().includes('airport');

    if (isAirportRoute) {
      basePrice = 65; // Airport base rate
    }

    const multiplier = multipliers[vehicleType as keyof typeof multipliers] || 1.0;
    const finalPrice = Math.round(basePrice * multiplier);
    
    setEstimate(finalPrice);
  };

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="booking" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Quick Price Estimator
            </h2>
            <p className="text-lg text-slate-600">
              Get an instant estimate for your ride
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-slate-900">Book Your Ride</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <Input
                    id="from"
                    placeholder="Pick-up address"
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Input
                    id="to"
                    placeholder="Drop-off address (e.g., MSP Airport)"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicle">Vehicle Type</Label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger>
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

              <Button 
                onClick={calculateEstimate}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                disabled={!fromAddress || !toAddress || !vehicleType}
              >
                Estimate Price
              </Button>

              {estimate && (
                <div className="bg-slate-900 text-white p-6 rounded-lg text-center">
                  <div className="text-2xl font-bold text-amber-400 mb-2">
                    Estimated Fare: ${estimate}
                  </div>
                  <p className="text-slate-300 mb-4">
                    *Estimate includes taxes and fees. Final price may vary based on actual route and wait time.
                  </p>
                  <Button 
                    onClick={scrollToBooking}
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    Book This Ride
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PriceEstimator;
