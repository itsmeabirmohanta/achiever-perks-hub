// Course-related constants
export const COURSE_CATEGORIES = {
  CORE: 'Core Courses',
  NON_CORE: 'Non-Core Courses',
  ELECTIVES: 'Electives',
  PROJECTS: 'Projects'
} as const;

export const ASSESSMENT_TYPES = [
  { value: "exam", label: "Written Examination" },
  { value: "project", label: "Project Submission" },
  { value: "demo", label: "Practical Demonstration" },
  { value: "portfolio", label: "Portfolio Review" },
] as const;

export const COMPETENCY_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
] as const;

export const BUSINESS_MODELS = [
  "B2C (Business to Consumer)",
  "B2B (Business to Business)",
  "B2B2C (Business to Business to Consumer)",
  "Marketplace",
  "Subscription",
  "One-time Purchase",
  "Commission-based",
  "Advertising Revenue",
  "Any other",
] as const;

export const ACTIVITY_ROLES = [
  "Organizer/Coordinator",
  "Participant",
  "Facilitator/Speaker",
  "Volunteer",
  "Team Lead",
  "Mentor",
  "Any other"
] as const;

export const FILE_CONSTRAINTS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
  MAX_SIZE_MB: 10
} as const;

export const VERIFICATION_STEPS = [
  { step: 1, title: "Submission", description: "You submit achievement details and documents", status: "active" },
  { step: 2, title: "Faculty Review", description: "Faculty verifies your submission's authenticity", status: "pending" },
  { step: 3, title: "Benefit Calculation", description: "System calculates applicable benefits", status: "pending" },
  { step: 4, title: "Approval", description: "Approved achievements are added to your profile", status: "pending" },
  { step: 5, title: "Benefit Redemption", description: "Claim your benefits through the dashboard", status: "pending" }
] as const;