
import { TrafficHotspotMap } from '@/components/maps/TrafficHotspotMap';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar, AlertTriangle } from 'lucide-react';

const TrafficMap = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in</h1>
          <Button onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Traffic Violation Hotspots</h1>
          <p className="text-gray-600">
            View areas with high traffic violation rates and take caution while driving
          </p>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <TrafficHotspotMap fullscreen={true} />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Map Legend</CardTitle>
              <CardDescription>Understanding the hotspot indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <div>
                  <p className="font-medium">High Risk Zone</p>
                  <p className="text-sm text-gray-600">200+ violations monthly</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <div>
                  <p className="font-medium">Medium Risk Zone</p>
                  <p className="text-sm text-gray-600">100-200 violations monthly</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <div>
                  <p className="font-medium">Low Risk Zone</p>
                  <p className="text-sm text-gray-600">Under 100 violations monthly</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest enforcement operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">MG Road Junction</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    <Calendar className="h-3 w-3 inline-block mr-1" />
                    Today
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Special helmet enforcement drive: 78 violations detected
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Indiranagar 100ft Road</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    <Calendar className="h-3 w-3 inline-block mr-1" />
                    Yesterday
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Speed monitoring operation: 45 overspeeding violations
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full bg-orange-50 p-3 rounded-md text-sm flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-orange-800">
                  Traffic police are conducting special drives in high-risk zones. Please follow traffic rules.
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrafficMap;
