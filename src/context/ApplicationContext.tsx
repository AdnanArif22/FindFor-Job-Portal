import React, { createContext, useContext, useState, useEffect } from 'react';
import { Application, ApplicationStatus, NotificationItem, ReportItem, CVProfile } from '../types';
import { initialApplications } from '../data/mockApplications';
import { initialNotifications, initialAlertPreferences, JobAlertPreference } from '../data/mockNotifications';
import { initialReports } from '../data/mockReports';

interface ApplicationContextType {
  applications: Application[];
  applyToJob: (
    jobId: string,
    jobTitle: string,
    companyName: string,
    companyLogo: string,
    candidateDetails: {
      candidateId: string;
      candidateName: string;
      candidateEmail: string;
      candidatePhone?: string;
      candidateAvatar: string;
      candidateTitle: string;
      resumeFileName: string;
      coverLetter?: string;
      skillMatchScore: number;
      matchingSkills: string[];
      missingSkills: string[];
    }
  ) => Application;
  updateApplicationStatus: (
    applicationId: string,
    newStatus: ApplicationStatus,
    notes?: string,
    interviewDate?: string
  ) => void;
  withdrawApplication: (applicationId: string) => void;
  hasApplied: (jobId: string, candidateId: string) => boolean;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;

  // Job Alert Preferences
  alertPreferences: JobAlertPreference[];
  toggleAlertPreference: (id: string) => void;
  addAlertPreference: (pref: Omit<JobAlertPreference, 'id'>) => void;
  deleteAlertPreference: (id: string) => void;

  // Moderation Reports
  reports: ReportItem[];
  resolveReport: (reportId: string, action: 'resolved' | 'dismissed') => void;

