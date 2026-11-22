# Test Strategy: Apurva Kumar Systems Portfolio

## 1. Quality Objectives
- Ensure high-fidelity visual and functional performance of the single-page portfolio across all modern browsers and device form factors.
- Ensure 100% of technical assets (SVG system architectures, high-resolution PNGs, resume PDF) are correctly bundled, loaded, and served without dead links or broken images.
- Ensure interactive elements (project carousel, review quotes, floating glass navigation, email copy, resume download) respond cleanly without JavaScript runtime errors.

## 2. Testing Pyramid & Level Allocation
- **Static Analysis (Base Tier - 40%):**
  - TypeScript strict compilation (`tsc -b --noEmit`) to prevent runtime type errors.
  - Oxlint for linting and code smells.
- **Component & Unit Verification (Middle Tier - 30%):**
  - Vitest test suites verifying data mapping, resume URLs, profile properties, and calculation helpers (`loopOffset`, `clamp`, `wordLevel`).
- **End-to-End & Visual Audit (Top Tier - 30%):**
  - Playwright E2E suites verifying critical user journeys:
    1. Navigation pill transitions and anchor jumps.
    2. Featured Work carousel cycling forward/reverse.
    3. Asset accessibility (checking all `<img>` tags load with status 200).
    4. Resume download link availability.
    5. Mobile viewport responsiveness (390px vs 1440px).

## 3. Entry & Exit Criteria
- **Entry Criteria:**
  - Build succeeds without errors (`yarn build`).
  - Preview server starts cleanly on target port.
- **Exit Criteria (Go/No-Go):**
  - 0 TypeScript compiler errors.
  - 0 missing asset 404s.
  - 0 unhandled console errors during full page scroll.
  - All 12 project cards render with legible text and diagrams.

## 4. Test Environments
- Local development (`http://localhost:5173`)
- Local production preview (`http://localhost:4173`)
- Production deployment (`https://apurvakumar55.vercel.app`)
