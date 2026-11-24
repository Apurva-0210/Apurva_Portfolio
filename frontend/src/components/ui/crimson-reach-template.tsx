"use client"

import * as React from "react"
import {
  clamp,
  seg,
  mix,
  wordLevel,
  loopOffset,
  countAt,
} from "@/lib/motion-utils"
import { fetchGithubPortfolio, type GithubPortfolioData } from "@/lib/github"
import { withBase } from "@/data/profile"

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
export type Stat = { n: number; label: string; body: string; displayValue?: string }

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
  { id: "client-1", name: "Tata Technologies", role: "Embedded Systems Intern · InnoVent", quote: "“Hands-on firmware development and verification for automotive electronic control modules under hardware-in-the-loop environments.”" },
  { id: "client-2", name: "IIT Guwahati", role: "Research Intern · Computer Architecture Lab", quote: "“Characterized memory hierarchies and Network-on-Chip flit latency using gem5 and SPEC CPU2017 benchmarks.”" },
  { id: "client-3", name: "MIT World Peace University", role: "B.Tech ECE (AI & ML) · CGPA 8.58", quote: "“Research spanning attention-augmented highway speed governance and noise-conditioned residual learning for robust Massive MIMO channel estimation.”" },
  { id: "client-4", name: "iACE Gujarat", role: "Automotive Systems Trainee", quote: "“Intensive training in automotive ECU architecture, CAN bus protocol diagnostics, and electric vehicle powertrain integration.”" },
]

const JOURNEY: Journey[] = [
  { tone: "red", title: "Automotive Systems\n& ADAS", body: "Calibrating safety-critical ADAS perception, multi-modal sensor fusion (LiDAR, Radar, Cameras), and real-time TTC braking decision logic under high-density Indian traffic in CARLA UE5 and RoadRunner." },
  { tone: "silver", title: "Embedded &\nReal-Time Systems", body: "Bare-metal C & C++, FreeRTOS task scheduling, and device drivers across STM32 and ESP32 microcontrollers. Interfacing CAN Bus (ISO 15765-4), UART, SPI, and sensor data acquisition close to silicon." },
  { tone: "dark", title: "Computer\nArchitecture", body: "Cycle-accurate microarchitecture simulation with gem5 v25.1.0.1. Characterizing Ruby MESI_Two_Level cache coherence, Garnet 4x4 2D Mesh NoC flit latency, and SPEC CPU2017 workload bottlenecks." },
  { tone: "silver", title: "Applied AI/ML\n& Deep Learning", body: "Noise-Conditioned Residual Transformers (NCRT/NCRN) for Massive MIMO CSI channel estimation, YOLOv8-CBAM attention models for traffic sign detection, and fuzzy logic control engines." },
]

const STATS: Stat[] = [
  { n: 9, displayValue: "8.58", label: "8.58 Academic CGPA", body: "Electronics & Communication Engineering (AI & ML Specialization) at MIT World Peace University, Pune." },
  { n: 12, displayValue: "12+", label: "Engineering Projects", body: "Spanning vehicle ADAS simulation, attention edge neural networks, multi-gas composite sensors, and gem5 microarchitecture." },
  { n: 4, displayValue: "4+", label: "Research & Industry Labs", body: "Industry and academic research at Tata Technologies, IIT Guwahati, iACE Gujarat, and MIT-WPU." },
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
  logoImg?: string
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
  ctaImg?: string
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
        <rect x="6" y="6" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="4" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg className="cr-jicon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 4 L28 26 H4 Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="18" r="3" fill="currentColor" />
    </svg>
  )
}

