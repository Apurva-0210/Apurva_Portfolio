import CrimsonReachTemplate, {
  type Work,
  type Quote,
  type Service,
  type Journey,
  type Stat,
} from "@/components/ui/crimson-reach-template";
import { profile, withBase } from "@/data/profile";

const works: Work[] = [
  {
    id: "work-autera",
    title: "AUTERA: India-Calibrated ADAS Framework for Heavy Commercial Vehicles",
    tags: ["Automotive ADAS", "CARLA · RoadRunner", "Multi-Modal Sensor Fusion"],
    href: "https://github.com/Apurva-0210/Autera",
    img: withBase("assets/projects/autera_architecture.svg"),
  },
  {
    id: "work-ncrt",
    title: "NCRT: Noise-Conditioned Residual Transformer for High-Mobility Massive MIMO",
    tags: ["Deep Learning", "High-Mobility Channels", "Wireless Communications"],
    href: "https://github.com/Apurva-0210/Noise_Conditioned_Residual_Transformer",
    img: withBase("assets/projects/ncrt_arch.png"),
  },
  {
    id: "work-agnis",
    title: "AGNIS: Multi-Gas Nanocomposite Sensing Instrument & Research",
    tags: ["Embedded Hardware", "ESP32", "PANI Nanocomposite Sensors"],
    href: "https://github.com/Apurva-0210/AGNIS-gas-sensing-project",
    img: withBase("assets/projects/agnis_fesem.png"),
  },
  {
    id: "work-gem5",
    title: "gem5 Memory Hierarchy & Network-on-Chip (NoC) Performance Analysis",
    tags: ["Computer Architecture", "gem5 Simulator", "SPEC CPU2017"],
    href: "https://github.com/Apurva-0210/Gem5-Memory-NoC-Analysis",
    img: withBase("assets/projects/gem5_architecture.svg"),
  },
  {
    id: "work-isvd",
    title: "ISVD-Net: Attention Speed-Sign Detection & Closed-Loop Speed Governance",
    tags: ["Edge AI", "Hailo-8L · YOLOv8-CBAM", "CAN Bus / OBD-II"],
    href: "https://github.com/Apurva-0210/ISDV_NET",
    img: withBase("assets/projects/isvd_net_architecture.svg"),
  },
  {
    id: "work-carla-rr",
    title: "CARLA–RoadRunner Simulation Pipeline for Indian Road Conditions",
    tags: ["Automotive Simulation", "Digital Twin", "OpenDRIVE (.xodr)"],
    href: "https://github.com/Apurva-0210/Autera",
    img: withBase("assets/projects/carla_ue5.png"),
  },
];

const quotes: Quote[] = [
  {
    id: "client-1",
    name: "Tata Technologies",
    role: "Embedded Systems Intern · InnoVent Hybrid Program",
    quote:
      "“Contributed to embedded software development, automotive electronic control module validation, and firmware testing under hardware-in-the-loop verification environments.”",
    img: withBase("assets/projects/autera_architecture.svg"),
  },
  {
    id: "client-2",
    name: "Indian Institute of Technology Guwahati",
    role: "Research Intern · Computer Architecture & Systems Lab",
    quote:
      "“Characterized cache memory hierarchy bottlenecks and Network-on-Chip (NoC) flit latency using gem5 v25.1.0.1 and SPEC CPU2017 benchmarks with source-level C++ instrumentation.”",
    img: withBase("assets/projects/gem5_architecture.svg"),
  },
  {
    id: "client-3",
    name: "MIT World Peace University (MIT-WPU)",
    role: "B.Tech ECE (AI & ML Specialization) · CGPA 8.62 (Expected June 2027)",
    quote:
      "“Academic research spanning Noise-Conditioned Residual Transformers (NCRT) for Massive MIMO, attention-augmented highway speed governance (ISVD-Net), and nanocomposite sensing.”",
    img: withBase("assets/projects/ncrt_arch.png"),
  },
  {
    id: "client-4",
    name: "International Automobile Centre of Excellence (iACE)",
    role: "Automotive Systems Trainee · Vehicle Electronics & Diagnostics",
    quote:
      "“Hands-on training in automotive embedded systems, ECU architecture, CAN bus diagnostics, sensor interfacing, and electric vehicle powertrain integration.”",
    img: withBase("assets/projects/carla_ue5.png"),
  },
];

const journey: Journey[] = [
  {
    tone: "silver",
    title: "Embedded &\nReal-Time",
    body: "Bare-metal C & C++, FreeRTOS, and driver development across STM32 and ESP32. Interfacing sensors, actuators, and serial communication buses (UART, SPI, I2C, CAN) close to the hardware.",
  },
  {
    tone: "red",
    title: "Computer\nArchitecture",
    body: "Evaluating memory bottlenecks, cache hierarchy latency (Ruby MESI_Two_Level), and Network-on-Chip routing topologies (Garnet 4x4 mesh) using cycle-accurate gem5 simulation.",
  },
  {
    tone: "dark",
    title: "Automotive &\nIntelligent ADAS",
    body: "Perception, multi-modal sensor fusion (LiDAR/Radar/Ultrasonic), and time-to-collision safety governance for complex vehicle dynamics in CARLA and RoadRunner digital twins.",
  },
];

