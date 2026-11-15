export type UserRole = 'candidate' | 'employer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  status: 'active' | 'suspended';
  joinedDate: string;
  title?: string;
  companyName?: string;
  companyId?: string;
  location?: string;
  bio?: string;
  phone?: string;
  skills?: string[];
  resumeName?: string;
}

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Internship';
export type WorkplaceType = 'Remote' | 'On-site' | 'Hybrid';
export type ExperienceLevel = 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Lead / Manager' | 'Executive';
export type JobStatus = 'active' | 'draft' | 'closed' | 'pending';

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  location: string;
  workplaceType: WorkplaceType;
  jobType: JobType;
  category: string;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  salaryPeriod: 'yearly' | 'monthly' | 'hourly';
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  skills: string[];
  postedDate: string;
  deadline: string;
  applicantsCount: number;
  status: JobStatus;
  featured?: boolean;
  urgent?: boolean;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  banner: string;
  industry: string;
  location: string;
  website: string;
  employeeCount: string;
  foundedYear: number;
  description: string;
  about: string;
  perks: string[];
  openJobsCount: number;
  verified: boolean;
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export type ApplicationStatus = 'Pending' | 'Shortlisted' | 'Interview' | 'Hired' | 'Rejected';

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  candidateAvatar: string;
  candidateTitle: string;
  appliedDate: string;
  status: ApplicationStatus;
  resumeFileName: string;
  coverLetter?: string;
  skillMatchScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  interviewDate?: string;
  employerNotes?: string;
}

export interface JobCategory {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  jobCount: number;
  description: string;
  popularSkills: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'application' | 'job_alert' | 'system' | 'interview';
  link?: string;
}

export interface ReportItem {
  id: string;
  targetType: 'job' | 'user' | 'company';
  targetId: string;
  targetName: string;
  reason: string;
  reportedBy: string;
  date: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
  userType: 'Job Seeker' | 'Employer';
}

export interface CVExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface CVEducation {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  grade?: string;
}

export interface CVProject {
  id: string;
  name: string;
  description: string;
  techStack: string;
  link?: string;
}

export interface CVProfile {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    website: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: CVExperience[];
  education: CVEducation[];
  skills: string[];
  projects: CVProject[];
  templateId: 'modern-teal' | 'classic-navy';
}
