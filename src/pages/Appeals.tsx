
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { getUserAppeals } from '@/data/mockData';
import { Appeal } from '@/types';
import { formatDistance } from 'date-fns';
import { MessageSquare, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Appeals = () => {
  const { currentUser } = useAuth();
  const [appeals, setAppeals] = useState<Appeal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const userAppeals = getUserAppeals(currentUser.id);
      setAppeals(userAppeals);
      setIsLoading(false);
    }, 500);
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const getVerdictBadge = (verdict: string) => {
    const variants: Record<string, { color: string, icon: React.ReactNode }> = {
      pending: { 
        color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100', 
        icon: <AlertCircle className="w-3 h-3 mr-1" />
      },
      accepted: { 
        color: 'bg-green-100 text-green-800 hover:bg-green-100', 
        icon: <CheckCircle className="w-3 h-3 mr-1" />
      },
      rejected: { 
        color: 'bg-red-100 text-red-800 hover:bg-red-100', 
        icon: <XCircle className="w-3 h-3 mr-1" />
      }
    };
    
    const { color, icon } = variants[verdict] || variants.pending;
    
    return (
      <Badge className={`flex items-center ${color}`}>
        {icon}
        {verdict.charAt(0).toUpperCase() + verdict.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Appeals</h1>
          <Button variant="outline" onClick={() => navigate('/violations')}>
            View Violations
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Appeal History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {appeals.length === 0 ? (
              <div className="text-center py-10">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-lg font-medium">No Appeals</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You haven't submitted any appeals yet.
                </p>
                <Button 
                  className="mt-4" 
                  variant="outline" 
                  onClick={() => navigate('/violations')}
                >
                  View My Violations
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Violation</TableHead>
                      <TableHead>AI Verdict</TableHead>
                      <TableHead>Admin Verdict</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appeals.map((appeal) => (
                      <TableRow key={appeal.id}>
                        <TableCell className="font-medium">
                          {formatDistance(new Date(), new Date(), { addSuffix: true })}
                        </TableCell>
                        <TableCell>{appeal.violationId}</TableCell>
                        <TableCell>{getVerdictBadge(appeal.aiVerdict)}</TableCell>
                        <TableCell>{getVerdictBadge(appeal.adminVerdict)}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={appeal.status === 'reviewed' 
                              ? 'bg-green-50 text-green-700 border-green-200' 
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                            }
                          >
                            {appeal.status.charAt(0).toUpperCase() + appeal.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            asChild
                          >
                            <Link to={`/appeals/${appeal.id}`}>View Details</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Appeals;