const services: Service[] = [
  {
    id: "svc-brand",
    title: "Embedded Systems\n& Firmware",
    items: [
      "Bare-metal C & C++ development",
      "STM32 & ESP32 Microcontrollers",
      "UART, SPI, I2C & CAN communication",
      "FreeRTOS task scheduling & drivers",
      "Hardware-in-the-loop (HIL) verification",
    ],
    img: withBase("assets/projects/agnis_mechanism.png"),
  },
  {
    id: "svc-web",
    title: "Computer Architecture\n& Simulation",
    items: [
      "gem5 v25.1.0.1 cycle-accurate simulation",
      "Ruby MESI_Two_Level cache coherence",
      "Garnet 4x4 2D Mesh NoC interconnect routing",
      "SPEC CPU2017 & AMAT memory profiling",
      "Source-level C++ instrumentation & Docker",
    ],
    img: withBase("assets/projects/gem5_architecture.svg"),
  },
  {
    id: "svc-product",
    title: "Automotive Systems\n& ADAS",
    items: [
      "CARLA UE5 & RoadRunner simulation workflow",
      "Multi-modal sensor fusion (LiDAR/Radar/Ultrasonic)",
      "Time-to-collision (TTC) adaptive safety logic",
      "Heavy commercial vehicle dynamics compensation",
      "CAN bus protocol (ISO 15765-4) & ECU diagnostics",
    ],
    img: withBase("assets/projects/autera_architecture.svg"),
  },
  {
    id: "svc-ai",
    title: "Edge AI &\nApplied Deep Learning",
    items: [
      "Noise-conditioned residual learning (NCRT)",
      "YOLOv8-CBAM spatial & channel attention",
      "Dual-stream attention-LSTM temporal models",
      "INT8 quantization & Hailo-8L edge inference",
      "PyTorch deep learning pipelines & OpenCV",
    ],
    img: withBase("assets/projects/ncrt_pipeline.png"),
  },
  {
    id: "svc-motion",
    title: "Hardware Prototyping\n& Nanocomposite Sensors",
    items: [
      "PANI–β-AgVO3/chitosan ternary nanocomposites",
      "MiCS-4514 composite gas sensing integration",
      "12-bit ADC data acquisition & ESP32 firmware",
      "Analog signal conditioning & drift compensation",
      "Logic analyzers & oscilloscope bench debugging",
    ],
    img: withBase("assets/projects/agnis_fesem.png"),
  },
  {
    id: "svc-marketing",
    title: "Systems Software\n& Technical Infrastructure",
    items: [
      "Docker containerized reproducible testbeds",
      "PostgreSQL relational database modeling",
      "Linux systems programming & bash tooling",
      "RESTful system APIs & backend services",
      "Rigorous documentation & version control",
    ],
    img: withBase("assets/projects/banner.png"),
  },
];

const stats: Stat[] = [
  {
    n: 9,
    label: "8.62 Academic CGPA",
    body: "Electronics & Communication Engineering (AI & ML Specialization) at MIT World Peace University, Pune.",
  },
  {
    n: 3,
    label: "Industry & Research Labs",
    body: "Practical engineering at Tata Technologies (InnoVent), IIT Guwahati Computer Systems Lab, and iACE Gujarat.",
  },
  {
    n: 6,
    label: "Core Systems Projects",
    body: "Spanning heavy vehicle ADAS, cycle-accurate gem5 simulation, Massive MIMO transformers, and nanocomposite gas sensing.",
  },
];

export default function Home() {
  const resumeUrl = withBase("assets/Apurva_Kumar_Resume.pdf");

  return (
    <CrimsonReachTemplate
      brand="Apurva."
      name="Apurva Kumar"
      role="Embedded Systems · Automotive Electronics · Simulation · AI/ML"
      avatar={withBase("assets/projects/avatar.png")}
      year="2026"
      location="Pune · India"
      email="apurvak916@gmail.com"
      resumeUrl={resumeUrl}
      linkedinUrl="https://www.linkedin.com/in/apurvakumar55"
      githubUrl="https://github.com/Apurva-0210"
      heroLine1="Building Intelligent"
      heroLine2="Systems at the Edge"
      heroSub="Embedded Systems · Automotive Electronics · Simulation · Applied AI/ML"
      manifesto="I build at the boundary where low-level software commands real physical dynamics. From instrumenting cycle-accurate cache hierarchies in gem5 to validating automotive ADAS sensor fusion in CARLA, I engineer systems where hardware and algorithms deliver deterministic reliability."
      trustBadgeText="Tata Technologies · IIT Guwahati · MIT-WPU"
      marqueeList={[
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
      ]}
      journeyTitle="Three Layers. One Architecture."
      journey={journey}
      servicesTitle="Engineering Capabilities"
      servicesSub="Deep technical execution across register-level hardware, cycle-accurate simulators, and neural perception"
      services={services}
      worksTitle="Featured Engineering Work"
      worksSub="Systems, architecture, and research projects with public repositories and technical documentation"
      works={works}
      wallTitle="Academic & Industry Affiliations"
      wallLogos={[
        "Tata Technologies",
        "IIT Guwahati",
        "MIT World Peace University",
        "iACE Gujarat",
        "CARLA Simulator",
        "gem5 Research",
        "IEEE Student Member",
        "VLSID 2026",
      ]}
      quotesTitle="Research & Field Notes"
      quotesSub="Outcomes from industry internships, automotive training, and computer systems labs"
      quotes={quotes}
      stats={stats}
      ctaHead="Building intelligent systems at the edge"
      ctaTitle="Let’s engineer something reliable"
    />
  );
}
