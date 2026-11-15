# find for — Modern Career & Recruitment Platform

> **find for** is a complete, polished, frontend-only recruitment and job search web platform built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. It delivers tailored interactive interfaces for three distinct user roles: **Job Seeker (Candidate)**, **Employer**, and **Platform Administrator**.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm` (or `pnpm` / `yarn`)

### Installation & Development
1. Extract or clone this repository and navigate to the project directory:
   ```bash
   cd find-for
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Building for Production
```bash
npm run build
npm run preview
```

### ⚡ Instant Standalone Preview (Zero Dependencies)
You can also open `standalone-preview.html` directly in any web browser with a double-click to immediately explore the entire platform without installing Node or npm.

---

## 🎨 Visual Design System & Branding
- **Primary Color:** Deep Navy `#14213D` (Trust, Authority, Structure)
- **Accent Color:** Vibrant Teal `#16A6A1` (Growth, Clarity, Vitality)
- **Highlight Color:** Warm Amber `#F4A261` (Optimism, Urgency, Accents)
- **Background Surface:** Soft Off-White `#F7F9FC` (Clean, Modern Contrast)
- **Typography:** Accessible hierarchy using *Plus Jakarta Sans* & *Inter*
- **Component Design:** Rounded cards (`rounded-2xl` / `rounded-3xl`), soft shadows (`shadow-soft`), clear focus rings, and high color contrast.

---

## 🎭 Role Switcher & Interactive Demo State

All session data, job bookmarks, application statuses, newly posted jobs, and profile updates persist in browser **`localStorage`**.

### Instant Role Switcher
In the top navigation header and user profile dropdown, click **"Role: [Current Role]"** to switch between:
1. **Job Seeker (Candidate)** — Demo profile: *Alex Morgan* (Senior Frontend Engineer)
2. **Employer / Recruiter** — Demo profile: *Sarah Jenkins* (VP of Talent at Nexus Cloud Systems)
3. **Platform Administrator** — Demo profile: *Eleanor Vance* (Trust & Safety Admin)

> **Important Demo Notice:**  
> This application is a 100% frontend prototype. There is no real backend server, SQL database, or live external email/payment gateway. AI matching scores and statistics are simulated client-side.

---

## 🗺️ Complete Route & Page Directory (All 26 Routes)

### 🌐 Public Pages
| Route | Page | Key Features |
|---|---|---|
| `/` | **Home** | Interactive hero slider/carousel, keyword & location search, popular categories, latest & featured jobs, company directory preview, "How it works" tabs, platform statistics, career advice articles, testimonials, FAQ preview, and primary CTAs. |
| `/jobs` | **Find Jobs** | Live multi-facet filtering (location, workplace model, job type, category, experience, minimum salary slider), sorting by latest / highest salary / relevance, instant mock search, pagination, and empty state. |
| `/jobs/:id` | **Job Details** | Comprehensive job summary, responsibilities, requirements, benefits, technical tags, company profile card, simulated skill-match percentage with matching & missing tags, "Save Job" bookmarking, and "Apply Now" interactive modal. |
| `/companies` | **Companies** | Searchable employer directory with industry filtering, team size badges, and open job counters. |
| `/companies/:id` | **Company Profile** | Company banner, logo, overview, headquarters, team size, culture perks, and active job listings. |
| `/about` | **About** | Mission, value pillars, benefits for job seekers & employers, and platform disclosure. |
| `/faq` | **FAQ & Knowledge Base** | Searchable accordion covering accounts, applications, statuses, employers, CV builder, and privacy. |
| `/contact` | **Contact** | Contact form with validation, success toast, sample office details, and social links. |
| `/login` | **Login** | Role-aware demo login with 1-click presets for Candidate, Employer, and Admin. |
| `/signup` | **Sign Up** | Role selection (Job Seeker vs Employer), validation, and account creation in local state. |
| `/forgot-password` | **Forgot Password** | Friendly simulated password recovery flow. |

### 👤 Job Seeker (Candidate) Dashboard
| Route | Page | Key Features |
|---|---|---|
| `/candidate/dashboard` | **Candidate Dashboard** | Welcome banner, ATS readiness / profile strength progress bar, KPI metrics (submitted, interviews, saved, offers), recent application table, and skill-tailored job recommendations. |
| `/candidate/profile` | **Candidate Profile** | Avatar preview, personal details, career bio, technical skill tag adder/remover, and master resume upload simulator. |
| `/candidate/applications` | **My Applications** | 5-stage visual progress timeline: *Pending → Shortlisted → Interview → Hired or Rejected*, interview alerts, recruiter notes, and application withdrawal with confirmation dialog. |
| `/candidate/saved-jobs` | **Saved Jobs** | Bookmarked job cards with 1-click removal and direct quick apply. |
| `/cv-builder` | **Interactive CV Builder** | Multi-section real-time editor (Personal, Summary, Experience, Education, Skills, Projects), dynamic item addition/removal, 2 professional template styles (*Modern Teal* & *Classic Executive*), and print-to-PDF export (`window.print()`). |
| `/candidate/notifications` | **Job Alerts & Notifications** | In-platform notification inbox with read/unread toggle and custom job alert preference rule engine (keywords, category, location, frequency). |

