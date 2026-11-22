# Application Security & Threat Model Audit Report

**Application**: Apurva Kumar Systems & Real-Time Engineering Portfolio  
**Architecture**: Static Single-Page Application (SPA) / Jamstack Client  
**Deployment Target**: GitHub Pages / Static Cloud CDN  
**Audit Scope**: Dependency Vulnerability Scan, Threat Modeling, Client-Side Sanitization, and Supply Chain Review  
**Date**: November 2026  
**Status**: VERIFIED & HARDENED FOR STATIC HOSTING  

---

## 1. Architecture Threat Model & Attack Surface

The portfolio is architectured as an entirely static client-side bundle compiled via Vite into HTML, CSS, and JavaScript. It does not operate a dynamic backend server, Node.js runtime in production, or persistent database with user sessions.

### Attack Surface Decomposition

| Surface / Vector | Exposure Level | Threat Analysis & Controls |
| :--- | :--- | :--- |
| **Authentication & Sessions** | **None** | No user logins, cookies, or JWT tokens are stored or transmitted. |
| **Server-Side Injection (SQLi/RCE)** | **None** | Static file delivery; no server-side query generation or shell execution. |
| **Cross-Site Scripting (XSS)** | **Low** | React 19 automatic JSX string escaping active. No `dangerouslySetInnerHTML` is used for untrusted user inputs. Static strings and API responses are typed and sanitized. |
| **Tabnabbing / Reverse Phishing** | **Mitigated** | All external hyperlinks with `target="_blank"` strictly implement `rel="noreferrer"`. |
| **API Abuse / Rate Limiting** | **Low** | Public GitHub API requests to `https://api.github.com/users/Apurva-0210` are read-only, cached in-memory, and degrade gracefully to static fallbacks if rate limits (60 req/hr) are exceeded. |
| **Supply Chain / Dev Dependencies** | **Controlled** | Scaffolding CLI tools (`shadcn`, `@hono/node-server`) contain upstream dev-only notices that are strictly excluded from the production browser bundle. |

---

## 2. Dependency Vulnerability Assessment (`yarn audit`)

- **Audit Findings**:
  - `shadcn` CLI (scaffolding utility) contains nested dev-time dependencies (`ts-morph`, `@modelcontextprotocol/sdk`).
  - Production Client Bundle: **0 critical vulnerabilities bundled into browser output**.
- **Action Taken**:
  - Verified bundle graph: `shadcn` CLI binaries and Node-server packages are excluded from `dist/assets/index-*.js`.
  - Production distribution contains only React, ReactDOM, and lightweight UI components.
  - Recommended for future maintenance: Pin `react-router` and remove unused scaffolding CLI packages from `devDependencies`.

---

## 3. Client-Side Sanitization & Secure Headers Recommendations

For production deployment on GitHub Pages or Cloudflare Pages, the following HTTP response headers are recommended:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.github.com; object-src 'none'; frame-ancestors 'none';
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## 4. Security Verification Checklist

- [x] Zero hardcoded secrets, API tokens, or private keys in the repository.
- [x] Zero use of `eval()` or unescaped HTML injections.
- [x] Outbound links to external repositories enforce `rel="noreferrer"`.
- [x] Live GitHub API integration handles network errors, rate limits, and JSON parse exceptions safely without UI crash.
- [x] All assets and external fonts served over HTTPS.
