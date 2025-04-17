
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AppealDetail } from '@/components/appeals/AppealDetail';
import { Appeal, Violation } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getAppealById, getUserViolations, updateAppeal } from '@/data/mockData';

const AppealDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const [appeal, setAppeal] = useState<Appeal | null>(null);
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
        const foundAppeal = getAppealById(id);
        
        if (foundAppeal && foundAppeal.userId === currentUser.id) {
          setAppeal(foundAppeal);
          
          // Get related violation
          const userViolations = getUserViolations(currentUser.id);
          const relatedViolation = userViolations.find(v => v.id === foundAppeal.violationId);
          
          if (relatedViolation) {
            setViolation(relatedViolation);
          } else {
            setNotFound(true);
            toast({
              title: "Violation not found",
              description: "The related violation could not be found",
              variant: "destructive",
            });
          }
        } else {
          setNotFound(true);
          toast({
            title: "Appeal not found",
            description: "The requested appeal could not be found",
            variant: "destructive",
          });
        }
        
        setIsLoading(false);
      }, 500);
    }
  }, [id, currentUser, navigate, toast]);

  // Simulate AI review after component mount
  useEffect(() => {
    if (appeal && appeal.aiVerdict === 'pending') {
      // Simulate AI review after 5 seconds
      const timer = setTimeout(() => {
        const updatedAppeal = updateAppeal(appeal.id, { 
          aiVerdict: Math.random() > 0.5 ? 'accepted' : 'rejected' 
        });
        
        if (updatedAppeal) {
          setAppeal(updatedAppeal);
          toast({
            title: "AI Review Complete",
            description: `The AI has ${updatedAppeal.aiVerdict} your appeal.`,
            variant: updatedAppeal.aiVerdict === 'accepted' ? 'default' : 'destructive',
          });
        }
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [appeal, toast]);

  // Simulate admin review after AI review
  useEffect(() => {
    if (appeal && appeal.aiVerdict !== 'pending' && appeal.adminVerdict === 'pending') {
      // Simulate admin review after 8 seconds
      const timer = setTimeout(() => {
        const updatedAppeal = updateAppeal(appeal.id, { 
          adminVerdict: appeal.aiVerdict, // Usually follow AI verdict
          status: 'reviewed'
        });
        
        if (updatedAppeal) {
          setAppeal(updatedAppeal);
          toast({
            title: "Admin Review Complete",
            description: `A traffic officer has ${updatedAppeal.adminVerdict} your appeal.`,
            variant: updatedAppeal.adminVerdict === 'accepted' ? 'default' : 'destructive',
          });
        }
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [appeal, toast]);

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

  if (notFound || !appeal || !violation) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Appeal Not Found</h1>
          <p className="text-gray-600 mb-6">The appeal you're looking for doesn't exist or you don't have permission to view it.</p>
          <Button onClick={() => navigate('/appeals')}>
            Back to Appeals
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Appeal Details</h1>
        <AppealDetail appeal={appeal} violation={violation} />
      </div>
    </div>
  );
};

export default AppealDetails;