### 🏢 Employer Dashboard
| Route | Page | Key Features |
|---|---|---|
| `/employer/dashboard` | **Employer Dashboard** | Recruitment desk overview: active openings, applicant volume, shortlisted counts, scheduled interviews, and quick pipeline stage buttons. |
| `/employer/jobs` | **Manage Jobs** | Filter jobs by status (*Active*, *Draft*, *Closed*), search listings, toggle active/closed, view details, or delete with confirmation dialog. |
| `/employer/jobs/new` | **Post a Job** | Full job drafting form (title, category, workplace type, salary range, deadline, responsibilities, requirements, technical skills), preview modal, and immediate session publication to public board. |
| `/employer/applicants` | **Applicant Pipeline** | Candidate screening desk: search & filter by role/status, candidate CV inspection modal, and one-click stage progression (*Shortlist*, *Schedule Interview*, *Hire*, *Reject*). |
| `/employer/company` | **Company Brand Profile** | Edit organization name, industry, headquarters, mission, team size, website, and candidate perks. |

### 🛡️ Platform Admin Dashboard
| Route | Page | Key Features |
|---|---|---|
| `/admin/dashboard` | **Admin Dashboard** | Operations center: user metrics, job volume, company counts, category distribution bar chart, open reports counter, and quick navigation desk. |
| `/admin/users` | **User Management** | Searchable user table with role and status filtering, plus 1-click account suspension and reactivation. |
| `/admin/jobs` | **Job Moderation** | Quality audit table to approve or reject pending employer job postings. |
| `/admin/companies` | **Company Management** | Audit employer organizations and grant or revoke verified partner badges. |
| `/admin/categories` | **Job Categories** | Taxonomy management: add, edit, or delete recruitment categories with icon mappings. |
| `/admin/reports` | **Moderation Reports** | Community flag queue for suspicious postings or users with resolve and dismiss actions. |

---

## 📁 Project Architecture & Folder Structure

```
find-for/
├── index.html                   # HTML entry point with fonts & meta tags
├── package.json                 # Dependencies & project scripts
├── postcss.config.js            # PostCSS plugins (Tailwind, Autoprefixer)
├── tailwind.config.js           # Design tokens (navy, teal, amber, surface)
├── tsconfig.json                # TypeScript bundler configuration
├── tsconfig.node.json           # Node TypeScript configuration
├── vite.config.ts               # Vite server & React plugin configuration
├── standalone-preview.html      # Zero-dependency browser preview
└── src/
    ├── main.tsx                 # React DOM mount point
    ├── App.tsx                  # Master router & Context providers
    ├── index.css                # Tailwind directives & print stylesheets
    ├── types/
    │   └── index.ts             # Complete TypeScript interfaces
    ├── data/
    │   ├── mockJobs.ts          # 20+ realistic job postings
    │   ├── mockCompanies.ts     # Employer companies with perks & culture
    │   ├── mockUsers.ts         # Candidate, employer, and admin accounts
    │   ├── mockApplications.ts  # Application records across pipeline stages
    │   ├── mockCategories.ts    # 12 industry categories with job counts
    │   ├── mockNotifications.ts # In-app notifications & alert preferences
    │   ├── mockArticles.ts      # Career advice articles & testimonials
    │   ├── mockFaqs.ts          # Grouped FAQ knowledge base
    │   └── mockReports.ts       # Moderation flags & reports
    ├── context/
    │   ├── ToastContext.tsx     # Toast notification system
    │   ├── AuthContext.tsx      # User authentication & role switcher
    │   ├── JobContext.tsx       # Job board state, saving, & categories
    │   └── ApplicationContext.tsx # Candidate apps, CV profile, & alerts
    ├── layouts/
    │   ├── PublicLayout.tsx     # Header + Outlet + Footer shell
    │   └── DashboardLayout.tsx  # Role-tailored sidebar + topbar dashboard shell
    ├── components/
    │   ├── common/
    │   │   ├── Header.tsx       # Sticky navbar with role pill & dropdown
    │   │   ├── Footer.tsx       # Multi-column branded footer & newsletter
    │   │   ├── MobileMenu.tsx   # Mobile slide-out drawer
    │   │   ├── Breadcrumbs.tsx  # Accessible breadcrumbs
    │   │   ├── Modal.tsx        # Accessible dialog modal
    │   │   ├── ConfirmDialog.tsx# Confirmation dialog for destructive actions
    │   │   ├── Toast.tsx        # Floating notification stack
    │   │   └── Badge.tsx        # Status, job type, and workplace badges
    │   ├── jobs/
    │   │   ├── JobCard.tsx      # Rich job listing card with bookmarking
    │   │   ├── JobFilters.tsx   # Sidebar filtering & sorting panel
    │   │   └── ApplyModal.tsx   # Interactive application & skill match modal
    │   ├── companies/
    │   │   └── CompanyCard.tsx  # Company directory card
    │   └── cv/
    │       ├── ModernTemplate.tsx  # Modern Clean Teal CV template
    │       └── ClassicTemplate.tsx # Classic Executive Navy CV template
    └── pages/
        ├── public/              # 11 public pages + 404
        ├── candidate/           # 6 candidate dashboard pages
        ├── employer/            # 5 employer dashboard pages
        └── admin/               # 6 admin dashboard pages
```

---

## 💻 Browser Support & Accessibility
- **Semantic HTML5** (`<main>`, `<header>`, `<footer>`, `<aside>`, `<nav>`, `<article>`)
- **Keyboard Navigation** & visible focus indicators (`focus-visible`)
- **Color Contrast** strictly follows WCAG AA standards
- **Responsive Layouts** mobile-first architecture tested across 320px, 768px, 1024px, and 1440px+
- **Print Optimization** custom `@media print` rules for clean, borderless CV printing.

---

## 📄 License
This project is an open prototype created for demonstrative and educational purposes.
