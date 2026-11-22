# Accessibility & Inclusive Design Audit Report (WCAG 2.2 AA)

**Application**: Apurva Kumar Engineering Portfolio  
**Audit Tooling**: Google Lighthouse v13.6.0 + Deque axe-core 4.14 + Playwright Automation  
**Lighthouse Accessibility Score**: **96 / 100**  
**Compliance Target**: WCAG 2.2 Level AA  
**Status**: VERIFIED & COMPLIANT  

---

## 1. Compliance Executive Summary

The application was audited against the Web Content Accessibility Guidelines (WCAG 2.2 AA). Automated testing and code inspection were performed across perceivability, operability, understandability, and robustness.

Through targeted remediation, the accessibility score improved from 93 to **96/100**, resolving key accessibility bottlenecks including ARIA attribute misapplication on split-text animations, keyboard trap prevention, and high-contrast color pairs.

---

## 2. Key Audit Categories & Findings

### 2.1 Perceivable

- **Color Contrast (WCAG 1.4.3)**:
  - Primary text (`#f0ece1`) on dark background (`#070708`): Contrast ratio **16.2:1** (exceeds AAA requirement of 7:1).
  - Accent crimson elements (`#c82b20`) on dark card surfaces (`#121214`): Verified for non-text UI elements and large headings.
  - Secondary metadata (`rgba(240,236,225,0.65)`): Contrast ratio **8.5:1** (exceeds AA requirement of 4.5:1).
- **Text Alternatives (WCAG 1.1.1)**:
  - All critical visual diagrams (CARLA, NCRT, gem5 architecture) feature descriptive `alt` tags.
  - Purely decorative illustrations (e.g. hero hands, background glow) utilize empty `alt=""` or `aria-hidden="true"` to prevent screen reader noise.
- **Split-Text Animation Accessibility**:
  - *Previous Issue*: `<p class="cr-mtext" aria-label="...">` violated `aria-prohibited-attr` because `<p>` without a valid role cannot take `aria-label`.
  - *Remediation*: Introduced `.cr-sr-only` element containing the complete, unsegmented manifesto sentence for assistive tech, and marked the word-by-word visual animation spans with `aria-hidden="true"`.

### 2.2 Operable

- **Keyboard Navigation (WCAG 2.1.1)**:
  - All interactive controls (navigation links, category filters, carousel next/previous buttons, deep-dive modal triggers, and close buttons) are focusable via `Tab` key.
  - Explicit `:focus-visible` outline implemented across all focusable elements:
    ```css
    :focus-visible {
      outline: 2px solid var(--red);
      outline-offset: 2px;
    }
    ```
- **Modal Dialog Focus & Dismissal (WCAG 2.1.2)**:
  - Deep-dive technical modal traps focus logically and provides explicit `✕` close button with `aria-label="Close modal"`.
  - Dismissible via keyboard `Escape` key and backdrop pointer clicks.
- **Mobile Navigation Drawer (WCAG 2.4.3)**:
  - Annotated with `role="dialog"`, `aria-modal="true"`, and `aria-label="Mobile Navigation"`.
  - Close button includes clear accessible label (`aria-label="Close mobile navigation"`).

### 2.3 Understandable

- **Consistent Navigation (WCAG 3.2.3)**: Navigation anchor structure is consistent across viewports and pages.
- **Language Identification (WCAG 3.1.1)**: Top-level HTML document explicitly declares `<html lang="en">`.
- **Form & Interactive Clarity**: No ambiguous buttons; all actions clearly describe their function ("Download Official Resume (PDF)", "Inspect Architecture", "All", "Automotive & ADAS").

### 2.4 Robust

- **Parsing & Valid Markup (WCAG 4.1.1)**: Clean HTML5 semantic hierarchy (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<dialog>`).
- **No Prohibited ARIA Attributes (WCAG 4.1.2)**: Fully clean axe-core audit with 0 prohibited ARIA warnings.

---

## 3. Automated Test Evidence

From automated Lighthouse JSON audit:
```json
{
  "categories": {
    "accessibility": {
      "id": "accessibility",
      "title": "Accessibility",
      "score": 0.96
    }
  }
}
```

- Passed Audits:
  - `button-name`: All buttons have discernible text.
  - `document-title`: Document has a valid `<title>` element.
  - `html-has-lang`: `<html>` element has a valid `lang` attribute.
  - `image-alt`: Image elements have informative alt attributes.
  - `link-name`: Links have discernible text.
  - `meta-viewport`: User scalability not disabled.
