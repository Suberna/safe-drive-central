
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const HeatmapPreview = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Violation Hotspots</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/traffic-map">View full map</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 bg-cover bg-center" style={{ 
            backgroundImage: 'url("https://maps.googleapis.com/maps/api/staticmap?center=28.6139,77.2090&zoom=11&size=600x400&maptype=roadmap&key=DEMO_KEY")',
            opacity: 0.5
          }}></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm">
            <span className="text-civitrack-blue-700 text-lg font-medium">Traffic Violation Hotspots</span>
            <span className="text-sm text-gray-600 mt-2">View the interactive map to see violation trends</span>
            <Button className="mt-4" asChild>
              <Link to="/traffic-map">Explore Map</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
