
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Appeal {
  id: string;
  violationId: string;
  userId: string;
  userName: string;
  violationType: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  aiVerdict: 'pending' | 'approved' | 'rejected';
}

const AdminAppeals = () => {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [appeals, setAppeals] = useState<Appeal[]>([]);
  const [filteredAppeals, setFilteredAppeals] = useState<Appeal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!currentUser || !isAdmin) {
      navigate('/login');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const mockAppeals: Appeal[] = [
        {
          id: 'a1',
          violationId: 'v1',
          userId: 'u1',
          userName: 'John Doe',
          violationType: 'No Helmet',
          submittedDate: '2025-04-10',
          status: 'pending',
          aiVerdict: 'pending'
        },
        {
          id: 'a2',
          violationId: 'v2',
          userId: 'u2',
          userName: 'Jane Smith',
          violationType: 'Triple Riding',
          submittedDate: '2025-04-08',
          status: 'pending',
          aiVerdict: 'approved'
        },
        {
          id: 'a3',
          violationId: 'v3',
          userId: 'u3',
          userName: 'Bob Wilson',
          violationType: 'Number Plate',
          submittedDate: '2025-04-05',
          status: 'approved',
          aiVerdict: 'approved'
        },
        {
          id: 'a4',
          violationId: 'v4',
          userId: 'u4',
          userName: 'Alice Brown',
          violationType: 'Mobile Usage',
          submittedDate: '2025-04-01',
          status: 'rejected',
          aiVerdict: 'rejected'
        }
      ];
      
      setAppeals(mockAppeals);
      setFilteredAppeals(mockAppeals);
      setLoading(false);
    }, 1000);
  }, [currentUser, isAdmin, navigate]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredAppeals(appeals);
    } else {
      const filtered = appeals.filter(appeal => 
        appeal.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        appeal.violationType.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAppeals(filtered);
    }
  }, [searchTerm, appeals]);

  const handleUpdateStatus = (appealId: string, newStatus: 'approved' | 'rejected') => {
    setAppeals(prevAppeals => 
      prevAppeals.map(appeal => 
        appeal.id === appealId ? { ...appeal, status: newStatus } : appeal
      )
    );
    setFilteredAppeals(prevAppeals => 
      prevAppeals.map(appeal => 
        appeal.id === appealId ? { ...appeal, status: newStatus } : appeal
      )
    );

    toast({
      title: `Appeal ${newStatus}`,
      description: `The appeal has been ${newStatus} successfully.`,
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

  const getAiVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'pending':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Approve</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Reject</Badge>;
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
          <h1 className="text-2xl font-bold mb-2">Appeals Management</h1>
          <p className="text-gray-600">Review and make decisions on user appeals with AI assistance.</p>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Search by user name or violation type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Appeals</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Violation Type</TableHead>
                  <TableHead>Submitted Date</TableHead>
                  <TableHead>AI Verdict</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppeals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No appeals found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAppeals.map((appeal) => (
                    <TableRow key={appeal.id}>
                      <TableCell className="font-medium">{appeal.userName}</TableCell>
                      <TableCell>{appeal.violationType}</TableCell>
                      <TableCell>{appeal.submittedDate}</TableCell>
                      <TableCell>{getAiVerdictBadge(appeal.aiVerdict)}</TableCell>
                      <TableCell>{getStatusBadge(appeal.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => navigate(`/admin/appeals/${appeal.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {appeal.status === 'pending' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-green-600"
                                onClick={() => handleUpdateStatus(appeal.id, 'approved')}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-red-600"
                                onClick={() => handleUpdateStatus(appeal.id, 'rejected')}
                              >
                                <X className="h-4 w-4" />
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

export default AdminAppeals;
