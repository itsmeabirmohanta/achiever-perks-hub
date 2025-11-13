import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { performanceMonitor } from "@/shared/utils/performanceMonitor";
import { CSPManager } from "@/shared/utils/security";

// Feature-based imports
import Index from "./pages/Index";
import { 
  EduRevolutionPage,
  AddAchievementPage as EduRevAddAchievement,
  CategoryCoursesPage as EduRevCategoryCourses,
  RPLForm,
  MOOCForm,
  GradeUpgradeForm,
  ProjectForm,
  ExtraCreditsForm,
  SocialMediaForm,
  RevenueGenerationForm,
  InternshipsForm,
  CommunityServiceForm,
  CoCurricularForm,
  AttendanceRelaxationForm,
  DutyLeavesForm
} from "@/features/edu-revolution";

import {
  BeyondAcademicsPage,
  AddAchievementPage as BeyondAcademicsAddAchievement,
  LeaderboardPage as BeyondAcademicsLeaderboard
} from "@/features/beyond-academics";

import { DashboardPage as Dashboard } from "@/features/dashboard";
import { LoginPage as Login, SignupPage as Signup } from "@/features/auth";
import { ProjectsPage as Projects } from "@/features/projects";

// Remaining pages (to be organized later)
import Courses from "./pages/Courses";
import StudentReferral from "./pages/StudentReferral";
import Achievements from "./pages/Achievements";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

const App = () => {
  useEffect(() => {
    // Initialize performance monitoring
    performanceMonitor.recordMetric('app_start', performance.now());
    
    // Apply security headers
    CSPManager.applyCSP({
      'script-src': ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
      'connect-src': ["'self'", 'https://oaolfwlfnrmrpukpkqxf.supabase.co', 'wss://realtime.supabase.co'],
    });

    // Track app initialization
    performanceMonitor.recordInteraction('app_initialized');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/edu-rev" element={<EduRevolutionPage />} />
          <Route path="/edurev/courses/:categoryName" element={<EduRevCategoryCourses />} />
          <Route path="/edurev/apply/rpl/:courseCode?" element={<RPLForm />} />
          <Route path="/edurev/apply/mooc/:courseCode?" element={<MOOCForm />} />
          <Route path="/edurev/apply/grade-upgradation/:courseCode?" element={<GradeUpgradeForm />} />
          <Route path="/edurev/apply/project/:courseCode?" element={<ProjectForm />} />
          <Route path="/edurev/apply/extra-credits/:courseCode?" element={<ExtraCreditsForm />} />
          <Route path="/edurev/apply/social-media/:courseCode?" element={<SocialMediaForm />} />
          <Route path="/edurev/apply/revenue-generation/:courseCode?" element={<RevenueGenerationForm />} />
          <Route path="/edurev/apply/internships/:courseCode?" element={<InternshipsForm />} />
          <Route path="/edurev/apply/community-service/:courseCode?" element={<CommunityServiceForm />} />
          <Route path="/edurev/apply/co-curricular/:courseCode?" element={<CoCurricularForm />} />
          <Route path="/edurev/apply/attendance-relaxation/:courseCode?" element={<AttendanceRelaxationForm />} />
          <Route path="/edurev/apply/duty-leaves/:courseCode?" element={<DutyLeavesForm />} />
          <Route path="/edurev/apply/:categoryName/:courseCode" element={<EduRevAddAchievement />} />
          <Route path="/edurev-add-achievement" element={<EduRevAddAchievement />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/student-referral" element={<StudentReferral />} />
          <Route path="/beyond-academics" element={<BeyondAcademicsPage />} />
          <Route path="/beyond-academics-add-achievement" element={<BeyondAcademicsAddAchievement />} />
          <Route path="/beyond-academics-leaderboard" element={<BeyondAcademicsLeaderboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
