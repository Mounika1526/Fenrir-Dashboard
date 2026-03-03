# Fenrir Dashboard

A cybersecurity penetration-testing dashboard UI built with React and Tailwind CSS. It simulates an AI-driven security scanning platform with a live scan console, finding log, severity tracking, and a sign-up flow.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | 19.2 |
| Routing | React Router DOM | 7.13 |
| Styling | Tailwind CSS (Vite plugin) | 4.2 |
| Build Tool | Vite | 7.3 |
| Animated Counters | react-countup | 6.5 |
| Linting | ESLint + react-hooks + react-refresh plugins | 9.x |

---

## Project Structure

```
src/
├── components/
│   ├── icons/
│   │   └── meta.jsx          # Meta/Facebook SVG icon
│   ├── Sidebar.jsx           # Navigation sidebar with theme toggle
│   ├── SeverityBadge.jsx     # Critical / High / Medium / Low badge
│   ├── StatusChip.jsx        # Completed / Scheduled / Failed chip
│   └── Toast.jsx             # Dismissible toast notification
├── context/
│   └── ThemeContext.jsx      # Dark/light mode context (persists to localStorage)
├── data/
│   └── mockData.js           # All mock data — scans, activity logs, findings
├── pages/
│   ├── LoginPage.jsx         # Sign-up page with social auth buttons
│   ├── DashboardPage.jsx     # Scan list with severity stats and org overview
│   └── ScanDetailPage.jsx    # Live console, verification loops, finding log
├── index.css                 # Global styles, autofill overrides, scrollbar
└── main.jsx                  # App entry point and router definition
```

---

## Prerequisites

- **Node.js** 18 or later
- **npm** 9 or later (or pnpm / yarn)

---

## Setup & Running Locally

```bash
# 1. Clone the repository
git clone <repo-url>
cd fenrir-dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173** by default.

### Other scripts

```bash
npm run build      # Production build 
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint across all source files
```

---

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | LoginPage | Sign-up form, redirects to dashboard on submit |
| `/dashboard` | DashboardPage | Paginated scan list, severity stat cards, org info |
| `/scan/:id` | ScanDetailPage | Live console, activity log, verification loops, finding log |

> All routes are client-side only. Navigating directly to `/dashboard` or `/scan/1` works because Vite's dev server handles it. In production you will need server-side redirect rules (see Limitations below).

---

## Mock Data

All data lives in `src/data/mockData.js`. The scenario simulates a grey-box penetration test against `helpdesk.democorp.com` mid-way through the Testing phase.

**What's included:**
- 13 scan entries (8 completed, 3 scheduled, 2 failed) with realistic names and varied vuln counts
- 20-entry activity log covering recon → SQLi → RCE → JWT forgery → XSS → SSRF
- 5 verification loop entries confirming critical findings
- 8 findings (3 Critical, 3 High, 1 Medium, 1 Low) with timestamps and endpoints
- Severity summary stats and org-level counters

To change the active scan shown in the detail view, edit the `activeScan` export in `mockData.js`.

---

## Known Limitations

### No Backend / API
The entire application runs on static mock data. There is no real authentication, no database, and no actual scan engine. Form submission on the login page navigates to the dashboard after a short delay.

### No TypeScript
The project uses plain JavaScript (JSX). There are no type definitions or runtime type checks on the mock data shape. Passing unexpected data structures to components will fail silently or cause render errors.

### Scan Detail is Always the Same Scan
Clicking any row in the dashboard navigates to `/scan/:id`, but `ScanDetailPage` always renders the single `activeScan` object from `mockData.js` regardless of the `:id` param. A real implementation would fetch scan data by ID.

### Dark Mode Scope
The theme toggle (dark/light) applies globally via a `.dark` class on the `<html>` element. The login page always renders with a custom dark background regardless of the theme setting; only the dashboard and scan detail pages respect the toggle.

### Browser Autofill Styling
Login form inputs use a `-webkit-box-shadow` inset trick to override browser autofill background colours. This works in Chrome and Edge. Firefox uses a different autofill mechanism and may still show its own highlight colour briefly.

### Animations Require Viewport Entry
The `react-countup` number animations on the severity stat cards run immediately on mount rather than on scroll-into-view. On very small screens where the cards are below the fold, the animation may already be complete by the time the user scrolls to them.
