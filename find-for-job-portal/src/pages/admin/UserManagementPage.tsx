import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { User, UserRole } from '../../types';
import {
  Users,
  Search,
  ShieldAlert,
  CheckCircle2,
  Lock,
  Unlock,
  ChevronDown,
  UserCheck
} from 'lucide-react';

export const UserManagementPage: React.FC = () => {
  const { allUsers, toggleUserStatus } = useAuth();
  const { showSuccess, showInfo } = useToast();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredUsers = allUsers.filter((u) => {
    if (roleFilter !== 'All' && u.role !== roleFilter) return false;
    if (statusFilter !== 'All' && u.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.companyName && u.companyName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleToggle = (u: User) => {
    toggleUserStatus(u.id);
    if (u.status === 'active') {
      showInfo('User Suspended (Demo)', `Account ${u.email} suspended.`);
    } else {
      showSuccess('User Reactivated (Demo)', `Account ${u.email} reactivated.`);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Breadcrumbs
        items={[
          { label: 'Admin Dashboard', path: '/admin/dashboard' },
          { label: 'User Management' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-800 tracking-tight">
            User Account Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Search candidates, employers, and administrators; toggle account status.
          </p>
        </div>

        <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200 self-start sm:self-auto">
          {filteredUsers.length} Registered Accounts
        </span>
      </div>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, or company..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-navy-800 shadow-sm"
          />
        </div>

        <div className="relative">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-navy-800 appearance-none shadow-sm"
          >
            <option value="All">All User Roles</option>
            <option value="candidate">Job Seeker (Candidate)</option>
            <option value="employer">Employer / Recruiter</option>
            <option value="admin">Administrator</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-navy-800 appearance-none shadow-sm"
          >
            <option value="All">All Statuses</option>
            <option value="active">Active Accounts</option>
            <option value="suspended">Suspended Accounts</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-soft-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-5 font-bold">User Identity</th>
                <th className="py-3.5 px-5 font-bold">Role</th>
                <th className="py-3.5 px-5 font-bold">Joined Date</th>
                <th className="py-3.5 px-5 font-bold">Status</th>
                <th className="py-3.5 px-5 font-bold text-right">Moderation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover border"
                      />
                      <div>
                        <p className="font-bold text-navy-800">{user.name}</p>
                        <p className="text-[11px] text-slate-500">{user.email}</p>
                        {user.companyName && (
                          <span className="text-[10px] text-teal-600 font-semibold">
                            {user.companyName}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="font-semibold capitalize px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-slate-500">{user.joinedDate}</td>
                  <td className="py-3.5 px-5">
                    <span
                      className={`font-bold px-2.5 py-1 rounded-full text-[10px] inline-flex items-center gap-1 ${
                        user.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {user.status === 'active' ? 'Active' : 'Suspended'}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={() => handleToggle(user)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-colors ${
                        user.status === 'active'
                          ? 'bg-rose-50 hover:bg-rose-100 text-rose-700'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {user.status === 'active' ? 'Suspend Account' : 'Reactivate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
