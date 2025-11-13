// Common form field types
export interface BaseFormData {
  studentName: string;
  rollNumber: string;
  department: string;
  year: string;
  semester: string;
  courseCode: string;
}

export interface FileUpload {
  file: File | null;
  name: string;
  size: number;
  type: string;
}

// EduRev specific types
export interface EduRevFormData extends BaseFormData {
  activityType?: string;
  activityTitle?: string;
  description?: string;
  duration?: string;
  role?: string;
  benefits?: string;
  justification?: string;
}

export interface RPLFormData extends BaseFormData {
  skillsAcquired: string;
  experienceDetails: string;
  assessmentType: string;
  competencyLevel: string;
  certificationDetails?: string;
}

export interface ProjectFormData extends BaseFormData {
  projectName: string;
  projectType: string;
  duration: string;
  teamSize: string;
  technologies: string;
  description: string;
  outcomes: string;
  mentorName?: string;
}

// Achievement types
export interface Achievement {
  id: string;
  title: string;
  category: string;
  description?: string;
  points: number;
  status: 'pending' | 'approved' | 'rejected' | 'under-review';
  submittedAt: string;
  reviewedAt?: string;
  evidence: FileUpload[];
  benefits?: string[];
  reviewComments?: string;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  department: string;
  year: string;
  semester: string;
  profileImage?: string;
  achievements: Achievement[];
  totalPoints: number;
  rank?: number;
}

// Course types
export interface Course {
  id: string;
  code: string;
  name: string;
  category: string;
  credits: number;
  description?: string;
  benefits: string[];
  eligibilityCriteria?: string[];
}

// Dashboard stats
export interface DashboardStats {
  totalAchievements: number;
  totalPoints: number;
  rank: number;
  pendingReview: number;
  approvedThisMonth: number;
  rejectedThisMonth: number;
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}