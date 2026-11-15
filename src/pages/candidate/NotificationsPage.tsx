import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApplications } from '../../context/ApplicationContext';
import { useToast } from '../../context/ToastContext';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import {
  Bell,
  CheckCircle2,
  Calendar,
  Sparkles,
  Sliders,
  Plus,
  Trash2,
  Mail,
  ToggleLeft,
  ToggleRight,
  ExternalLink
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    alertPreferences,
    toggleAlertPreference,
    addAlertPreference,
    deleteAlertPreference,
  } = useApplications();

  const { showSuccess } = useToast();

  const [activeTab, setActiveTab] = useState<'notifications' | 'alerts'>('notifications');

  // New Alert Preference Form State
  const [newKeywords, setNewKeywords] = useState('');
  const [newCategory, setNewCategory] = useState('Software Engineering');
  const [newLocation, setNewLocation] = useState('Remote');
  const [newFrequency, setNewFrequency] = useState<'Instant' | 'Daily' | 'Weekly'>('Daily');

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeywords.trim()) return;

    addAlertPreference({
      keywords: newKeywords,
      category: newCategory,
      location: newLocation,
      frequency: newFrequency,
      active: true,
    });

    setNewKeywords('');
    showSuccess('Job Alert Rule Created (Demo)', `Alerts configured for "${newKeywords}"`);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Breadcrumbs
        items={[
          { label: 'Candidate Dashboard', path: '/candidate/dashboard' },
          { label: 'Job Alerts & Notifications' },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-800 tracking-tight">
            Alerts & In-Platform Notifications
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Stay informed on application updates, interview invites, and custom job triggers.
          </p>
        </div>

        {/* Tab switch */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'notifications'
                ? 'bg-white text-navy-800 shadow-sm'
                : 'text-slate-600 hover:text-navy-800'
            }`}
          >
            Notifications ({notifications.filter((n) => !n.read).length} Unread)
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'alerts'
                ? 'bg-white text-navy-800 shadow-sm'
                : 'text-slate-600 hover:text-navy-800'
            }`}
          >
            Job Alert Rules ({alertPreferences.length})
          </button>
        </div>
      </div>

      {activeTab === 'notifications' ? (
        /* Notifications List */
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Recent In-App Activity
            </span>
            <button
              onClick={markAllNotificationsAsRead}
              className="text-xs font-bold text-teal-600 hover:text-teal-700"
            >
              Mark all as read
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map((notif) => {
              let Icon = Bell;
              let iconColor = 'text-teal-600 bg-teal-50';

              if (notif.type === 'interview') {
                Icon = Calendar;
                iconColor = 'text-amber-600 bg-amber-50';
              } else if (notif.type === 'job_alert') {
                Icon = Sparkles;
                iconColor = 'text-sky-600 bg-sky-50';
              }

              return (
                <div
                  key={notif.id}
                  onClick={() => markNotificationAsRead(notif.id)}
                  className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 cursor-pointer ${
                    notif.read
                      ? 'bg-white border-slate-200/90 shadow-soft-sm'
                      : 'bg-teal-50/30 border-teal-200 shadow-soft font-medium'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl ${iconColor} flex-shrink-0 mt-0.5`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-navy-800">{notif.title}</h3>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {notif.message}
                      </p>
                      <span className="text-[10px] text-slate-400 block mt-2">
                        {new Date(notif.date).toLocaleDateString()} at{' '}
                        {new Date(notif.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  {notif.link && (
                    <Link
                      to={notif.link}
                      className="p-2 text-slate-400 hover:text-teal-600 rounded-lg"
                      title="Open related page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Job Alert Preferences */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Active Alert Rules */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-sm font-bold text-navy-800 uppercase tracking-wider">
              Active Job Alert Criteria
            </h2>

            <div className="space-y-3">
              {alertPreferences.map((pref) => (
                <div
                  key={pref.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-soft-sm flex items-center justify-between gap-4"
                >
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy-800 text-sm">{pref.keywords}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                        {pref.frequency}
                      </span>
                    </div>
                    <p className="text-slate-500">
                      Category: <strong>{pref.category}</strong> • Location: <strong>{pref.location}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleAlertPreference(pref.id)}
                      className="text-xs font-bold flex items-center gap-1.5"
                    >
                      {pref.active ? (
                        <span className="text-teal-600 flex items-center gap-1">
                          <ToggleRight className="w-6 h-6" />
                          <span className="hidden sm:inline">Active</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 flex items-center gap-1">
                          <ToggleLeft className="w-6 h-6" />
                          <span className="hidden sm:inline">Paused</span>
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => deleteAlertPreference(pref.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Create Alert Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Plus className="w-4 h-4 text-teal-600" />
              <h2 className="text-sm font-bold text-navy-800">Add New Alert Criteria</h2>
            </div>

            <form onSubmit={handleCreateAlert} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Keywords / Skills *</label>
                <input
                  type="text"
                  required
                  value={newKeywords}
                  onChange={(e) => setNewKeywords(e.target.value)}
                  placeholder="e.g. Next.js, Lead Designer"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-navy-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Industry Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-navy-800"
                >
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Product & Design">Product & Design</option>
                  <option value="Data & Artificial Intelligence">Data & Artificial Intelligence</option>
                  <option value="Marketing & Growth">Marketing & Growth</option>
                  <option value="Product Management">Product Management</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Location Preference</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Remote or San Francisco"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-navy-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Digest Frequency</label>
                <select
                  value={newFrequency}
                  onChange={(e) => setNewFrequency(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-navy-800"
                >
                  <option value="Instant">Instant Push</option>
                  <option value="Daily">Daily Digest</option>
                  <option value="Weekly">Weekly Summary</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-navy-800 hover:bg-navy-700 text-white font-bold rounded-xl shadow-soft transition-colors"
                >
                  Save Alert Preference (Demo)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
