import CrimsonReachTemplate, {
  type Work,
  type Quote,
  type Service,
  type Journey,
  type Stat,
} from "@/components/ui/crimson-reach-template";
import { withBase } from "@/data/profile";

const works: Work[] = [
  {
    id: "work-autera",
    title: "AUTERA: India-Calibrated ADAS Framework for Heavy Commercial Vehicles",
    category: "Automotive & ADAS",
    tags: ["Automotive ADAS", "TTC Decision Engine", "CARLA · RoadRunner"],
    href: "https://github.com/Apurva-0210/Autera",
    img: withBase("assets/projects/cards/card_autera.png"),
    summary:
      "A safety-critical Advanced Driver Assistance System calibrated specifically for chaotic, high-density Indian highway traffic. Integrates time-to-collision (TTC) predictive braking, multi-modal perception fusion, and vehicle dynamic compensation for multi-axle freight trucks.",
    specs: [
      "CARLA UE5 & RoadRunner Digital Twin Simulation",
      "Dynamic TTC Braking Threshold < 150ms Response",
      "Heterogeneous Traffic (Auto-rickshaws, 2-Wheelers, HCVs)",
      "CAN Bus Protocol (ISO 15765-4) & J1939 Telematics",
    ],
  },
  {
    id: "work-ncrt",
    title: "NCRT: Noise-Conditioned Residual Transformer for Massive MIMO",
    category: "Wireless & Deep Learning",
    tags: ["Doppler Modeling", "Residual Learning", "Robust at Low SNR"],
    href: "https://github.com/Apurva-0210/Noise_Conditioned_Residual_Transformer",
    img: withBase("assets/projects/cards/card_ncrt.png"),
    summary:
      "A deep learning architecture designed for high-mobility 5G/6G Massive MIMO channel estimation. Employs noise-conditioned residual attention blocks to preserve temporal channel state information (CSI) under extreme Doppler spread and severe low-SNR conditions.",
    specs: [
      "Noise-Conditioned Residual Attention Blocks",
      "Doppler-Aware Temporal Channel Tracking",
      "Significant NMSE Gain Over Classical MMSE at Low SNR",
      "PyTorch Deep Learning Pipeline with Quantized Edge Export",
    ],
  },
  {
    id: "work-daugt",
    title: "DAUGT: Doppler-Aware Uncertainty-Guided Transformer for Channel Estimation",
    category: "Wireless & Deep Learning",
    tags: ["Doppler-Phase Encoder", "Evidential Head", "Uncertainty Fusion"],
    href: "https://github.com/Apurva-0210/Noise_Conditioned_Residual_Transformer",
    img: withBase("assets/projects/cards/card_daugt.png"),
    summary:
      "Next-generation transformer framework featuring a Doppler-Phase Temporal Encoder (DPTE), Pilot-Conditioned CSI Transformer (PCST), and Evidential Heteroscedastic Head (DER-H) for uncertainty-guided channel state reconstruction.",
    specs: [
      "DPTE: Doppler-Phase Temporal Feature Encoding",
      "U-BMMSE: Uncertainty-Aware Channel Fusion Engine",
      "UGAPA: Dynamic Adaptive Pilot Allocation Mechanism",
      "Closed-Loop Real-Time Channel Tracking Simulation",
    ],
  },
  {
    id: "work-isvd",
    title: "ISDV-Net: Intelligent Scene Understanding for Indian Driving Videos",
    category: "Platforms & Systems",
    tags: ["Video Perception", "Multi-Class Detection", "Indian Road Scenarios"],
    href: "https://github.com/Apurva-0210/ISDV_NET",
    img: withBase("assets/projects/cards/card_isvd_net.png"),
    summary:
      "End-to-end computer vision and spatial attention framework for unstructured Indian highway videos. Combines YOLOv8 with Convolutional Block Attention Modules (CBAM) and temporal sequence modeling for robust object detection and speed-governance sign tracking.",
    specs: [
      "YOLOv8-CBAM Spatial & Channel Attention Backbone",
      "Multi-Class Edge Detection (Pedestrians, 2-Wheelers, Heavy Trucks)",
      "Embedded INT8 Acceleration on Hailo-8L Edge AI Processor",
      "Closed-Loop OBD-II Speed Governance Telemetry",
    ],
  },
  {
    id: "work-agnis",
    title: "AGNIS: PANI-AgVO3/Chitosan Nanocomposite Gas Sensing Platform",
    category: "Hardware & Architecture",
    tags: ["In-situ Polymerisation", "High Sensitivity", "Ternary Nanocomposite"],
    href: "https://github.com/Apurva-0210/AGNIS-gas-sensing-project",
    img: withBase("assets/projects/cards/card_agnis.png"),
    summary:
      "Ternary nanocomposite chemical sensing platform functionalized with Polyaniline (PANI), beta-silver vanadate (β-AgVO3), and chitosan. Interfaced with an ESP32 and high-precision 12-bit ADC for real-time hazardous gas detection (NO2, NH3, CO2, VOCs).",
    specs: [
      "In-situ Polymerisation Synthesis of Nanocomposites",
      "FESEM Microstructural Verification & MiCS-4514 Benchmarking",
      "ESP32 Bare-Metal Firmware with Baseline Drift Compensation",
      "High Sensitivity & Fast Recovery Under Ambient Conditions",
    ],
  },
  {
    id: "work-carla-rr",
    title: "CARLA–RoadRunner Simulation Pipeline for Indian Traffic Environments",
    category: "Automotive & ADAS",
    tags: ["XODR Map Generation", "India-Specific Traffic", "ADAS Scenario Testing"],
    href: "https://github.com/Apurva-0210/Autera",
    img: withBase("assets/projects/cards/card_carla_roadrunner.png"),
    summary:
      "High-fidelity digital twin pipeline recreating complex Indian road layouts in MathWorks RoadRunner, exporting OpenDRIVE (.xodr) networks, and executing closed-loop autonomous driving simulations within CARLA Unreal Engine 5.",
    specs: [
      "MathWorks RoadRunner Procedural Road Modeling",
      "OpenDRIVE (.xodr) & OpenSCENARIO (.xosc) Validated Workflows",
      "Unreal Engine 5 Photorealistic Weather & Lighting Simulation",
      "Automated Edge Case Scenario Generation for Heavy Commercial Fleets",
    ],
  },
  {
    id: "work-multi-sensor",
    title: "Multi-Sensor Prioritisation: Adaptive Sensor Fusion for Robust ADAS",
    category: "Automotive & ADAS",
    tags: ["LiDAR · Radar · Camera", "Ultrasonic & IR", "Sensor Fusion"],
    href: "https://github.com/Apurva-0210/Autera",
    img: withBase("assets/projects/cards/card_multi_sensor.png"),
    summary:
      "Adaptive Kalman-filtering and Bayesian weighting sensor fusion architecture combining 3D LiDAR point clouds, 77GHz millimeter-wave radar, monocular camera feeds, and ultrasonic proximity arrays for fault-tolerant vehicle localization.",
    specs: [
      "Asynchronous Multi-Rate Sensor Synchronization",
      "Environmental Degradation Compensation (Dust, Monsoons, Glare)",
      "Sensor Health Monitoring & Fail-Operational Degradation Modes",
      "ISO 26262 ASIL-D Functional Safety Principles",
    ],
  },
  {
    id: "work-rr-workflow",
    title: "Automated RoadRunner–CARLA System Engineering & Validation",
    category: "Automotive & ADAS",
    tags: ["Map Authoring", "XODR Export", "Scenario Automation"],
    href: "https://github.com/Apurva-0210/Autera",
    img: withBase("assets/projects/cards/card_rr_carla_workflow.png"),
    summary:
      "Automated CI/CD simulation pipeline converting CAD route data into OpenDRIVE geometric networks, compiling custom asset packages, and running headless batch scenario verification for ADAS regression suites.",
    specs: [
      "Headless Automated Batch Simulation Execution",
      "Automated Collision, Lane Departure, and TTC Telemetry Logging",
      "Python CARLA Client Automation API & Scenario Runner",
      "Dockerized Simulation Environment for Continuous Integration",
    ],
  },
  {
    id: "work-gem5",
    title: "gem5 Performance Analysis: System Simulation & Hardware Evaluation",
    category: "Hardware & Architecture",
    tags: ["Architecture Modelling", "Performance Evaluation", "Workload Analysis"],
    href: "https://github.com/Apurva-0210/Gem5-Memory-NoC-Analysis",
    img: withBase("assets/projects/cards/card_gem5.png"),
    summary:
      "Cycle-accurate hardware modeling investigating cache coherence bottlenecks (Ruby MESI_Two_Level) and flit latency in Garnet 4x4 2D Mesh Network-on-Chip (NoC) interconnects under SPEC CPU2017 benchmark workloads using gem5 v25.1.0.1.",
    specs: [
      "gem5 v25.1.0.1 Cycle-Accurate Microarchitecture Simulation",
      "Ruby MESI_Two_Level Cache Coherence Modeling",
      "Garnet 4x4 2D Mesh Interconnect Flit & Queue Latency Profiling",
      "Average Memory Access Time (AMAT) Analysis Across SPEC CPU2017",
    ],
  },
  {
    id: "work-fleetease",
    title: "FleetEase (Legacy): Fleet Management & Telemetry Platform",
    category: "Platforms & Systems",
    tags: ["Fleet Booking", "GPS Tracking", "Telemetry & Analytics"],
    href: "https://github.com/Apurva-0210",
    img: withBase("assets/projects/cards/card_fleetease.png"),
    summary:
      "Cloud-native logistics telematics and vehicle dispatch platform. Features real-time GPS tracking, automated driver allocation, fuel consumption analytics, OBD-II diagnostic fault code ingestion, and enterprise booking management.",
    specs: [
      "Real-Time WebSocket & GPS Fleet Telemetry Stream",
      "PostgreSQL Relational Schema with PostGIS Geospatial Queries",
      "Vehicle Health Diagnostics (OBD-II DTC Code Ingestion)",
      "High-Concurrency Dispatch Engine with Automated Route Allocation",
    ],
  },
  {
    id: "work-veyrion",
    title: "Veyrion Product Ecosystem: Autera, Moventra & Drivio",
    category: "Platforms & Systems",
    tags: ["ADAS & Intelligence", "Operations Platform", "Driver Suite"],
    href: "https://github.com/Apurva-0210",
    img: withBase("assets/projects/cards/card_veyrion_ecosystem.png"),
    summary:
      "Enterprise multi-product mobility ecosystem uniting Autera (HCV ADAS & vehicle intelligence), Moventra (fleet operations and dispatch platform), and Drivio (driver enablement and safety scoring suite) into a unified architecture.",
    specs: [
      "Modular Microservices Architecture & Shared Event Bus",
      "Unified Vehicle Telemetry & Edge ADAS Ingestion Pipeline",
      "Driver Safety Scoring & Dynamic Risk Profiling Algorithms",
      "Commercial SaaS Web and Mobile Dashboards",
    ],
  },
  {
    id: "work-other",
    title: "Other Notable Work: ML-KEM, SHRIMP Agri, AEGIS & Embedded 8051",
    category: "Hardware & Architecture",
    tags: ["ML-KEM (FPGA)", "SHRIMP Agri IoT", "8051 Real-Time"],
    href: "https://github.com/Apurva-0210",
    img: withBase("assets/projects/cards/card_other_work.png"),
    summary:
      "Collection of specialized hardware and IoT systems: FPGA implementation of NIST Post-Quantum Cryptography (ML-KEM), AI-driven smart aquaculture monitoring (SHRIMP Agri), local desktop AI ecosystem (AEGIS), and assembly-level 8051 microcontrollers.",
    specs: [
      "Hardware Acceleration & Verification of ML-KEM (PQC)",
      "IoT Multiparameter Water Quality Sensor Arrays for Aquaculture",
      "Bare-Metal Assembly & C Interfacing on 8051 Microcontrollers",
      "Fuzzy Logic Intelligent Traffic Signal Timing Engine",
    ],
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
