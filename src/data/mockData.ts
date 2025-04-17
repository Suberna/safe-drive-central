import { User, Violation, Appeal, Report, Zone } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    licenseNumber: 'DL-0123456789',
    driverScore: 85,
    role: 'user'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    licenseNumber: 'DL-9876543210',
    driverScore: 95,
    role: 'user'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@civitrack.gov',
    licenseNumber: 'DL-ADMIN1234',
    driverScore: 100,
    role: 'admin'
  }
];

// Mock Violations
export const violations: Violation[] = [
  {
    id: 'v1',
    userId: '1',
    type: 'no_helmet',
    location: '28.6139° N, 77.2090° E',
    datetime: '2023-06-15T08:30:00Z',
    fine: 1000,
    lawReference: 'MV Act Sec. 129',
    evidenceUrl: '/violations/no-helmet.jpg',
    status: 'pending'
  },
  {
    id: 'v2',
    userId: '1',
    type: 'mobile_usage',
    location: '28.6129° N, 77.2290° E',
    datetime: '2023-07-22T14:45:00Z',
    fine: 1500,
    lawReference: 'MV Act Sec. 184',
    evidenceUrl: '/violations/mobile-usage.jpg',
    status: 'paid'
  },
  {
    id: 'v3',
    userId: '2',
    type: 'triplets',
    location: '28.5585° N, 77.1993° E',
    datetime: '2023-08-05T18:20:00Z',
    fine: 2000,
    lawReference: 'MV Act Sec. 128',
    evidenceUrl: '/violations/triplets.jpg',
    status: 'appealed'
  },
  {
    id: 'v4',
    userId: '1',
    type: 'wrong_parking',
    location: '28.6304° N, 77.2177° E',
    datetime: '2023-09-10T10:15:00Z',
    fine: 800,
    lawReference: 'MV Act Sec. 177',
    evidenceUrl: '/violations/wrong-parking.jpg',
    status: 'pending'
  }
];

// Mock Appeals
export let appeals: Appeal[] = [
  {
    id: 'a1',
    userId: '1',
    violationId: 'v1',
    reason: 'I was wearing a helmet but it may not be visible in the photo due to the angle.',
    aiVerdict: 'rejected',
    adminVerdict: 'pending',
    status: 'pending'
  },
  {
    id: 'a2',
    userId: '2',
    violationId: 'v3',
    reason: 'There were only two people on the motorcycle, the third person visible was standing behind us on the footpath.',
    aiVerdict: 'pending',
    adminVerdict: 'pending',
    status: 'pending'
  }
];

// Mock Reports
export const reports: Report[] = [
  {
    id: 'r1',
    citizenId: '2',
    mediaUrl: '/reports/no-helmet-report.jpg',
    type: 'no_helmet',
    location: '28.6139° N, 77.2090° E',
    date: '2023-09-12T09:40:00Z',
    status: 'pending'
  },
  {
    id: 'r2',
    citizenId: '1',
    mediaUrl: '/reports/wrong-parking-report.jpg',
    type: 'wrong_parking',
    location: '28.6304° N, 77.2177° E',
    date: '2023-09-15T11:25:00Z',
    status: 'approved'
  }
];

// Mock Zones (for heatmap)
export const zones: Zone[] = [
  {
    id: 'z1',
    location: {
      lat: 28.6139,
      lng: 77.2090
    },
    violationCount: 35,
    recommendations: ['Add speed breakers', 'Install traffic camera']
  },
  {
    id: 'z2',
    location: {
      lat: 28.6304,
      lng: 77.2177
    },
    violationCount: 28,
    recommendations: ['Add no parking signs', 'Regular patrolling']
  },
  {
    id: 'z3',
    location: {
      lat: 28.5585,
      lng: 77.1993
    },
    violationCount: 42,
    recommendations: ['Traffic signal optimization', 'Add signboards']
  }
];

// Create a new appeal
export const createAppeal = (appeal: Appeal): Appeal => {
  appeals.push(appeal);
  
  // Update the violation status to appealed
  const violationIndex = violations.findIndex(v => v.id === appeal.violationId);
  if (violationIndex !== -1) {
    violations[violationIndex].status = 'appealed';
  }
  
  return appeal;
};

// Update an existing appeal
export const updateAppeal = (appealId: string, updateData: Partial<Appeal>): Appeal | null => {
  const appealIndex = appeals.findIndex(a => a.id === appealId);
  
  if (appealIndex !== -1) {
    appeals[appealIndex] = { ...appeals[appealIndex], ...updateData };
    return appeals[appealIndex];
  }
  
  return null;
};

// Get appeal by ID
export const getAppealById = (appealId: string): Appeal | undefined => {
  return appeals.find(a => a.id === appealId);
};

// Get user violations
export const getUserViolations = (userId: string): Violation[] => {
  return violations.filter(violation => violation.userId === userId);
};

// Get user appeals
export const getUserAppeals = (userId: string): Appeal[] => {
  return appeals.filter(appeal => appeal.userId === userId);
};

// Get all violations for admin
export const getAllViolations = (): Violation[] => {
  return violations;
};

// Get user details
export const getUserById = (userId: string): User | undefined => {
  return users.find(user => user.id === userId);
};

// Authentication helpers
export const loginUser = (email: string, password: string): User | null => {
  // In a real app, we would verify the password
  const user = users.find(u => u.email === email);
  return user || null;
};

// Get mock current user (for development)
export const getCurrentUser = (): User => {
  return users[0]; // Default to first user for development
};

export const getCurrentAdmin = (): User => {
  return users[2]; // Admin user
};