  // CV Profile
  cvProfile: CVProfile;
  updateCVProfile: (updated: Partial<CVProfile>) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

const LOCAL_STORAGE_APPS = 'findfor_applications_v1';
const LOCAL_STORAGE_NOTIFS = 'findfor_notifications_v1';
const LOCAL_STORAGE_REPORTS = 'findfor_reports_v1';
const LOCAL_STORAGE_CV = 'findfor_cv_profile_v1';
const LOCAL_STORAGE_ALERTS = 'findfor_alert_prefs_v1';

const defaultCVProfile: CVProfile = {
  personalInfo: {
    fullName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    title: 'Senior Frontend & UI Engineer',
    website: 'https://alexmorgan.dev.demo',
    linkedin: 'https://linkedin.com/in/alexmorgan-demo',
    github: 'https://github.com/alexmorgan-demo',
  },
  summary:
    'Dedicated frontend engineer with over 5 years of experience crafting high-performance, accessible, and scalable web applications. Proficient in modern React ecosystems, TypeScript architectures, and modular component design systems.',
  experience: [
    {
      id: 'exp-1',
      title: 'Senior Frontend Engineer',
      company: 'Veloce Digital Cloud',
      location: 'San Francisco, CA (Remote)',
      startDate: '2023-03',
      endDate: 'Present',
      current: true,
      description:
        'Architected real-time streaming dashboard for cloud infrastructure monitoring. Reduced initial load bundle by 42% and introduced strict TypeScript types across 250+ UI components.',
    },
    {
      id: 'exp-2',
      title: 'Frontend Developer',
      company: 'PixelCraft Studios',
      location: 'Austin, TX',
      startDate: '2021-06',
      endDate: '2023-02',
      current: false,
      description:
        'Collaborated with design teams to build client-facing web portals and headless e-commerce stores with Next.js, React, and Tailwind CSS. Implemented automated WCAG AA testing.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science',
      school: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2017-09',
      endDate: '2021-05',
      grade: '3.8 GPA',
    },
  ],
  skills: [
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Next.js',
    'JavaScript (ES6+)',
    'HTML5 & CSS3',
    'Git & GitHub',
    'REST & GraphQL APIs',
    'Web Performance',
    'UI/UX Design Systems',
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'OmniUI - Accessible React Component Library',
      description:
        'Open-source design system with 40+ keyboard-navigable components, dark mode tokens, and zero external style dependencies.',
      techStack: 'React, TypeScript, Tailwind CSS, Storybook',
      link: 'https://github.com/demo/omni-ui',
    },
    {
      id: 'proj-2',
      name: 'PulseFlow Analytics Dashboard',
      description:
        'Real-time metrics visualizer with interactive charts, responsive sidebars, and customizable metric widgets.',
      techStack: 'React, Chart.js, Tailwind CSS',
      link: 'https://pulseflow.demo.io',
    },
  ],
  templateId: 'modern-teal',
};

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_APPS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse applications', e);
      }
    }
    return initialApplications;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_NOTIFS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse notifications', e);
      }
    }
    return initialNotifications;
  });

  const [alertPreferences, setAlertPreferences] = useState<JobAlertPreference[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_ALERTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse alert prefs', e);
      }
    }
    return initialAlertPreferences;
  });

  const [reports, setReports] = useState<ReportItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_REPORTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse reports', e);
      }
    }
    return initialReports;
  });

  const [cvProfile, setCvProfile] = useState<CVProfile>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_CV);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse CV profile', e);
      }
    }
    return defaultCVProfile;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_APPS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_NOTIFS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ALERTS, JSON.stringify(alertPreferences));
  }, [alertPreferences]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_REPORTS, JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CV, JSON.stringify(cvProfile));
  }, [cvProfile]);

  const applyToJob = (
    jobId: string,
    jobTitle: string,
    companyName: string,
    companyLogo: string,
    candidateDetails: {
      candidateId: string;
      candidateName: string;
      candidateEmail: string;
      candidatePhone?: string;
      candidateAvatar: string;
      candidateTitle: string;
      resumeFileName: string;
      coverLetter?: string;
      skillMatchScore: number;
      matchingSkills: string[];
      missingSkills: string[];
    }
  ): Application => {
    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle,
      companyName,
      companyLogo,
      candidateId: candidateDetails.candidateId,
      candidateName: candidateDetails.candidateName,
      candidateEmail: candidateDetails.candidateEmail,
      candidatePhone: candidateDetails.candidatePhone,
      candidateAvatar: candidateDetails.candidateAvatar,
      candidateTitle: candidateDetails.candidateTitle,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      resumeFileName: candidateDetails.resumeFileName,
      coverLetter: candidateDetails.coverLetter,
      skillMatchScore: candidateDetails.skillMatchScore,
      matchingSkills: candidateDetails.matchingSkills,
      missingSkills: candidateDetails.missingSkills,
    };

    setApplications((prev) => [newApp, ...prev]);

    // Add a confirmation notification for the candidate
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Application Submitted!',
      message: `Your demo application for ${jobTitle} at ${companyName} has been received.`,
      date: new Date().toISOString(),
      read: false,
      type: 'application',
      link: '/candidate/applications',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newApp;
  };

  const updateApplicationStatus = (
    applicationId: string,
    newStatus: ApplicationStatus,
    notes?: string,
    interviewDate?: string
  ) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === applicationId) {
          return {
            ...app,
            status: newStatus,
            employerNotes: notes !== undefined ? notes : app.employerNotes,
            interviewDate: interviewDate !== undefined ? interviewDate : app.interviewDate,
          };
        }
        return app;
      })
    );

    // Notify candidate if status changed
    const targetApp = applications.find((a) => a.id === applicationId);
    if (targetApp) {
      const notifMsg: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: `Application Status: ${newStatus}`,
        message: `${targetApp.companyName} updated your application for "${targetApp.jobTitle}" to ${newStatus}.`,
        date: new Date().toISOString(),
        read: false,
        type: newStatus === 'Interview' ? 'interview' : 'application',
        link: '/candidate/applications',
      };
      setNotifications((prev) => [notifMsg, ...prev]);
    }
  };

  const withdrawApplication = (applicationId: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== applicationId));
  };

  const hasApplied = (jobId: string, candidateId: string) => {
    return applications.some((app) => app.jobId === jobId && app.candidateId === candidateId);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const toggleAlertPreference = (id: string) => {
    setAlertPreferences((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  const addAlertPreference = (pref: Omit<JobAlertPreference, 'id'>) => {
    const newPref: JobAlertPreference = {
      ...pref,
      id: `pref-${Date.now()}`,
    };
    setAlertPreferences((prev) => [...prev, newPref]);
  };

  const deleteAlertPreference = (id: string) => {
    setAlertPreferences((prev) => prev.filter((p) => p.id !== id));
  };

  const resolveReport = (reportId: string, action: 'resolved' | 'dismissed') => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: action } : r))
    );
  };

  const updateCVProfile = (updated: Partial<CVProfile>) => {
    setCvProfile((prev) => ({ ...prev, ...updated }));
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        applyToJob,
        updateApplicationStatus,
        withdrawApplication,
        hasApplied,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount,
        alertPreferences,
        toggleAlertPreference,
        addAlertPreference,
        deleteAlertPreference,
        reports,
        resolveReport,
        cvProfile,
        updateCVProfile,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
};
