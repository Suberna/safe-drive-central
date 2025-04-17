
import { useEffect, useState } from 'react';
import { AlertTriangle, FileText, Users, Calendar, TrendingUp, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminStatsCard } from '@/components/admin/AdminStatsCard';
import { ViolationsList } from '@/components/dashboard/ViolationsList';
import { Link } from 'react-router-dom';
import { Violation } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { getAllViolations } from '@/data/mockData';

const AdminDashboard = () => {
  const { currentUser, isAdmin } = useAuth();
  const [violations, setViolations] = useState<Violation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser && isAdmin) {
      // Simulate API call
      setTimeout(() => {
        const allViolations = getAllViolations();
        setViolations(allViolations);
        setIsLoading(false);
      }, 500);
    }
  }, [currentUser, isAdmin]);

  if (!currentUser || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Admin access required</h1>
          <Button asChild>
            <Link to="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage traffic violations, users, and system analytics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AdminStatsCard 
          title="Total Violations" 
          value={violations.length}
          icon={<AlertTriangle className="h-5 w-5" />}
          trend={{ value: 12, isPositive: false }}
          footer="All time recorded violations"
        />
        <AdminStatsCard 
          title="Pending Appeals" 
          value={2}
          icon={<FileText className="h-5 w-5" />}
          trend={{ value: 5, isPositive: true }}
          footer="Awaiting review"
        />
        <AdminStatsCard 
          title="Registered Users" 
          value={125}
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 8, isPositive: true }}
          footer="Active user accounts"
        />
        <AdminStatsCard 
          title="Today's Violations" 
          value={3}
          icon={<Calendar className="h-5 w-5" />}
          trend={{ value: 2, isPositive: false }}
          footer="Recorded in the last 24h"
        />
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="violations">Violations</TabsTrigger>
          <TabsTrigger value="appeals">Appeals</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Traffic Violation Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                    <div className="text-center p-6">
                      <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Violation Analytics</h3>
                      <p className="text-sm text-muted-foreground mt-2 mb-4">
                        View comprehensive analytics on traffic violations, patterns, and hotspots.
                      </p>
                      <Button asChild>
                        <Link to="/admin/analytics">View Full Analytics</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col gap-3">
                  <Button className="justify-start" variant="outline" asChild>
                    <Link to="/admin/violations/new">
                      <ShieldAlert className="mr-2 h-4 w-4" />
                      Add New Violation
                    </Link>
                  </Button>
                  <Button className="justify-start" variant="outline" asChild>
                    <Link to="/admin/users">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Users
                    </Link>
                  </Button>
                  <Button className="justify-start" variant="outline" asChild>
                    <Link to="/admin/reports">
                      <FileText className="mr-2 h-4 w-4" />
                      Review Reports
                    </Link>
                  </Button>
                  <Button className="justify-start" variant="outline" asChild>
                    <Link to="/admin/appeals">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Pending Appeals
                    </Link>
                  </Button>
                  <Button className="justify-start" variant="outline" asChild>
                    <Link to="/admin/settings">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      System Settings
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="violations">
          <ViolationsList 
            violations={violations} 
            title="All Violations" 
            showAll={false}
          />
        </TabsContent>
        
        <TabsContent value="appeals">
          <Card>
            <CardHeader>
              <CardTitle>Pending Appeals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">There are 2 pending appeals that require your review.</p>
                <Button asChild>
                  <Link to="/admin/appeals">Review Appeals</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Citizen Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">There are 3 new citizen reports awaiting verification.</p>
                <Button asChild>
                  <Link to="/admin/reports">View Reports</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Violation Hotspots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center relative">
              <div className="absolute inset-0 bg-cover bg-center" style={{ 
                backgroundImage: 'url("https://maps.googleapis.com/maps/api/staticmap?center=28.6139,77.2090&zoom=11&size=600x400&maptype=roadmap&key=DEMO_KEY")',
                opacity: 0.5
              }}></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm">
                <Button asChild>
                  <Link to="/admin/traffic-map">Open Interactive Map</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">AI Detection System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-md border border-green-100">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-3 animate-pulse"></div>
                  <span className="font-medium text-green-700">Helmet Detection</span>
                </div>
                <span className="text-sm text-green-600">Active</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-md border border-green-100">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-3 animate-pulse"></div>
                  <span className="font-medium text-green-700">Number Plate Detection</span>
                </div>
                <span className="text-sm text-green-600">Active</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-md border border-yellow-100">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-yellow-500 mr-3 animate-pulse-slow"></div>
                  <span className="font-medium text-yellow-700">Mobile Usage Detection</span>
                </div>
                <span className="text-sm text-yellow-600">Maintenance</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-md border border-green-100">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-3 animate-pulse"></div>
                  <span className="font-medium text-green-700">Triple Riding Detection</span>
                </div>
                <span className="text-sm text-green-600">Active</span>
              </div>
              
              <Button variant="outline" className="w-full" asChild>
                <Link to="/admin/ai-system">Manage AI Systems</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
