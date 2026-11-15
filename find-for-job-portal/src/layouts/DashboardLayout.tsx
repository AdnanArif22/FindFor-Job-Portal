import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApplications } from '../context/ApplicationContext';
import { useJobs } from '../context/JobContext';
import { ToastContainer } from '../components/common/Toast';
import {
  LayoutDashboard,
  User,
  Briefcase,
  Bookmark,
  FileText,
  Bell,
  PlusCircle,
  Users,
  Building2,
  ShieldCheck,
  FolderKanban,
  AlertTriangle,
  Menu,
  X,
  ChevronDown,
  ArrowLeft,
  Sparkles,
  LogOut,
  ExternalLink
} from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const { currentRole, switchRole, currentUser, logout } = useAuth();
  const { unreadNotificationsCount, applications, reports } = useApplications();
  const { savedJobIds, jobs } = useJobs();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Compute pending applicants count for employer
  const pendingApplicantsCount = applications.filter((a) => a.status === 'Pending').length;
  // Compute pending reports count for admin
  const pendingReportsCount = reports.filter((r) => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-navy-950/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-64 bg-navy-900 text-slate-300 z-50 flex flex-col transition-transform duration-300 border-r border-navy-800 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 flex items-center justify-between border-b border-navy-800">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-navy-950 font-black text-sm">
              f<span className="text-white">f</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white leading-none">
                find <span className="text-teal-400">for</span>
              </span>
              <span className="text-[9px] font-semibold tracking-wider uppercase text-slate-400 mt-0.5">
                {currentRole} Dashboard
              </span>
            </div>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Demo Switcher pill */}
        <div className="px-4 py-3 bg-navy-950/60 border-b border-navy-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Demo Role Mode</span>
            <span className="text-[9px] bg-teal-500/20 text-teal-300 px-1.5 py-0.5 rounded font-medium">Interactive</span>
          </div>
          <div className="grid grid-cols-3 gap-1 bg-navy-900 p-1 rounded-lg border border-navy-800">
            <button
              onClick={() => switchRole('candidate')}
              className={`py-1 text-[11px] font-bold rounded transition-colors ${
                currentRole === 'candidate' ? 'bg-teal-500 text-navy-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Candidate
            </button>
            <button
              onClick={() => switchRole('employer')}
              className={`py-1 text-[11px] font-bold rounded transition-colors ${
                currentRole === 'employer' ? 'bg-teal-500 text-navy-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Employer
            </button>
            <button
              onClick={() => switchRole('admin')}
              className={`py-1 text-[11px] font-bold rounded transition-colors ${
                currentRole === 'admin' ? 'bg-teal-500 text-navy-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {currentRole === 'candidate' && (
            <>
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                Candidate Menu
              </div>
              <Link
                to="/candidate/dashboard"
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive('/candidate/dashboard') ? 'bg-teal-500 text-navy-950' : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
                <span>Dashboard Overview</span>
              </Link>

              <Link
                to="/candidate/profile"
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive('/candidate/profile') ? 'bg-teal-500 text-navy-950' : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                <User className="w-4 h-4 flex-shrink-0" />
                <span>My Profile</span>
              </Link>

              <Link
                to="/candidate/applications"
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive('/candidate/applications') ? 'bg-teal-500 text-navy-950' : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 flex-shrink-0" />
                  <span>My Applications</span>
                </div>
                <span className="text-[10px] bg-navy-800 px-2 py-0.5 rounded-full font-bold">
                  {applications.filter((a) => a.candidateId === currentUser.id).length}
                </span>
              </Link>

              <Link
                to="/candidate/saved-jobs"
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive('/candidate/saved-jobs') ? 'bg-teal-500 text-navy-950' : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Bookmark className="w-4 h-4 flex-shrink-0" />
                  <span>Saved Jobs</span>
                </div>
                <span className="text-[10px] bg-navy-800 px-2 py-0.5 rounded-full font-bold">
                  {savedJobIds.length}
                </span>
              </Link>

              <Link
                to="/cv-builder"
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive('/cv-builder') ? 'bg-amber-400 text-navy-950' : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                <FileText className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <span className="flex items-center gap-1.5">
                  <span>CV Builder</span>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                </span>
              </Link>

              <Link
                to="/candidate/notifications"
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive('/candidate/notifications') ? 'bg-teal-500 text-navy-950' : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 flex-shrink-0" />
                  <span>Job Alerts & Notes</span>
                </div>
                {unreadNotificationsCount > 0 && (
                  <span className="text-[10px] bg-amber-400 text-navy-950 px-2 py-0.5 rounded-full font-bold">
                    {unreadNotificationsCount}
                  </span>
                )}
              </Link>
            </>
          )}

          {currentRole === 'employer' && (
            <>
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                Recruitment Desk
              </div>
              <Link
                to="/employer/dashboard"
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive('/employer/dashboard') ? 'bg-teal-500 text-navy-950' : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
                <span>Employer Overview</span>
              </Link>

              <Link
                to="/employer/jobs"
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive('/employer/jobs') ? 'bg-teal-500 text-navy-950' : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 flex-shrink-0" />
                  <span>Manage Job Posts</span>
                </div>
                <span className="text-[10px] bg-navy-800 px-2 py-0.5 rounded-full font-bold">
                  {jobs.length}
                </span>
              </Link>

              <Link
                to="/employer/jobs/new"
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  isActive('/employer/jobs/new') ? 'bg-amber-400 text-navy-950' : 'text-teal-400 hover:bg-navy-800'
                }`}
              >
                <PlusCircle className="w-4 h-4 flex-shrink-0" />
                <span>+ Post a New Job</span>
              </Link>

              <Link
                to="/employer/applicants"
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive('/employer/applicants') ? 'bg-teal-500 text-navy-950' : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 flex-shrink-0" />
                  <span>Applicant Pipeline</span>
                </div>
                {pendingApplicantsCount > 0 && (
                  <span className="text-[10px] bg-amber-400 text-navy-950 px-2 py-0.5 rounded-full font-bold">
                    {pendingApplicantsCount} pending
                  </span>
                )}
              </Link>

              <Link
                to="/employer/company"
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive('/employer/company') ? 'bg-teal-500 text-navy-950' : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                <Building2 className="w-4 h-4 flex-shrink-0" />
                <span>Company Brand Profile</span>
              </Link>
            </>
          )}

          {currentRole === 'admin' && (
            <>
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                Platform Operations
              </div>
              <Link
                to="/admin/dashboard"
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive('/admin/dashboard') ? 'bg-teal-500 text-navy-950' : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
                <span>Admin Overview</span>
              </Link>

              <Link
                to="/admin/users"
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive('/admin/users') ? 'bg-teal-500 text-navy-950' : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                <Users className="w-4 h-4 flex-shrink-0" />
                <span>User Management</span>
              </Link>

              <Link
                to="/admin/jobs"
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive('/admin/jobs') ? 'bg-teal-500 text-navy-950' : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Job Moderation</span>
              </Link>

              <Link
                to="/admin/companies"
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive('/admin/companies') ? 'bg-teal-500 text-navy-950' : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                <Building2 className="w-4 h-4 flex-shrink-0" />
                <span>Company Management</span>
              </Link>

              <Link
                to="/admin/categories"
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive('/admin/categories') ? 'bg-teal-500 text-navy-950' : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                <FolderKanban className="w-4 h-4 flex-shrink-0" />
                <span>Job Categories</span>
              </Link>

              <Link
                to="/admin/reports"
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive('/admin/reports') ? 'bg-teal-500 text-navy-950' : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>Reported Content</span>
                </div>
                {pendingReportsCount > 0 && (
                  <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold">
                    {pendingReportsCount}
                  </span>
                )}
              </Link>
            </>
          )}

          {/* Quick links to public portal */}
          <div className="pt-4 mt-4 border-t border-navy-800/80">
            <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-500 tracking-wider">
              Public Portal
            </div>
            <Link
              to="/jobs"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
            >
              <span>Explore All Jobs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/companies"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
            >
              <span>Browse Companies</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-navy-800 bg-navy-950/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-navy-700"
            />
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400 capitalize truncate">{currentRole} Account</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-navy-800 transition-colors"
            title="Reset Session (Demo)"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar on dashboard */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-soft-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:text-navy-800 rounded-lg hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link
              to="/"
              className="text-xs font-semibold text-slate-500 hover:text-navy-800 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Site</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick role badge */}
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-navy-50 text-navy-800 border border-navy-200 capitalize">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              {currentRole} Mode
            </span>

            {/* Notification shortcut */}
            <Link
              to="/candidate/notifications"
              className="relative p-2 text-slate-500 hover:text-navy-800 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-amber-400 text-navy-950 text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </Link>

            {/* User Avatar */}
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover border border-slate-300"
            />
          </div>
        </header>

        {/* Dashboard page view outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
