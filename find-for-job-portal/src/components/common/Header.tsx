import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApplications } from '../../context/ApplicationContext';
import { MobileMenu } from './MobileMenu';
import {
  Briefcase,
  Building2,
  FileText,
  Bell,
  ChevronDown,
  Menu,
  Shield,
  User,
  PlusCircle,
  ExternalLink,
  Sparkles,
  LogOut
} from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const { currentRole, switchRole, currentUser, logout } = useAuth();
  const { unreadNotificationsCount } = useApplications();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsProfileMenuOpen(false);
    setIsRoleDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const getDashboardPath = () => {
    if (currentRole === 'candidate') return '/candidate/dashboard';
    if (currentRole === 'employer') return '/employer/dashboard';
    return '/admin/dashboard';
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-slate-200/80 py-2.5'
            : 'bg-white border-b border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2.5 group focus:outline-none">
                <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
                  <div className="flex items-center tracking-tighter font-extrabold text-base">
                    <span>f</span>
                    <span className="text-teal-400">f</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight text-navy-800 leading-none">
                    find <span className="text-teal-500">for</span>
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                    Careers & Talent
                  </span>
                </div>
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center gap-1">
                <Link
                  to="/jobs"
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    isActive('/jobs')
                      ? 'text-teal-700 bg-teal-50'
                      : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                  }`}
                >
                  Find Jobs
                </Link>
                <Link
                  to="/companies"
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    isActive('/companies')
                      ? 'text-teal-700 bg-teal-50'
                      : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                  }`}
                >
                  Companies
                </Link>
                <Link
                  to="/cv-builder"
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                    isActive('/cv-builder')
                      ? 'text-amber-800 bg-amber-50'
                      : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  CV Builder
                </Link>
                <Link
                  to="/about"
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    isActive('/about')
                      ? 'text-teal-700 bg-teal-50'
                      : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                  }`}
                >
                  About
                </Link>
                <Link
                  to="/faq"
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    isActive('/faq')
                      ? 'text-teal-700 bg-teal-50'
                      : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                  }`}
                >
                  FAQ
                </Link>
              </nav>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-3">
              {/* Role Switcher Pill (Crucial for Reviewers & Demo) */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-navy-800 transition-colors"
                  title="Switch between Job Seeker, Employer, and Admin demo roles"
                >
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                  <span className="text-slate-500">Role:</span>
                  <span className="capitalize font-bold text-navy-800">{currentRole}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isRoleDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-soft-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                    onMouseLeave={() => setIsRoleDropdownOpen(false)}
                  >
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      Switch Demo View
                    </div>
                    <button
                      onClick={() => {
                        switchRole('candidate');
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left ${
                        currentRole === 'candidate' ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5" />
                        <span>Job Seeker (Candidate)</span>
                      </div>
                      {currentRole === 'candidate' && <span className="text-[10px] bg-teal-600 text-white px-1.5 py-0.2 rounded">Active</span>}
                    </button>
                    <button
                      onClick={() => {
                        switchRole('employer');
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left ${
                        currentRole === 'employer' ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Employer / Recruiter</span>
                      </div>
                      {currentRole === 'employer' && <span className="text-[10px] bg-teal-600 text-white px-1.5 py-0.2 rounded">Active</span>}
                    </button>
                    <button
                      onClick={() => {
                        switchRole('admin');
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left ${
                        currentRole === 'admin' ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5" />
                        <span>Platform Administrator</span>
                      </div>
                      {currentRole === 'admin' && <span className="text-[10px] bg-teal-600 text-white px-1.5 py-0.2 rounded">Active</span>}
                    </button>
                  </div>
                )}
              </div>

              {/* Direct Dashboard Link */}
              <Link
                to={getDashboardPath()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-navy-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200/80"
              >
                <span>Dashboard</span>
              </Link>

              {/* Post a Job button (Quick employer action) */}
              <Link
                to="/employer/jobs/new"
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-teal-500 hover:bg-teal-600 rounded-lg shadow-soft transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Post a Job</span>
              </Link>

              {/* Notifications Icon (for Candidate) */}
              <Link
                to="/candidate/notifications"
                className="relative p-2 text-slate-500 hover:text-navy-800 rounded-lg hover:bg-slate-100 transition-colors"
                title="Notifications"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-amber-400 text-navy-950 text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                    {unreadNotificationsCount}
                  </span>
                )}
              </Link>

              {/* User Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors focus:outline-none"
                  aria-label="User profile menu"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-white"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {isProfileMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-soft-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                    onMouseLeave={() => setIsProfileMenuOpen(false)}
                  >
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-bold text-navy-800 truncate">{currentUser.name}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[11px] font-semibold bg-navy-50 text-navy-800 px-2 py-0.5 rounded capitalize">
                        {currentRole} Account (Demo)
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        to={getDashboardPath()}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        Go to Dashboard
                      </Link>

                      {currentRole === 'candidate' && (
                        <>
                          <Link
                            to="/candidate/profile"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <User className="w-4 h-4 text-slate-400" />
                            Candidate Profile
                          </Link>
                          <Link
                            to="/candidate/saved-jobs"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <FileText className="w-4 h-4 text-slate-400" />
                            Saved Jobs
                          </Link>
                        </>
                      )}

                      {currentRole === 'employer' && (
                        <>
                          <Link
                            to="/employer/jobs"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <Briefcase className="w-4 h-4 text-slate-400" />
                            Manage Jobs
                          </Link>
                          <Link
                            to="/employer/company"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <Building2 className="w-4 h-4 text-slate-400" />
                            Company Profile
                          </Link>
                        </>
                      )}

                      {currentRole === 'admin' && (
                        <>
                          <Link
                            to="/admin/users"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <User className="w-4 h-4 text-slate-400" />
                            User Management
                          </Link>
                          <Link
                            to="/admin/jobs"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <Shield className="w-4 h-4 text-slate-400" />
                            Job Moderation
                          </Link>
                        </>
                      )}
                    </div>

                    <div className="border-t border-slate-100 pt-1 mt-1">
                      <div className="px-4 py-1.5 flex gap-2">
                        <Link
                          to="/login"
                          className="flex-1 text-center py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
                        >
                          Log in
                        </Link>
                        <Link
                          to="/signup"
                          className="flex-1 text-center py-1.5 text-xs font-semibold text-white bg-navy-800 hover:bg-navy-700 rounded-lg"
                        >
                          Sign up
                        </Link>
                      </div>
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Reset Session (Demo)
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile hamburger menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:text-navy-800 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Open mobile navigation"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};
