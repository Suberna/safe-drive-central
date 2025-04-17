
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  {
    month: 'Jan',
    noHelmet: 65,
    tripleRiding: 45,
    numberPlate: 32,
    mobileUsage: 28,
    others: 15,
  },
  {
    month: 'Feb',
    noHelmet: 59,
    tripleRiding: 42,
    numberPlate: 30,
    mobileUsage: 26,
    others: 18,
  },
  {
    month: 'Mar',
    noHelmet: 80,
    tripleRiding: 52,
    numberPlate: 28,
    mobileUsage: 33,
    others: 20,
  },
  {
    month: 'Apr',
    noHelmet: 81,
    tripleRiding: 56,
    numberPlate: 35,
    mobileUsage: 40,
    others: 22,
  },
  {
    month: 'May',
    noHelmet: 56,
    tripleRiding: 48,
    numberPlate: 30,
    mobileUsage: 29,
    others: 15,
  },
  {
    month: 'Jun',
    noHelmet: 55,
    tripleRiding: 40,
    numberPlate: 34,
    mobileUsage: 32,
    others: 16,
  },
];

interface ViolationTrendsChartProps {
  title?: string;
}

export const ViolationTrendsChart = ({ title = "Traffic Violation Trends" }: ViolationTrendsChartProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  const formattedName = {
                    noHelmet: 'No Helmet',
                    tripleRiding: 'Triple Riding',
                    numberPlate: 'Number Plate',
                    mobileUsage: 'Mobile Usage',
                    others: 'Others',
                  }[name] || name;
                  return [value, formattedName];
                }}
              />
              <Legend 
                formatter={(value) => {
                  return {
                    noHelmet: 'No Helmet',
                    tripleRiding: 'Triple Riding',
                    numberPlate: 'Number Plate',
                    mobileUsage: 'Mobile Usage',
                    others: 'Others',
                  }[value] || value;
                }}
              />
              <Bar dataKey="noHelmet" fill="#f87171" name="No Helmet" />
              <Bar dataKey="tripleRiding" fill="#60a5fa" name="Triple Riding" />
              <Bar dataKey="numberPlate" fill="#34d399" name="Number Plate" />
              <Bar dataKey="mobileUsage" fill="#a78bfa" name="Mobile Usage" />
              <Bar dataKey="others" fill="#fbbf24" name="Others" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