export default function CrimsonReachTemplate({
  height = "100vh",
  email = "apurvak916@gmail.com",
  brand = "Apurva Kumar",
  name = "Apurva Kumar",
  role = "Embedded Systems · Automotive Electronics · Simulation · AI/ML",
  avatar,
  logoImg,
  year = "2026",
  location = "Pune · India",
  heroLine1 = "Building Intelligent",
  heroLine2 = "Systems at the Edge",
  heroSub = "Embedded Systems · Automotive Electronics · Simulation · Applied AI/ML",
  manifesto = MANIFESTO,
  trustBadgeText = "Tata Technologies · IIT Guwahati · MIT-WPU",
  marqueeList = [
    "Embedded C & C++",
    "STM32 & ESP32",
    "gem5 Architecture",
    "Garnet NoC",
    "CARLA & RoadRunner",
    "Automotive ADAS",
    "CAN Bus (ISO 15765-4)",
    "PyTorch & YOLOv8",
    "Massive MIMO (NCRT)",
    "FreeRTOS",
  ],
  journeyTitle = "Core Engineering Disciplines",
  journey = JOURNEY,
  servicesTitle = "Engineering Capabilities",
  servicesSub = "Deep technical execution across register-level hardware, cycle-accurate simulators, and neural perception",
  services = SERVICES,
  worksTitle = "Featured Engineering Work",
  worksSub = "Systems, architecture, and research projects with public repositories and technical documentation",
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
  ctaHead = "Building intelligent systems at the edge",
  ctaTitle = "Let’s engineer something reliable",
  ctaImg,
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

  // ESC key to close modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedWork(null)
        setMenuOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  React.useEffect(() => {
    const fmt = () => {
      const d = new Date()
      const utc = d.getTime() + d.getTimezoneOffset() * 60000
      const ist = new Date(utc + 5.5 * 3600000)
      setClock(
        ist.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      )
    }
    fmt()
    const id = setInterval(fmt, 1000 * 30)
    return () => clearInterval(id)
  }, [])

  // Auto carousel advance for quotes
  React.useEffect(() => {
    if (!quotes.length) return
    const id = setInterval(() => {
      setQuote((prev) => (prev + 1) % quotes.length)
    }, 8000)
    return () => clearInterval(id)
  }, [quotes.length])

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const $ = (sel: string) => root.querySelector(sel) as HTMLElement | null
    const $$ = (sel: string) => Array.from(root.querySelectorAll(sel)) as HTMLElement[]

    const hero = $(".cr-hero"),
      hands = [$(".cr-hand-top"), $(".cr-hand-bottom")],
      manifestoEl = $(".cr-manifesto"),
      wordEls = $$(".cr-word"),
      contacts = $(".cr-contact"),
      cta = $(".cr-cta"),
      ctaImgEl = $(".cr-cta-img"),
      ctaText = $(".cr-cta-text")

    let raf = 0
    const tick = () => {
      raf = 0
      const winH = window.innerHeight

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

      // stats counters (only for items without custom displayValue)
      if (contacts) {
        const r = contacts.getBoundingClientRect()
        if (r.top < winH * 0.85 && r.bottom > 0) {
          const p = clamp((winH * 0.85 - r.top) / (winH * 0.5), 0, 1)
          setCounts(stats.map((s) => countAt(s.n, p)))
        }
      }

      // closing CTA reveal
      if (cta && ctaImgEl && ctaText && !reduced) {
        const r = cta.getBoundingClientRect()
        const p = clamp((winH - r.top) / (winH * 0.8), 0, 1)
        cta.style.transform = "scale(" + mix(0.94, 1, p) + ")"
        cta.style.borderRadius = mix(32, 16, p) + "px"
        ctaImgEl.style.transform = "scale(" + mix(1.12, 1, p) + ")"
        ctaText.style.filter = "blur(" + mix(10, 0, seg(p, 0.35, 1)) + "px)"
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
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard fallback */
    }
  }

  const nW = filteredWorks.length || 1

  return (
    <div ref={rootRef} className={"cr-root" + (className ? " " + className : "")} style={style}>
      <style>{CSS}</style>

      {/* Floating Navigation Bar - Shielded with solid backdrop */}
      <div className="cr-navwrap">
        <nav className="cr-nav" aria-label="Main Navigation">
          <a className="cr-logo" href="#top" onClick={go(".cr-hero")}>
            {logoImg ? (
              <img src={logoImg} alt="" className="cr-nav-logo-img" width={28} height={28} />
            ) : (
              <span className="cr-bdot" />
            )}
            <span>{brand}</span>
          </a>

          <div className="cr-links">
            <a href="#focus" onClick={go(".cr-journey")}>
              <Roll>Disciplines</Roll>
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
            <a className="cr-btn" href={"mailto:" + email} style={{ background: "var(--red)", color: "#fff" }}>
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
              Core Disciplines
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
              Direct Connect & Metrics
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

      {/* Core Engineering Disciplines - 4 Pillars */}
      <section className="cr-journey cr-dots" id="focus">
        <div className="cr-jstage">
          <div className="cr-jhead">
            <h2 className="cr-h2 cr-jtitle">
              <em>Core Engineering</em> Disciplines
            </h2>
            <p className="cr-jsub">
              Cross-disciplinary execution spanning automotive ADAS, bare-metal embedded firmware, cycle-accurate computer architecture, and applied deep learning
            </p>
          </div>
          <div className="cr-jgrid">
            {journey.map((c, i) => (
              <div key={i} className={"cr-jcard cr-jcard-" + c.tone}>
                <div className="cr-jcard-top">
                  <span className="cr-jidx">0{i + 1}</span>
                  <Icon kind={c.tone} />
                </div>
                <h3 className="cr-jcard-title">{c.title.replace("\n", " ")}</h3>
                <p className="cr-jcard-body">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* capabilities / services */}
      <section className="cr-services" id="capabilities">
        <div className="cr-head">
          <h2 className="cr-h2 cr-h2-lg">{servicesTitle}</h2>
          <p>{servicesSub}</p>
        </div>
        <div className="cr-rows">
          {services.map((s, i) => (
            <article key={s.id} className="cr-row">
              <div className="cr-row-title">
                <span>0{i + 1}</span>
                <h3>{s.title}</h3>
              </div>
              <ul>
                {s.items.map((it, idx) => (
                  <li key={idx}>— {it}</li>
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
                    data-d={d === 0 ? "c" : Math.abs(d) === 1 ? "s" : "far"}
                    style={{ "--d": d } as React.CSSProperties}
                    onClick={() => setWork(i)}
                  >
                    <div className="cr-work-img">
                      <img
                        src={w.img || img(w.id)}
                        alt={w.title}
                        loading={isAdjacentOrActive ? "eager" : "lazy"}
                        decoding="async"
                        width={600}
                        height={400}
                      />
                    </div>
                    {w.category && <span className="cr-modal-tag">{w.category}</span>}
                    <h3>{w.title}</h3>
                    <div className="cr-tags">
                      {w.tags.map((t, tidx) => (
                        <span key={tidx}>{t}</span>
                      ))}
                    </div>
                    {d === 0 && (
                      <div style={{ marginTop: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                        <button
                          type="button"
                          className="cr-inspect-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedWork(w)
                          }}
                          aria-label={`Inspect Architecture: ${w.title} specifications`}
                        >
                          <span>Inspect Architecture ↗</span>
                        </button>
                        {w.href && (
                          <a
                            href={w.href}
                            target="_blank"
                            rel="noreferrer"
                            className="cr-source-btn"
                            onClick={(e) => e.stopPropagation()}
                            style={{ opacity: 0.8 }}
                          >
                            <span>Source Repo ↗</span>
                          </a>
                        )}
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
            <button
              className="cr-arrow cr-prev"
              onClick={() => setWork((w) => (w - 1 + nW) % nW)}
              aria-label="Previous project"
            >
              ←
            </button>
            <button
              className="cr-arrow cr-next"
              onClick={() => setWork((w) => (w + 1) % nW)}
              aria-label="Next project"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* Technical Deep-Dive Modal */}
      {selectedWork && (
        <div
          className="cr-modal-backdrop"
          onClick={() => setSelectedWork(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="cr-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="cr-modal-close"
              onClick={() => setSelectedWork(null)}
              aria-label="Close modal dialog"
            >
              ✕
            </button>
            {selectedWork.category && <span className="cr-modal-tag">{selectedWork.category}</span>}
            <h3 id="modal-title">{selectedWork.title}</h3>
            {selectedWork.img && (
              <div className="cr-modal-img">
                <img src={selectedWork.img} alt={selectedWork.title} />
              </div>
            )}
            {selectedWork.summary && <p className="cr-modal-desc">{selectedWork.summary}</p>}
            {selectedWork.specs && selectedWork.specs.length > 0 && (
              <div className="cr-modal-specs">
                <h4>System Architecture & Key Specifications</h4>
                <ul>
                  {selectedWork.specs.map((spec, sidx) => (
                    <li key={sidx}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              {selectedWork.href && (
                <a
                  className="cr-btn"
                  href={selectedWork.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ background: "var(--red)", color: "#fff" }}
                >
                  <Roll>Open GitHub Repository ↗</Roll>
                </a>
              )}
              <button
                type="button"
                className="cr-btn"
                onClick={() => setSelectedWork(null)}
                style={{ background: "rgba(255,255,255,.08)", color: "var(--ink)" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* affiliations wall */}
      <section className="cr-wall" id="affiliations">
        <h2 className="cr-wall-head">{wallTitle}</h2>
        <div className="cr-grid">
          {wallLogos.map((brandName, i) => (
            <div key={i} className="cr-tile">
              <span>{brandName}</span>
            </div>
          ))}
        </div>
      </section>

      {/* field experience / quotes */}
      <section className="cr-quotes" id="experience">
        <div className="cr-head" style={{ marginBottom: "32px" }}>
          <h2 className="cr-h2">{quotesTitle}</h2>
          <p>{quotesSub}</p>
        </div>
        <div className="cr-qstage">
          {quotes.map((q, i) => (
            <figure
              key={q.id}
              className="cr-quote"
              style={{
                opacity: i === quote ? 1 : 0,
                transform: i === quote ? "translateY(0)" : "translateY(16px)",
                pointerEvents: i === quote ? "auto" : "none",
                transition: "opacity .6s, transform .6s",
              }}
            >
              {q.img && <img src={q.img} alt={q.name + " badge"} loading="lazy" width={112} height={112} />}
              <div className="cr-qbody">
                <blockquote>{q.quote}</blockquote>
                <figcaption>
                  <strong>{q.name}</strong>
                  <span>{q.role}</span>
                </figcaption>
              </div>
            </figure>
          ))}
          <button className="cr-arrow cr-qprev" onClick={() => setQuote((q) => (q - 1 + quotes.length) % quotes.length)} aria-label="Previous note">
            ←
          </button>
          <button className="cr-arrow cr-qnext" onClick={() => setQuote((q) => (q + 1) % quotes.length)} aria-label="Next note">
            →
          </button>
        </div>
        <div className="cr-dotsbar" role="tablist" aria-label="Quote slides">
          {quotes.map((q, i) => (
            <button key={q.id} role="tab" aria-selected={i === quote} aria-label={"Quote " + (i + 1)} onClick={() => setQuote(i)} />
          ))}
        </div>
      </section>

      {/* contacts & stats - High-Craft Engineer Profile */}
      <section className="cr-contact" id="contact">
        <div className="cr-cgrid">
          <div className="cr-person-card">
            <div className="cr-person-top">
              <div className="cr-avatar-badge">
                {avatar ? (
                  <img src={avatar} alt={name} className="cr-avatar-img" width={48} height={48} />
                ) : (
                  <span className="cr-avatar-k">A</span>
                )}
              </div>
              <div>
                <h3 className="cr-person-name">{name}</h3>
                <p className="cr-person-role">B.Tech in Electronics &amp; Communication Engineering</p>
                <div className="cr-person-pill">
                  <span className="cr-pill-dot" />
                  <span>MIT-WPU · CGPA 8.58 · Available</span>
                </div>
              </div>
            </div>

            <p className="cr-person-desc">
              Specialized in automotive ADAS calibration, cycle-accurate gem5 microarchitecture modeling, embedded C/C++ firmware, and noise-conditioned deep learning for Massive MIMO.
            </p>

            <div className="cr-person-meta">
              <div className="cr-meta-cell">
                <span className="cr-meta-lbl">Location</span>
                <span className="cr-meta-txt">{location}</span>
              </div>
              <div className="cr-meta-cell">
                <span className="cr-meta-lbl">Direct Email</span>
                <a href={"mailto:" + email} className="cr-meta-link">{email}</a>
              </div>
            </div>

            <div className="cr-plinks">
              <a href={"mailto:" + email} className="cr-btn" style={{ background: "var(--red)", color: "#fff", height: "38px" }}>
                <Roll>Email Apurva</Roll>
              </a>
              {resumeUrl && (
                <a
                  className="cr-btn"
                  href={resumeUrl}
                  download="Apurva_Kumar_Resume.pdf"
                  style={{ background: "rgba(255,255,255,.08)", color: "var(--ink)", border: "1px solid rgba(255,255,255,.14)", height: "38px" }}
                >
                  <Roll>Download Resume (PDF)</Roll>
                </a>
              )}
              {linkedinUrl && (
                <a href={linkedinUrl} target="_blank" rel="noreferrer" className="cr-btn" style={{ background: "rgba(255,255,255,.05)", color: "var(--ink)", border: "1px solid rgba(255,255,255,.1)", height: "38px" }}>
                  LinkedIn ↗
                </a>
              )}
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noreferrer" className="cr-btn" style={{ background: "rgba(255,255,255,.05)", color: "var(--ink)", border: "1px solid rgba(255,255,255,.1)", height: "38px" }}>
                  GitHub ↗
                </a>
              )}
            </div>
          </div>

          <div className="cr-stats">
            {stats.map((s, i) => (
              <div key={s.label} className="cr-stat">
                <div className="cr-num">
                  {s.displayValue || (
                    <span className="cr-odo">
                      <span className="cr-odo-col">
                        <span>{counts[i] || 0}</span>
                      </span>
                      <span>+</span>
                    </span>
                  )}
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

      {/* closing card - Automotive Engineering Digital Twin */}
      <section className="cr-ctawrap">
        <div className="cr-cta">
          <img
            className="cr-cta-img"
            src={ctaImg || withBase("assets/projects/automotive_cta_backdrop.png")}
            alt="Automotive Systems & Real-Time Engineering"
            loading="lazy"
            width={1536}
            height={1024}
          />
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
              <a className="cr-btn" href={"mailto:" + email} style={{ background: "var(--red)", color: "#fff", height: "42px", padding: "0 22px" }}>
                <Roll>Email Apurva Directly</Roll>
              </a>
              {resumeUrl && (
                <a
                  className="cr-btn"
                  href={resumeUrl}
                  download="Apurva_Kumar_Resume.pdf"
                  style={{ background: "rgba(255,255,255,0.12)", color: "var(--ink)", border: "1px solid rgba(255,255,255,0.2)", height: "42px", padding: "0 22px" }}
                >
                  <Roll>Download Official Resume (PDF)</Roll>
                </a>
              )}
            </div>
          </div>
          <footer className="cr-foot">
            <span>&copy; {year} Apurva Kumar · Electronics &amp; Communication Engineering</span>
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
  ".cr-navwrap{position:sticky;top:0;z-index:80;width:100%;background:rgba(7,7,9,.92);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,.08);transition:background .3s,border-color .3s}" +
  ".cr-nav{position:relative;width:100%;max-width:1300px;margin:0 auto;height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 28px}" +
  ".cr-logo{display:flex;align-items:center;gap:10px;font-family:" + SERIF + ";font-style:italic;font-size:22px;letter-spacing:-.02em;color:var(--ink)}" +
  ".cr-nav-logo-img{width:28px;height:28px;object-fit:contain;filter:drop-shadow(0 0 6px rgba(46,140,255,.4))}" +
  ".cr-bdot{width:8px;height:8px;border-radius:50%;background:var(--red);box-shadow:0 0 8px var(--red);display:inline-block}" +
  ".cr-links{display:flex;gap:24px;font-size:13.5px}" +
  ".cr-links a{opacity:.82;transition:opacity .3s;padding:4px 6px}" +
  ".cr-links a:hover{opacity:1}" +
  ".cr-btn{display:inline-flex;align-items:center;height:34px;padding:0 14px;border-radius:8px;background:var(--ink);color:#0a0a0c;font-size:12.5px;font-weight:500;box-shadow:inset 0 -2px 0 rgba(0,0,0,.12),0 2px 8px rgba(0,0,0,.25);transition:transform .3s " + EASE + ",background .3s}" +
  ".cr-btn:hover{transform:translateY(-1px);background:#fff}" +
  ".cr-burger{display:none;width:38px;height:38px;border-radius:8px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:var(--ink);flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;position:relative;z-index:70}" +
  ".cr-burger span{display:block;width:18px;height:2px;background:currentColor;border-radius:2px;transition:transform .3s,opacity .3s}" +
  ".cr-mob-drawer{position:fixed;inset:0;background:rgba(7,7,9,.97);-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);z-index:90;display:flex;flex-direction:column;padding:84px 28px 36px;gap:24px;overflow-y:auto;animation:cr-fade .3s ease-out both}" +
  ".cr-mob-links{display:flex;flex-direction:column;gap:18px;font-family:" + SERIF + ";font-size:24px}" +
  ".cr-mob-links a{color:var(--ink);transition:color .2s}" +
  ".cr-mob-links a:hover{color:var(--red)}" +
  ".cr-mob-actions{margin-top:auto;display:flex;flex-direction:column;gap:12px;border-top:1px solid var(--line);padding-top:20px}" +
  ".cr-hero{position:relative;padding:24px 32px 32px;min-height:520px}" +
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
  ".cr-journey{position:relative;padding:clamp(70px,10vh,110px) 24px;background:var(--bg);border-bottom:1px solid var(--line)}" +
  ".cr-jstage{max-width:1200px;margin:0 auto;display:flex;flex-direction:column;align-items:center}" +
  ".cr-jhead{text-align:center;max-width:800px;margin-bottom:44px}" +
  ".cr-jtitle{font-family:" + SERIF + ";font-weight:400;font-size:clamp(30px,3.4vw,48px);color:var(--ink)}" +
  ".cr-jsub{margin-top:10px;font-size:15px;color:var(--mute)}" +
  ".cr-jgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;width:100%}" +
  ".cr-jcard{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:32px;display:flex;flex-direction:column;gap:14px;transition:border-color .3s,transform .3s;position:relative;overflow:hidden}" +
  ".cr-jcard:hover{border-color:rgba(255,255,255,.2);transform:translateY(-3px)}" +
  ".cr-jcard-top{display:flex;justify-content:space-between;align-items:center}" +
  ".cr-jidx{font-family:monospace;font-size:12px;color:#ff786e;letter-spacing:.08em}" +
  ".cr-jicon{width:28px;height:28px;opacity:.85}" +
  ".cr-jcard-title{font-family:" + SERIF + ";font-size:24px;color:var(--ink);line-height:1.2}" +
  ".cr-jcard-body{font-size:14px;line-height:1.65;color:var(--mute)}" +
  ".cr-jcard-red{border-top:2px solid var(--red)}" +
  ".cr-jcard-silver{border-top:2px solid rgba(255,255,255,.25)}" +
  ".cr-jcard-dark{border-top:2px solid rgba(255,255,255,.12)}" +
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
  ".cr-feat{position:relative;padding:clamp(70px,9vh,110px) 24px}" +
  ".cr-fstage{max-width:1300px;margin:0 auto;display:flex;flex-direction:column;align-items:center}" +
  ".cr-fhead{text-align:center;width:100%;max-width:960px;margin-bottom:32px;position:relative}" +
  ".cr-ftitle{font-family:" + SERIF + ";font-weight:400;font-size:clamp(30px,3.4vw,48px);letter-spacing:-.03em;color:var(--ink)}" +
  ".cr-fsub{margin-top:8px;font-size:15px;color:var(--mute)}" +
  ".cr-filters{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:16px auto 0;max-width:800px}" +
  ".cr-filter-btn{font-size:12px;padding:5px 13px;border-radius:20px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);color:var(--mute);cursor:pointer;transition:all .2s}" +
  ".cr-filter-btn:hover{background:rgba(255,255,255,.1);color:var(--ink)}" +
  ".cr-filter-btn[data-active='true']{background:var(--red);border-color:var(--red);color:#fff;box-shadow:0 0 12px rgba(200,43,32,.45)}" +
  ".cr-fcar{width:100%;max-width:1200px;margin:0 auto;position:relative}" +
  ".cr-ftrack{position:relative;height:clamp(440px,54vh,540px);display:grid;place-items:center}" +
  ".cr-work{position:absolute;width:min(540px,86vw);border-radius:14px;overflow:hidden;background:#141418;border:1px solid var(--line);padding:16px;cursor:pointer;transition:transform .7s " + EASE + ",opacity .6s,filter .6s;transform:translateX(calc(var(--d) * 62%)) scale(calc(1 - abs(var(--d)) * 0.16));z-index:calc(10 - abs(var(--d)))}" +
  ".cr-work[data-d='far']{opacity:0;pointer-events:none}" +
  ".cr-work[data-d='s']{opacity:.45;filter:blur(2px)}" +
  ".cr-work-img{border-radius:10px;overflow:hidden;aspect-ratio:16/11;background:#05070a;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.06)}" +
  ".cr-work-img img{width:100%;height:100%;object-fit:contain}" +
  ".cr-work h3{font-family:" + SERIF + ";font-size:19px;margin:12px 0 6px;color:var(--ink)}" +
  ".cr-tags{display:flex;gap:7px;flex-wrap:wrap}" +
  ".cr-tags span{font-size:11.5px;padding:3px 8px;border-radius:6px;background:rgba(255,255,255,.07);color:var(--mute)}" +
  ".cr-inspect-btn,.cr-source-btn{margin-top:10px;display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--ink);opacity:.78;background:none;border:none;cursor:pointer;transition:all .2s;padding:0}" +
  ".cr-inspect-btn:hover,.cr-source-btn:hover{opacity:1;color:var(--red)}" +
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
  ".cr-modal-tag{display:inline-block;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#ff786e;margin-bottom:8px;font-family:monospace}" +
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
  ".cr-quote{position:absolute;inset:0;display:grid;grid-template-columns:112px 1fr;gap:40px;align-items:center;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:36px 44px;transition:opacity .6s,transform .6s}" +
  ".cr-quote img{width:112px;height:auto;object-fit:contain;border-radius:8px}" +
  ".cr-qbody blockquote{font-family:" + SERIF + ";font-size:clamp(16px,1.6vw,22px);line-height:1.45;color:var(--ink);margin-bottom:20px}" +
  ".cr-qbody figcaption strong{display:block;font-size:16px;color:var(--ink)}" +
  ".cr-qbody figcaption span{font-size:13px;color:var(--mute)}" +
  ".cr-qprev{left:-24px}" +
  ".cr-qnext{right:-24px}" +
  ".cr-dotsbar{display:flex;justify-content:center;gap:10px;margin-top:28px}" +
  ".cr-dotsbar button{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.2);transition:background .3s,transform .3s}" +
  ".cr-dotsbar button[aria-selected='true']{background:#fff;transform:scale(1.3)}" +
  ".cr-contact{padding:clamp(80px,10vh,130px) clamp(24px,5vw,72px)}" +
  ".cr-cgrid{display:grid;grid-template-columns:1.2fr 1fr;gap:36px;max-width:1200px;margin:0 auto;align-items:start}" +
  ".cr-person-card{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:32px;display:flex;flex-direction:column;gap:20px;transition:border-color .3s}" +
  ".cr-person-card:hover{border-color:rgba(255,255,255,.2)}" +
  ".cr-person-top{display:flex;gap:18px;align-items:center}" +
  ".cr-avatar-badge{width:56px;height:56px;border-radius:12px;background:var(--red);color:#fff;display:grid;place-items:center;font-weight:700;font-size:24px;font-family:" + SERIF + ";box-shadow:0 0 16px rgba(200,43,32,.45);flex-shrink:0;overflow:hidden;padding:2px}" +
  ".cr-avatar-img{width:100%;height:100%;object-fit:cover;border-radius:10px}" +
  ".cr-person-name{font-family:" + SERIF + ";font-size:26px;color:var(--ink);line-height:1.15}" +
  ".cr-person-role{font-size:13.5px;color:var(--mute);margin-top:2px}" +
  ".cr-person-pill{display:inline-flex;align-items:center;gap:7px;padding:3px 10px;border-radius:12px;background:rgba(46,204,113,.12);border:1px solid rgba(46,204,113,.25);font-size:11.5px;color:#2ecc71;margin-top:8px}" +
  ".cr-pill-dot{width:6px;height:6px;border-radius:50%;background:#2ecc71;box-shadow:0 0 6px #2ecc71}" +
  ".cr-person-desc{font-size:14px;line-height:1.65;color:rgba(240,236,225,.8)}" +
  ".cr-person-meta{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:16px;border-radius:10px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06)}" +
  ".cr-meta-cell{display:flex;flex-direction:column;gap:3px}" +
  ".cr-meta-lbl{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--mute);font-family:monospace}" +
  ".cr-meta-txt{font-size:13px;color:var(--ink)}" +
  ".cr-meta-link{font-size:13px;color:var(--ink);text-decoration:underline;text-underline-offset:2px;transition:color .2s}" +
  ".cr-meta-link:hover{color:var(--red)}" +
  ".cr-plinks{display:flex;gap:10px;flex-wrap:wrap;margin-top:4px}" +
  ".cr-stats{display:flex;flex-direction:column;gap:16px}" +
  ".cr-stat{display:flex;gap:22px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:20px 24px;align-items:center}" +
  ".cr-num{font-family:" + SERIF + ";font-size:clamp(32px,3.5vw,46px);color:#ffe4e4;min-width:2.2ch}" +
  ".cr-stat h3{font-family:" + SERIF + ";font-size:18px;margin-bottom:4px;color:var(--ink)}" +
  ".cr-stat p{font-size:13px;line-height:1.45;color:var(--mute)}" +
  ".cr-odo{display:inline-flex;overflow:hidden;height:1.1em;line-height:1.1}" +
  ".cr-odo-col{display:inline-block}" +
  ".cr-odo-col>span{display:flex;flex-direction:column;transition:transform .7s " + EASE + "}" +
  ".cr-ctawrap{padding:32px}" +
  ".cr-cta{position:relative;border-radius:16px;overflow:hidden;min-height:540px;display:flex;flex-direction:column;justify-content:space-between;padding:clamp(40px,8vh,80px) 32px 32px;background:#1a0305}" +
  ".cr-cta-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;opacity:.75}" +
  ".cr-cta-tint{position:absolute;inset:0;background:radial-gradient(circle at center,rgba(160,20,25,.55),rgba(12,2,4,.92));z-index:1}" +
  ".cr-cta-text{position:relative;z-index:2;text-align:center;margin:auto}" +
  ".cr-cta-text p{font-size:15px;color:rgba(255,210,210,.85);margin-bottom:12px;text-transform:uppercase;letter-spacing:.08em}" +
  ".cr-cta-text h2{font-family:" + SERIF + ";font-weight:400;font-size:clamp(34px,4.2vw,62px);line-height:1.18;letter-spacing:-.03em;color:#fff}" +
  ".cr-foot{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;font-size:12.8px;color:rgba(255,204,204,.7);border-top:1px solid rgba(255,255,255,.1);padding-top:24px;margin-top:40px}" +
  ".cr-mail{opacity:.85;transition:opacity .3s}" +
  ".cr-mail:hover{opacity:1}" +
  ".cr-flinks{display:flex;gap:20px}" +
  ".cr-flinks a{transition:color .3s}" +
  ".cr-flinks a:hover{color:#fff}" +
  "@media(max-width:860px){" +
  ".cr-links{display:none}" +
  ".cr-burger{display:flex}" +
  ".cr-row{grid-template-columns:1fr;gap:16px;padding:20px}" +
  ".cr-row-img{max-height:220px}" +
  ".cr-grid{grid-template-columns:repeat(2,1fr)}" +
  ".cr-qstage{height:auto}" +
  ".cr-quote{position:relative;inset:auto;grid-template-columns:1fr;gap:20px;padding:24px}" +
  ".cr-quote img{width:80px}" +
  ".cr-cgrid{grid-template-columns:1fr}" +
  ".cr-jgrid{grid-template-columns:1fr}" +
  ".cr-foot{flex-direction:column;gap:14px;text-align:center}" +
  "}" +
  "@media(max-width:480px){" +
  ".cr-hero{padding:16px}" +
  ".cr-ctawrap{padding:16px}" +
  ".cr-qprev{left:0}" +
  ".cr-qnext{right:0}" +
  ".cr-person-meta{grid-template-columns:1fr}" +
  "}" +
  "@keyframes cr-fade{from{opacity:0}to{opacity:1}}" +
  "@keyframes cr-breathe{from{opacity:.4;transform:scale(.95)}to{opacity:.8;transform:scale(1.1)}}" +
  "@keyframes cr-drift-a{from{transform:translate(0,0)}to{transform:translate(12px,18px)}}" +
  "@keyframes cr-drift-b{from{transform:translate(0,0)}to{transform:translate(-12px,-18px)}}" +
  "@keyframes cr-word{from{opacity:0;filter:blur(8px);transform:translateY(16px)}to{opacity:1;filter:blur(0);transform:translateY(0)}}" +
  "@keyframes cr-explore{0%,100%{transform:translateY(0)}50%{transform:translateY(-105%)}}" +
  "@keyframes cr-explore2{0%,100%{transform:translateY(105%)}50%{transform:translateY(0)}}" +
  "@keyframes cr-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}"
