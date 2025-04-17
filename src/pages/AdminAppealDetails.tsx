
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, User, Calendar, FileText, Tag, AlertTriangle, Car, CheckCircle, XCircle, Scale } from 'lucide-react';

interface Appeal {
  id: string;
  violationId: string;
  userId: string;
  userName: string;
  violationType: string;
  violationDate: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  aiVerdict: 'pending' | 'approved' | 'rejected';
  aiReason: string;
  appealReason: string;
  evidence: string;
  violationLocation: string;
  vehicleNumber: string;
  fine: number;
}

export const AdminAppealDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [appeal, setAppeal] = useState<Appeal | null>(null);
  const [adminComments, setAdminComments] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser || !isAdmin) {
      navigate('/login');
      return;
    }

    // Simulate API call to fetch the appeal details
    setTimeout(() => {
      const mockAppeal: Appeal = {
        id: id || 'a1',
        violationId: 'v1',
        userId: 'u1',
        userName: 'John Doe',
        violationType: 'No Helmet',
        violationDate: '2025-04-05',
        submittedDate: '2025-04-10',
        status: 'pending',
        aiVerdict: 'approved',
        aiReason: 'Based on the evidence provided, the appellant appears to be wearing a helmet that meets safety standards, but was partially obscured in the original violation image.',
        appealReason: 'I was wearing a helmet at the time of the alleged violation. The image quality is poor and it's difficult to see clearly, but I've attached a clearer image showing I was indeed wearing a helmet.',
        evidence: 'https://placehold.co/600x400?text=Appeal+Evidence',
        violationLocation: 'MG Road, Bangalore',
        vehicleNumber: 'KA-01-AB-1234',
        fine: 1000
      };
      
      setAppeal(mockAppeal);
      setLoading(false);
    }, 1000);
  }, [id, currentUser, isAdmin, navigate]);

  const handleApprove = () => {
    if (appeal) {
      setAppeal({ ...appeal, status: 'approved' });
      toast({
        title: "Appeal approved",
        description: "The violation has been dismissed and the fine has been waived.",
        variant: "default",
      });
    }
  };

  const handleReject = () => {
    if (appeal) {
      setAppeal({ ...appeal, status: 'rejected' });
      toast({
        title: "Appeal rejected",
        description: "The violation and fine remain in effect.",
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

  if (!appeal) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Appeal Not Found</h1>
          <p className="text-gray-600 mb-6">The appeal you're looking for could not be found.</p>
          <Button onClick={() => navigate('/admin/appeals')}>
            Back to Appeals
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
            onClick={() => navigate('/admin/appeals')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Appeal Details</h1>
            <p className="text-gray-600">Review appeal details and make a decision.</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Appeal {appeal.id}</CardTitle>
              {getStatusBadge(appeal.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Appellant
                </p>
                <p className="font-medium">{appeal.userName}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  Violation Type
                </p>
                <p className="font-medium">{appeal.violationType}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Violation Date
                </p>
                <p>{appeal.violationDate}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Appeal Submitted
                </p>
                <p>{appeal.submittedDate}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center">
                  <Car className="h-4 w-4 mr-2" />
                  Vehicle Number
                </p>
                <p className="font-mono">{appeal.vehicleNumber}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Fine Amount
                </p>
                <p className="font-medium">₹{appeal.fine.toLocaleString('en-IN')}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <p className="text-sm font-medium">Appeal Reason</p>
              <div className="bg-muted p-3 rounded-md text-sm">
                {appeal.appealReason}
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Evidence Provided</p>
              <div className="rounded-md overflow-hidden border">
                <img 
                  src={appeal.evidence} 
                  alt="Appeal evidence" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            <div className="space-y-3 bg-blue-50 p-4 rounded-md border border-blue-100">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium flex items-center text-blue-800">
                  <Scale className="h-4 w-4 mr-2" />
                  AI Jury Verdict
                </p>
                {getAiVerdictBadge(appeal.aiVerdict)}
              </div>
              <div className="bg-white bg-opacity-70 p-3 rounded-md text-sm text-blue-900">
                {appeal.aiReason}
              </div>
            </div>
            
            {appeal.status === 'pending' && (
              <div className="space-y-3">
                <p className="text-sm font-medium">Admin Comments (Optional)</p>
                <Textarea 
                  placeholder="Add your comments or reason for the decision..." 
                  value={adminComments}
                  onChange={(e) => setAdminComments(e.target.value)}
                  rows={3}
                />
              </div>
            )}
          </CardContent>
          
          {appeal.status === 'pending' && (
            <CardFooter className="flex justify-end space-x-4 pt-0">
              <Button
                variant="outline"
                className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                onClick={handleReject}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject Appeal
              </Button>
              <Button
                onClick={handleApprove}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve Appeal
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};
