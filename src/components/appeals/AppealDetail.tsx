
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Appeal, Violation } from '@/types';
import { ViolationTypeIcon } from '@/components/violations/ViolationTypeIcon';
import { FileText, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AppealDetailProps {
  appeal: Appeal;
  violation: Violation;
}

export const AppealDetail = ({ appeal, violation }: AppealDetailProps) => {
  const [showFullReason, setShowFullReason] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }).format(date);
  };

  const getViolationTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      no_helmet: 'No Helmet',
      triplets: 'Triple Riding',
      number_plate: 'Number Plate Issue',
      illegal_override: 'Illegal Override',
      no_seat_belt: 'No Seat Belt',
      mobile_usage: 'Mobile Usage',
      wrong_parking: 'Wrong Parking',
      other: 'Other Violation'
    };
    return types[type] || type;
  };

  const getVerdictBadge = (verdict: string) => {
    const variants: Record<string, { color: string, icon: React.ReactNode }> = {
      pending: { 
        color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100', 
        icon: <Clock className="w-4 h-4 mr-1" />
      },
      accepted: { 
        color: 'bg-green-100 text-green-800 hover:bg-green-100', 
        icon: <CheckCircle className="w-4 h-4 mr-1" />
      },
      rejected: { 
        color: 'bg-red-100 text-red-800 hover:bg-red-100', 
        icon: <XCircle className="w-4 h-4 mr-1" />
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

  const calculateFinalVerdict = () => {
    if (appeal.adminVerdict === 'accepted' || appeal.aiVerdict === 'accepted') {
      return 'accepted';
    } else if (appeal.adminVerdict === 'rejected' && appeal.aiVerdict === 'rejected') {
      return 'rejected';
    }
    return 'pending';
  };

  const finalVerdict = calculateFinalVerdict();

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Appeal Details
          </CardTitle>
          <Badge 
            className={
              appeal.status === 'reviewed' 
                ? 'bg-green-50 text-green-700 border-green-200' 
                : 'bg-blue-50 text-blue-700 border-blue-200'
            }
          >
            {appeal.status === 'reviewed' ? 'Reviewed' : 'Under Review'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Related Violation</h3>
              <div className="flex items-center">
                <ViolationTypeIcon type={violation.type} className="w-5 h-5 mr-2" />
                <span className="font-medium">{getViolationTypeLabel(violation.type)}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {formatDate(violation.datetime)} • Fine: ₹{violation.fine}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Final Verdict</h3>
              <div className="flex items-center">
                {finalVerdict === 'pending' ? (
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    In Progress
                  </Badge>
                ) : finalVerdict === 'accepted' ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Appeal Accepted
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    Appeal Rejected
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Your Appeal Reason</h3>
          <div className="bg-white border rounded-md p-4">
            <p className={`text-gray-700 ${!showFullReason && appeal.reason.length > 200 ? 'line-clamp-3' : ''}`}>
              {appeal.reason}
            </p>
            {appeal.reason.length > 200 && (
              <Button 
                variant="link" 
                onClick={() => setShowFullReason(!showFullReason)}
                className="p-0 h-auto mt-2 text-blue-600"
              >
                {showFullReason ? 'Show less' : 'Read more'}
              </Button>
            )}
          </div>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-2">AI Review</h3>
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Verdict</span>
                {getVerdictBadge(appeal.aiVerdict)}
              </div>
              <p className="text-sm text-gray-600">
                {appeal.aiVerdict === 'pending' 
                  ? 'Your appeal is being processed by our AI system. This usually takes 1-2 business days.'
                  : appeal.aiVerdict === 'accepted'
                    ? 'Our AI has found sufficient evidence to support your appeal claim.'
                    : 'Our AI has reviewed your appeal and found insufficient evidence to support your claim.'}
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Admin Review</h3>
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Verdict</span>
                {getVerdictBadge(appeal.adminVerdict)}
              </div>
              <p className="text-sm text-gray-600">
                {appeal.adminVerdict === 'pending' 
                  ? 'Your appeal is waiting for review by a traffic enforcement officer.'
                  : appeal.adminVerdict === 'accepted'
                    ? 'A traffic enforcement officer has accepted your appeal.'
                    : 'A traffic enforcement officer has reviewed and rejected your appeal.'}
              </p>
            </div>
          </div>
        </div>

        {finalVerdict === 'rejected' && (
          <div className="bg-red-50 border border-red-100 rounded-md p-4">
            <h3 className="text-sm font-semibold text-red-800 mb-2">Appeal Rejected</h3>
            <p className="text-sm text-red-700">
              Your appeal has been rejected. You are required to pay the original fine amount.
            </p>
            <Button variant="destructive" size="sm" className="mt-2" asChild>
              <Link to={`/payment/${violation.id}`}>Pay Fine</Link>
            </Button>
          </div>
        )}
        
        {finalVerdict === 'accepted' && (
          <div className="bg-green-50 border border-green-100 rounded-md p-4">
            <h3 className="text-sm font-semibold text-green-800 mb-2">Appeal Accepted</h3>
            <p className="text-sm text-green-700">
              Congratulations! Your appeal has been accepted. The fine has been waived.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" asChild className="w-full sm:w-auto">
          <Link to={`/violations/${violation.id}`}>View Violation</Link>
        </Button>
        <Button variant="secondary" asChild className="w-full sm:w-auto">
          <Link to="/appeals">Back to Appeals</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
