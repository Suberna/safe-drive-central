
export interface User {
  id: string;
  name: string;
  email: string;
  driverScore: number;
  licenseNumber: string;
  role: 'user' | 'admin';
  status?: 'active' | 'warning' | 'suspended';
}

export interface Violation {
  id: string;
  userId: string;
  type: string;
  date: string;
  datetime: string; // Added datetime property
  location: string;
  fine: number;
  status: 'pending' | 'paid' | 'appealed' | 'dismissed';
  evidenceUrl: string;
  lawReference: string;
}

export type ViolationType = 
  'no_helmet' | 
  'triplets' | 
  'number_plate' | 
  'illegal_override' | 
  'no_seat_belt' | 
  'mobile_usage' | 
  'wrong_parking' | 
  'other';

export interface Appeal {
  id: string;
  violationId: string;
  userId: string;
  reason: string;
  evidenceUrls: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  aiVerdict: 'pending' | 'approved' | 'rejected';
  adminVerdict: 'pending' | 'approved' | 'rejected';
  adminComments?: string;
}

export interface Report {
  id: string;
  userId: string;
  type: string;
  location: string;
  description: string;
  evidenceUrls: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  vehicleNumber?: string;
}

export interface Zone {
  id: string;
  name: string;
  coordinates: [number, number];
  violationCount: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface FineCalculation {
  baseAmount: number;
  vehicleType: string;
  location: string;
  violationType: string;
  totalAmount: number;
  calculatedAt: string;
}
