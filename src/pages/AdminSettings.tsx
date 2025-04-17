
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Cog, Database, Shield, AlertCircle } from 'lucide-react';

const AdminSettings = () => {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  // System settings
  const [minDriverScore, setMinDriverScore] = useState(40);
  const [autoSuspend, setAutoSuspend] = useState(true);
  const [aiAssistanceEnabled, setAiAssistanceEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Fine settings
  const [helmetFine, setHelmetFine] = useState(1000);
  const [tripleRidingFine, setTripleRidingFine] = useState(1000);
  const [numberPlateFine, setNumberPlateFine] = useState(5000);
  const [mobileUsageFine, setMobileUsageFine] = useState(1500);

  // Point deductions
  const [helmetPoints, setHelmetPoints] = useState(5);
  const [tripleRidingPoints, setTripleRidingPoints] = useState(4);
  const [numberPlatePoints, setNumberPlatePoints] = useState(3);
  const [mobileUsagePoints, setMobileUsagePoints] = useState(6);

  useEffect(() => {
    if (!currentUser || !isAdmin) {
      navigate('/login');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [currentUser, isAdmin, navigate]);

  const handleSaveSettings = () => {
    // Simulate API call to save settings
    toast({
      title: "Settings saved",
      description: "Your changes have been successfully applied.",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">System Settings</h1>
          <p className="text-gray-600">Configure system parameters, fine amounts, and violation points.</p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General Settings</TabsTrigger>
            <TabsTrigger value="fines">Fine Management</TabsTrigger>
            <TabsTrigger value="points">Point Deductions</TabsTrigger>
            <TabsTrigger value="system">System Maintenance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cog className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Configure the basic operation parameters of the system.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="min-score">Minimum Driver Score for License Suspension</Label>
                  <div className="flex items-center gap-4">
                    <Slider 
                      id="min-score"
                      value={[minDriverScore]} 
                      min={10} 
                      max={60} 
                      step={5}
                      onValueChange={(value) => setMinDriverScore(value[0])}
                      className="flex-grow"
                    />
                    <span className="w-12 text-right font-medium">{minDriverScore}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Drivers with a score below this threshold will be flagged for license suspension.
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autosuspend">Automatic Suspension</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically suspend licenses when score falls below threshold.
                    </p>
                  </div>
                  <Switch 
                    id="autosuspend"
                    checked={autoSuspend} 
                    onCheckedChange={setAutoSuspend} 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ai-assistance">AI Assistance</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable AI-powered jury for appeal verdicts and chatbot assistance.
                    </p>
                  </div>
                  <Switch 
                    id="ai-assistance"
                    checked={aiAssistanceEnabled} 
                    onCheckedChange={setAiAssistanceEnabled} 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">User Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email and SMS notifications for new violations and updates.
                    </p>
                  </div>
                  <Switch 
                    id="notifications"
                    checked={notificationsEnabled} 
                    onCheckedChange={setNotificationsEnabled} 
                  />
                </div>

                <Button onClick={handleSaveSettings} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="fines">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Fine Management
                </CardTitle>
                <CardDescription>
                  Configure fine amounts for different types of traffic violations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="helmet-fine">No Helmet Fine (₹)</Label>
                  <Input
                    id="helmet-fine"
                    type="number"
                    value={helmetFine}
                    onChange={(e) => setHelmetFine(parseInt(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="triple-fine">Triple Riding Fine (₹)</Label>
                  <Input
                    id="triple-fine"
                    type="number"
                    value={tripleRidingFine}
                    onChange={(e) => setTripleRidingFine(parseInt(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="numberplate-fine">Number Plate Issue Fine (₹)</Label>
                  <Input
                    id="numberplate-fine"
                    type="number"
                    value={numberPlateFine}
                    onChange={(e) => setNumberPlateFine(parseInt(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mobile-fine">Mobile Usage Fine (₹)</Label>
                  <Input
                    id="mobile-fine"
                    type="number"
                    value={mobileUsageFine}
                    onChange={(e) => setMobileUsageFine(parseInt(e.target.value))}
                  />
                </div>

                <Button onClick={handleSaveSettings} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Fine Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="points">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Point Deduction Settings
                </CardTitle>
                <CardDescription>
                  Configure points to be deducted for different violation types.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="helmet-points">No Helmet Points</Label>
                  <div className="flex items-center gap-4">
                    <Slider 
                      id="helmet-points"
                      value={[helmetPoints]} 
                      min={1} 
                      max={10} 
                      step={1}
                      onValueChange={(value) => setHelmetPoints(value[0])}
                      className="flex-grow"
                    />
                    <span className="w-12 text-right font-medium">{helmetPoints}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="triple-points">Triple Riding Points</Label>
                  <div className="flex items-center gap-4">
                    <Slider 
                      id="triple-points"
                      value={[tripleRidingPoints]} 
                      min={1} 
                      max={10} 
                      step={1}
                      onValueChange={(value) => setTripleRidingPoints(value[0])}
                      className="flex-grow"
                    />
                    <span className="w-12 text-right font-medium">{tripleRidingPoints}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="numberplate-points">Number Plate Issue Points</Label>
                  <div className="flex items-center gap-4">
                    <Slider 
                      id="numberplate-points"
                      value={[numberPlatePoints]} 
                      min={1} 
                      max={10} 
                      step={1}
                      onValueChange={(value) => setNumberPlatePoints(value[0])}
                      className="flex-grow"
                    />
                    <span className="w-12 text-right font-medium">{numberPlatePoints}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mobile-points">Mobile Usage Points</Label>
                  <div className="flex items-center gap-4">
                    <Slider 
                      id="mobile-points"
                      value={[mobileUsagePoints]} 
                      min={1} 
                      max={10} 
                      step={1}
                      onValueChange={(value) => setMobileUsagePoints(value[0])}
                      className="flex-grow"
                    />
                    <span className="w-12 text-right font-medium">{mobileUsagePoints}</span>
                  </div>
                </div>

                <Button onClick={handleSaveSettings} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Point Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  System Maintenance
                </CardTitle>
                <CardDescription>
                  Configure system maintenance and backup options.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-md">
                  <p className="text-yellow-800 text-sm font-medium">
                    Warning: Changes in this section can affect system availability. Proceed with caution.
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode" className="text-red-600 font-medium">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable maintenance mode to temporarily disable user access.
                    </p>
                  </div>
                  <Switch 
                    id="maintenance-mode"
                    checked={maintenanceMode} 
                    onCheckedChange={setMaintenanceMode} 
                  />
                </div>

                <div className="space-y-4 pt-4">
                  <h3 className="text-base font-medium">Backup Options</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline">
                      Backup Database
                    </Button>
                    <Button variant="outline">
                      Backup Settings
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <h3 className="text-base font-medium">System Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline">
                      Clear Cache
                    </Button>
                    <Button variant="outline">
                      Rebuild Index
                    </Button>
                  </div>
                </div>

                <Button onClick={handleSaveSettings} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save System Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminSettings;
