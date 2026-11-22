# QA Project Context: Apurva Kumar Portfolio

## Product
- **Name:** Apurva Kumar Engineering Portfolio
- **Type:** Single-page engineering showcase & systems architecture portfolio web application
- **Purpose:** Highlights embedded systems, computer architecture, ADAS & autonomous vehicle simulation, and edge deep learning engineering research, project implementations, and professional experience.
- **Environments:**
  - Production URL: `https://apurvakumar55.vercel.app` (also `https://apurva-0210.github.io`)
  - Staging/Preview URL: `http://localhost:4173` (Vite preview), `http://localhost:5173` (Vite dev)
- **Critical User Journeys:**
  1. **Hero & First Impression:** Visitor loads page, views animated headline, floating glass navigation, live IST clock, and atmospheric dark theme.
  2. **Technical Manifesto & Affiliations:** Visitor scrolls to read engineering philosophy, institutional badges (Tata Tech, IIT Guwahati, MIT-WPU), and technology marquee.
  3. **Architecture Focus Deck:** Visitor interacts with the 3-layer architecture cards (Embedded & Real-Time, Computer Architecture, Automotive ADAS).
  4. **Engineering Capabilities:** Visitor reviews the 6 core capability articles with technical specs and architectural diagrams.
  5. **Featured Work Carousel:** Visitor cycles through the 12 project cards (AUTERA, NCRT, DAUGT, ISDV-Net, AGNIS, CARLA-RoadRunner, gem5, FleetEase, Veyrion, etc.) with functional previous/next controls and repository links.
  6. **Industry Affiliations & Testimonials:** Visitor views institutional logos and cycles research quotes from internships.
  7. **Academic & System Metrics:** Visitor reads verified metrics (8.62 CGPA, 3 labs, 6 projects).
  8. **Contact & Resume Download:** Visitor triggers "Email Apurva", copies email to clipboard, or clicks "Download Resume (PDF)" which serves `Apurva_Kumar_Resume.pdf`.

## Tech Stack
### Frontend
- **Framework:** React 19 (`react: 19.2.8`, `react-dom: 19.2.8`)
- **Bundler / Tooling:** Vite 8.1.5 (`@vitejs/plugin-react: 6.0.4`)
- **Language:** TypeScript 7.0.2
- **Styling:** Tailwind CSS 4.3.3, `@tailwindcss/vite`, CSS Variables, Canvas/WebGL GSAP animations (`gsap: ^3.15.1`, `motion: 12.42.2`)
- **UI Components:** Base UI React, Radix primitives, Lucide icons, custom responsive templates
- **Fonts:** Space Grotesk, IBM Plex Mono, Poppins, DM Serif Display

### Backend / API (Optional / Auxiliary)
- **Framework:** FastAPI (Python 3.12+)
- **Location:** `backend/server.py`
- **Endpoints:** GitHub proxy router `/api/github`
- **Database:** MongoDB (`pymongo`, `motor`) - optional telemetry layer

## Test Stack
### E2E / Integration
- **Framework:** Playwright (`@playwright/test: 1.62.0`)
- **Config Location:** `tests/playwright.config.ts`
- **Test Directory:** `tests/e2e/`
- **Status:** Scaffolding complete; test directory initialized; browser checks verified via browser agent.

### Unit / Component
- **Framework:** Vitest (`vitest: 4.1.10`)
- **Location:** `frontend/`
- **Config:** `frontend/vite.config.ts`

### Static Analysis & Linting
- **Typechecker:** TypeScript `tsc -b --noEmit`
- **Linter:** Oxlint (`oxlint: 1.76.0`)

## CI/CD
- **Platform:** GitHub Actions (`.github/workflows/`)
- **Deploy Target:** Vercel / GitHub Pages
- **Triggers:** Push to `main`, Pull Requests

## Environments
- **Local Dev:** `http://localhost:5173`
- **Local Preview:** `http://localhost:4173`
- **Production:** `https://apurvakumar55.vercel.app`

## Quality Goals
- **Build & Compilation:** Zero TypeScript errors (`tsc -b --noEmit`).
- **Code Hygiene:** 0 linter errors, < 5 non-critical warnings.
- **Asset Integrity:** 100% of referenced images, diagrams, and PDFs must exist and load without 404s.
- **Responsiveness:** Full layout stability across mobile (390px), tablet (768px), and desktop (1440px).
- **Navigation:** All anchor jumps, external links, and resume download buttons functional.

## Risk Areas
| Area | Risk Level | Business Impact | Likelihood | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Asset 404s & Broken Links** | High | Critical | Medium | External CDN images or local asset paths could fail, leaving broken images in cards |
| **Mobile Navigation Gap** | Medium | High | High | Nav links hidden on screens < 860px with no alternative mobile drawer/menu |
| **Prop Disconnects** | Medium | Medium | High | Several template props (`worksTitle`, `servicesTitle`, `ctaTitle`) overridden by hardcoded strings |
| **Scroll Animation Overhead** | Medium | Medium | Low | GSAP/custom RAF scroll math on low-power mobile devices could cause frame stutter |
| **Fast Refresh Warnings** | Low | Low | Medium | Non-component exports in UI component files trigger React HMR warnings |

## Team
- **Ownership:** Solo Engineering / Developer-owned QA
- **Model:** Developer-led automated testing, static verification, and goal-driven browser validation.

## Conventions
- **Selectors:** Semantic ARIA roles (`role="navigation"`, `role="button"`) and user-facing identifiers.
- **File Naming:** kebab-case for assets and configs; PascalCase for React components.
- **Git Flow:** Feature branches or direct main commits with conventional commit messages.
