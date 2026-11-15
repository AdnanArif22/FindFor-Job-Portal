export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Accounts' | 'Applying' | 'Statuses' | 'Employers' | 'CV Builder' | 'Privacy & Support';
}

export const initialFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Accounts',
    question: 'How do I switch between candidate, employer, and admin roles in this demo?',
    answer: 'In the top navigation bar and user profile dropdown, we provide an instant demo role switcher button. You can jump between Candidate (Job Seeker), Employer, and Platform Admin with one click to test all role-specific workflows and dashboards without logging out.'
  },
  {
    id: 'faq-2',
    category: 'Accounts',
    question: 'Is real authentication or password reset connected?',
    answer: 'No. This frontend implementation simulates login, registration, and password recovery completely within local browser state. All credentials and sessions are strictly for demo exploration, providing a realistic UI experience without touching a backend server.'
  },
  {
    id: 'faq-3',
    category: 'Applying',
    question: 'How does the simulated skill-match percentage work?',
    answer: 'When you view any job details or submit an application, find for compares the required job skill tags with your profile/CV skills to display a visual match score (e.g. 92% match) along with matching and missing skills. This is clearly labeled as a frontend simulation.'
  },
  {
    id: 'faq-4',
    category: 'Applying',
    question: 'Can I upload my actual resume during the demo application?',
    answer: 'Yes! The apply modal features a fully interactive drag-and-drop file upload simulator that extracts your chosen file name and updates your application record in local state.'
  },
  {
    id: 'faq-5',
    category: 'Statuses',
    question: 'What do the application statuses mean and how do they progress?',
    answer: 'Applications follow a 5-stage pipeline: Pending (awaiting employer review) → Shortlisted (passed screening) → Interview (interview scheduled) → Hired or Rejected. As an employer in the Applicants dashboard, you can click action buttons to change any candidate’s status and see it update immediately across both candidate and employer views.'
  },
  {
    id: 'faq-6',
    category: 'Employers',
    question: 'Can I post a new job and see it appear in the public job feed?',
    answer: 'Yes! Navigating to "Post a Job" in the Employer dashboard allows you to fill out title, department, salary ranges, requirements, and preview it. Once published, it is saved directly to your local state and becomes immediately searchable and filterable in the public Find Jobs page.'
  },
  {
    id: 'faq-7',
    category: 'CV Builder',
    question: 'How does the interactive CV Builder and PDF export work?',
    answer: 'The CV Builder allows you to edit personal info, summary, work experiences, education degrees, skills, and projects in real time with dynamic add/remove buttons. You can toggle between modern Teal and classic Navy templates, and click "Download PDF" to trigger the browser’s clean print-to-PDF engine with custom print-optimized stylesheets.'
  },
  {
    id: 'faq-8',
    category: 'Privacy & Support',
    question: 'Where is my data stored and is any data sent to external servers?',
    answer: 'All data is stored purely within your local browser storage (`localStorage`). No emails, documents, or data are transmitted to external servers or third-party tracking services.'
  }
];
