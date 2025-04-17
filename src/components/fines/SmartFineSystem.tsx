
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, FileText, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FineCalculation } from '@/types';

export const SmartFineSystem = () => {
  const { toast } = useToast();
  const [city, setCity] = useState('chennai');
  const [violation, setViolation] = useState('helmetless');
  const [vehicle, setVehicle] = useState('two_wheeler');
  const [calculatedFine, setCalculatedFine] = useState<FineCalculation | null>(null);
  const [history, setHistory] = useState<FineCalculation[]>([]);
  const [currentDateTime, setCurrentDateTime] = useState('');

  // City multipliers similar to the provided code
  const cityMultipliers: Record<string, number> = {
    chennai: 1.5,
    coimbatore: 1.3,
    madurai: 1.2,
    salem: 1.1,
    rural: 0.8
  };

  // Violation base fines
  const violationBaseFines: Record<string, number> = {
    helmetless: 1000,
    triple_riding: 1500,
    red_light: 2000,
    overspeeding: 1200,
    drunk_driving: 5000,
    no_license: 3000
  };

  // Vehicle multipliers
  const vehicleMultipliers: Record<string, number> = {
    two_wheeler: 1.0,
    car: 1.2,
    truck: 1.5,
    auto: 1.1,
    bus: 1.6,
    commercial: 1.8
  };

  // Labels for display
  const violationLabels: Record<string, string> = {
    helmetless: "Helmetless Riding",
    triple_riding: "Triple Riding",
    red_light: "Red Light Jumping",
    overspeeding: "Overspeeding",
    drunk_driving: "Drunk Driving",
    no_license: "No License"
  };

  const vehicleLabels: Record<string, string> = {
    two_wheeler: "Two-Wheeler",
    car: "Car/Jeep/Van",
    truck: "Truck/Lorry",
    auto: "Auto Rickshaw",
    bus: "Bus",
    commercial: "Commercial Vehicle"
  };

  const cityLabels: Record<string, string> = {
    chennai: "Chennai",
    coimbatore: "Coimbatore",
    madurai: "Madurai",
    salem: "Salem",
    rural: "Rural Area"
  };

  // Update date and time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      setCurrentDateTime(now.toLocaleDateString('en-IN', options));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate fine based on selected options
  const calculateFine = () => {
    const base = violationBaseFines[violation];
    const cityMultiplier = cityMultipliers[city];
    const vehicleMultiplier = vehicleMultipliers[vehicle];
    const finalFine = Math.round(base * cityMultiplier * vehicleMultiplier);

    const now = new Date();
    const dateString = now.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const fineData: FineCalculation = {
      baseAmount: base,
      vehicleType: vehicle,
      location: city,
      violationType: violation,
      totalAmount: finalFine,
      calculatedAt: dateString
    };

    setCalculatedFine(fineData);
    setHistory(prev => [fineData, ...prev.slice(0, 4)]);
    
    toast({
      title: "Fine calculated",
      description: `Fine amount: ₹${finalFine}`,
    });
  };

  const generateChallan = () => {
    if (!calculatedFine) {
      toast({
        title: "Cannot generate challan",
        description: "Please calculate a fine first",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Challan generated",
      description: "The challan has been generated and can be downloaded",
    });
  };

  // Add some sample data for demonstration
  useEffect(() => {
    const sampleData = [
      { city: 'chennai', violation: 'helmetless', vehicle: 'two_wheeler' },
      { city: 'coimbatore', violation: 'red_light', vehicle: 'car' },
      { city: 'madurai', violation: 'overspeeding', vehicle: 'truck' }
    ];

    const sampleHistory: FineCalculation[] = sampleData.map(item => {
      const base = violationBaseFines[item.violation];
      const cityMultiplier = cityMultipliers[item.city];
      const vehicleMultiplier = vehicleMultipliers[item.vehicle];
      const finalFine = Math.round(base * cityMultiplier * vehicleMultiplier);
      
      return {
        baseAmount: base,
        vehicleType: item.vehicle,
        location: item.city,
        violationType: item.violation,
        totalAmount: finalFine,
        calculatedAt: new Date().toLocaleString('en-IN')
      };
    });

    setHistory(sampleHistory);
  }, []);

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-center">
          Smart Traffic Fine Management System
        </CardTitle>
        <div className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span>{currentDateTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-500" />
            <span>Tamil Nadu Traffic Police</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Select defaultValue={city} onValueChange={setCity}>
              <SelectTrigger id="city">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chennai">Chennai</SelectItem>
                <SelectItem value="coimbatore">Coimbatore</SelectItem>
                <SelectItem value="madurai">Madurai</SelectItem>
                <SelectItem value="salem">Salem</SelectItem>
                <SelectItem value="rural">Rural Area</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="violation">Violation Type</Label>
            <Select defaultValue={violation} onValueChange={setViolation}>
              <SelectTrigger id="violation">
                <SelectValue placeholder="Select Violation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="helmetless">Helmetless Riding</SelectItem>
                <SelectItem value="triple_riding">Triple Riding</SelectItem>
                <SelectItem value="red_light">Red Light Jumping</SelectItem>
                <SelectItem value="overspeeding">Overspeeding</SelectItem>
                <SelectItem value="drunk_driving">Drunk Driving</SelectItem>
                <SelectItem value="no_license">No License</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vehicle">Vehicle Type</Label>
            <Select defaultValue={vehicle} onValueChange={setVehicle}>
              <SelectTrigger id="vehicle">
                <SelectValue placeholder="Select Vehicle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="two_wheeler">Two-Wheeler</SelectItem>
                <SelectItem value="car">Car/Jeep/Van</SelectItem>
                <SelectItem value="truck">Truck/Lorry</SelectItem>
                <SelectItem value="auto">Auto Rickshaw</SelectItem>
                <SelectItem value="bus">Bus</SelectItem>
                <SelectItem value="commercial">Commercial Vehicle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="evidence">Upload Evidence (Image/Video)</Label>
            <Input id="evidence" type="file" accept="image/*,video/*" />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={calculateFine} className="flex-1 bg-blue-600 hover:bg-blue-700">
            Calculate Fine
          </Button>
          <Button onClick={generateChallan} variant="destructive" className="flex-1">
            Generate Challan
          </Button>
        </div>
        
        {calculatedFine && (
          <div className="bg-gray-50 p-4 rounded-md border-l-4 border-green-500 text-center">
            <h3 className="text-lg font-medium mb-2">Calculated Fine Amount</h3>
            <div className="text-3xl font-bold text-red-500 mb-2">
              ₹{calculatedFine.totalAmount}
            </div>
            <div className="flex justify-around text-sm">
              <div>
                <span className="font-medium">Violation: </span>
                <span>{violationLabels[calculatedFine.violationType]}</span>
              </div>
              <div>
                <span className="font-medium">Vehicle: </span>
                <span>{vehicleLabels[calculatedFine.vehicleType]}</span>
              </div>
              <div>
                <span className="font-medium">Location: </span>
                <span>{cityLabels[calculatedFine.location]}</span>
              </div>
            </div>
          </div>
        )}
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-4">Recent Violation Records</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-md">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="py-2 px-4 text-left">Date/Time</th>
                  <th className="py-2 px-4 text-left">Location</th>
                  <th className="py-2 px-4 text-left">Violation</th>
                  <th className="py-2 px-4 text-left">Vehicle</th>
                  <th className="py-2 px-4 text-left">Fine Amount</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-2 px-4">{item.calculatedAt}</td>
                    <td className="py-2 px-4">{cityLabels[item.location]}</td>
                    <td className="py-2 px-4">
                      <Badge variant={
                        item.violationType.includes('drunk') || item.violationType.includes('license') 
                          ? 'destructive' 
                          : item.violationType.includes('red_light') 
                            ? 'outline' 
                            : 'default'
                      }>
                        {violationLabels[item.violationType]}
                      </Badge>
                    </td>
                    <td className="py-2 px-4">{vehicleLabels[item.vehicleType]}</td>
                    <td className="py-2 px-4 font-semibold">₹{item.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
