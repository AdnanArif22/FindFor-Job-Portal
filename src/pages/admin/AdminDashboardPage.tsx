import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { useApplications } from '../../context/ApplicationContext';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import {
  ShieldCheck,
  Users,
  Briefcase,
  Building2,
  AlertTriangle,
  TrendingUp,
  FolderKanban,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { allUsers } = useAuth();
  const { jobs, companies, categories } = useJobs();
  const { applications, reports } = useApplications();

  const pendingReports = reports.filter((r) => r.status === 'pending');
  const suspendedUsers = allUsers.filter((u) => u.status === 'suspended');

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Platform Admin Dashboard' }]} />

      {/* Admin Hero Notice */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 rounded-3xl p-6 sm:p-8 text-white shadow-soft-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Platform Operations & Trust System (Demo)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Administrator Moderation Center
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Oversee platform security, content reports, user access, and verified enterprise listings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/reports"
              className="px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-soft flex items-center gap-2 transition-colors"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Review Reports ({pendingReports.length})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards (Sample figures clearly labeled) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Total Users</span>
          <p className="text-2xl font-black text-navy-800 mt-1">{allUsers.length}</p>
          <span className="text-[10px] text-teal-600 font-semibold">{suspendedUsers.length} suspended</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Total Jobs</span>
          <p className="text-2xl font-black text-navy-800 mt-1">{jobs.length}</p>
          <span className="text-[10px] text-teal-600 font-semibold">Live in database</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Companies</span>
          <p className="text-2xl font-black text-navy-800 mt-1">{companies.length}</p>
          <span className="text-[10px] text-teal-600 font-semibold">Active profiles</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Applications</span>
          <p className="text-2xl font-black text-navy-800 mt-1">{applications.length}</p>
          <span className="text-[10px] text-teal-600 font-semibold">Submitted logs</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Open Reports</span>
          <p className="text-2xl font-black text-rose-600 mt-1">{pendingReports.length}</p>
          <span className="text-[10px] text-rose-500 font-semibold">Pending resolution</span>
        </div>
      </div>

      {/* Visual Analytics Cards (Pure CSS/SVG Charts - Zero external dependencies) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Category Distribution Chart */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-navy-800">Job Category Distribution</h2>
              <p className="text-[11px] text-slate-400">Sample platform volume across top disciplines</p>
            </div>
            <Link to="/admin/categories" className="text-xs font-bold text-teal-600 hover:underline">
              Manage Categories
            </Link>
          </div>

          <div className="space-y-3 pt-2">
            {categories.slice(0, 5).map((cat) => {
              const max = 450;
              const pct = Math.round((cat.jobCount / max) * 100);
              return (
                <div key={cat.id} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700">{cat.name}</span>
                    <span className="text-navy-800 font-bold">{cat.jobCount} roles</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-teal-500 h-full rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Admin Navigation Desk */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft-sm space-y-4">
          <h2 className="text-sm font-bold text-navy-800">Admin Quick Access</h2>

          <div className="space-y-2.5">
            <Link
              to="/admin/users"
              className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between hover:border-teal-400 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-teal-600" />
                <div>
                  <h3 className="text-xs font-bold text-navy-800">User Management</h3>
                  <p className="text-[11px] text-slate-500">Suspend or reactivate accounts</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/admin/jobs"
              className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between hover:border-teal-400 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <div>
                  <h3 className="text-xs font-bold text-navy-800">Job Moderation</h3>
                  <p className="text-[11px] text-slate-500">Approve or reject posted roles</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/admin/companies"
              className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between hover:border-teal-400 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-teal-600" />
                <div>
                  <h3 className="text-xs font-bold text-navy-800">Company Management</h3>
                  <p className="text-[11px] text-slate-500">Verify company partner badges</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/admin/reports"
              className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between hover:border-teal-400 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <div>
                  <h3 className="text-xs font-bold text-navy-800">Moderation Reports</h3>
                  <p className="text-[11px] text-rose-500 font-semibold">{pendingReports.length} pending items</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
