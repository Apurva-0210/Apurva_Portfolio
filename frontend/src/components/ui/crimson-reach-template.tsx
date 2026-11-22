"use client"

import * as React from "react"
import {
  clamp,
  seg,
  mix,
  wordLevel,
  loopOffset,
  countAt,
  journeyFrame,
  featuredFrame,
} from "@/lib/motion-utils"
import { fetchGithubPortfolio, type GithubPortfolioData } from "@/lib/github"

const ASSETS = "https://kedhar-components.pages.dev/crimson-reach-template/"

export type Work = {
  id: string
  title: string
  tags: string[]
  href?: string
  img?: string
  category?: string
  summary?: string
  specs?: string[]
}
export type Quote = { id: string; name: string; role: string; quote: string; img?: string }
export type Service = { id: string; title: string; items: string[]; img?: string }
export type Journey = { tone: "silver" | "red" | "dark"; title: string; body: string }
export type Stat = { n: number; label: string; body: string }

const SERVICES: Service[] = [
  { id: "svc-brand", title: "Embedded Systems\n& Firmware", items: ["Bare-metal C & C++ development", "STM32 & ESP32 Microcontrollers", "UART, SPI, I2C & CAN communication", "FreeRTOS task scheduling", "Hardware-in-the-loop verification"] },
  { id: "svc-web", title: "Computer Architecture\n& Simulation", items: ["gem5 cycle-accurate simulation", "Cache hierarchy instrumentation", "SPEC CPU2017 benchmarking", "Garnet Network-on-Chip (NoC) routing", "AMAT & memory latency analysis"] },
  { id: "svc-product", title: "Automotive Systems\n& ADAS", items: ["CARLA & RoadRunner simulation", "Multi-modal sensor fusion (LiDAR/Radar)", "Time-to-collision (TTC) safety logic", "ECU architecture & CAN diagnostics", "OBD-II vehicle telemetry"] },
  { id: "svc-ai", title: "Edge AI &\nComputer Vision", items: ["YOLOv8-CBAM attention perception", "Edge neural network acceleration", "Temporal sequence reasoning (LSTM)", "OpenCV real-time image processing", "PyTorch deep learning pipelines"] },
  { id: "svc-motion", title: "Hardware Prototyping\n& Sensors", items: ["MiCS functionalized composite sensors", "12-bit ADC data acquisition", "Analog signal conditioning", "Real-time baseline drift compensation", "Hardware debug with logic analyzers"] },
  { id: "svc-marketing", title: "Systems Software\n& Infrastructure", items: ["FleetEase dispatch platform", "PostgreSQL relational databases", "Docker containerized testbeds", "Linux systems programming", "Automated validation suites"] },
]

const WORKS: Work[] = [
  { id: "work-autera", title: "AUTERA: Heavy Commercial Vehicle ADAS Framework", tags: ["Automotive ADAS", "CARLA Simulation", "Sensor Fusion"], href: "https://github.com/Apurva-0210/Autera" },
  { id: "work-ncrt", title: "NCRT: Noise-Conditioned Residual Transformer for Massive MIMO", tags: ["Deep Learning", "Channel Estimation", "Low SNR"], href: "https://github.com/Apurva-0210/Noise_Conditioned_Residual_Transformer" },
  { id: "work-gem5", title: "gem5 Memory Hierarchy & NoC Performance Analysis", tags: ["Computer Architecture", "gem5", "SPEC CPU2017"], href: "https://github.com/Apurva-0210/Gem5-Memory-NoC-Analysis" },
]

const QUOTES: Quote[] = [
  { id: "client-1", name: "Tata Technologies", role: "Embedded Systems Intern · Automotive ECU Software", quote: "“Contributed to embedded software development and firmware testing for automotive electronic control modules, assisting with hardware-in-the-loop validation.”" },
  { id: "client-2", name: "IIT Guwahati", role: "Research Intern · Computer Architecture & Systems Lab", quote: "“Instrumented cache statistics and evaluated memory hierarchy bottlenecks using gem5 and SPEC CPU2017 benchmarks. Implemented and validated NoC routing algorithms.”" },
  { id: "client-3", name: "MIT World Peace University", role: "B.Tech ECE (AI & ML) · CGPA 8.62", quote: "“Research spanning attention-augmented highway speed governance and noise-conditioned residual learning for robust Massive MIMO channel estimation.”" },
]

const JOURNEY: Journey[] = [
  { tone: "silver", title: "Embedded &\nReal-Time", body: "Bare-metal C, RTOS, and driver development across STM32 and ESP32. Interfacing sensors, actuators, and communication buses close to the hardware." },
  { tone: "red", title: "Computer\nArchitecture", body: "Evaluating memory bottlenecks, cache hierarchy latency, and Network-on-Chip routing topologies using cycle-accurate gem5 simulation." },
  { tone: "dark", title: "Automotive &\nIntelligent ADAS", body: "Perception, multi-modal sensor fusion (LiDAR/Radar/Vision), and time-to-collision safety governance for complex vehicle dynamics in CARLA." },
]

const STATS: Stat[] = [
  { n: 9, label: "8.62 Academic CGPA", body: "Electronics & Communication Engineering (AI & ML Specialization) at MIT World Peace University, Pune." },
  { n: 3, label: "Internships & Research", body: "Industry and academic research at Tata Technologies, IIT Guwahati, and the International Automobile Centre of Excellence (iACE)." },
  { n: 6, label: "Core Systems Projects", body: "Spanning vehicle ADAS simulation, attention edge neural networks, multi-gas composite sensors, and gem5 microarchitecture." },
]

const MANIFESTO =
  "I build at the boundary where low-level software commands real physical dynamics. From instrumenting cycle-accurate cache hierarchies in gem5 to validating automotive ADAS sensor fusion in CARLA, I engineer systems where hardware and algorithms deliver deterministic reliability."

const LOGO_STYLES = ["cr-lg-serif", "cr-lg-caps", "cr-lg-mono", "cr-lg-bold", "cr-lg-script", "cr-lg-wide", "cr-lg-thin"]

export interface CrimsonReachTemplateProps {
  height?: string
  email?: string
  brand?: string
  name?: string
  role?: string
  avatar?: string
  year?: string
  location?: string
  heroLine1?: string
  heroLine2?: string
  heroSub?: string
  manifesto?: string
  trustBadgeText?: string
  marqueeList?: string[]
  journeyTitle?: string
  journey?: Journey[]
  servicesTitle?: string
  servicesSub?: string
  services?: Service[]
  worksTitle?: string
  worksSub?: string
  works?: Work[]
  wallTitle?: string
  wallLogos?: string[]
  quotesTitle?: string
  quotesSub?: string
  quotes?: Quote[]
  stats?: Stat[]
  ctaHead?: string
  ctaTitle?: string
  resumeUrl?: string
  linkedinUrl?: string
  githubUrl?: string
  assetBase?: string
  className?: string
  style?: React.CSSProperties
}

