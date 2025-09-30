import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import RoleSelectionScreen from './screens/RoleSelectionScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import RecruiterDashboard from './recruiters/screens/RecruiterDashboard';
import AlumniDirectoryScreen from './screens/AlumniDirectoryScreen';

// Recruiter screens
import CandidateMatchingScreen from './recruiters/screens/CandidateMatchingScreen';
import JobPostingScreen from './recruiters/screens/JobPostingScreen';
import RecruiterAnalyticsScreen from './recruiters/screens/RecruiterAnalyticsScreen';
import RecruiterSettingsScreen from './recruiters/screens/RecruiterSettingsScreen';
import RecruitmentPipelineScreen from './recruiters/screens/RecruitmentPipelineScreen';
import TalentSearchScreen from './recruiters/screens/TalentSearchScreen';
import ProfileScreen from './screens/ProfileScreen';
import EventsScreen from './screens/EventsScreen';
import LoadingSpinner from './components/LoadingSpinner';

// Student screens
import StudentDashboard from './students/screens/StudentDashboard';
import MentorshipScreen from './students/screens/MentorshipScreen';
import JobPortalScreen from './students/screens/JobPortalScreen';
import StudentAlumniScreen from './students/screens/StudentAlumniScreen';
import StudentEventsScreen from './students/screens/StudentEventsScreen';
import StudentProfileScreen from './students/screens/StudentProfileScreen';

// Institute screens
import InstituteDashboard from './institutes/screens/InstituteDashboard';
import AlumniManagementScreen from './institutes/screens/AlumniManagementScreen';
import AnalyticsDashboardScreen from './institutes/screens/AnalyticsDashboardScreen';
import EventOrganizationScreen from './institutes/screens/EventOrganizationScreen';
import PlacementPortalScreen from './institutes/screens/PlacementPortalScreen';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/select-role" replace />;
  }

  return children;
};

// Public Route Component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Main App Layout Component
const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

// App Routes Component
const AppRoutes = () => {
  const { currentUser } = useAuth();
  
  return (
    <Routes>
      {/* Role Selection Route */}
      <Route
        path="/select-role"
        element={
          <PublicRoute>
            <RoleSelectionScreen />
          </PublicRoute>
        }
      />

      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginScreen />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterScreen />
          </PublicRoute>
        }
      />

      {/* Protected Routes - Role-based routing */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {currentUser?.role === 'Student' ? (
              <StudentDashboard />
            ) : currentUser?.role === 'Institute' ? (
              <Navigate to="/institute/dashboard" replace />
            ) : currentUser?.role === 'Recruiter' ? (
              <Navigate to="/recruiters/dashboard" replace />
            ) : (
              <AppLayout>
                <DashboardScreen />
              </AppLayout>
            )}
          </ProtectedRoute>
        }
      />

      {/* Student-specific routes */}
      <Route
        path="/students/mentorship"
        element={
          <ProtectedRoute>
            <MentorshipScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/students/jobs"
        element={
          <ProtectedRoute>
            <JobPortalScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/students/alumni"
        element={
          <ProtectedRoute>
            <StudentAlumniScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/students/events"
        element={
          <ProtectedRoute>
            <StudentEventsScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/students/profile"
        element={
          <ProtectedRoute>
            <StudentProfileScreen />
          </ProtectedRoute>
        }
      />

      {/* Recruiter-specific routes */}
      <Route
        path="/recruiters/dashboard"
        element={
          <ProtectedRoute>
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiters/jobs"
        element={
          <ProtectedRoute>
            <JobPostingScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiters/talent-search"
        element={
          <ProtectedRoute>
            <TalentSearchScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiters/matching"
        element={
          <ProtectedRoute>
            <CandidateMatchingScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiters/pipeline"
        element={
          <ProtectedRoute>
            <RecruitmentPipelineScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiters/analytics"
        element={
          <ProtectedRoute>
            <RecruiterAnalyticsScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiters/settings"
        element={
          <ProtectedRoute>
            <RecruiterSettingsScreen />
          </ProtectedRoute>
        }
      />

      {/* Institute-specific routes */}
      <Route
        path="/institute/dashboard"
        element={
          <ProtectedRoute>
            <InstituteDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/institute/alumni"
        element={
          <ProtectedRoute>
            <AlumniManagementScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/institute/analytics"
        element={
          <ProtectedRoute>
            <AnalyticsDashboardScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/institute/events"
        element={
          <ProtectedRoute>
            <EventOrganizationScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/institute/placement"
        element={
          <ProtectedRoute>
            <PlacementPortalScreen />
          </ProtectedRoute>
        }
      />

      {/* Alumni routes */}
      <Route
        path="/alumni"
        element={
          <ProtectedRoute>
            <AlumniDirectoryScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/directory"
        element={
          <ProtectedRoute>
            <AppLayout>
              <AlumniDirectoryScreen />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfileScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ProfileScreen />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <AppLayout>
              {currentUser?.role === 'Student' ? <StudentEventsScreen /> : <EventsScreen />}
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Default redirects */}
      <Route
        path="/"
        element={<Navigate to="/select-role" replace />}
      />
      
      {/* Catch-all route for 404 */}
      <Route
        path="*"
        element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-full h-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h1 className="mt-2 text-4xl font-bold text-gray-900">404</h1>
              <h2 className="mt-2 text-lg font-medium text-gray-600">Page not found</h2>
              <p className="mt-1 text-sm text-gray-500">
                The page you are looking for does not exist.
              </p>
              <div className="mt-6">
                <a
                  href="/dashboard"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Go to Dashboard
                </a>
              </div>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;