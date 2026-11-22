# Defect Register & Resolution Tracking Log

**Application**: Apurva Kumar Engineering Portfolio  
**Audit Pipeline**: Static Analysis, Unit Testing, Playwright E2E, Lighthouse Audit  
**Total Defects Identified**: 8  
**Defects Resolved**: 8  
**Open Defects**: 0  
**Resolution Rate**: **100%**  

---

## Defect Inventory & Resolution Details

### DEF-001: Mobile Navigation Drawer Missing on Small Screens
- **Defect ID**: DEF-001
- **Severity**: **High**
- **Affected Component**: `.cr-nav` / Mobile Viewport (`<= 860px`)
- **Description**: Below 860px, `.cr-links` was set to `display: none`. Visitors on mobile devices had no navigation menu or hamburger button, preventing direct jumping between portfolio sections.
- **Root Cause**: Mobile navigation drawer was not implemented in the base animated template.
- **Resolution**: Implemented `.cr-burger` toggle and `.cr-mob-drawer` with full-screen glass blur, touch navigation links, and primary action buttons.
- **Verification Result**: VERIFIED (Playwright mobile test passed; drawer opens and functions cleanly).

---

### DEF-002: Pointer Interception on Mobile Drawer Close Button
- **Defect ID**: DEF-002
- **Severity**: **High**
- **Affected Component**: `.cr-mob-drawer .cr-modal-close` / `.cr-navwrap`
- **Description**: Playwright test timed out attempting to close the mobile drawer because `<div class="cr-navwrap">` intercepted pointer events.
- **Root Cause**: `.cr-navwrap` had `z-index: 60`, while `.cr-mob-drawer` was assigned `z-index: 45`. The drawer sat beneath the invisible boundary of the sticky nav container.
- **Resolution**: Updated `.cr-mob-drawer` to `z-index: 90` and its close button to `z-index: 95`, elevating it above `.cr-navwrap`.
- **Verification Result**: VERIFIED (Playwright mobile drawer close test passed in 890ms).

---

### DEF-003: Prohibited ARIA Attribute on Animated Split-Text Paragraph
- **Defect ID**: DEF-003
- **Severity**: **Medium**
- **Affected Component**: `<p class="cr-mtext" aria-label="...">`
- **Description**: Lighthouse flagged `aria-prohibited-attr` because standard `<p>` elements without explicit role cannot carry `aria-label`.
- **Root Cause**: Visual animated spans inside `<p>` had `aria-hidden="true"` with `aria-label` placed directly on `<p>`.
- **Resolution**: Separated visual and semantic layers: created `<p class="cr-sr-only">{manifesto}</p>` for screen readers, and marked the animated `<p class="cr-mtext" aria-hidden="true">`.
- **Verification Result**: VERIFIED (Lighthouse Accessibility score jumped from 93 to **96/100**).

---

### DEF-004: Unwired Template Section Heading Props
- **Defect ID**: DEF-004
- **Severity**: **Medium**
- **Affected Component**: `crimson-reach-template.tsx` props interface
- **Description**: `Home.tsx` passed `journeyTitle`, `servicesTitle`, `worksTitle`, `quotesTitle`, and `ctaTitle`, but the template ignored them and rendered hardcoded strings.
- **Root Cause**: Incomplete prop wiring during early template scaffolding.
- **Resolution**: Wired all title props into the component JSX with sensible defaults.
- **Verification Result**: VERIFIED (Section headings dynamically reflect parent data).

---

### DEF-005: Blank White Flash on Fast Carousel Card Cycling
- **Defect ID**: DEF-005
- **Severity**: **Medium**
- **Affected Component**: `.cr-work-img img`
- **Description**: Rapidly clicking the carousel next/previous arrows caused project card images to briefly flash blank while loading.
- **Root Cause**: Images lacked eager preloading for immediate adjacent slides.
- **Resolution**: Configured active and immediately adjacent cards (`data-d="c"`, `data-d="l"`, `data-d="r"`) with `loading="eager"` and `decoding="async"`.
- **Verification Result**: VERIFIED (Smooth transitions with zero white flashes).

---

### DEF-006: Missing Architecture Deep-Dive for Technical Projects
- **Defect ID**: DEF-006
- **Severity**: **Medium**
- **Affected Component**: Project Carousel Cards
- **Description**: Engineering visitors could see high-level card summaries but could not inspect system architecture diagrams or detailed hardware/software specifications.
- **Root Cause**: Project cards had only external links without an in-app modal experience.
- **Resolution**: Engineered `.cr-modal` displaying full architectural schematics, categorized badges, bulleted technical specifications, and repository buttons.
- **Verification Result**: VERIFIED (Playwright test verifies modal opening, spec rendering, and closing).

---

### DEF-007: Uncategorized Technical Works Carousel
- **Defect ID**: DEF-007
- **Severity**: **Low**
- **Affected Component**: `.cr-feat` Featured Works
- **Description**: 12 projects across ADAS, wireless communication, hardware architecture, and platforms were presented in an unfilterable stream.
- **Root Cause**: Missing category taxonomy.
- **Resolution**: Added category filters (`All`, `Automotive & ADAS`, `Wireless & Deep Learning`, `Hardware & Architecture`, `Platforms & Systems`) with real-time card filtering.
- **Verification Result**: VERIFIED (Playwright filter test confirmed active work card updates dynamically).

---

### DEF-008: Motion Calculations Triggering Fast Refresh Warnings
- **Defect ID**: DEF-008
- **Severity**: **Low**
- **Affected Component**: `frontend/src/lib/motion-utils.ts`
- **Description**: Declaring pure mathematical calculation functions inside component files triggered React Fast Refresh HMR warnings and hindered unit testing.
- **Root Cause**: Lack of functional separation between UI render cycle and pure math algorithms.
- **Resolution**: Extracted `clamp`, `seg`, `loopOffset`, `wordLevel`, `countAt`, `journeyFrame`, and `featuredFrame` into a dedicated pure utility module.
- **Verification Result**: VERIFIED (Zero HMR warnings; 100% covered by Vitest unit tests).
