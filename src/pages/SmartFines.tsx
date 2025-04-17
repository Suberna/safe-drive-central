
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { SmartFineSystem } from '@/components/fines/SmartFineSystem';

const SmartFines = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Smart Traffic Fine Management</h1>
          <p className="text-gray-600">
            Calculate and manage traffic violation fines based on location, vehicle, and violation type
          </p>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        <SmartFineSystem />
      </div>
    </div>
  );
};

export default SmartFines;
