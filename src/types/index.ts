
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
  location: string;
  fine: number;
  status: 'pending' | 'paid' | 'appealed' | 'dismissed';
  evidenceUrl: string;
  lawReference: string;
}

export interface Appeal {
  id: string;
  violationId: string;
  userId: string;
  reason: string;
  evidenceUrls: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  aiVerdict?: 'pending' | 'approved' | 'rejected';
  adminVerdict?: 'approved' | 'rejected';
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
