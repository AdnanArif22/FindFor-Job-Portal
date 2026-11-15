import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApplications } from '../../context/ApplicationContext';
import {
  X,
  Briefcase,
  Building2,
  FileText,
  HelpCircle,
  Mail,
  User,
  Shield,
  Bell,
  LogIn,
  UserPlus,
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { currentRole, switchRole, currentUser } = useAuth();
  const { unreadNotificationsCount } = useApplications();
  const location = useLocation();

  if (!isOpen) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-soft-xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center text-white font-black text-sm">
              f<span className="text-teal-400">f</span>
            </div>
            <span className="text-lg font-black tracking-tight text-navy-800">find for</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-navy-800 rounded-lg hover:bg-slate-200/50 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Demo Switcher */}
        <div className="p-4 bg-navy-50/70 border-b border-navy-100">
          <p className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Demo Role Switcher</span>
            <span className="text-[10px] bg-teal-500 text-white px-1.5 py-0.5 rounded font-medium">Interactive</span>
          </p>
          <div className="grid grid-cols-3 gap-1 bg-white p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => switchRole('candidate')}
              className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
                currentRole === 'candidate'
                  ? 'bg-navy-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy-800'
              }`}
            >
              Candidate
            </button>
            <button
              onClick={() => switchRole('employer')}
              className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
                currentRole === 'employer'
                  ? 'bg-navy-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy-800'
              }`}
            >
              Employer
            </button>
            <button
              onClick={() => switchRole('admin')}
              className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
                currentRole === 'admin'
                  ? 'bg-navy-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy-800'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <Link
            to="/jobs"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive('/jobs') ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-4 h-4 text-teal-600" />
            Find Jobs
          </Link>

          <Link
            to="/companies"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive('/companies') ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Building2 className="w-4 h-4 text-teal-600" />
            Companies
          </Link>

          <Link
            to="/cv-builder"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive('/cv-builder') ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-500" />
            CV Builder
          </Link>

          <div className="pt-3 pb-1 border-t border-slate-100 my-2">
            <p className="px-3 text-xs font-semibold uppercase text-slate-400 tracking-wider">Dashboard Views</p>
          </div>

          {currentRole === 'candidate' && (
            <>
              <Link
                to="/candidate/dashboard"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <User className="w-4 h-4 text-navy-600" />
                Candidate Dashboard
              </Link>
              <Link
                to="/candidate/applications"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <Briefcase className="w-4 h-4 text-navy-600" />
                My Applications
              </Link>
              <Link
                to="/candidate/notifications"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-navy-600" />
                  Notifications
                </div>
                {unreadNotificationsCount > 0 && (
                  <span className="bg-amber-400 text-navy-950 text-xs px-2 py-0.5 rounded-full font-bold">
                    {unreadNotificationsCount}
                  </span>
                )}
              </Link>
            </>
          )}

          {currentRole === 'employer' && (
            <>
              <Link
                to="/employer/dashboard"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <Briefcase className="w-4 h-4 text-teal-600" />
                Employer Dashboard
              </Link>
              <Link
                to="/employer/jobs/new"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-teal-700 bg-teal-50"
              >
                + Post a New Job
              </Link>
              <Link
                to="/employer/applicants"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <User className="w-4 h-4 text-teal-600" />
                Manage Applicants
              </Link>
            </>
          )}

          {currentRole === 'admin' && (
            <>
              <Link
                to="/admin/dashboard"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <Shield className="w-4 h-4 text-amber-500" />
                Admin Dashboard
              </Link>
              <Link
                to="/admin/jobs"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Job Moderation
              </Link>
              <Link
                to="/admin/users"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                User Management
              </Link>
            </>
          )}

          <div className="pt-3 pb-1 border-t border-slate-100 my-2">
            <p className="px-3 text-xs font-semibold uppercase text-slate-400 tracking-wider">Help & Info</p>
          </div>

          <Link
            to="/about"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            About find for
          </Link>
          <Link
            to="/faq"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            FAQ
          </Link>
          <Link
            to="/contact"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Mail className="w-4 h-4 text-slate-400" />
            Contact Support
          </Link>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2">
          <Link
            to="/login"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-navy-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
          >
            <LogIn className="w-4 h-4" />
            Log in
          </Link>
          <Link
            to="/signup"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white bg-navy-800 rounded-lg hover:bg-navy-700 shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
