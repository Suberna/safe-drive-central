
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { Violation } from '@/types';
import { ViolationTypeIcon } from './ViolationTypeIcon';

interface ViolationDetailProps {
  violation: Violation;
}

export const ViolationDetail = ({ violation }: ViolationDetailProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
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

  const getStatusBadgeVariant = (status: string) => {
    const variants: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      paid: 'bg-green-100 text-green-800 hover:bg-green-100',
      appealed: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      dismissed: 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    };
    return variants[status] || '';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl flex items-center gap-2">
            <ViolationTypeIcon type={violation.type} />
            {getViolationTypeLabel(violation.type)}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Issued on {formatDate(violation.datetime)}
          </p>
        </div>
        <Badge className={getStatusBadgeVariant(violation.status)}>
          {violation.status.charAt(0).toUpperCase() + violation.status.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md overflow-hidden">
          <img 
            src="https://placehold.co/600x400?text=Violation+Evidence" 
            alt="Violation Evidence" 
            className="w-full object-cover"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Location</h3>
            <p className="text-base">{violation.location}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Fine Amount</h3>
            <p className="text-base font-semibold">₹{violation.fine.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Law Reference</h3>
            <p className="text-base">{violation.lawReference}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Violation ID</h3>
            <p className="text-base">{violation.id}</p>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-2">Additional Information</h3>
          <p className="text-sm text-muted-foreground">
            This violation was detected via {violation.type === 'wrong_parking' ? 'traffic police reporting' : 'automated AI detection system'}. 
            As per the Motor Vehicle Act, this violation carries a fine of ₹{violation.fine.toLocaleString('en-IN')}.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        {violation.status === 'pending' && (
          <Button className="w-full sm:w-auto" asChild>
            <Link to={`/payment/${violation.id}`}>Pay Fine</Link>
          </Button>
        )}
        {violation.status !== 'appealed' && violation.status !== 'dismissed' && (
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to={`/appeals/new/${violation.id}`}>Appeal Violation</Link>
          </Button>
        )}
        <Button variant="secondary" className="w-full sm:w-auto" asChild>
          <Link to="/violations">Back to All Violations</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
