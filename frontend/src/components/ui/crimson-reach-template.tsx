"use client"

import * as React from "react"
import { withBase } from "@/data/profile"

/*
 * Crimson Reach: a dark, red-lit cinematic studio page.
 * Two hands reach across a red hero card. A manifesto inks in word by word, and a wide dune splits into three
 * panels that flip into journey cards and fan out. Engineering capabilities follow, then a giant "Featured Work" title
 * that shrinks onto a project carousel, an institutional wall, testimonials/field reviews, a contact pair with rolling counters,
 * and a statue card that closes the page.
 */

const ASSETS = "https://kedhar-components.pages.dev/crimson-reach-template/"

// #region motion
export const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v)
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a))
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
export const mix = (a: number, b: number, t: number) => a + (b - a) * t

export const wordLevel = (i: number, n: number, r: number) => clamp(r * (n + 4) - i, 0, 1)

export const loopOffset = (i: number, active: number, n: number) => {
  let d = (((i - active) % n) + n) % n
  if (d > n / 2) d -= n
  return d
}

export const countAt = (target: number, p: number) => Math.round(target * easeOut(clamp(p)))

export function journeyFrame(p: number, w: number, h: number, reduced = false) {
  const phone = w < 760
  const F = phone ? w * 0.92 : Math.min(1100, w * 0.78)
  const H0 = phone ? Math.min(h * 0.36, F * 0.62) : Math.min(520, h * 0.6)
  const Hs = phone ? H0 : Math.min(464, h * 0.53)
  const g = phone ? 8 : 36
  const cw = phone ? Math.min(w * 0.46, 210) : (F - 2 * g) / 3
  const ch = phone ? cw * 1.41 : Hs
  const fan = phone ? w * 0.27 : cw * 0.98
  const split = reduced ? 1 : easeInOut(seg(p, 0.26, 0.4))
  const tilt = reduced ? 1 : easeInOut(seg(p, 0.6, 0.76))
  const panels = [0, 1, 2].map((i) => {
    const flip = reduced ? 1 : easeInOut(seg(p, 0.43 + i * 0.03, 0.62 + i * 0.03))
    const gap = g * split
    const pw = (F - 2 * gap) / 3
    const pwF = mix(pw, cw, flip)
    const phF = mix(mix(H0, Hs, split), ch, flip)
    const x0 = (i - 1) * (pw + gap)
    const x = mix(x0, (i - 1) * fan, flip) * (1 + 0.04 * tilt)
    const rz = [-12, 0, 8][i] * tilt
    const y = [26, 0, 12][i] * tilt * (phone ? 0.6 : 1)
    return { x, y, w: pwF, h: phF, ry: 180 * flip, rz, cut: split, bgX: -(i * (F / 3) + (F / 3 - pwF) / 2) }
  })
  return { F, H0, panels, titleO: reduced ? 1 : mix(0.3, 1, seg(p, 0.2, 0.4)) }
}

export function featuredFrame(p: number, big: number, reduced = false) {
  const t = reduced ? 1 : easeInOut(seg(p, 0.46, 0.84))
  const c = reduced ? 1 : easeOut(seg(p, 0.6, 0.94))
  return { scale: mix(big, 1, t), lift: 1 - t, carY: 1 - c, carO: c, subO: reduced ? 1 : seg(p, 0.8, 0.94) }
}
// #endregion

