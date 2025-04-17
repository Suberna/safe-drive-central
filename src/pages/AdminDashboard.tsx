
import { useEffect, useState } from 'react';
import { AlertTriangle, FileText, Users, Calendar, TrendingUp, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminStatsCard } from '@/components/admin/AdminStatsCard';
import { ViolationsList } from '@/components/dashboard/ViolationsList';
import { ViolationTrendsChart } from '@/components/admin/ViolationTrendsChart';
import { TrafficHotspotMap } from '@/components/maps/TrafficHotspotMap';
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
              <ViolationTrendsChart />
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
                    <Link to="/admin/smart-fines">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                        <path d="M13 5v8" />
                        <path d="M13 17v2" />
                        <path d="M2 9v6" />
                        <path d="M22 9v6" />
                      </svg>
                      Manage Fine System
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

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Violation Hotspots</CardTitle>
          </CardHeader>
          <CardContent>
            <TrafficHotspotMap />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
