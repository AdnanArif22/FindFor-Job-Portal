import { Article, Testimonial } from '../types';

export const initialArticles: Article[] = [
  {
    id: 'art-1',
    title: 'How to Ace Technical System Design Interviews in 2026',
    slug: 'ace-system-design-interviews',
    excerpt: 'Key strategies, trade-off communication frameworks, and modern distributed architecture patterns to impress senior hiring committees.',
    content: 'Full guide covering load balancing, distributed caching, database sharding, and clear communication techniques during live whiteboarding sessions.',
    category: 'Career Advice',
    readTime: '6 min read',
    author: {
      name: 'Jordan Rivera',
      role: 'Staff Architect & Career Coach',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80'
    },
    date: 'Nov 6, 2026',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'art-2',
    title: 'Optimizing Your Resume for AI Screening & ATS Parsers',
    slug: 'optimizing-resume-ats-screening',
    excerpt: 'Actionable techniques to ensure your resume cleanly parses through modern ATS algorithms while captivating human recruiters.',
    content: 'Learn why semantic headings, standard font hierarchies, and skill taxonomy keywords matter more than decorative graphics.',
    category: 'Job Search',
    readTime: '4 min read',
    author: {
      name: 'Claire Moreau',
      role: 'Executive Recruiter',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80'
    },
    date: 'Nov 3, 2026',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'art-3',
    title: 'Negotiating Equity, Bonuses, and Remote Stipends Confidently',
    slug: 'negotiating-compensation-packages',
    excerpt: 'A practical playbook for evaluating total compensation, RSUs, stock options, and non-salary benefits during offer discussions.',
    content: 'Understanding strike prices, vesting cliffs, and how to negotiate multiple simultaneous offers with professional poise.',
    category: 'Salary & Compensation',
    readTime: '8 min read',
    author: {
      name: 'Marcus Vance',
      role: 'Tech Compensation Strategist',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80'
    },
    date: 'Oct 29, 2026',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80'
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sophia Chang',
    role: 'Principal UX Designer',
    company: 'Fintech Scale-Up',
    quote: 'find for made my job transition effortless. The simulated skill match gave me immediate clarity on where my portfolio aligned with company expectations.',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&auto=format&fit=crop&q=80',
    rating: 5,
    userType: 'Job Seeker'
  },
  {
    id: 'test-2',
    name: 'Marcus Brody',
    role: 'VP of Engineering',
    company: 'CloudNova Systems',
    quote: 'We cut our time-to-hire by nearly 40%. The candidate tracking workflow and transparent applicant status updates kept our hiring teams aligned from day one.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80',
    rating: 5,
    userType: 'Employer'
  },
  {
    id: 'test-3',
    name: 'Amara Nwosu',
    role: 'Senior Full Stack Developer',
    company: 'Distributed Labs',
    quote: 'The CV Builder is hands down the best I have used. I created a clean, ATS-compliant resume and had three interviews scheduled within the first two weeks.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    rating: 5,
    userType: 'Job Seeker'
  }
];
