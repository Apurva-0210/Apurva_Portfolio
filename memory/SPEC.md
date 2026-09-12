# Apurva Kumar Engineering Portfolio

## Product

Single-page, responsive engineering portfolio for Apurva Kumar, an Electronics & Communication Engineering student specializing in AI & ML at MIT World Peace University.

## Key flows

- Sticky navigation scrolls to About, Focus, Experience, Projects, Research, Skills, and Contact.
- Hero system profile nodes are hoverable/clickable and expose connected technologies.
- Project cards open accessible detail dialogs with objective, architecture, stack, contribution, and publication-safe status language.
- Skills are grouped by domain; selecting a skill updates the connection inspector.
- Timeline years expand to reveal associated work.
- Resume actions download `frontend/public/assets/Apurva_Kumar_Resume.pdf`.
- Contact actions include a prefilled engineering-opportunities mailto, a downloadable `Apurva_Kumar.vcf`, and a lightweight contact form that prepares a mail draft.

## Data/configuration

All personal content, social links, experiences, projects, research, skills, timeline items, repository mappings, and resume metadata live in `frontend/src/data/profile.ts`. The verified public GitHub username is `Apurva-0210`; confirmed mappings include Autera, ISDV_NET, AGNIS-gas-sensing-project, Gem5-Memory-NoC-Analysis, and FleetEase.

Contact-card metadata is generated from the same profile configuration. Server-side contact delivery is intentionally not connected until an email provider and server credential are approved; the form uses the visitor's mail client as a functional fallback and labels that state in the UI.

The GitHub section fetches public profile and repository metadata from `https://api.github.com` in the browser (no token). It filters private/fork repositories, has a non-blocking error fallback, and displays only live names, descriptions, languages, stars, dates, and URLs.

## Backend

The existing FastAPI `/api/` root and `/api/status` connectivity endpoints remain available for template consistency. The portfolio itself is static and does not gate rendering on backend data.

## Auth

No authentication or seeded accounts. The resume path and filename are configurable in `profile.resume`; replacing the file at that path updates the download without UI changes.