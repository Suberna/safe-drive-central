
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, User, MapPin, Calendar, Camera, Tag, CheckCircle, XCircle } from 'lucide-react';

interface CitizenReport {
  id: string;
  reportedBy: string;
  violationType: string;
  location: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  evidence: string;
  description?: string;
  vehicleNumber?: string;
  reporterPhone?: string;
}

export const AdminReportDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [report, setReport] = useState<CitizenReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser || !isAdmin) {
      navigate('/login');
      return;
    }

    // Simulate API call to fetch the report details
    setTimeout(() => {
      const mockReport: CitizenReport = {
        id: id || 'r1',
        reportedBy: 'John Doe',
        violationType: 'Helmet',
        location: 'MG Road, Bangalore',
        date: '2025-04-15',
        status: 'pending',
        evidence: 'https://placehold.co/600x400?text=Violation+Evidence',
        description: 'I observed a motorcyclist driving without a helmet on MG Road. He was riding a black motorcycle and seemed to be in a hurry.',
        vehicleNumber: 'KA-01-AB-1234',
        reporterPhone: '+91 98765 43210'
      };
      
      setReport(mockReport);
      setLoading(false);
    }, 1000);
  }, [id, currentUser, isAdmin, navigate]);

  const handleApprove = () => {
    if (report) {
      setReport({ ...report, status: 'approved' });
      toast({
        title: "Report approved",
        description: "This report has been marked as approved and will be processed.",
        variant: "default",
      });
    }
  };

  const handleReject = () => {
    if (report) {
      setReport({ ...report, status: 'rejected' });
      toast({
        title: "Report rejected",
        description: "This report has been marked as rejected and will be archived.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Report Not Found</h1>
          <p className="text-gray-600 mb-6">The report you're looking for could not be found.</p>
          <Button onClick={() => navigate('/admin/reports')}>
            Back to Reports
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-4"
            onClick={() => navigate('/admin/reports')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Citizen Report Details</h1>
            <p className="text-gray-600">Review and verify the submitted violation report.</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Report {report.id}</CardTitle>
              {getStatusBadge(report.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Reported By
                </p>
                <p className="font-medium">{report.reportedBy}</p>
                {report.reporterPhone && <p className="text-sm">{report.reporterPhone}</p>}
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  Violation Type
                </p>
                <p className="font-medium">{report.violationType}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Location
                </p>
                <p>{report.location}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date
                </p>
                <p>{report.date}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground flex items-center">
                <Camera className="h-4 w-4 mr-2" />
                Evidence
              </p>
              <div className="rounded-md overflow-hidden border">
                <img 
                  src={report.evidence} 
                  alt="Violation evidence" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            {report.description && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="text-sm bg-muted p-3 rounded-md">{report.description}</p>
              </div>
            )}
            
            {report.vehicleNumber && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Vehicle Number</p>
                <p className="font-mono bg-gray-100 inline-block px-3 py-1 rounded-md">{report.vehicleNumber}</p>
              </div>
            )}
          </CardContent>
          
          {report.status === 'pending' && (
            <CardFooter className="flex justify-end space-x-4 pt-0">
              <Button
                variant="outline"
                className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                onClick={handleReject}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject Report
              </Button>
              <Button
                onClick={handleApprove}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve Report
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};
