
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface DriverScoreCardProps {
  score: number;
  className?: string;
}

export const DriverScoreCard = ({ score, className }: DriverScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score <= 40) return 'bg-red-500';
    if (score <= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getScoreText = (score: number) => {
    if (score <= 40) return 'Poor - License Suspension Risk';
    if (score <= 70) return 'Average - Improvement Needed';
    if (score <= 90) return 'Good - Keep it up!';
    return 'Excellent - Safe Driver';
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Driver Safety Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-baseline mb-2">
          <div className="text-3xl font-bold">{score}</div>
          <div className="text-sm text-muted-foreground">out of 100</div>
        </div>

        <Progress 
          value={score} 
          max={100} 
          className="h-3 mb-2"
          indicatorClassName={getScoreColor(score)}
        />

        <div className="text-sm mt-4 font-medium">{getScoreText(score)}</div>
        
        <div className="flex justify-between mt-4 text-xs text-muted-foreground">
          <div>Critical</div>
          <div>Average</div>
          <div>Excellent</div>
        </div>
      </CardContent>
    </Card>
  );
};
