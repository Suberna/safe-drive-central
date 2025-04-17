
// User types
export interface User {
  id: string;
  name: string;
  email: string;
  licenseNumber: string;
  driverScore: number;
  role: 'user' | 'admin';
}

// Violation types
export interface Violation {
  id: string;
  userId: string;
  type: ViolationType;
  location: string;
  datetime: string;
  fine: number;
  lawReference: string;
  evidenceUrl: string;
  status: ViolationStatus;
}

export type ViolationType = 
  | 'no_helmet'
  | 'triplets'
  | 'number_plate'
  | 'illegal_override'
  | 'no_seat_belt'
  | 'mobile_usage'
  | 'wrong_parking'
  | 'other';

export type ViolationStatus = 
  | 'pending'
  | 'paid'
  | 'appealed'
  | 'dismissed';

// Appeal types
export interface Appeal {
  id: string;
  userId: string;
  violationId: string;
  reason: string;
  aiVerdict: 'accepted' | 'rejected' | 'pending';
  adminVerdict: 'accepted' | 'rejected' | 'pending';
  status: 'pending' | 'reviewed';
}

// Report types
export interface Report {
  id: string;
  citizenId: string;
  mediaUrl: string;
  type: ViolationType;
  location: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Zone / Heatmap types
export interface Zone {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  violationCount: number;
  recommendations: string[];
}
