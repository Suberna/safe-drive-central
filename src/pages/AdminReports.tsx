
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { XCircle, CheckCircle, Eye } from 'lucide-react';

interface CitizenReport {
  id: string;
  reportedBy: string;
  violationType: string;
  location: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  evidence: string;
}

const AdminReports = () => {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState<CitizenReport[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!currentUser || !isAdmin) {
      navigate('/login');
      return;
    }

    // Simulate API call to fetch reports
    setTimeout(() => {
      const mockReports: CitizenReport[] = [
        {
          id: 'r1',
          reportedBy: 'John Doe',
          violationType: 'Helmet',
          location: 'MG Road, Bangalore',
          date: '2025-04-15',
          status: 'pending',
          evidence: 'https://placehold.co/300x200?text=Violation+Evidence'
        },
        {
          id: 'r2',
          reportedBy: 'Alice Smith',
          violationType: 'Triple Riding',
          location: 'JP Nagar, Bangalore',
          date: '2025-04-14',
          status: 'pending',
          evidence: 'https://placehold.co/300x200?text=Violation+Evidence'
        },
        {
          id: 'r3',
          reportedBy: 'Bob Johnson',
          violationType: 'Number Plate',
          location: 'Indiranagar, Bangalore',
          date: '2025-04-13',
          status: 'approved',
          evidence: 'https://placehold.co/300x200?text=Violation+Evidence'
        },
        {
          id: 'r4',
          reportedBy: 'Emily Davis',
          violationType: 'Mobile Usage',
          location: 'Koramangala, Bangalore',
          date: '2025-04-12',
          status: 'rejected',
          evidence: 'https://placehold.co/300x200?text=Violation+Evidence'
        }
      ];
      
      setReports(mockReports);
      setLoading(false);
    }, 1000);
  }, [currentUser, isAdmin, navigate]);

  const handleUpdateStatus = (reportId: string, newStatus: 'approved' | 'rejected') => {
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === reportId ? { ...report, status: newStatus } : report
      )
    );

    toast({
      title: `Report ${newStatus}`,
      description: `The citizen report has been ${newStatus}.`,
      variant: newStatus === 'approved' ? 'default' : 'destructive',
    });
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
        <div className="max-w-6xl mx-auto">
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
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Citizen Reports</h1>
          <p className="text-gray-600">Review and manage violation reports submitted by citizens.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reported By</TableHead>
                  <TableHead>Violation Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No reports found
                    </TableCell>
                  </TableRow>
                ) : (
                  reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.reportedBy}</TableCell>
                      <TableCell>{report.violationType}</TableCell>
                      <TableCell>{report.location}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => navigate(`/admin/reports/${report.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {report.status === 'pending' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-green-600"
                                onClick={() => handleUpdateStatus(report.id, 'approved')}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-red-600"
                                onClick={() => handleUpdateStatus(report.id, 'rejected')}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminReports;