export type Work = { id: string; title: string; tags: string[]; href?: string; img?: string }
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
  { id: "work-hire", title: "AUTERA: Heavy Commercial Vehicle ADAS Framework", tags: ["Automotive ADAS", "CARLA Simulation", "Sensor Fusion"], href: "https://github.com/Apurva-0210/Autera" },
  { id: "work-orbit", title: "ISVD-Net: Attention Speed-Sign Detection & Governance", tags: ["Edge AI", "Computer Vision", "CAN Bus"], href: "https://github.com/Apurva-0210/ISDV_NET" },
  { id: "work-pack", title: "AGNIS: Multi-Gas Composite Sensing Instrument", tags: ["Embedded Hardware", "ESP32", "Sensors"], href: "https://github.com/Apurva-0210/AGNIS-gas-sensing-project" },
  { id: "work-editorial", title: "gem5 Memory Hierarchy & NoC Performance Analysis", tags: ["Computer Architecture", "gem5", "SPEC CPU2017"], href: "https://github.com/Apurva-0210/Gem5-Memory-NoC-Analysis" },
  { id: "work-fintech", title: "FleetEase: Fleet Telematics & Booking Platform", tags: ["Systems Software", "PostgreSQL", "REST APIs"], href: "https://github.com/Apurva-0210/FleetEase" },
]

const QUOTES: Quote[] = [
  { id: "client-1", name: "Tata Technologies", role: "Embedded Systems Intern · Automotive ECU Software", quote: "“Contributed to embedded software development and firmware testing for automotive electronic control modules, assisting with hardware-in-the-loop validation.”" },
  { id: "client-2", name: "IIT Guwahati", role: "Research Intern · Computer Architecture & Systems Lab", quote: "“Instrumented cache statistics and evaluated memory hierarchy bottlenecks using gem5 and SPEC CPU2017 benchmarks. Implemented and validated NoC routing algorithms.”" },
  { id: "client-3", name: "MIT World Peace University", role: "B.Tech ECE (AI & ML) · CGPA 8.58", quote: "“Research spanning attention-augmented highway speed governance and noise-conditioned residual learning for robust Massive MIMO channel estimation.”" },
]

const JOURNEY: Journey[] = [
  { tone: "silver", title: "Embedded &\nReal-Time", body: "Bare-metal C, RTOS, and driver development across STM32 and ESP32. Interfacing sensors, actuators, and communication buses close to the hardware." },
  { tone: "red", title: "Computer\nArchitecture", body: "Evaluating memory bottlenecks, cache hierarchy latency, and Network-on-Chip routing topologies using cycle-accurate gem5 simulation." },
  { tone: "dark", title: "Automotive &\nIntelligent ADAS", body: "Perception, multi-modal sensor fusion (LiDAR/Radar/Vision), and time-to-collision safety governance for complex vehicle dynamics in CARLA." },
]

const STATS: Stat[] = [
  { n: 9, label: "8.58 Academic CGPA", body: "Electronics & Communication Engineering (AI & ML Specialization) at MIT World Peace University, Pune." },
  { n: 3, label: "Internships & Research", body: "Industry and academic research at Tata Technologies, IIT Guwahati, and the International Automobile Centre of Excellence (iACE)." },
  { n: 5, label: "Core Systems Projects", body: "Spanning vehicle ADAS simulation, attention edge neural networks, multi-gas composite sensors, and gem5 microarchitecture." },
]

const MANIFESTO =
  "I build at the boundary where low-level software commands real physical dynamics. From instrumenting cycle-accurate cache hierarchies in gem5 to validating automotive ECU firmware on CAN bus, I engineer systems where hardware and algorithms deliver deterministic reliability."

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
    <svg className="cr-laurel" viewBox="0 0 20 44" aria-hidden="true" style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M15 42C6 36 3 24 7 3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      {[8, 15, 22, 29, 36].map((y, k) => (
        <ellipse key={k} cx={y > 30 ? 9 + (y - 30) / 3 : 5.6 + k * 0.2} cy={y} rx="3.2" ry="1.4" fill="currentColor" transform={"rotate(-38 " + (6 + k * 0.4) + " " + y + ")"} />
      ))}
    </svg>
  )
}

