
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zone } from '@/types';

// Sample data for the heatmap
const sampleHotspots: Zone[] = [
  { 
    id: 'z1', 
    name: 'MG Road Junction', 
    coordinates: [77.6117, 12.9719], 
    violationCount: 234, 
    riskLevel: 'high' 
  },
  { 
    id: 'z2', 
    name: 'Indiranagar 100ft Road', 
    coordinates: [77.6410, 12.9783], 
    violationCount: 156, 
    riskLevel: 'medium' 
  },
  { 
    id: 'z3', 
    name: 'Koramangala Forum', 
    coordinates: [77.6132, 12.9347], 
    violationCount: 198, 
    riskLevel: 'high' 
  },
  { 
    id: 'z4', 
    name: 'Whitefield ITPL Road', 
    coordinates: [77.7480, 12.9698], 
    violationCount: 142, 
    riskLevel: 'medium' 
  },
  { 
    id: 'z5', 
    name: 'Electronic City Toll', 
    coordinates: [77.6801, 12.8415], 
    violationCount: 187, 
    riskLevel: 'high' 
  }
];

interface TrafficHotspotMapProps {
  fullscreen?: boolean;
  showControls?: boolean;
}

export const TrafficHotspotMap = ({ 
  fullscreen = false,
  showControls = true
}: TrafficHotspotMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<Zone | null>(null);
  
  useEffect(() => {
    // Simulate map initialization and hotspot rendering
    // In a real implementation, this would use Mapbox or Google Maps APIs
    
    const randomHotspot = sampleHotspots[Math.floor(Math.random() * sampleHotspots.length)];
    const timer = setTimeout(() => {
      setActiveHotspot(randomHotspot);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Dummy click handler for demonstration
  const handleHotspotClick = (hotspot: Zone) => {
    setActiveHotspot(hotspot);
  };

  return (
    <Card className={`${fullscreen ? 'h-[calc(100vh-10rem)]' : 'h-[400px]'}`}>
      <CardHeader className="pb-2">
        <CardTitle>Traffic Violation Hotspots</CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-4rem)] relative">
        {/* Map container with background image */}
        <div 
          ref={mapContainerRef} 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://maps.googleapis.com/maps/api/staticmap?center=12.9719,77.5937&zoom=12&size=800x600&maptype=roadmap&key=DEMO_KEY")' }}
        >
          {/* Overlay with hotspots */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Hotspot markers */}
              {sampleHotspots.map((hotspot) => (
                <div 
                  key={hotspot.id}
                  className={`absolute w-6 h-6 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 animate-pulse ${
                    hotspot.riskLevel === 'high' 
                      ? 'bg-red-500' 
                      : hotspot.riskLevel === 'medium'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                  }`}
                  style={{ 
                    left: `${Math.random() * 80 + 10}%`, 
                    top: `${Math.random() * 80 + 10}%` 
                  }}
                  onClick={() => handleHotspotClick(hotspot)}
                >
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold bg-white px-2 py-1 rounded shadow-md whitespace-nowrap">
                    {hotspot.violationCount} violations
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Active hotspot info panel */}
          {activeHotspot && (
            <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{activeHotspot.name}</h3>
                  <p className="text-sm text-gray-600">
                    {activeHotspot.violationCount} violations recorded
                  </p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activeHotspot.riskLevel === 'high' 
                    ? 'bg-red-100 text-red-800' 
                    : activeHotspot.riskLevel === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                }`}>
                  {activeHotspot.riskLevel.toUpperCase()} RISK
                </div>
              </div>
              <div className="mt-2 text-sm">
                <p>Most common violations:</p>
                <ul className="mt-1">
                  <li>• No Helmet (32%)</li>
                  <li>• Red Light Jump (28%)</li>
                  <li>• Triple Riding (19%)</li>
                </ul>
              </div>
            </div>
          )}
          
          {/* Placeholder overlay until real map is implemented */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 text-white">
            <p className="text-xl font-bold mb-2">Interactive Traffic Violation Heatmap</p>
            <p className="text-sm mb-4">Click on hotspots to see violation details</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
