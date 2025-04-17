
import { useEffect, useState } from 'react';
import { BarChart, Bell, Car, FileWarning, Award } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { DriverScoreCard } from '@/components/dashboard/DriverScoreCard';
import { ViolationsList } from '@/components/dashboard/ViolationsList';
import { HeatmapPreview } from '@/components/dashboard/HeatmapPreview';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Violation } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { getUserViolations } from '@/data/mockData';
import { ChatBot } from '@/components/chat/ChatBot';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const [violations, setViolations] = useState<Violation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      // Simulate API call
      setTimeout(() => {
        const userViolations = getUserViolations(currentUser.id);
        setViolations(userViolations);
        setIsLoading(false);
      }, 500);
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in</h1>
          <Button asChild>
            <Link to="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  const pendingViolations = violations.filter(v => v.status === 'pending');
  const totalFine = pendingViolations.reduce((sum, v) => sum + v.fine, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome, {currentUser.name}</h1>
        <p className="text-gray-600">Here's an overview of your traffic violations and driving score.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Driver Score" 
          value={currentUser.driverScore}
          icon={<BarChart className="h-5 w-5" />}
          description="Out of 100 points"
          trend={
            currentUser.driverScore > 85 
              ? { value: 5, isPositive: true } 
              : { value: 3, isPositive: false }
          }
        />
        <StatsCard 
          title="Pending Violations" 
          value={pendingViolations.length}
          icon={<Bell className="h-5 w-5" />}
          description="Requiring payment or appeal"
        />
        <StatsCard 
          title="Total Violations" 
          value={violations.length}
          icon={<FileWarning className="h-5 w-5" />}
          description="Lifetime record"
        />
        <StatsCard 
          title="Pending Fines" 
          value={`₹${totalFine.toLocaleString('en-IN')}`}
          icon={<Car className="h-5 w-5" />}
          description="Total amount due"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ViolationsList 
            violations={violations.slice(0, 5)} 
            title="Recent Violations" 
            showAll={true}
          />
        </div>
        <DriverScoreCard score={currentUser.driverScore} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <HeatmapPreview />
        </div>
        <div>
          <div className="bg-gradient-to-br from-civitrack-blue-50 to-civitrack-blue-100 p-6 rounded-lg h-full flex flex-col">
            <div className="mb-4 flex-shrink-0">
              <Award className="h-12 w-12 text-civitrack-blue-700 mb-2" />
              <h3 className="text-xl font-semibold text-civitrack-blue-900">Safe Driver Rewards</h3>
              <p className="text-civitrack-blue-700 text-sm mt-1">
                Maintain a good score to earn rewards
              </p>
            </div>
            
            <div className="space-y-4 flex-grow">
              <div className="bg-white bg-opacity-60 p-4 rounded-md">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-civitrack-blue-800">90+ Days Safe Driving</span>
                  <span className="text-sm font-medium text-civitrack-blue-800">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-civitrack-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-60 p-4 rounded-md">
                <p className="text-sm text-civitrack-blue-800">
                  Complete <strong>65 more days</strong> of violation-free driving to earn a Safe Driver Certificate and insurance discount.
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex-shrink-0">
              <Button variant="default" className="w-full bg-civitrack-blue-700 hover:bg-civitrack-blue-800" asChild>
                <Link to="/rewards">View All Rewards</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Report a Traffic Violation</h3>
            <p className="text-gray-600">Help make our roads safer by reporting traffic violations you witness.</p>
          </div>
          <Button asChild>
            <Link to="/report">Report Now</Link>
          </Button>
        </div>
      </div>

      {/* Chat Bot */}
      <ChatBot />
    </div>
  );
};

export default UserDashboard;
