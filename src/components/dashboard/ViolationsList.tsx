
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Violation } from '@/types';
import { Link } from 'react-router-dom';

interface ViolationsListProps {
  violations: Violation[];
  title?: string;
  showAll?: boolean;
  className?: string;
}

export const ViolationsList = ({ 
  violations, 
  title = "Recent Violations", 
  showAll = true,
  className 
}: ViolationsListProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {showAll && violations.length > 0 && (
          <Button variant="ghost" size="sm" asChild>
            <Link to="/violations">View all</Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {violations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No violations found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {violations.map((violation) => (
              <div key={violation.id} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium mb-1">
                      {getViolationTypeLabel(violation.type)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(violation.datetime)} • Fine: ₹{violation.fine}
                    </div>
                  </div>
                  <Badge className={getStatusBadgeVariant(violation.status)}>
                    {violation.status.charAt(0).toUpperCase() + violation.status.slice(1)}
                  </Badge>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/violations/${violation.id}`}>Details</Link>
                  </Button>
                  {violation.status === 'pending' && (
                    <Button variant="default" size="sm" asChild>
                      <Link to={`/payment/${violation.id}`}>Pay Fine</Link>
                    </Button>
                  )}
                  {violation.status !== 'appealed' && violation.status !== 'dismissed' && (
                    <Button variant="secondary" size="sm" asChild>
                      <Link to={`/appeals/new/${violation.id}`}>Appeal</Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