function Roll({ children }: { children: React.ReactNode }) {
  return (
    <span className="cr-roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  )
}

function Laurel({ flip }: { flip?: boolean }) {
  return (
    <svg className={"cr-laurel" + (flip ? " cr-laurel-flip" : "")} viewBox="0 0 24 48" fill="none" aria-hidden="true">
      <path d="M12 4 C8 12, 4 20, 4 32 C4 40, 8 44, 12 46" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M9 10 C4 9, 2 13, 5 16 C8 15, 9 12, 9 10 Z" fill="currentColor" opacity="0.6" />
      <path d="M7 18 C2 18, 1 22, 4 24 C7 23, 7 20, 7 18 Z" fill="currentColor" opacity="0.7" />
      <path d="M6 26 C1 27, 1 31, 4 32 C7 31, 7 28, 6 26 Z" fill="currentColor" opacity="0.8" />
      <path d="M7 34 C3 36, 4 40, 7 40 C9 39, 8 36, 7 34 Z" fill="currentColor" opacity="0.9" />
    </svg>
  )
}

function Icon({ kind }: { kind: "silver" | "red" | "dark" }) {
  if (kind === "silver") {
    return (
      <svg className="cr-jicon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 5 v22 M5 16 h22" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
      </svg>
    )
  }
  if (kind === "red") {
    return (
      <svg className="cr-jicon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="7" y="7" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 12 h8 v8 h-8 Z" fill="currentColor" opacity="0.3" />
      </svg>
    )
  }
  return (
    <svg className="cr-jicon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <polygon points="16,5 27,24 5,24" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="17" r="3" fill="currentColor" />
    </svg>
  )
}

export default function CrimsonReachTemplate({
  height = "90vh",
  email = "apurvak916@gmail.com",
  brand = "Apurva.",
  name = "Apurva Kumar",
  role = "Embedded Systems · Automotive Electronics · Simulation · AI/ML",
  avatar,
  year = "2026",
  location = "Pune · India",
  heroLine1 = "Where low-level code",
  heroLine2 = "meets physical motion",
  heroSub = "that’s where I engineer systems.",
  manifesto = MANIFESTO,
  trustBadgeText = "Tata Tech · IIT Guwahati · MIT-WPU",
  marqueeList = [
    "Embedded C / C++",
    "STM32 & ESP32",
    "gem5 Simulator",
    "Network-on-Chip",
    "CARLA ADAS",
    "PyTorch & Vision",
    "CAN Bus & OBD-II",
    "SPEC CPU2017",
    "FreeRTOS",
  ],
  journeyTitle = "Core Engineering Domains",
  journey = JOURNEY,
  servicesTitle = "Engineering Capabilities",
  servicesSub = "Deep technical execution across register-level hardware, simulators, and neural perception",
  services = SERVICES,
  worksTitle = "Featured Work",
  worksSub = "Systems, architecture, and research projects with public repositories",
  works = WORKS,
  wallTitle = "Academic & Industry Affiliations",
  wallLogos = [
    "Tata Technologies",
    "IIT Guwahati",
    "MIT World Peace University",
    "iACE Gujarat",
    "CARLA Simulator",
    "gem5 Research",
    "IEEE Student Member",
    "VLSID 2026",
  ],
  quotesTitle = "Research & Field Notes",
  quotesSub = "Real outcomes from industry internships and computer architecture research",
  quotes = QUOTES,
  stats = STATS,
  ctaHead = "That’s my engineering track record",
  ctaTitle = "Let’s build something reliable",
  resumeUrl = "/assets/Apurva_Kumar_Resume.pdf",
  linkedinUrl = "https://linkedin.com/in/apurvakumar55",
  githubUrl = "https://github.com/Apurva-0210",
  assetBase = ASSETS,
  className,
  style,
}: CrimsonReachTemplateProps) {
  const rootRef = React.useRef(null as HTMLDivElement | null)
  const [work, setWork] = React.useState(0)
  const [quote, setQuote] = React.useState(0)
  const [counts, setCounts] = React.useState([0, 0, 0])
  const [clock, setClock] = React.useState("")
  const [copied, setCopied] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [categoryFilter, setCategoryFilter] = React.useState("All")
  const [selectedWork, setSelectedWork] = React.useState<Work | null>(null)
  const [githubData, setGithubData] = React.useState<GithubPortfolioData | null>(null)

  const img = (id: string) => (id.startsWith("http") || id.startsWith("/") ? id : assetBase + id + ".webp")
  const words = React.useMemo(() => manifesto.split(" "), [manifesto])

  // Filter works by category
  const categories = React.useMemo(() => {
    const set = new Set<string>()
    works.forEach((w) => {
      if (w.category) set.add(w.category)
    })
    return ["All", ...Array.from(set)]
  }, [works])

  const filteredWorks = React.useMemo(() => {
    if (categoryFilter === "All") return works
    return works.filter((w) => w.category === categoryFilter)
  }, [works, categoryFilter])

  // Reset index when filter changes
  React.useEffect(() => {
    setWork(0)
  }, [categoryFilter])

  // live clock in IST
  React.useEffect(() => {
    const f = () => {
      try {
        setClock(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" }))
      } catch {
        setClock("")
      }
    }
    f()
    const t = window.setInterval(f, 15000)
    return () => window.clearInterval(t)
  }, [])

  // Live GitHub telemetry
  React.useEffect(() => {
    let active = true
    fetchGithubPortfolio()
      .then((data) => {
        if (active) setGithubData(data)
      })
      .catch(() => {
        /* Gracefully use static profile data if API rate-limited */
      })
    return () => {
      active = false
    }
  }, [])

  // testimonials autoplay
  React.useEffect(() => {
    const t = window.setInterval(() => {
      setQuote((q) => (q + 1) % quotes.length)
    }, 6000)
    return () => window.clearInterval(t)
  }, [quotes.length])

  // Keyboard navigation for Modal
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedWork(null)
        setMenuOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // scroll choreography
  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const $ = (s: string) => root.querySelector(s) as HTMLElement | null
    const $$ = (s: string) => Array.from(root.querySelectorAll(s)) as HTMLElement[]
    const nav = $(".cr-nav"),
      hero = $(".cr-hero"),
      hands = $$(".cr-hand"),
      manifestoEl = $(".cr-manifesto"),
      wordEls = $$(".cr-word"),
      journeyEl = $(".cr-journey"),
      jtitle = $(".cr-jtitle"),
      panels = $$(".cr-panel"),
      fronts = $$(".cr-front"),
      flips = $$(".cr-flip"),
      feat = $(".cr-feat"),
      fstage = $(".cr-fstage"),
      ftitle = $(".cr-ftitle"),
      fsub = $(".cr-fsub"),
      fcar = $(".cr-fcar"),
      contacts = $(".cr-contact"),
      cta = $(".cr-cta"),
      ctaImg = $(".cr-cta-img"),
      ctaText = $(".cr-cta-text")

    let raf = 0
    const tick = () => {
      raf = 0
      const winH = window.innerHeight
      const winW = window.innerWidth

      // nav pill state
      if (nav && hero) {
        const heroBottom = hero.getBoundingClientRect().bottom
        if (heroBottom <= 60) {
          nav.classList.add("cr-pill")
        } else {
          nav.classList.remove("cr-pill")
        }
      }

      // hero parallax
      if (hero && !reduced) {
        const r = hero.getBoundingClientRect()
        if (r.bottom > 0 && r.top < winH) {
          const p = clamp(-r.top / (r.height || 1), 0, 1)
          if (hands[0]) hands[0].style.transform = "translate(" + -p * 60 + "px," + -p * 30 + "px)"
          if (hands[1]) hands[1].style.transform = "translate(" + p * 60 + "px," + p * 30 + "px)"
        }
      }

      // manifesto word reveal
      if (manifestoEl && wordEls.length) {
        const r = manifestoEl.getBoundingClientRect()
        const total = r.height - winH
        const p = clamp(-r.top / (total || 1), 0, 1)
        const N = wordEls.length
        wordEls.forEach((el, i) => {
          const w = reduced ? 1 : wordLevel(i, N, p)
          el.style.opacity = String(mix(0.26, 1, w))
          el.style.filter = w > 0.05 ? "none" : "blur(1px)"
        })
      }

      // journey card flip + spread
      if (journeyEl && panels.length) {
        const r = journeyEl.getBoundingClientRect()
        const total = r.height - winH
        const p = clamp(-r.top / (total || 1), 0, 1)
        const { F, H0, panels: P, titleO } = journeyFrame(p, winW, winH, reduced)
        if (jtitle) jtitle.style.opacity = String(titleO)
        panels.forEach((panel, i) => {
          const q = P[i]
          panel.style.width = q.w + "px"
          panel.style.height = q.h + "px"
          panel.style.transform = "translate3d(" + (q.x - q.w / 2) + "px," + (q.y - q.h / 2) + "px,0) rotateZ(" + q.rz + "deg)"
          const flip = flips[i]
          if (flip) flip.style.transform = "rotateY(" + q.ry + "deg)"
          const front = fronts[i]
          if (front) {
            front.style.backgroundSize = F + "px " + H0 + "px"
            front.style.backgroundPosition = q.bgX + "px center"
          }
        })
      }

      // featured work entry
      if (feat && fstage) {
        const r = feat.getBoundingClientRect()
        const total = r.height - winH
        const p = clamp(-r.top / (total || 1), 0, 1)
        const big = Math.min(2.8, Math.max(1.8, winW / 460))
        const { scale, lift, carY, carO, subO } = featuredFrame(p, big, reduced)
        if (ftitle) {
          ftitle.style.transform = "scale(" + scale + ") translateY(" + -lift * 20 + "px)"
        }
        if (fsub) fsub.style.opacity = String(subO)
        if (fcar) {
          fcar.style.transform = "translateY(" + carY * 80 + "px)"
          fcar.style.opacity = String(carO)
        }
      }

      // stats counters
      if (contacts) {
        const r = contacts.getBoundingClientRect()
        if (r.top < winH * 0.85 && r.bottom > 0) {
          const p = clamp((winH * 0.85 - r.top) / (winH * 0.5), 0, 1)
          setCounts(stats.map((s) => countAt(s.n, p)))
        }
      }

      // closing CTA reveal
      if (cta && ctaImg && ctaText && !reduced) {
        const r = cta.getBoundingClientRect()
        const p = clamp((winH - r.top) / (winH * 0.8), 0, 1)
        cta.style.transform = "scale(" + mix(0.9, 1, p) + ")"
        cta.style.borderRadius = mix(40, 16, p) + "px"
        ctaImg.style.transform = "scale(" + mix(1.18, 1, p) + ")"
        ctaText.style.filter = "blur(" + mix(14, 0, seg(p, 0.35, 1)) + "px)"
        ctaText.style.opacity = String(mix(0, 1, seg(p, 0.3, 0.9)))
      }
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener("scroll", on, { passive: true })
    window.addEventListener("resize", on)
    return () => {
      window.removeEventListener("scroll", on)
      window.removeEventListener("resize", on)
      cancelAnimationFrame(raf)
    }
  }, [stats])

  const go = (sel: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = rootRef.current?.querySelector(sel)
    if (el) el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
  }

  const copy = () => {
    try {
      navigator.clipboard?.writeText(email)
    } catch {
      /* clipboard fallback */
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const nW = filteredWorks.length || 1
  const nQ = quotes.length

  return (
    <div ref={rootRef} className={"cr-root" + (className ? " " + className : "")} style={style}>
      <style>{CSS}</style>

      {/* Floating Navigation Bar */}
      <div className="cr-navwrap">
        <nav className="cr-nav" aria-label="Main Navigation">
          <a className="cr-logo" href="#top" onClick={go(".cr-hero")}>
            {brand}
          </a>

          <div className="cr-links">
            <a href="#focus" onClick={go(".cr-journey")}>
              <Roll>Focus</Roll>
            </a>
            <a href="#capabilities" onClick={go(".cr-services")}>
              <Roll>Capabilities</Roll>
            </a>
            <a href="#projects" onClick={go(".cr-feat")}>
              <Roll>Projects</Roll>
            </a>
            <a href="#experience" onClick={go(".cr-quotes")}>
              <Roll>Experience</Roll>
            </a>
            <a href="#contact" onClick={go(".cr-contact")}>
              <Roll>Contact</Roll>
            </a>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {/* Live GitHub Telemetry pill */}
            {githubData && (
              <a
                href={githubData.profile.html_url}
                target="_blank"
                rel="noreferrer"
                className="cr-git-pill"
                title={`${githubData.profile.public_repos} public repos on GitHub`}
              >
                <span className="cr-git-dot" />
                <span>GitHub Verified ({githubData.profile.public_repos})</span>
              </a>
            )}

            {resumeUrl && (
              <a
                className="cr-btn"
                href={resumeUrl}
                download="Apurva_Kumar_Resume.pdf"
                style={{ background: "rgba(255,255,255,0.08)", color: "var(--ink)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <Roll>Resume ↓</Roll>
              </a>
            )}
            <a className="cr-btn" href={"mailto:" + email}>
              <Roll>Get In Touch</Roll>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              className="cr-burger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
            >
              <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
            </button>
          </div>
        </nav>
      </div>

      {/* Accessible Mobile Glass Navigation Drawer */}
      {menuOpen && (
        <div className="cr-mob-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <button
            className="cr-modal-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close mobile navigation"
            style={{ top: "24px", right: "24px", position: "absolute", zIndex: 95 }}
          >
            ✕
          </button>
          <div className="cr-mob-links">
            <a href="#focus" onClick={go(".cr-journey")}>
              Focus Architecture
            </a>
            <a href="#capabilities" onClick={go(".cr-services")}>
              Engineering Capabilities
            </a>
            <a href="#projects" onClick={go(".cr-feat")}>
              Featured Projects (12)
            </a>
            <a href="#experience" onClick={go(".cr-quotes")}>
              Field Experience
            </a>
            <a href="#affiliations" onClick={go(".cr-wall")}>
              Affiliations & Labs
            </a>
            <a href="#contact" onClick={go(".cr-contact")}>
              Metrics & Contact
            </a>
          </div>

          <div className="cr-mob-actions">
            {resumeUrl && (
              <a
                className="cr-btn"
                href={resumeUrl}
                download="Apurva_Kumar_Resume.pdf"
                style={{ justifyContent: "center", height: "44px" }}
              >
                <Roll>Download Official Resume (PDF)</Roll>
              </a>
            )}
            <a
              className="cr-btn"
              href={"mailto:" + email}
              style={{ justifyContent: "center", height: "44px", background: "var(--red)", color: "#fff" }}
            >
              <Roll>Email Apurva Directly</Roll>
            </a>
          </div>
        </div>
      )}

      {/* hero */}
      <section className="cr-hero" style={{ height }} id="top">
        <div className="cr-hero-card">
          <div className="cr-hero-art">
            <img className="cr-hero-plate" src={img("hero")} alt="" width={1536} height={1024} />
            <span className="cr-hero-glow" />
            <img className="cr-hand cr-hand-top" src={img("hand-top")} alt="" width={500} height={400} />
            <img className="cr-hand cr-hand-bottom" src={img("hand-bottom")} alt="" width={516} height={444} />
          </div>
          <div className="cr-hero-copy">
            <h1>
              <span className="cr-line">
                {heroLine1.split(" ").map((w, i) => (
                  <span key={i} className="cr-in-word" style={{ animationDelay: i * 0.08 + "s" }}>
                    {w}{" "}
                  </span>
                ))}
              </span>
              <span className="cr-line">
                <em>
                  {heroLine2.split(" ").map((w, i) => (
                    <span key={i} className="cr-in-word" style={{ animationDelay: 0.25 + i * 0.08 + "s" }}>
                      {w}{" "}
                    </span>
                  ))}
                </em>
              </span>
            </h1>
            <p className="cr-in-word" style={{ animationDelay: "0.95s" }}>
              {heroSub}
            </p>
          </div>
          <div className="cr-hero-foot">
            <span>{clock ? `${clock} IST` : "Pune · India"}</span>
            <span className="cr-explore" aria-hidden="true">
              <span>Scroll to Explore</span>
              <span>Scroll to Explore</span>
            </span>
            <span>{location}</span>
          </div>
        </div>
      </section>

      {/* manifesto */}
      <section className="cr-manifesto cr-dots">
        <div className="cr-mstage">
          <p className="cr-sr-only">{manifesto}</p>
          <p className="cr-mtext" aria-hidden="true">
            {words.map((w, i) => (
              <span key={i} className="cr-word">
                {w}{" "}
              </span>
            ))}
          </p>
          <div className="cr-trust">
            <div className="cr-badge">
              <Laurel />
              <span>
                {trustBadgeText.split("·").map((part, pi) => (
                  <React.Fragment key={pi}>
                    {part.trim()}
                    {pi < 2 && <br />}
                  </React.Fragment>
                ))}
              </span>
              <Laurel flip />
            </div>
            <div className="cr-marquee">
              <div className="cr-mtrack">
                {[0, 1].map((k) => (
                  <div key={k} className="cr-mset" aria-hidden={k === 1}>
                    {marqueeList.map((c, i) => (
                      <span key={i} className={"cr-mlogo " + LOGO_STYLES[i % LOGO_STYLES.length]}>
                        {c}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* journey / focus architecture */}
      <section className="cr-journey cr-dots" id="focus">
        <div className="cr-jstage">
          <h2 className="cr-h2 cr-jtitle">
            {journeyTitle.includes(".") ? (
              <>
                <em>{journeyTitle.split(".")[0]}.</em> {journeyTitle.split(".").slice(1).join(".")}
              </>
            ) : (
              journeyTitle
            )}
          </h2>
          <div className="cr-jcards">
            {journey.map((c, i) => (
              <div key={i} className="cr-panel">
                <div className="cr-flip">
                  <div className="cr-face cr-front" style={{ backgroundImage: "url(" + img("dune") + ")" }} />
                  <div className={"cr-face cr-back cr-tone-" + c.tone}>
                    <div className="cr-back-in">
                      <Icon kind={c.tone} />
                      <h3 style={{ whiteSpace: "pre-line" }}>{c.title}</h3>
                      <p>{c.body}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* services / capabilities */}
      <section className="cr-services" id="capabilities">
        <header className="cr-head">
          <h2 className="cr-h2 cr-h2-lg">
            {servicesTitle.includes(" ") ? (
              <>
                <em>{servicesTitle.split(" ")[0]}</em> {servicesTitle.split(" ").slice(1).join(" ")}
              </>
            ) : (
              servicesTitle
            )}
          </h2>
          <p>{servicesSub}</p>
        </header>
        <div className="cr-rows">
          {services.map((s, i) => (
            <article key={s.id} className="cr-row">
              <div className="cr-row-title">
                <span>({String(i + 1).padStart(2, "0")})</span>
                <h3 style={{ whiteSpace: "pre-line" }}>{s.title}</h3>
              </div>
              <ul>
                {s.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="cr-row-img">
                <img src={s.img || img(s.id)} alt={s.title.replace("\n", " ") + " visual"} loading="lazy" width={762} height={506} />
              </div>
            </article>
          ))}
        </div>
        <a className="cr-btn cr-vision" href={"mailto:" + email + "?subject=Engineering%20Opportunity"}>
          <Roll>Connect on an Engineering Project</Roll>
        </a>
      </section>

      {/* featured work & architecture carousel */}
      <section className="cr-feat" id="projects">
        <div className="cr-fstage">
          <div className="cr-fhead">
            <h2 className="cr-ftitle">
              {worksTitle.includes(" ") ? (
                <>
                  <em>{worksTitle.split(" ")[0]}</em> {worksTitle.split(" ").slice(1).join(" ")}
                </>
              ) : (
                worksTitle
              )}
            </h2>
            <p className="cr-fsub">{worksSub}</p>

            {/* Category Filter Pills */}
            <div className="cr-filters" role="tablist" aria-label="Project Categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={categoryFilter === cat}
                  data-active={categoryFilter === cat}
                  className="cr-filter-btn"
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="cr-fcar">
            <div className="cr-ftrack" aria-live="polite">
              {filteredWorks.map((w, i) => {
                const d = loopOffset(i, work, nW)
                const isAdjacentOrActive = Math.abs(d) <= 1
                return (
                  <article
                    key={w.id}
                    className="cr-work"
                    data-d={Math.abs(d) > 1 ? "far" : d === 0 ? "c" : "s"}
                    style={{ "--d": d } as React.CSSProperties}
                    onClick={() => {
                      if (d !== 0) {
                        setWork((((work + d) % nW) + nW) % nW)
                      } else {
                        setSelectedWork(w)
                      }
                    }}
                  >
                    <div className="cr-work-img">
                      <img
                        src={w.img || img(w.id)}
                        alt={w.title}
                        loading={isAdjacentOrActive ? "eager" : "lazy"}
                        width={762}
                        height={506}
                      />
                    </div>
                    <h3>
                      {w.href ? (
                        <a
                          href={w.href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{ color: "inherit", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}
                        >
                          {w.title} <span style={{ opacity: 0.6, fontSize: "0.85em" }}>↗</span>
                        </a>
                      ) : (
                        w.title
                      )}
                    </h3>
                    <div className="cr-tags">
                      {w.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    {/* Deep-dive interactive trigger */}
                    <button
                      className="cr-inspect-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedWork(w)
                      }}
                    >
                      <span>Inspect Architecture &amp; Specs</span>
                      <span>→</span>
                    </button>
                  </article>
                )
              })}
              <button
                className="cr-arrow cr-prev"
                aria-label="Previous project"
                onClick={() => setWork((work - 1 + nW) % nW)}
              >
                ←
              </button>
              <button
                className="cr-arrow cr-next"
                aria-label="Next project"
                onClick={() => setWork((work + 1) % nW)}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Project Deep-Dive Modal */}
      {selectedWork && (
        <div
          className="cr-modal-backdrop"
          onClick={() => setSelectedWork(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedWork.title}
        >
          <div className="cr-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="cr-modal-close"
              onClick={() => setSelectedWork(null)}
              aria-label="Close dialog"
            >
              ✕
            </button>
            {selectedWork.category && <span className="cr-modal-tag">{selectedWork.category}</span>}
            <h3>{selectedWork.title}</h3>
            {selectedWork.img && (
              <div className="cr-modal-img">
                <img src={selectedWork.img} alt={selectedWork.title} />
              </div>
            )}
            {selectedWork.summary && <p className="cr-modal-desc">{selectedWork.summary}</p>}
            {selectedWork.specs && selectedWork.specs.length > 0 && (
              <div className="cr-modal-specs">
                <h4>System Architecture &amp; Technical Specifications</h4>
                <ul>
                  {selectedWork.specs.map((spec, si) => (
                    <li key={si}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
              {selectedWork.href && (
                <a
                  className="cr-btn"
                  href={selectedWork.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ background: "var(--red)", color: "#fff" }}
                >
                  <Roll>View Source Repository on GitHub ↗</Roll>
                </a>
              )}
              <button
                className="cr-btn"
                onClick={() => setSelectedWork(null)}
                style={{ background: "rgba(255,255,255,0.08)", color: "var(--ink)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                Close Specification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* wall / affiliations */}
      <section className="cr-wall" id="affiliations">
        <h2 className="cr-wall-head">
          <em>{wallTitle.split(" ")[0]}</em> {wallTitle.split(" ").slice(1).join(" ")}
        </h2>
        <div className="cr-grid">
          {wallLogos.map((l) => (
            <div key={l} className="cr-tile">
              <span>{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* testimonials / field notes */}
      <section className="cr-quotes" id="experience">
        {/* Dynamic section header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h2 className="cr-h2">
            {quotesTitle.includes(" ") ? (
              <>
                <em>{quotesTitle.split(" ")[0]}</em> {quotesTitle.split(" ").slice(1).join(" ")}
              </>
            ) : (
              quotesTitle
            )}
          </h2>
          {quotesSub && <p style={{ color: "var(--mute)", marginTop: "8px", fontSize: "15px" }}>{quotesSub}</p>}
        </div>

        <div className="cr-qstage">
          {quotes.map((q, i) => {
            const d = loopOffset(i, quote, nQ)
            return (
              <figure key={q.id} className="cr-quote" data-c={d === 0 ? "" : undefined} style={{ "--d": d } as React.CSSProperties} aria-hidden={d !== 0}>
                <img src={q.img || img(q.id)} alt={q.name} loading="lazy" width={623} height={623} />
                <div className="cr-qbody">
                  <blockquote>{q.quote}</blockquote>
                  <figcaption>
                    <strong>{q.name}</strong>
                    <span>{q.role}</span>
                  </figcaption>
                </div>
              </figure>
            )
          })}
          <button className="cr-arrow cr-qprev" aria-label="Previous quote" onClick={() => setQuote((quote - 1 + nQ) % nQ)}>
            ←
          </button>
          <button className="cr-arrow cr-qnext" aria-label="Next quote" onClick={() => setQuote((quote + 1) % nQ)}>
            →
          </button>
        </div>
        <div className="cr-dotsbar" role="tablist" aria-label="Quote slides">
          {quotes.map((q, i) => (
            <button key={q.id} role="tab" aria-selected={i === quote} aria-label={"Quote " + (i + 1)} onClick={() => setQuote(i)} />
          ))}
        </div>
      </section>

      {/* contacts & stats */}
      <section className="cr-contact" id="contact">
        <div className="cr-cgrid">
          <div className="cr-people">
            <article className="cr-person">
              <div className="cr-avatar">{avatar ? <img src={avatar} alt={name} width={56} height={56} /> : <span className="cr-avatar-k">{name[0]}</span>}</div>
              <div>
                <h3>{name}</h3>
                <p>{role}</p>
              </div>
              <div className="cr-plinks">
                <a href={"mailto:" + email}>Email</a>
                {linkedinUrl && (
                  <a href={linkedinUrl} target="_blank" rel="noreferrer">
                    LinkedIn ↗
                  </a>
                )}
                {githubUrl && (
                  <a href={githubUrl} target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                )}
                <button onClick={copy}>{copied ? "Copied" : "Copy Email"}</button>
              </div>
            </article>
          </div>
          <div className="cr-stats">
            {stats.map((s, i) => (
              <div key={s.label} className="cr-stat">
                <div className="cr-num">
                  <span className="cr-odo">
                    <span className="cr-odo-col">
                      <span>{counts[i] || 0}</span>
                    </span>
                    <span>+</span>
                  </span>
                </div>
                <div>
                  <h3>{s.label}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* closing card */}
      <section className="cr-ctawrap">
        <div className="cr-cta">
          <img className="cr-cta-img" src={img("statue")} alt="" loading="lazy" width={1536} height={1024} />
          <span className="cr-cta-tint" />
          <div className="cr-cta-text">
            <p>{ctaHead}</p>
            <h2>
              {ctaTitle.includes(" ") ? (
                <>
                  {ctaTitle.split(" ").slice(0, -2).join(" ")}{" "}
                  <em>{ctaTitle.split(" ").slice(-2, -1)}</em> {ctaTitle.split(" ").slice(-1)}
                </>
              ) : (
                ctaTitle
              )}
            </h2>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "24px" }}>
              <a className="cr-btn" href={"mailto:" + email}>
                <Roll>Email Apurva</Roll>
              </a>
              {resumeUrl && (
                <a
                  className="cr-btn"
                  href={resumeUrl}
                  download="Apurva_Kumar_Resume.pdf"
                  style={{ background: "rgba(255,255,255,0.12)", color: "var(--ink)", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  <Roll>Download Resume (PDF)</Roll>
                </a>
              )}
            </div>
          </div>
          <footer className="cr-foot">
            <span>&copy; {year} Apurva Kumar | Electronics &amp; Communication Engineering</span>
            <button onClick={copy} className="cr-mail">
              {copied ? "Copied to clipboard" : email}
            </button>
            <div className="cr-flinks">
              {linkedinUrl && (
                <a href={linkedinUrl} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              )}
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}
            </div>
          </footer>
        </div>
      </section>
    </div>
  )
}

const SERIF = '"DM Serif Display", serif'
const SANS = '"Space Grotesk", sans-serif'
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"

const CSS =
  ".cr-root{--bg:#070708;--ink:#f0ece1;--mute:rgba(240,236,225,.65);--line:rgba(255,255,255,.09);--card:#121214;--red:#c82b20;--glow:0 0 14px rgba(255,210,210,.7);position:relative;width:100%;background:var(--bg);color:var(--ink);font-family:" + SANS + ";overflow-x:clip;-webkit-font-smoothing:antialiased;animation:cr-fade .9s ease-out both}" +
  ".cr-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}" +
  ".cr-root *{box-sizing:border-box}" +
  ".cr-root img{max-width:none;display:block}" +
  ".cr-root :where(a,button){color:inherit;font:inherit;text-decoration:none;background:none;border:0;padding:0;cursor:pointer}" +
  ".cr-root :focus-visible{outline:2px solid var(--red);outline-offset:2px}" +
  ".cr-root :where(h1,h2,h3,p,ul,figure,blockquote){margin:0;padding:0}" +
  ".cr-root em{font-style:italic}" +
  ".cr-dots{background-image:radial-gradient(rgba(255,255,255,.07) 1px,transparent 1.2px);background-size:22px 22px}" +
  ".cr-roll{display:inline-grid;overflow:hidden;line-height:1.2;vertical-align:top}" +
  ".cr-roll>span{grid-area:1/1;transition:transform .5s " + EASE + "}" +
  ".cr-roll>span+span{transform:translateY(105%)}" +
  ".cr-navwrap{position:sticky;top:0;height:0;z-index:60}" +
  ".cr-nav{position:absolute;left:50%;top:32px;transform:translateX(-50%);width:calc(100% - 64px);height:70px;display:flex;align-items:center;justify-content:space-between;padding:0 28px 0 36px;border-radius:16px 16px 0 0;background:linear-gradient(rgba(60,4,4,.35),rgba(60,4,4,0));border:1px solid transparent;transition:width .7s " + EASE + ",height .7s " + EASE + ",top .7s " + EASE + ",background .5s,border-color .5s,border-radius .7s,box-shadow .5s,padding .7s " + EASE + "}" +
  ".cr-nav.cr-pill{top:16px;width:min(940px,calc(100% - 32px));height:52px;padding:0 14px 0 24px;border-radius:12px;background:rgba(20,20,22,.88);border-color:rgba(255,255,255,.12);box-shadow:0 10px 30px rgba(0,0,0,.55);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}" +
  ".cr-logo{font-family:" + SERIF + ";font-style:italic;font-size:26px;letter-spacing:-.03em;color:var(--ink)}" +
  ".cr-nav.cr-pill .cr-logo{font-size:20px}" +
  ".cr-links{position:absolute;left:50%;transform:translateX(-50%);display:flex;gap:24px;font-size:13.5px}" +
  ".cr-links a{opacity:.82;transition:opacity .3s;padding:4px 6px}" +
  ".cr-links a:hover{opacity:1}" +
  ".cr-btn{display:inline-flex;align-items:center;height:34px;padding:0 14px;border-radius:8px;background:var(--ink);color:#0a0a0c;font-size:12.5px;font-weight:500;box-shadow:inset 0 -2px 0 rgba(0,0,0,.12),0 2px 8px rgba(0,0,0,.25);transition:transform .3s " + EASE + ",background .3s}" +
  ".cr-btn:hover{transform:translateY(-1px);background:#fff}" +
  ".cr-git-pill{display:inline-flex;align-items:center;gap:7px;padding:4px 10px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);font-size:11.5px;color:var(--mute);transition:all .2s}" +
  ".cr-git-pill:hover{background:rgba(255,255,255,.1);color:var(--ink)}" +
  ".cr-git-dot{width:6px;height:6px;border-radius:50%;background:#2ecc71;box-shadow:0 0 6px #2ecc71;flex-shrink:0}" +
  ".cr-burger{display:none;width:38px;height:38px;border-radius:8px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:var(--ink);flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;position:relative;z-index:70}" +
  ".cr-burger span{display:block;width:18px;height:2px;background:currentColor;border-radius:2px;transition:transform .3s,opacity .3s}" +
  ".cr-mob-drawer{position:fixed;inset:0;background:rgba(7,7,9,.97);-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);z-index:90;display:flex;flex-direction:column;padding:84px 28px 36px;gap:24px;overflow-y:auto;animation:cr-fade .3s ease-out both}" +
  ".cr-mob-links{display:flex;flex-direction:column;gap:18px;font-family:" + SERIF + ";font-size:24px}" +
  ".cr-mob-links a{color:var(--ink);transition:color .2s}" +
  ".cr-mob-links a:hover{color:var(--red)}" +
  ".cr-mob-actions{margin-top:auto;display:flex;flex-direction:column;gap:12px;border-top:1px solid var(--line);padding-top:20px}" +
  ".cr-hero{position:relative;padding:32px;min-height:520px}" +
  ".cr-hero-card{position:relative;height:100%;border-radius:16px;overflow:hidden;background:#350302;container-type:size}" +
  ".cr-hero-art{position:absolute;left:50%;top:50%;width:max(112cqw,168cqh);aspect-ratio:3/2;transform:translate(-50%,-50%)}" +
  ".cr-hero-plate{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}" +
  ".cr-hero-glow{position:absolute;left:28%;top:-20%;width:44%;height:60%;background:radial-gradient(closest-side,rgba(255,100,40,.35),transparent);animation:cr-breathe 7s ease-in-out infinite alternate}" +
  ".cr-hand{position:absolute;height:auto;will-change:transform}" +
  ".cr-hand-top{left:0;top:0;width:32.55%;animation:cr-drift-a 7s ease-in-out infinite alternate}" +
  ".cr-hand-bottom{left:66.4%;top:56.64%;width:33.6%;animation:cr-drift-b 8s ease-in-out infinite alternate}" +
  ".cr-hero-copy{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 24px;pointer-events:none}" +
  ".cr-hero h1{font-family:" + SERIF + ";font-weight:400;font-size:clamp(34px,3.8vw,56px);line-height:1.1;letter-spacing:-.04em;color:#ffe4e4;text-shadow:0 0 14px rgba(255,214,214,.7)}" +
  ".cr-line{display:block}" +
  ".cr-hero-copy p{margin-top:14px;font-size:clamp(16px,1.35vw,20px);letter-spacing:-.01em;color:rgba(255,224,224,.9);text-shadow:0 0 12px rgba(255,230,230,.6)}" +
  ".cr-in-word{display:inline-block;white-space:pre;animation:cr-word 1.1s " + EASE + " both}" +
  ".cr-hero-foot{position:absolute;left:28px;right:28px;bottom:22px;display:flex;justify-content:space-between;align-items:center;font-size:12.8px;color:rgba(255,204,204,.7)}" +
  ".cr-explore{display:grid;overflow:hidden;height:1.2em;font-size:14.4px;color:rgba(255,204,204,.65)}" +
  ".cr-explore>span{grid-area:1/1;animation:cr-explore 3.2s " + EASE + " infinite}" +
  ".cr-explore>span+span{animation-name:cr-explore2}" +
  ".cr-manifesto{position:relative;height:240vh}" +
  ".cr-mstage{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;padding:clamp(100px,14vh,130px) 24px 56px}" +
  ".cr-mtext{max-width:1040px;margin:auto;text-align:center;font-family:" + SERIF + ";font-size:clamp(26px,2.8vw,44px);line-height:1.32;letter-spacing:-.02em;color:var(--ink)}" +
  ".cr-word{display:inline-block;white-space:pre;opacity:.26;transition:opacity .2s}" +
  ".cr-trust{margin-top:auto;display:flex;align-items:center;gap:36px;border-top:1px solid var(--line);padding-top:32px}" +
  ".cr-badge{display:flex;align-items:center;gap:12px;font-size:12.5px;line-height:1.3;color:var(--mute);flex-shrink:0}" +
  ".cr-laurel{width:18px;height:40px;color:rgba(255,255,255,.4)}" +
  ".cr-marquee{overflow:hidden;flex:1;mask-image:linear-gradient(90deg,transparent,black 10%,black 90%,transparent)}" +
  ".cr-mtrack{display:flex;width:max-content;animation:cr-marquee 30s linear infinite}" +
  ".cr-mset{display:flex;gap:44px;padding-right:44px}" +
  ".cr-mlogo{font-size:15px;color:rgba(255,255,255,.6);white-space:nowrap}" +
  ".cr-journey{position:relative;height:340vh}" +
  ".cr-jstage{position:sticky;top:0;height:100vh;overflow:hidden;perspective:1600px}" +
  ".cr-jtitle{position:absolute;left:0;right:0;top:clamp(84px,12vh,112px);font-family:" + SERIF + ";font-weight:400;font-size:clamp(30px,3.2vw,48px);text-align:center;color:var(--ink);padding:0 20px;z-index:2}" +
  ".cr-jcards{position:absolute;left:50%;top:54%;width:0;height:0;transform-style:preserve-3d}" +
  ".cr-panel{position:absolute;left:0;top:0;transform-style:preserve-3d;will-change:transform}" +
  ".cr-flip{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:none}" +
  ".cr-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:12px;overflow:hidden}" +
  ".cr-front{background-repeat:no-repeat;background-color:#b5100a;background-position:center;background-size:cover}" +
  ".cr-back{transform:rotateY(180deg);container-type:inline-size;box-shadow:0 30px 60px rgba(0,0,0,.5);border:1px solid rgba(255,255,255,.12);border-radius:12px}" +
  ".cr-back-in{position:absolute;inset:0;padding:9cqw 9cqw 10cqw;display:flex;flex-direction:column}" +
  ".cr-jicon{flex:none;width:9cqw;height:9cqw;opacity:.75}" +
  ".cr-back-in h3{font-family:" + SERIF + ";font-size:9.7cqw;line-height:1.15;font-weight:400;letter-spacing:-.03em;white-space:pre-line;margin-bottom:auto;margin-top:28cqw;color:var(--ink)}" +
  ".cr-back-in p{font-size:max(11px,4.36cqw);line-height:1.4;opacity:.85;color:var(--mute)}" +
  ".cr-tone-silver{color:#151515;background:repeating-linear-gradient(115deg,rgba(255,255,255,.07) 0 1px,transparent 1px 3px),linear-gradient(165deg,#ececec,#a8a8a8 70%,#9a9a9a)}" +
  ".cr-tone-silver .cr-back-in h3{color:#111}" +
  ".cr-tone-silver .cr-back-in p{color:#333}" +
  ".cr-tone-silver .cr-jicon{color:#111}" +
  ".cr-tone-red{color:#fff;background:linear-gradient(180deg,#e2281d,#a3110b 70%,#7a0c08)}" +
  ".cr-tone-red .cr-back-in h3{color:#fff}" +
  ".cr-tone-red .cr-back-in p{color:rgba(255,255,255,.9)}" +
  ".cr-tone-red .cr-jicon{color:#fff}" +
  ".cr-tone-dark{color:#d8d5ce;background:linear-gradient(165deg,#2c2c2c,#161616);border:1px solid rgba(255,255,255,.08)}" +
  ".cr-tone-dark .cr-back-in h3{color:#fff}" +
  ".cr-tone-dark .cr-back-in p{color:rgba(255,255,255,.7)}" +
  ".cr-tone-dark .cr-jicon{color:var(--red)}" +
  ".cr-services{padding:clamp(80px,10vh,130px) clamp(24px,5vw,72px)}" +
  ".cr-head{text-align:center;max-width:760px;margin:0 auto clamp(48px,6vh,72px)}" +
  ".cr-h2{font-family:" + SERIF + ";font-weight:400;font-size:clamp(32px,3.5vw,52px);line-height:1.15;letter-spacing:-.03em;color:var(--ink)}" +
  ".cr-h2-lg{font-size:clamp(36px,4.4vw,64px)}" +
  ".cr-head p{margin-top:12px;font-size:16px;color:var(--mute)}" +
  ".cr-rows{display:flex;flex-direction:column;gap:12px;max-width:1200px;margin:0 auto}" +
  ".cr-row{display:grid;grid-template-columns:1.2fr 2fr 1.6fr;align-items:center;gap:32px;padding:26px 32px;border-radius:14px;background:var(--card);border:1px solid var(--line);transition:border-color .3s,background .3s}" +
  ".cr-row:hover{border-color:rgba(255,255,255,.22);background:#17171a}" +
  ".cr-row-title{display:flex;align-items:baseline;gap:14px}" +
  ".cr-row-title span{font-size:12.5px;color:var(--mute);font-family:monospace}" +
  ".cr-row-title h3{font-family:" + SERIF + ";font-size:22px;line-height:1.25;color:var(--ink)}" +
  ".cr-row ul{list-style:none;display:flex;flex-wrap:wrap;gap:8px 16px;font-size:13.5px;color:var(--mute)}" +
  ".cr-row-img{border-radius:8px;overflow:hidden;aspect-ratio:3/2;background:#1e1e22}" +
  ".cr-row-img img{width:100%;height:100%;object-fit:cover;transition:transform .6s " + EASE + "}" +
  ".cr-row:hover .cr-row-img img{transform:scale(1.05)}" +
  ".cr-vision{display:flex;width:fit-content;margin:44px auto 0;height:44px;padding:0 24px;border-radius:10px;font-size:14px}" +
  ".cr-feat{position:relative;height:240vh}" +
  ".cr-fstage{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 24px;overflow:hidden}" +
  ".cr-fhead{text-align:center;position:absolute;top:clamp(50px,8vh,80px);transform-origin:50% 0;width:100%;max-width:1200px}" +
  ".cr-ftitle{font-family:" + SERIF + ";font-weight:400;font-size:clamp(30px,3.4vw,50px);letter-spacing:-.03em;color:var(--ink);transition:none}" +
  ".cr-fsub{margin-top:6px;font-size:14.5px;color:var(--mute)}" +
  ".cr-filters{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:14px auto 0;max-width:800px}" +
  ".cr-filter-btn{font-size:12px;padding:5px 13px;border-radius:20px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);color:var(--mute);cursor:pointer;transition:all .2s}" +
  ".cr-filter-btn:hover{background:rgba(255,255,255,.1);color:var(--ink)}" +
  ".cr-filter-btn[data-active='true']{background:var(--red);border-color:var(--red);color:#fff;box-shadow:0 0 12px rgba(200,43,32,.45)}" +
  ".cr-fcar{width:100%;max-width:1200px;margin-top:auto;margin-bottom:clamp(30px,6vh,70px)}" +
  ".cr-ftrack{position:relative;height:clamp(400px,50vh,520px);display:grid;place-items:center}" +
  ".cr-work{position:absolute;width:min(540px,86vw);border-radius:14px;overflow:hidden;background:#141418;border:1px solid var(--line);padding:16px;cursor:pointer;transition:transform .7s " + EASE + ",opacity .6s,filter .6s;transform:translateX(calc(var(--d) * 62%)) scale(calc(1 - abs(var(--d)) * 0.16));z-index:calc(10 - abs(var(--d)))}" +
  ".cr-work[data-d='far']{opacity:0;pointer-events:none}" +
  ".cr-work[data-d='s']{opacity:.45;filter:blur(2px)}" +
  ".cr-work-img{border-radius:10px;overflow:hidden;aspect-ratio:16/11;background:#05070a;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.06)}" +
  ".cr-work-img img{width:100%;height:100%;object-fit:contain}" +
  ".cr-work h3{font-family:" + SERIF + ";font-size:19px;margin:12px 0 6px;color:var(--ink)}" +
  ".cr-tags{display:flex;gap:7px;flex-wrap:wrap}" +
  ".cr-tags span{font-size:11.5px;padding:3px 8px;border-radius:6px;background:rgba(255,255,255,.07);color:var(--mute)}" +
  ".cr-inspect-btn{margin-top:10px;display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--ink);opacity:.78;background:none;border:none;cursor:pointer;transition:all .2s;padding:0}" +
  ".cr-inspect-btn:hover{opacity:1;color:var(--red)}" +
  ".cr-arrow{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:var(--ink);display:grid;place-items:center;font-size:18px;z-index:25;transition:background .3s,transform .3s}" +
  ".cr-arrow:hover{background:rgba(255,255,255,.2);transform:translateY(-50%) scale(1.08)}" +
  ".cr-prev{left:16px}" +
  ".cr-next{right:16px}" +
  ".cr-modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.8);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);z-index:100;display:grid;place-items:center;padding:20px;animation:cr-fade .25s ease-out both}" +
  ".cr-modal{background:#111114;border:1px solid rgba(255,255,255,.15);border-radius:18px;max-width:720px;width:100%;max-height:90vh;overflow-y:auto;padding:28px;box-shadow:0 24px 60px rgba(0,0,0,.85);position:relative;animation:cr-scale-up .3s " + EASE + " both}" +
  "@keyframes cr-scale-up{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}" +
  ".cr-modal-close{position:absolute;top:18px;right:18px;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);color:var(--ink);display:grid;place-items:center;font-size:16px;cursor:pointer;transition:background .2s}" +
  ".cr-modal-close:hover{background:rgba(255,255,255,.18)}" +
  ".cr-modal-img{width:100%;border-radius:12px;overflow:hidden;background:#05070a;border:1px solid rgba(255,255,255,.08);aspect-ratio:16/10;margin-bottom:18px;display:flex;align-items:center;justify-content:center}" +
  ".cr-modal-img img{width:100%;height:100%;object-fit:contain}" +
  ".cr-modal-tag{display:inline-block;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--red);margin-bottom:8px;font-family:monospace}" +
  ".cr-modal h3{font-family:" + SERIF + ";font-size:23px;line-height:1.2;color:var(--ink);margin-bottom:12px}" +
  ".cr-modal-desc{font-size:14px;line-height:1.6;color:var(--mute);margin-bottom:18px}" +
  ".cr-modal-specs{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:16px;margin-bottom:22px}" +
  ".cr-modal-specs h4{font-size:11.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink);margin-bottom:10px;font-family:monospace}" +
  ".cr-modal-specs ul{list-style:none;display:flex;flex-direction:column;gap:8px;font-size:13px;color:rgba(240,236,225,.88)}" +
  ".cr-modal-specs li::before{content:'▹ ';color:var(--red);font-weight:bold}" +
  ".cr-wall{padding:clamp(60px,8vh,100px) 24px;text-align:center;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}" +
  ".cr-wall-head{font-family:" + SERIF + ";font-size:clamp(22px,2.4vw,32px);line-height:1.3;color:var(--ink);margin-bottom:36px}" +
  ".cr-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:14px;max-width:1150px;margin:0 auto}" +
  ".cr-tile{display:grid;place-items:center;height:64px;border-radius:10px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);font-size:13.5px;color:var(--mute);transition:background .3s,color .3s,transform .3s}" +
  ".cr-tile:hover{background:rgba(255,255,255,.07);color:var(--ink);transform:translateY(-2px)}" +
  ".cr-quotes{padding:clamp(80px,10vh,130px) clamp(24px,5vw,72px)}" +
  ".cr-qstage{position:relative;max-width:880px;height:340px;margin:0 auto;display:grid;place-items:center}" +
  ".cr-quote{position:absolute;inset:0;display:grid;grid-template-columns:220px 1fr;gap:36px;align-items:center;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:32px;transition:opacity .6s,transform .6s " + EASE + ";opacity:0;transform:scale(.95);pointer-events:none}" +
  ".cr-quote[data-c]{opacity:1;transform:scale(1);pointer-events:auto}" +
  ".cr-quote img{width:100%;aspect-ratio:1;border-radius:12px;object-fit:cover}" +
  ".cr-qbody blockquote{font-family:" + SERIF + ";font-size:clamp(16px,1.6vw,22px);line-height:1.45;color:var(--ink);margin-bottom:20px}" +
  ".cr-qbody figcaption strong{display:block;font-size:16px;color:var(--ink)}" +
  ".cr-qbody figcaption span{font-size:13px;color:var(--mute)}" +
  ".cr-qprev{left:-24px}" +
  ".cr-qnext{right:-24px}" +
  ".cr-dotsbar{display:flex;justify-content:center;gap:10px;margin-top:28px}" +
  ".cr-dotsbar button{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.2);transition:background .3s,transform .3s}" +
  ".cr-dotsbar button[aria-selected='true']{background:#fff;transform:scale(1.3)}" +
  ".cr-contact{padding:clamp(80px,10vh,130px) clamp(24px,5vw,72px)}" +
  ".cr-cgrid{display:grid;grid-template-columns:1fr 1fr;gap:40px;max-width:1100px;margin:0 auto}" +
  ".cr-people{display:grid;grid-template-columns:1fr 1fr;gap:20px}" +
  ".cr-person{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:14px;transition:border-color .3s,transform .3s}" +
  ".cr-person:hover{border-color:rgba(255,255,255,.2);transform:translateY(-2px)}" +
  ".cr-avatar{width:56px;height:56px;border-radius:50%;overflow:hidden;background:#24242a;display:grid;place-items:center;font-weight:600}" +
  ".cr-avatar img{width:100%;height:100%;object-fit:cover}" +
  ".cr-avatar-k{background:var(--red);color:#fff;font-size:20px;font-family:" + SERIF + "}" +
  ".cr-person h3{font-family:" + SERIF + ";font-size:24px;line-height:1.1;color:var(--ink)}" +
  ".cr-person p{font-size:13.5px;color:var(--mute);margin-top:-6px}" +
  ".cr-plinks{display:flex;gap:10px;flex-wrap:wrap;margin-top:auto}" +
  ".cr-plinks a,.cr-plinks button{font-size:12.5px;padding:5px 11px;border-radius:6px;background:rgba(255,255,255,.08);color:var(--ink);transition:background .3s}" +
  ".cr-plinks a:hover,.cr-plinks button:hover{background:rgba(255,255,255,.16)}" +
  ".cr-stats{display:flex;flex-direction:column;gap:18px}" +
  ".cr-stat{display:flex;gap:22px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:20px 24px;align-items:center}" +
  ".cr-num{font-family:" + SERIF + ";font-size:clamp(36px,3.8vw,52px);color:#ffe4e4;min-width:2.2ch}" +
  ".cr-stat h3{font-family:" + SERIF + ";font-size:19px;margin-bottom:4px;color:var(--ink)}" +
  ".cr-stat p{font-size:13px;line-height:1.45;color:var(--mute)}" +
  ".cr-odo{display:inline-flex;overflow:hidden;height:1.1em;line-height:1.1}" +
  ".cr-odo-col{display:inline-block}" +
  ".cr-odo-col>span{display:flex;flex-direction:column;transition:transform .7s " + EASE + "}" +
  ".cr-ctawrap{padding:32px}" +
  ".cr-cta{position:relative;border-radius:16px;overflow:hidden;min-height:560px;display:flex;flex-direction:column;justify-content:space-between;padding:clamp(40px,8vh,80px) 32px 32px;background:#240303}" +
  ".cr-cta-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}" +
  ".cr-cta-tint{position:absolute;inset:0;background:radial-gradient(circle at center,rgba(200,30,20,.45),rgba(15,2,2,.85));z-index:1}" +
  ".cr-cta-text{position:relative;z-index:2;text-align:center;margin:auto}" +
  ".cr-cta-text p{font-size:16px;color:rgba(255,210,210,.8);margin-bottom:12px}" +
  ".cr-cta-text h2{font-family:" + SERIF + ";font-weight:400;font-size:clamp(36px,4.5vw,68px);line-height:1.15;letter-spacing:-.03em;color:#fff}" +
  ".cr-foot{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;font-size:12.8px;color:rgba(255,204,204,.7);border-top:1px solid rgba(255,255,255,.1);padding-top:24px;margin-top:40px}" +
  ".cr-mail{opacity:.85;transition:opacity .3s}" +
  ".cr-mail:hover{opacity:1}" +
  ".cr-flinks{display:flex;gap:20px}" +
  ".cr-flinks a{transition:color .3s}" +
  ".cr-flinks a:hover{color:#fff}" +
  "@media(max-width:860px){" +
  ".cr-links{display:none}" +
  ".cr-git-pill{display:none}" +
  ".cr-burger{display:flex}" +
  ".cr-row{grid-template-columns:1fr;gap:16px;padding:20px}" +
  ".cr-row-img{max-height:220px}" +
  ".cr-grid{grid-template-columns:repeat(2,1fr)}" +
  ".cr-qstage{height:auto}" +
  ".cr-quote{position:relative;inset:auto;grid-template-columns:1fr;gap:20px;padding:24px}" +
  ".cr-quote img{width:80px}" +
  ".cr-cgrid{grid-template-columns:1fr}" +
  ".cr-people{grid-template-columns:1fr}" +
  ".cr-foot{flex-direction:column;gap:14px;text-align:center}" +
  "}" +
  "@media(max-width:480px){" +
  ".cr-hero{padding:16px}" +
  ".cr-ctawrap{padding:16px}" +
  ".cr-qprev{left:0}" +
  ".cr-qnext{right:0}" +
  "}" +
  "@keyframes cr-fade{from{opacity:0}to{opacity:1}}" +
  "@keyframes cr-breathe{from{opacity:.4;transform:scale(.95)}to{opacity:.8;transform:scale(1.1)}}" +
  "@keyframes cr-drift-a{from{transform:translate(0,0)}to{transform:translate(12px,18px)}}" +
  "@keyframes cr-drift-b{from{transform:translate(0,0)}to{transform:translate(-12px,-18px)}}" +
  "@keyframes cr-word{from{opacity:0;filter:blur(8px);transform:translateY(16px)}to{opacity:1;filter:blur(0);transform:translateY(0)}}" +
  "@keyframes cr-explore{0%,100%{transform:translateY(0)}50%{transform:translateY(-105%)}}" +
  "@keyframes cr-explore2{0%,100%{transform:translateY(105%)}50%{transform:translateY(0)}}" +
  "@keyframes cr-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}"
