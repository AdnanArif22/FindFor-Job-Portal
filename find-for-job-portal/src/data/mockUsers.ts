import { User } from '../types';

export const initialUsers: User[] = [
  {
    id: 'user-cand-1',
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    role: 'candidate',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    status: 'active',
    joinedDate: '2026-08-14',
    title: 'Senior Frontend & UI Engineer',
    location: 'San Francisco, CA',
    bio: 'Passionate frontend engineer with 5+ years crafting accessible, ultra-responsive web applications using React, TypeScript, and modern design systems.',
    phone: '+1 (555) 234-5678',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'UI/UX Design', 'GraphQL', 'Vite'],
    resumeName: 'Alex_Morgan_Senior_Frontend_Resume.pdf'
  },
  {
    id: 'user-emp-1',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@nexuscloud.io',
    role: 'employer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
    status: 'active',
    joinedDate: '2026-05-10',
    title: 'VP of Talent Acquisition',
    companyName: 'Nexus Cloud Systems',
    companyId: 'comp-1',
    location: 'San Francisco, CA',
    bio: 'Hiring stellar software engineers, cloud architects, and product innovators to redefine distributed cloud computing.',
    phone: '+1 (555) 876-5432'
  },
  {
    id: 'user-admin-1',
    name: 'Eleanor Vance',
    email: 'eleanor.vance@findfor.platform',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80',
    status: 'active',
    joinedDate: '2026-01-01',
    title: 'Chief Trust & Safety Admin',
    location: 'Global / Head Office',
    bio: 'Overseeing platform health, user integrity, verified employer partnerships, and quality job standards on find for.'
  },
  {
    id: 'user-cand-2',
    name: 'David Chen',
    email: 'david.chen@example.com',
    role: 'candidate',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    status: 'active',
    joinedDate: '2026-09-22',
    title: 'Lead Product Designer',
    location: 'Austin, TX',
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'User Research', 'Prototyping'],
    resumeName: 'David_Chen_Product_Design.pdf'
  },
  {
    id: 'user-cand-3',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    role: 'candidate',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80',
    status: 'active',
    joinedDate: '2026-10-02',
    title: 'Machine Learning Engineer',
    location: 'Seattle, WA',
    skills: ['Python', 'PyTorch', 'Transformers', 'Deep Learning', 'SQL'],
    resumeName: 'Elena_Rostova_ML_Resume.pdf'
  },
  {
    id: 'user-suspended-1',
    name: 'Spammy Bot Account',
    email: 'unverified-bot@scammail.test',
    role: 'employer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80',
    status: 'suspended',
    joinedDate: '2026-11-01',
    title: 'Flagged Account',
    companyName: 'Suspicious Ventures Ltd',
    location: 'Unknown'
  }
];
