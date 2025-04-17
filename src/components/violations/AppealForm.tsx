
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Violation } from '@/types';
import { useNavigate } from 'react-router-dom';

interface AppealFormProps {
  violation: Violation;
}

export const AppealForm = ({ violation }: AppealFormProps) => {
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [evidence, setEvidence] = useState<File | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reason.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a reason for your appeal",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Appeal Submitted",
        description: "Your appeal has been submitted successfully and is under review",
      });
      setIsLoading(false);
      navigate('/appeals');
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEvidence(e.target.files[0]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appeal Violation</CardTitle>
        <CardDescription>
          Explain why you believe this violation was incorrectly issued. Our AI system will review your case.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Appeal</Label>
            <Textarea
              id="reason"
              placeholder="Explain why you are appealing this violation..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={5}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="evidence">Supporting Evidence (Optional)</Label>
            <div className="border border-input rounded-md p-2">
              <input 
                type="file" 
                id="evidence" 
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-civitrack-blue-50 file:text-civitrack-blue-700
                  hover:file:bg-civitrack-blue-100"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Upload photos or videos that support your appeal. Max size: 50MB.
            </p>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>How appeals work:</strong> Your appeal will be reviewed by our AI system based on traffic laws. 
              If approved, the fine will be waived. If rejected, you will need to pay the original fine amount.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? 'Submitting...' : 'Submit Appeal'}
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={() => navigate('/violations')}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
