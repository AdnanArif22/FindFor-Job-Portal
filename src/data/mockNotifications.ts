import { NotificationItem } from '../types';

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Interview Invitation Received! 🎉',
    message: 'Nexus Cloud Systems has invited you for a Technical Interview for the Senior Frontend Engineer role.',
    date: '2026-11-08T10:30:00Z',
    read: false,
    type: 'interview',
    link: '/candidate/applications'
  },
  {
    id: 'notif-2',
    title: 'New Job Alert: 3 roles match your skills',
    message: 'New openings in React, TypeScript, and UI Design posted by Kite Design Systems and Vanguard FinTech Labs.',
    date: '2026-11-07T14:15:00Z',
    read: false,
    type: 'job_alert',
    link: '/jobs'
  },
  {
    id: 'notif-3',
    title: 'Application Status Updated',
    message: 'Your application for Senior Growth Marketing Manager at Aetheria Health Tech has been updated.',
    date: '2026-11-03T09:00:00Z',
    read: true,
    type: 'application',
    link: '/candidate/applications'
  },
  {
    id: 'notif-4',
    title: 'Welcome to find for!',
    message: 'Complete your candidate profile and build your ATS-ready resume with our interactive CV Builder.',
    date: '2026-11-01T08:00:00Z',
    read: true,
    type: 'system',
    link: '/cv-builder'
  }
];

export interface JobAlertPreference {
  id: string;
  keywords: string;
  category: string;
  location: string;
  frequency: 'Instant' | 'Daily' | 'Weekly';
  active: boolean;
}

export const initialAlertPreferences: JobAlertPreference[] = [
  {
    id: 'pref-1',
    keywords: 'React, TypeScript, Frontend',
    category: 'Software Engineering',
    location: 'Remote',
    frequency: 'Daily',
    active: true
  },
  {
    id: 'pref-2',
    keywords: 'Lead UI/UX, Design Systems',
    category: 'Product & Design',
    location: 'United States',
    frequency: 'Weekly',
    active: true
  }
];
