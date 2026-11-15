import { JobCategory } from '../types';

export const initialCategories: JobCategory[] = [
  {
    id: 'cat-1',
    name: 'Software Engineering',
    slug: 'software-engineering',
    iconName: 'Code',
    jobCount: 428,
    description: 'Frontend, backend, mobile, DevOps, and cloud infrastructure roles.',
    popularSkills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker']
  },
  {
    id: 'cat-2',
    name: 'Product & Design',
    slug: 'product-design',
    iconName: 'Palette',
    jobCount: 215,
    description: 'UI/UX designers, design systems, UX researchers, and product leads.',
    popularSkills: ['Figma', 'User Research', 'Design Systems', 'Prototyping', 'Wireframing']
  },
  {
    id: 'cat-3',
    name: 'Data & Artificial Intelligence',
    slug: 'data-ai',
    iconName: 'BrainCircuit',
    jobCount: 312,
    description: 'Machine learning, AI engineers, data scientists, and analytics experts.',
    popularSkills: ['PyTorch', 'TensorFlow', 'LLMs', 'SQL', 'Python', 'Pandas']
  },
  {
    id: 'cat-4',
    name: 'Marketing & Growth',
    slug: 'marketing-growth',
    iconName: 'TrendingUp',
    jobCount: 184,
    description: 'Performance marketing, content strategy, brand, and SEO specialists.',
    popularSkills: ['Google Analytics', 'SEO', 'Content Strategy', 'HubSpot', 'Copywriting']
  },
  {
    id: 'cat-5',
    name: 'Finance & Accounting',
    slug: 'finance-accounting',
    iconName: 'BadgeDollarSign',
    jobCount: 146,
    description: 'Financial analysis, corporate accounting, audits, and investment roles.',
    popularSkills: ['Financial Modeling', 'Excel', 'QuickBooks', 'GAAP', 'Forecasting']
  },
  {
    id: 'cat-6',
    name: 'Product Management',
    slug: 'product-management',
    iconName: 'Kanban',
    jobCount: 165,
    description: 'Technical product managers, scrum masters, and roadmap owners.',
    popularSkills: ['Agile', 'Scrum', 'Jira', 'Product Roadmapping', 'User Stories']
  },
  {
    id: 'cat-7',
    name: 'Sales & Business Development',
    slug: 'sales-bizdev',
    iconName: 'Handshake',
    jobCount: 198,
    description: 'Account executives, sales development, enterprise B2B sales, and partnerships.',
    popularSkills: ['Salesforce', 'Outreach', 'B2B Sales', 'Negotiation', 'CRM']
  },
  {
    id: 'cat-8',
    name: 'Customer Success & Support',
    slug: 'customer-success',
    iconName: 'Headphones',
    jobCount: 122,
    description: 'Customer onboarding, client account managers, and support heroes.',
    popularSkills: ['Zendesk', 'Client Retention', 'Intercom', 'Troubleshooting']
  },
  {
    id: 'cat-9',
    name: 'Human Resources & People',
    slug: 'human-resources',
    iconName: 'Users',
    jobCount: 94,
    description: 'Talent acquisition, HR business partners, culture, and employee benefits.',
    popularSkills: ['Talent Sourcing', 'Workday', 'Compensation', 'Employment Law']
  },
  {
    id: 'cat-10',
    name: 'Cybersecurity & Infrastructure',
    slug: 'cybersecurity',
    iconName: 'ShieldCheck',
    jobCount: 137,
    description: 'Security operations, ethical hacking, compliance, and SOC analysts.',
    popularSkills: ['SIEM', 'Penetration Testing', 'SOC 2', 'CISSP', 'Network Security']
  },
  {
    id: 'cat-11',
    name: 'Healthcare & Biotech',
    slug: 'healthcare-biotech',
    iconName: 'Stethoscope',
    jobCount: 110,
    description: 'Clinical research, bioinformatics, healthcare admin, and medtech.',
    popularSkills: ['Clinical Trials', 'Bioinformatics', 'HIPAA', 'Lab Operations']
  },
  {
    id: 'cat-12',
    name: 'Operations & Logistics',
    slug: 'operations-logistics',
    iconName: 'Truck',
    jobCount: 88,
    description: 'Supply chain management, vendor relations, and logistics coordinators.',
    popularSkills: ['Supply Chain', 'Inventory Management', 'ERP', 'Vendor Negotiation']
  }
];
