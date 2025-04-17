
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ViolationDetail } from '@/components/violations/ViolationDetail';
import { Violation } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getUserViolations } from '@/data/mockData';

const ViolationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const [violation, setViolation] = useState<Violation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (id) {
      // Simulate API call
      setTimeout(() => {
        const userViolations = getUserViolations(currentUser.id);
        const foundViolation = userViolations.find(v => v.id === id);
        
        if (foundViolation) {
          setViolation(foundViolation);
        } else {
          setNotFound(true);
          toast({
            title: "Violation not found",
            description: "The requested violation could not be found",
            variant: "destructive",
          });
        }
        
        setIsLoading(false);
      }, 500);
    }
  }, [id, currentUser, navigate, toast]);

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
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Violation Not Found</h1>
          <p className="text-gray-600 mb-6">The violation you're looking for doesn't exist or you don't have permission to view it.</p>
          <Button onClick={() => navigate('/violations')}>
            Back to Violations
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Violation Details</h1>
        {violation && <ViolationDetail violation={violation} />}
      </div>
    </div>
  );
};

export default ViolationDetails;
