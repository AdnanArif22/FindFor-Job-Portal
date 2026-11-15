import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import { ApplicationProvider } from './context/ApplicationContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { FindJobsPage } from './pages/public/FindJobsPage';
import { JobDetailsPage } from './pages/public/JobDetailsPage';
import { CompaniesPage } from './pages/public/CompaniesPage';
import { CompanyDetailsPage } from './pages/public/CompanyDetailsPage';
import { AboutPage } from './pages/public/AboutPage';
import { FaqPage } from './pages/public/FaqPage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/public/LoginPage';
import { SignupPage } from './pages/public/SignupPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Candidate Pages
import { CandidateDashboardPage } from './pages/candidate/CandidateDashboardPage';
import { CandidateProfilePage } from './pages/candidate/CandidateProfilePage';
import { MyApplicationsPage } from './pages/candidate/MyApplicationsPage';
import { SavedJobsPage } from './pages/candidate/SavedJobsPage';
import { CvBuilderPage } from './pages/candidate/CvBuilderPage';
import { NotificationsPage } from './pages/candidate/NotificationsPage';

// Employer Pages
import { EmployerDashboardPage } from './pages/employer/EmployerDashboardPage';
import { ManageJobsPage } from './pages/employer/ManageJobsPage';
import { PostJobPage } from './pages/employer/PostJobPage';
import { ApplicantsPage } from './pages/employer/ApplicantsPage';
import { EmployerCompanyPage } from './pages/employer/EmployerCompanyPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { JobModerationPage } from './pages/admin/JobModerationPage';
import { CompanyManagementPage } from './pages/admin/CompanyManagementPage';
import { CategoriesPage } from './pages/admin/CategoriesPage';
import { ReportsPage } from './pages/admin/ReportsPage';

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <JobProvider>
          <ApplicationProvider>
            <Routes>
              {/* Public Website Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/jobs" element={<FindJobsPage />} />
                <Route path="/jobs/:id" element={<JobDetailsPage />} />
                <Route path="/companies" element={<CompaniesPage />} />
                <Route path="/companies/:id" element={<CompanyDetailsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/cv-builder" element={<CvBuilderPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Candidate Dashboard Routes */}
              <Route path="/candidate" element={<DashboardLayout />}>
                <Route index element={<Navigate to="/candidate/dashboard" replace />} />
                <Route path="dashboard" element={<CandidateDashboardPage />} />
                <Route path="profile" element={<CandidateProfilePage />} />
                <Route path="applications" element={<MyApplicationsPage />} />
                <Route path="saved-jobs" element={<SavedJobsPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
              </Route>

              {/* Employer Dashboard Routes */}
              <Route path="/employer" element={<DashboardLayout />}>
                <Route index element={<Navigate to="/employer/dashboard" replace />} />
                <Route path="dashboard" element={<EmployerDashboardPage />} />
                <Route path="jobs" element={<ManageJobsPage />} />
                <Route path="jobs/new" element={<PostJobPage />} />
                <Route path="applicants" element={<ApplicantsPage />} />
                <Route path="company" element={<EmployerCompanyPage />} />
              </Route>

              {/* Admin Dashboard Routes */}
              <Route path="/admin" element={<DashboardLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="users" element={<UserManagementPage />} />
                <Route path="jobs" element={<JobModerationPage />} />
                <Route path="companies" element={<CompanyManagementPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="reports" element={<ReportsPage />} />
              </Route>
            </Routes>
          </ApplicationProvider>
        </JobProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
