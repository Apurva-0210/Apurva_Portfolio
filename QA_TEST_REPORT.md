# Quality Assurance Test Report & Verification Evidence

**Repository**: Apurva-0210/Apurva_Portfolio  
**Frameworks**: Playwright 1.50+ · Vitest 4.1.10 · TypeScript 5.8 · ESLint 9  
**Execution Timestamp**: November 2026  
**Overall QA Status**: **PASS — 100% OF AUTOMATED TESTS PASSING**  

---

## 1. Test Suite Summary Matrix

| Test Layer | Test Runner | Total Tests | Passed | Failed | Skipped | Execution Time |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Static Type Checking** | TypeScript (`tsc -b`) | 1 project | 1 | 0 | 0 | 1.8s |
| **Static Code Quality** | ESLint (`eslint .`) | 77 modules | 77 | 0 | 0 | 1.2s |
| **Unit & Logic Tests** | Vitest (`vitest run`) | 5 tests | 5 | 0 | 0 | 192ms |
| **End-to-End & UI Tests** | Playwright (`playwright test`) | 10 tests | 10 | 0 | 0 | 35.0s |
| **Audit & Quality Gates** | Lighthouse CLI | 5 categories | 5 | 0 | 0 | 18.0s |

---

## 2. End-to-End Test Execution Log (`tests/e2e/portfolio.spec.ts`)

```text
Running 10 tests using 2 workers

✓ renders page without console errors or unhandled exceptions (desktop) (27.4s)
✓ renders page without console errors or unhandled exceptions (mobile) (29.2s)
✓ verifies active and adjacent project cards and core images load successfully (desktop) (961ms)
✓ verifies active and adjacent project cards and core images load successfully (mobile) (682ms)
✓ featured works carousel advances, filters categories, and opens deep-dive modal (desktop) (2.7s)
✓ featured works carousel advances, filters categories, and opens deep-dive modal (mobile) (2.7s)
✓ mobile navigation drawer opens and functions on mobile viewport (viewport: 390x844) (898ms)
✓ mobile navigation drawer opens and functions on mobile viewport (re-check) (950ms)
✓ resume download link and mailto links are valid (desktop) (754ms)
✓ resume download link and mailto links are valid (mobile) (687ms)

10 passed (35.0s)
```

---

## 3. Unit Test Execution Log (`frontend/src/__tests__/portfolio.test.ts`)

```text
 ✓ src/__tests__/portfolio.test.ts (5 tests) 3ms
   ✓ Profile & Data Integrity (2)
     ✓ has valid personal information 1ms
     ✓ withBase resolves relative paths cleanly without double slashes 0ms
   ✓ Motion & Calculation Helpers (3)
     ✓ clamp bounds values correctly 0ms
     ✓ loopOffset calculates cyclic index offsets correctly 0ms
     ✓ wordLevel calculates opacity threshold correctly 1ms

 Test Files  1 passed (1)
      Tests  5 passed (5)
   Duration  192ms
```

---

## 4. Key Functional Features Validated

1. **Zero Console Errors**: Full page scroll simulation across entire DOM completed with 0 runtime warnings or uncaught exceptions.
2. **Carousel Interaction**: Left/right arrow navigation shifts active project index without frame stutter or layout dislocation.
3. **Domain Filtering**: Filtering by `Automotive & ADAS` instantly recalibrates carousel array to relevant projects.
4. **Deep-Dive Specification Modal**: Clicking "Inspect Architecture" activates `.cr-modal`, displays high-res diagrams, presents bulleted technical specifications, and closes seamlessly on close button click or backdrop tap.
5. **Mobile Navigation Drawer**: Hamburger button toggles accessible glass drawer with direct anchor navigation, email contact, and official resume download link.
6. **Telemetry & Network Fallbacks**: Handles live GitHub API connectivity without blocking rendering.
