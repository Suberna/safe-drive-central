
import { 
  ShieldAlert, 
  Users, 
  FileWarning, 
  AlertTriangle, 
  BellRing, 
  Smartphone, 
  Car,
  FileQuestion
} from 'lucide-react';
import { ViolationType } from '@/types';

interface ViolationTypeIconProps {
  type: ViolationType;
  className?: string;
  size?: number;
}

export const ViolationTypeIcon = ({ type, className, size = 20 }: ViolationTypeIconProps) => {
  const iconMap = {
    no_helmet: ShieldAlert,
    triplets: Users,
    number_plate: FileWarning,
    illegal_override: AlertTriangle,
    no_seat_belt: BellRing,
    mobile_usage: Smartphone,
    wrong_parking: Car,
    other: FileQuestion
  };

  const Icon = iconMap[type] || FileQuestion;

  return <Icon className={className} size={size} />;
};
