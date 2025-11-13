// Navigation routes
export const ROUTES = {
  HOME: '/',
  EDU_REV: '/edu-rev',
  COURSES: {
    BASE: '/edurev/courses',
    BY_CATEGORY: (category: string) => `/edurev/courses/${category}`
  },
  FORMS: {
    RPL: (courseCode?: string) => `/edurev/apply/rpl${courseCode ? `/${courseCode}` : ''}`,
    MOOC: (courseCode?: string) => `/edurev/apply/mooc${courseCode ? `/${courseCode}` : ''}`,
    GRADE_UPGRADE: (courseCode?: string) => `/edurev/apply/grade-upgradation${courseCode ? `/${courseCode}` : ''}`,
    PROJECT: (courseCode?: string) => `/edurev/apply/project${courseCode ? `/${courseCode}` : ''}`,
    EXTRA_CREDITS: (courseCode?: string) => `/edurev/apply/extra-credits${courseCode ? `/${courseCode}` : ''}`,
    SOCIAL_MEDIA: (courseCode?: string) => `/edurev/apply/social-media${courseCode ? `/${courseCode}` : ''}`,
    REVENUE: (courseCode?: string) => `/edurev/apply/revenue-generation${courseCode ? `/${courseCode}` : ''}`,
    INTERNSHIPS: (courseCode?: string) => `/edurev/apply/internships${courseCode ? `/${courseCode}` : ''}`,
    COMMUNITY: (courseCode?: string) => `/edurev/apply/community-service${courseCode ? `/${courseCode}` : ''}`,
    CO_CURRICULAR: (courseCode?: string) => `/edurev/apply/co-curricular${courseCode ? `/${courseCode}` : ''}`,
    ATTENDANCE: (courseCode?: string) => `/edurev/apply/attendance-relaxation${courseCode ? `/${courseCode}` : ''}`,
    DUTY_LEAVES: (courseCode?: string) => `/edurev/apply/duty-leaves${courseCode ? `/${courseCode}` : ''}`
  },
  BEYOND_ACADEMICS: {
    BASE: '/beyond-academics',
    ADD_ACHIEVEMENT: '/beyond-academics/add',
    LEADERBOARD: '/beyond-academics/leaderboard'
  },
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup'
  },
  DASHBOARD: '/dashboard',
  ACHIEVEMENTS: '/achievements',
  PROJECTS: '/projects',
  STUDENT_REFERRAL: '/student-referral'
} as const;

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh'
  },
  ACHIEVEMENTS: {
    BASE: '/api/achievements',
    BY_ID: (id: string) => `/api/achievements/${id}`,
    BY_USER: (userId: string) => `/api/achievements/user/${userId}`
  },
  COURSES: {
    BASE: '/api/courses',
    BY_CATEGORY: (category: string) => `/api/courses/category/${category}`,
    BY_ID: (id: string) => `/api/courses/${id}`
  },
  FILES: {
    UPLOAD: '/api/files/upload',
    DOWNLOAD: (id: string) => `/api/files/${id}`,
    DELETE: (id: string) => `/api/files/${id}`
  }
} as const;