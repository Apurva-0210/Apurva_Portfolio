# Initial QA Test Plan: Portfolio Bug & Issue Audit

## Scope & Target
- Target: Apurva Kumar Portfolio (Vite + React 19 + TypeScript)
- Test Focus: Critical user journeys, interactive states, responsive viewports, asset loading, console error tracking.

## Test Matrix

| ID | Category | Scenario | Expected Outcome | Priority |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Static | Build and typecheck verification | `yarn typecheck` and `yarn build` pass with 0 errors | P0 |
| **TC-02** | Assets | Asset resolution audit | All 22 local image assets and resume PDF load with HTTP 200 | P0 |
| **TC-03** | Navigation | Floating navigation & smooth scroll | Clicking "Focus", "Capabilities", "Projects", "Contact" navigates to correct DOM sections | P1 |
| **TC-04** | Carousel | 12-Card Featured Work carousel | Forward and backward arrows advance cards; active card is centered; text and badges are uncropped | P0 |
| **TC-05** | Interactivity | Email copy to clipboard & mailto | Clicking email button copies email and shows feedback toast; mailto link properly formatted | P1 |
| **TC-06** | Downloads | Resume download trigger | "Resume ↓" and "Download Resume (PDF)" point to valid existing PDF | P0 |
| **TC-07** | Responsive | Mobile layout (390px viewport) | No horizontal page blowout, text scales gracefully, cards fit viewport width | P0 |
| **TC-08** | Code Smells | Prop propagation & unused variables | Template props correctly rendered in JSX; zero dead props | P2 |
| **TC-09** | Console | Runtime exception monitoring | 0 uncaught JavaScript errors or React hydration/rendering warnings during full scroll | P0 |
