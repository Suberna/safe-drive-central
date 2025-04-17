
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppealForm } from '@/components/violations/AppealForm';
import { Violation } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getUserViolations } from '@/data/mockData';

const NewAppeal = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const [violation, setViolation] = useState<Violation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
          if (foundViolation.status === 'appealed') {
            setError('This violation has already been appealed.');
            toast({
              title: "Appeal already exists",
              description: "You have already appealed this violation",
              variant: "destructive",
            });
          } else if (foundViolation.status === 'dismissed') {
            setError('This violation has been dismissed and cannot be appealed.');
            toast({
              title: "Violation dismissed",
              description: "This violation has been dismissed and cannot be appealed",
              variant: "destructive",
            });
          } else {
            setViolation(foundViolation);
          }
        } else {
          setError('Violation not found.');
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
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Unable to Create Appeal</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/violations')}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Back to Violations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Appeal Violation</h1>
        {violation && <AppealForm violation={violation} />}
      </div>
    </div>
  );
};

export default NewAppeal;