function Icon({ kind }: { kind: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  return (
    <svg className="cr-jicon" viewBox="0 0 24 24" aria-hidden="true">
      {kind === "silver" && <path {...p} d="M3 17l6-6 4 4 8-8M15 7h6v6" />}
      {kind === "red" && (
        <g {...p}>
          <circle cx="12" cy="6" r="3" />
          <circle cx="6" cy="17" r="3" />
          <circle cx="18" cy="17" r="3" />
        </g>
      )}
      {kind === "dark" && <path {...p} d="M12 2c.6 5 4 9.4 9 10-5 .6-8.4 5-9 10-.6-5-4-9.4-9-10 5-.6 8.4-5 9-10z" />}
    </svg>
  )
}

function Odometer({ value, digits }: { value: number; digits: number }) {
  const s = String(value).padStart(digits, "0")
  return (
    <span className="cr-odo" aria-label={s}>
      {s.split("").map((d, i) => (
        <span key={i} className="cr-odo-col" aria-hidden="true">
          <span style={{ transform: "translateY(" + -Number(d) * 10 + "%)" }}>
            {"0123456789".split("").map((k) => (
              <span key={k}>{k}</span>
            ))}
          </span>
        </span>
      ))}
    </span>
  )
}

export default function CrimsonReachTemplate({
  height = "100svh",
  email = "apurvak916@gmail.com",
  brand = "Apurva.",
  name = "Apurva Kumar",
  role = "Embedded Systems & Computer Architecture Engineer",
  avatar = "https://github.com/Apurva-0210.png",
  year = "2026",
  location = "Pune · India",
  heroLine1 = "Where silicon",
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
  const img = (id: string) => (id.startsWith("http") || id.startsWith("/") ? id : assetBase + id + ".webp")
  const words = React.useMemo(() => manifesto.split(" "), [manifesto])

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

  // testimonials autoplay
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const t = window.setInterval(() => setQuote((q) => (q + 1) % quotes.length), 6500)
    return () => window.clearInterval(t)
  }, [quotes.length])

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
      ftitle = $(".cr-ftitle"),
      fcar = $(".cr-fcar"),
      fsub = $(".cr-fsub"),
      contact = $(".cr-contact"),
      cta = $(".cr-cta"),
      ctaImg = $(".cr-cta-img"),
      ctaText = $(".cr-cta-text")
    let raf = 0
    let last = ""
    const tick = () => {
      raf = 0
      const vh = window.innerHeight
      const vw = root.clientWidth
      const rootTop = root.getBoundingClientRect().top
      if (nav && hero) {
        const pill = -rootTop > hero.offsetHeight * 0.72
        nav.classList.toggle("cr-pill", pill)
        nav.style.marginTop = pill ? "0px" : Math.min(0, rootTop) + "px"
      }
      if (hero && !reduced) {
        const s = clamp(-rootTop / hero.offsetHeight)
        hands.forEach((h, i) => (h.style.translate = (i ? 1 : -1) * 40 * s + "px " + (i ? 1 : -1) * 60 * s + "px"))
      }
      if (manifestoEl) {
        const r = manifestoEl.getBoundingClientRect()
        const rev = reduced ? 1 : clamp((vh * 0.25 - r.top) / (r.height - vh * 0.6))
        wordEls.forEach((w, i) => (w.style.opacity = String(0.26 + 0.74 * wordLevel(i, wordEls.length, rev))))
      }
      if (journeyEl) {
        const r = journeyEl.getBoundingClientRect()
        const p = -r.top / (r.height - vh)
        const f = journeyFrame(p, vw, vh, reduced)
        if (jtitle) jtitle.style.opacity = String(f.titleO)
        f.panels.forEach((q, i) => {
          const el = panels[i]
          if (!el) return
          el.style.width = q.w + (q.cut < 0.02 ? 1 : 0) + "px"
          el.style.height = q.h + "px"
          el.style.transform = "translate(" + (q.x - q.w / 2) + "px," + (q.y - q.h / 2) + "px) rotate(" + q.rz + "deg)"
          if (flips[i]) flips[i].style.transform = "rotateY(" + q.ry + "deg)"
          if (fronts[i]) {
            fronts[i].style.backgroundSize = f.F + "px " + f.H0 + "px"
            fronts[i].style.backgroundPosition = q.bgX + "px 50%"
            const r = 10 * q.cut + "px"
            fronts[i].style.borderRadius = i === 0 ? "10px " + r + " " + r + " 10px" : i === 2 ? r + " 10px 10px " + r : r
          }
        })
      }
      if (feat && ftitle && fcar) {
        const r = feat.getBoundingClientRect()
        const p = -r.top / (r.height - vh)
        const f = featuredFrame(p, vw < 760 ? 1.7 : 3.3, reduced)
        ftitle.style.transform = "translateY(" + f.lift * (vh * 0.5 - 130) + "px) scale(" + f.scale + ")"
        fcar.style.transform = "translateY(" + f.carY * vh * 0.6 + "px)"
        fcar.style.opacity = String(f.carO)
        if (fsub) fsub.style.opacity = String(f.subO)
      }
      if (contact) {
        const r = contact.getBoundingClientRect()
        const p = reduced ? 1 : clamp((vh - r.top) / (vh * 0.9))
        const next = stats.map((s) => countAt(s.n, p))
        const key = next.join(",") + (p > 0.35 ? "t" : "")
        if (key !== last) {
          last = key
          setCounts(next)
          contact.classList.toggle("cr-in", p > 0.35)
        }
      }
      if (cta && ctaImg && ctaText) {
        const r = cta.getBoundingClientRect()
        const p = reduced ? 1 : easeOut(clamp((vh - r.top) / (vh * 0.85)))
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
  const nW = works.length
  const nQ = quotes.length

  return (
    <div ref={rootRef} className={"cr-root" + (className ? " " + className : "")} style={style}>
      <style>{CSS}</style>

      <div className="cr-navwrap">
        <nav className="cr-nav" aria-label="Main">
          <a className="cr-logo" href="#" onClick={go(".cr-hero")}>
            {brand}
          </a>
          <div className="cr-links">
            <a href="#" onClick={go(".cr-journey")}>
              <Roll>Focus</Roll>
            </a>
            <a href="#" onClick={go(".cr-services")}>
              <Roll>Capabilities</Roll>
            </a>
            <a href="#" onClick={go(".cr-feat")}>
              <Roll>Projects</Roll>
            </a>
            <a href="#" onClick={go(".cr-quotes")}>
              <Roll>Experience</Roll>
            </a>
            <a href="#" onClick={go(".cr-contact")}>
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
            <a className="cr-btn" href={"mailto:" + email}>
              <Roll>Get In Touch</Roll>
            </a>
          </div>
        </nav>
      </div>

      {/* hero */}
      <section className="cr-hero" style={{ height }}>
        <div className="cr-hero-card">
          <div className="cr-hero-art">
            <img className="cr-hero-plate" src={img("hero")} alt="" width={1536} height={1024} />
            <span className="cr-hero-glow" />
            <img className="cr-hand cr-hand-top" src={img("hand-top")} alt="" width={500} height={400} />
            <img className="cr-hand cr-hand-bottom" src={img("hand-bottom")} alt="" width={516} height={444} />
          </div>
          <div className="cr-hero-copy">
            <h1>
              {[heroLine1, heroLine2].map((line, l) => (
                <span key={l} className="cr-line">
                  {line.split(" ").map((w, i) => (
                    <span key={i} className="cr-in-word" style={{ animationDelay: 0.35 + (l * 3 + i) * 0.07 + "s" }}>
                      {w}{" "}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <p className="cr-in-word" style={{ animationDelay: "0.95s" }}>
              {heroSub}
            </p>
          </div>
          <div className="cr-hero-foot">
            <span>{clock || "IST"}</span>
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
          <p className="cr-mtext" aria-label={manifesto}>
            {words.map((w, i) => (
              <span key={i} className="cr-word" aria-hidden="true">
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

      {/* journey */}
      <section className="cr-journey cr-dots">
        <div className="cr-jstage">
          <h2 className="cr-h2 cr-jtitle">
            <em>Three</em> Layers. One Architecture.
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
      <section className="cr-services">
        <header className="cr-head">
          <h2 className="cr-h2 cr-h2-lg">
            <em>Engineering</em> Capabilities
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

      {/* featured work */}
      <section className="cr-feat">
        <div className="cr-fstage">
          <div className="cr-fhead">
            <h2 className="cr-ftitle">
              <em>Featured</em> Work
            </h2>
            <p className="cr-fsub">{worksSub}</p>
          </div>
          <div className="cr-fcar">
            <div className="cr-ftrack">
              {works.map((w, i) => {
                const d = loopOffset(i, work, nW)
                return (
                  <article
                    key={w.id}
                    className="cr-work"
                    data-d={Math.abs(d) > 1 ? "far" : d === 0 ? "c" : "s"}
                    style={{ "--d": d } as React.CSSProperties}
                    onClick={() => d !== 0 && setWork((((work + d) % nW) + nW) % nW)}
                  >
                    <div className="cr-work-img">
                      <img src={w.img || img(w.id)} alt={w.title} loading="lazy" width={762} height={506} />
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
                  </article>
                )
              })}
              <button className="cr-arrow cr-prev" aria-label="Previous project" onClick={() => setWork((work - 1 + nW) % nW)}>
                ←
              </button>
              <button className="cr-arrow cr-next" aria-label="Next project" onClick={() => setWork((work + 1) % nW)}>
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* institutional wall */}
      <section className="cr-wall">
        <p className="cr-wall-head">
          {wallTitle}
          <br />
          <span style={{ fontSize: "14px", opacity: 0.6 }}>Research labs, industry partners &amp; academic programs</span>
        </p>
        <div className="cr-grid">
          {wallLogos.concat(wallLogos).slice(0, 14).map((logo, i) => (
            <span key={i} className={"cr-tile " + LOGO_STYLES[(i * 3) % LOGO_STYLES.length]} style={{ transitionDelay: (i % 7) * 40 + "ms" }}>
              {logo}
            </span>
          ))}
        </div>
      </section>

      {/* testimonials / research reviews */}
      <section className="cr-quotes">
        <header className="cr-head">
          <h2 className="cr-h2 cr-h2-lg">
            <em>Research</em> &amp; Field Experience
          </h2>
          <p>{quotesSub}</p>
        </header>
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
                  <span className="cr-qmark">{q.name.toUpperCase()}</span>
                </div>
              </figure>
            )
          })}
          <button className="cr-arrow cr-qprev" aria-label="Previous review" onClick={() => setQuote((quote - 1 + nQ) % nQ)}>
            ←
          </button>
          <button className="cr-arrow cr-qnext" aria-label="Next review" onClick={() => setQuote((quote + 1) % nQ)}>
            →
          </button>
        </div>
        <div className="cr-dotsbar" role="tablist" aria-label="Reviews">
          {quotes.map((q, i) => (
            <button key={q.id} role="tab" aria-selected={i === quote} aria-label={"Review " + (i + 1)} onClick={() => setQuote(i)} />
          ))}
        </div>
      </section>

      {/* contact */}
      <section className="cr-contact">
        <header className="cr-head">
          <h2 className="cr-h2 cr-h2-lg">
            <em>Get</em> In Touch
          </h2>
          <p>Open for embedded systems, computer architecture, and ADAS engineering opportunities</p>
        </header>
        <div className="cr-cgrid">
          <div className="cr-people">
            <div className="cr-person">
              <span className="cr-avatar">
                <img src={avatar || img("kedhar")} alt={name} loading="lazy" width={623} height={623} />
              </span>
              <h3>
                Apurva
                <br />
                Kumar
              </h3>
              <p>{role}</p>
              <div className="cr-plinks">
                <a href={"mailto:" + email}>✉ Email</a>
                <button onClick={copy}>{copied ? "✓ Copied" : "⧉ Copy"}</button>
                {resumeUrl && (
                  <a href={resumeUrl} download="Apurva_Kumar_Resume.pdf">
                    ⬇ Resume
                  </a>
                )}
              </div>
            </div>
            <div className="cr-person">
              <span className="cr-avatar cr-avatar-k">AK</span>
              <h3>
                Engineering
                <br />
                Connect
              </h3>
              <p>Projects, research &amp; talks</p>
              <div className="cr-plinks">
                <a href={linkedinUrl} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
                <a href={githubUrl} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>
          <div className="cr-stats">
            {stats.map((s, i) => (
              <div key={s.label} className="cr-stat">
                <span className="cr-num">
                  <Odometer value={counts[i]} digits={2} />
                </span>
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
              Let&rsquo;s <em>engineer</em> something reliable
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
            <span className="cr-flinks">
              <a href="#" onClick={go(".cr-services")}>
                Capabilities
              </a>
              <a href="#" onClick={go(".cr-feat")}>
                Featured Work
              </a>
              <a href="#" onClick={go(".cr-contact")}>
                Contact
              </a>
            </span>
          </footer>
        </div>
      </section>
    </div>
  )
}

const SERIF = "CrSerif,'Times New Roman',serif"
const SANS = "CrSans,ui-sans-serif,system-ui,sans-serif"
const EASE = "cubic-bezier(.22,1,.36,1)"

const FONTS =
  "@font-face{font-family:CrSerif;font-style:normal;font-weight:400;font-display:swap;src:url(data:font/woff2;base64,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) format('woff2')}" +
  "@font-face{font-family:CrSerif;font-style:italic;font-weight:400;font-display:swap;src:url(data:font/woff2;base64,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) format('woff2')}" +
  "@font-face{font-family:CrSans;font-style:normal;font-weight:400 500;font-display:swap;src:url(data:font/woff2;base64,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) format('woff2')}" +
  "@font-face{font-family:CrSans;font-style:normal;font-weight:400 500;font-display:swap;src:url(data:font/woff2;base64,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) format('woff2')}"

const CSS =
  FONTS +
  ".cr-root{--bg:#070708;--ink:#f0ece1;--mute:rgba(240,236,225,.65);--line:rgba(255,255,255,.09);--card:#121214;--red:#c82b20;--glow:0 0 14px rgba(255,210,210,.7);position:relative;width:100%;background:var(--bg);color:var(--ink);font-family:" + SANS + ";overflow-x:clip;-webkit-font-smoothing:antialiased;animation:cr-fade .9s ease-out both}" +
  ".cr-root *{box-sizing:border-box}" +
  ".cr-root img{max-width:none;display:block}" +
  ".cr-root :where(a,button){color:inherit;font:inherit;text-decoration:none;background:none;border:0;padding:0;cursor:pointer}" +
  ".cr-root :where(h1,h2,h3,p,ul,figure,blockquote){margin:0;padding:0}" +
  ".cr-root em{font-style:italic}" +
  ".cr-dots{background-image:radial-gradient(rgba(255,255,255,.07) 1px,transparent 1.2px);background-size:22px 22px}" +
  ".cr-roll{display:inline-grid;overflow:hidden;line-height:1.2;vertical-align:top}" +
  ".cr-roll>span{grid-area:1/1;transition:transform .5s " + EASE + "}" +
  ".cr-roll>span+span{transform:translateY(105%)}" +
  ".cr-navwrap{position:sticky;top:0;height:0;z-index:40}" +
  ".cr-nav{position:absolute;left:50%;top:32px;transform:translateX(-50%);width:calc(100% - 64px);height:70px;display:flex;align-items:center;justify-content:space-between;padding:0 28px 0 36px;border-radius:16px 16px 0 0;background:linear-gradient(rgba(60,4,4,.35),rgba(60,4,4,0));border:1px solid transparent;transition:width .7s " + EASE + ",height .7s " + EASE + ",top .7s " + EASE + ",background .5s,border-color .5s,border-radius .7s,box-shadow .5s,padding .7s " + EASE + "}" +
  ".cr-nav.cr-pill{top:16px;width:min(880px,calc(100% - 32px));height:52px;padding:0 12px 0 24px;border-radius:12px;background:rgba(20,20,22,.88);border-color:rgba(255,255,255,.12);box-shadow:0 10px 30px rgba(0,0,0,.55);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}" +
  ".cr-logo{font-family:" + SERIF + ";font-style:italic;font-size:26px;letter-spacing:-.03em;color:var(--ink)}" +
  ".cr-nav.cr-pill .cr-logo{font-size:20px}" +
  ".cr-links{position:absolute;left:50%;transform:translateX(-50%);display:flex;gap:26px;font-size:13.5px}" +
  ".cr-links a{opacity:.82;transition:opacity .3s}" +
  ".cr-links a:hover{opacity:1}" +
  ".cr-btn{display:inline-flex;align-items:center;height:34px;padding:0 14px;border-radius:8px;background:var(--ink);color:#0a0a0c;font-size:12.5px;font-weight:500;box-shadow:inset 0 -2px 0 rgba(0,0,0,.12),0 2px 8px rgba(0,0,0,.25);transition:transform .3s " + EASE + ",background .3s}" +
  ".cr-btn:hover{transform:translateY(-1px);background:#fff}" +
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
  // journey
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
  ".cr-tone-dark .cr-jicon{color:var(--crimson)}" +
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
  ".cr-fhead{text-align:center;position:absolute;top:clamp(70px,10vh,100px);transform-origin:50% 0}" +
  ".cr-ftitle{font-family:" + SERIF + ";font-weight:400;font-size:clamp(32px,3.8vw,56px);letter-spacing:-.03em;color:var(--ink);transition:none}" +
  ".cr-fsub{margin-top:8px;font-size:15px;color:var(--mute)}" +
  ".cr-fcar{width:100%;max-width:1200px;margin-top:auto;margin-bottom:clamp(40px,7vh,80px)}" +
  ".cr-ftrack{position:relative;height:clamp(400px,50vh,520px);display:grid;place-items:center}" +
  ".cr-work{position:absolute;width:min(540px,86vw);border-radius:14px;overflow:hidden;background:#141418;border:1px solid var(--line);padding:16px;cursor:pointer;transition:transform .7s " + EASE + ",opacity .6s,filter .6s;transform:translateX(calc(var(--d) * 62%)) scale(calc(1 - abs(var(--d)) * 0.16));z-index:calc(10 - abs(var(--d)))}" +
  ".cr-work[data-d='far']{opacity:0;pointer-events:none}" +
  ".cr-work[data-d='s']{opacity:.45;filter:blur(2px)}" +
  ".cr-work-img{border-radius:10px;overflow:hidden;aspect-ratio:16/11;background:#05070a;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.06)}" +
  ".cr-work-img img{width:100%;height:100%;object-fit:contain}" +
  ".cr-work h3{font-family:" + SERIF + ";font-size:20px;margin:14px 0 8px;color:var(--ink)}" +
  ".cr-tags{display:flex;gap:8px;flex-wrap:wrap}" +
  ".cr-tags span{font-size:12px;padding:3px 9px;border-radius:6px;background:rgba(255,255,255,.07);color:var(--mute)}" +
  ".cr-arrow{position:absolute;top:50%;transform:translateY(-50%);width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:var(--ink);display:grid;place-items:center;font-size:18px;z-index:25;transition:background .3s,transform .3s}" +
  ".cr-arrow:hover{background:rgba(255,255,255,.2);transform:translateY(-50%) scale(1.08)}" +
  ".cr-prev{left:20px}" +
  ".cr-next{right:20px}" +
  ".cr-wall{padding:clamp(60px,8vh,100px) 24px;text-align:center;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}" +
  ".cr-wall-head{font-family:" + SERIF + ";font-size:clamp(22px,2.4vw,32px);line-height:1.3;color:var(--ink);margin-bottom:36px}" +
  ".cr-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:16px;max-width:1100px;margin:0 auto}" +
  ".cr-tile{display:grid;place-items:center;height:64px;border-radius:10px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);font-size:14px;color:var(--mute);transition:background .3s,color .3s,transform .3s}" +
  ".cr-tile:hover{background:rgba(255,255,255,.07);color:var(--ink);transform:translateY(-2px)}" +
  ".cr-quotes{padding:clamp(80px,10vh,130px) clamp(24px,5vw,72px)}" +
  ".cr-qstage{position:relative;max-width:880px;height:340px;margin:0 auto;display:grid;place-items:center}" +
  ".cr-quote{position:absolute;inset:0;display:grid;grid-template-columns:220px 1fr;gap:36px;align-items:center;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:32px;transition:opacity .6s,transform .6s " + EASE + ";opacity:0;transform:scale(.95);pointer-events:none}" +
  ".cr-quote[data-c]{opacity:1;transform:scale(1);pointer-events:auto}" +
  ".cr-quote img{width:100%;aspect-ratio:1;border-radius:12px;object-fit:cover}" +
  ".cr-qbody blockquote{font-family:" + SERIF + ";font-size:clamp(16px,1.6vw,22px);line-height:1.45;color:var(--ink);margin-bottom:20px}" +
  ".cr-qbody figcaption strong{display:block;font-size:16px;color:var(--ink)}" +
  ".cr-qbody figcaption span{font-size:13px;color:var(--mute)}" +
  ".cr-qmark{display:none}" +
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
  ".cr-foot{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;font-size:12.8px;color:rgba(255,210,210,.7);border-top:1px solid rgba(255,255,255,.1);padding-top:24px;margin-top:40px}" +
  ".cr-mail{opacity:.85;transition:opacity .3s}" +
  ".cr-mail:hover{opacity:1}" +
  ".cr-flinks{display:flex;gap:20px}" +
  ".cr-flinks a{transition:color .3s}" +
  ".cr-flinks a:hover{color:#fff}" +
  "@media(max-width:860px){" +
  ".cr-links{display:none}" +
  ".cr-row{grid-template-columns:1fr;gap:16px;padding:20px}" +
  ".cr-row-img{max-height:220px}" +
  ".cr-grid{grid-template-columns:repeat(3,1fr)}" +
  ".cr-qstage{height:auto}" +
  ".cr-quote{position:relative;inset:auto;grid-template-columns:1fr;gap:20px;padding:24px}" +
  ".cr-quote img{width:80px}" +
  ".cr-cgrid{grid-template-columns:1fr}" +
  ".cr-people{grid-template-columns:1fr}" +
  ".cr-foot{flex-direction:column;gap:14px;text-align:center}" +
  "}" +
  "@keyframes cr-fade{from{opacity:0}to{opacity:1}}" +
  "@keyframes cr-breathe{from{opacity:.4;transform:scale(.95)}to{opacity:.8;transform:scale(1.1)}}" +
  "@keyframes cr-drift-a{from{transform:translate(0,0)}to{transform:translate(12px,18px)}}" +
  "@keyframes cr-drift-b{from{transform:translate(0,0)}to{transform:translate(-12px,-18px)}}" +
  "@keyframes cr-word{from{opacity:0;filter:blur(8px);transform:translateY(16px)}to{opacity:1;filter:blur(0);transform:translateY(0)}}" +
  "@keyframes cr-explore{0%,100%{transform:translateY(0)}50%{transform:translateY(-105%)}}" +
  "@keyframes cr-explore2{0%,100%{transform:translateY(105%)}50%{transform:translateY(0)}}" +
  "@keyframes cr-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}"

