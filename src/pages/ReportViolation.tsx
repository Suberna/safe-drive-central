
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ReportViolation = () => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [media, setMedia] = useState<File | null>(null);
  const [violationType, setViolationType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!media) {
      toast({
        title: "Missing information",
        description: "Please upload a photo or video of the violation",
        variant: "destructive",
      });
      return;
    }
    
    if (!violationType) {
      toast({
        title: "Missing information",
        description: "Please select a violation type",
        variant: "destructive",
      });
      return;
    }
    
    if (!location.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide the location of the violation",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Report Submitted",
        description: "Your report has been submitted successfully and is under review",
      });
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E`);
          toast({
            title: "Location detected",
            description: "Your current location has been added to the report",
          });
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Unable to get your current location. Please enter it manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation. Please enter location manually.",
        variant: "destructive",
      });
    }
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Report a Traffic Violation</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Submit a Violation Report</CardTitle>
            <CardDescription>
              Help improve road safety by reporting traffic violations you witness. Your report will be reviewed by authorities.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="media">Photo/Video Evidence <span className="text-red-500">*</span></Label>
                <div className="border border-input rounded-md p-2">
                  <input 
                    type="file" 
                    id="media" 
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-civitrack-blue-50 file:text-civitrack-blue-700
                      hover:file:bg-civitrack-blue-100"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload clear photos or videos that show the violation. Max size: 50MB.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="violationType">Violation Type <span className="text-red-500">*</span></Label>
                <Select value={violationType} onValueChange={setViolationType}>
                  <SelectTrigger id="violationType">
                    <SelectValue placeholder="Select violation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no_helmet">No Helmet</SelectItem>
                    <SelectItem value="triplets">Triple Riding</SelectItem>
                    <SelectItem value="number_plate">Number Plate Issue</SelectItem>
                    <SelectItem value="illegal_override">Illegal Override</SelectItem>
                    <SelectItem value="no_seat_belt">No Seat Belt</SelectItem>
                    <SelectItem value="mobile_usage">Mobile Usage</SelectItem>
                    <SelectItem value="wrong_parking">Wrong Parking</SelectItem>
                    <SelectItem value="other">Other Violation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-end justify-between">
                  <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={getCurrentLocation}
                    className="text-xs"
                  >
                    Use Current Location
                  </Button>
                </div>
                <Input
                  id="location"
                  placeholder="Enter the location of the violation"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide additional details about the violation..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="bg-amber-50 p-3 rounded-md">
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> Only submit reports for genuine violations with clear evidence. False reporting may lead to penalties.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? 'Submitting...' : 'Submit Report'}
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/dashboard')}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ReportViolation;
