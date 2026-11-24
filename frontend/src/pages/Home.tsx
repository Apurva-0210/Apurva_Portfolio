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
    tags: ["CARLA", "RoadRunner", "Python", "Sensor Fusion", "TTC Reasoning"],
    href: "https://github.com/Apurva-0210/Autera",
    img: withBase("assets/projects/cards/card_autera_new.png"),
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
    id: "work-ncrn",
    title: "NCRN: Noise-Conditioned Residual Learning for Massive MIMO",
    category: "Wireless & Deep Learning",
    tags: ["Python", "PyTorch", "ConvLSTM", "3GPP TDL", "NMSE"],
    href: "https://github.com/Apurva-0210/Noise_Conditioned_Residual_Transformer",
    img: withBase("assets/projects/cards/card_ncrn_new.png"),
    summary:
      "Deep learning architecture for high-mobility 5G/6G Massive MIMO channel estimation. Employs noise-conditioned residual learning and ConvLSTM temporal blocks to preserve channel state information (CSI) under Doppler spread and low-SNR channels.",
    specs: [
      "Noise-Conditioned Residual Learning & ConvLSTM Temporal Attention",
      "Robust Channel State Information (CSI) Tracking Under Doppler Shift",
      "Evaluated on 3GPP TDL-A/TDL-B Multipath Propagation Models",
      "Significant Normalized Mean Square Error (NMSE) Gain at Low SNR",
    ],
  },
  {
    id: "work-yolov8",
    title: "YOLOv8: Indian Traffic Sign Detection using Deep Learning",
    category: "Automotive & ADAS",
    tags: ["Python", "YOLOv8", "OpenCV", "~13,971 Images", "Object Detection"],
    href: "https://github.com/Apurva-0210/ISDV_NET",
    img: withBase("assets/projects/cards/card_yolov8_new.png"),
    summary:
      "Real-time perception pipeline trained on 13,971 annotated Indian highway driving frames. Detects and classifies mandatory, cautionary, and informatory road signs, as well as pedestrians and obstacles under varying daylight and weather conditions.",
    specs: [
      "Trained on 13,971 Annotations of Unstructured Indian Traffic",
      "Multi-Class Edge Detection (Speed Limits, Pedestrians, Caution Signs)",
      "High Confidence Precision: Speed Limit 0.98, Pedestrian 0.96, No Horn 0.97",
      "Optimized for Real-Time On-Vehicle Video Telemetry Streams",
    ],
  },
  {
    id: "work-traffic-fuzzy",
    title: "Intelligent Traffic Management System: Dynamic Signal Control",
    category: "Platforms & Systems",
    tags: ["Python", "Scikit-Fuzzy", "Fuzzy Logic", "Control System", "Traffic Simulation"],
    href: "https://github.com/Apurva-0210",
    img: withBase("assets/projects/cards/card_fuzzy_traffic_new.png"),
    summary:
      "Fuzzy logic-based intelligent traffic signal control system that evaluates real-time queue length, waiting time, and vehicle density to dynamically modulate phase green times, cutting intersection idling by over 32%.",
    specs: [
      "Multi-Input Mamdani Fuzzy Inference Engine (Queue, Density, Waiting Time)",
      "Dynamic Green/Yellow/Red Phase Modulation for Multi-Way Junctions",
      "Python & Scikit-Fuzzy Implementation with Real-Time Event Simulation",
      "Demonstrated Significant Congestion Reduction Over Fixed Timers",
    ],
  },
  {
    id: "work-gas-sensing",
    title: "AI-Enabled Gas Detection System: PANI–β-AgVO3/Chitosan Composite",
    category: "Hardware & Architecture",
    tags: ["ESP32", "MiCS-4514", "Embedded C", "Nanocomposite", "Multi-Gas Detection"],
    href: "https://github.com/Apurva-0210/AGNIS-gas-sensing-project",
    img: withBase("assets/projects/cards/card_gas_sensing_new.png"),
    summary:
      "Ternary nanocomposite gas sensing platform functionalized with Polyaniline (PANI), beta-silver vanadate (β-AgVO3), and chitosan. Benchmarked alongside MiCS-4514 and interfaced with an ESP32 for multi-gas identification (CO, NO2, NH3, VOCs).",
    specs: [
      "In-situ Polymerisation Synthesis of Ternary Nanocomposites",
      "Benchmarked with SGX Sensortech MiCS-4514 Dual Gas Sensor",
      "ESP32 Embedded C Firmware with 12-Bit ADC Baseline Drift Correction",
      "High Sensitivity & Fast Recovery Under Ambient Atmospheric Pressures",
    ],
  },
  {
    id: "work-fleetease",
    title: "FleetEase: Fleet Management & Booking Platform",
    category: "Platforms & Systems",
    tags: ["React.js", "Flutter", "Node.js", "PostgreSQL", "Full-Stack Development"],
    href: "https://github.com/Apurva-0210",
    img: withBase("assets/projects/cards/card_fleetease_new.png"),
    summary:
      "Full-stack fleet operations and booking suite connecting passenger booking, real-time GPS asset telematics, driver dispatch, and vehicle maintenance logging into a unified web and mobile interface.",
    specs: [
      "Real-Time WebSocket & GPS Fleet Telemetry Stream",
      "PostgreSQL Relational Schema with PostGIS Geospatial Queries",
      "Cross-Platform Driver & Passenger App Built with Flutter",
      "High-Concurrency Dispatch Engine with Automated Route Allocation",
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
    id: "work-gem5",
    title: "gem5 Performance Analysis: System Simulation & Hardware Evaluation",
    category: "Hardware & Architecture",
    tags: ["gem5 v25.1.0.1", "MESI_Two_Level", "Garnet NoC", "SPEC CPU2017"],
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
    id: "work-veyrion",
    title: "Veyrion Product Ecosystem: Multi-Product Mobility & Intelligent Systems",
    category: "Platforms & Systems",
    tags: ["Autera (ADAS)", "Moventra (Mobility)", "Drivio (Driver Suite)"],
    href: "https://github.com/Apurva-0210",
    img: withBase("assets/projects/cards/card_veyrion_ecosystem.png"),
    summary:
      "Commercial mobility and software ecosystem encompassing Autera (ADAS & vehicle intelligence), Moventra (mobility & operations platform), and Drivio (driver & fleet enablement suite) designed for high-density transport networks.",
    specs: [
      "Autera: ADAS & Vehicle Intelligence Engine",
      "Moventra: Mobility & Operations Management Platform",
      "Drivio: Driver & Fleet Telemetry Enablement Suite",
      "Unified Connected Mobility Cloud Architecture",
    ],
  },
  {
    id: "work-other",
    title: "Other Notable Work: ML-KEM FPGA, SHRIMP Agri IoT & Embedded 8051",
    category: "Hardware & Architecture",
    tags: ["ML-KEM (FPGA)", "SHRIMP Agri IoT", "8051 Real-Time"],
    href: "https://github.com/Apurva-0210",
    img: withBase("assets/projects/cards/card_other_work.png"),
    summary:
      "Specialized hardware and IoT systems: FPGA implementation of NIST Post-Quantum Cryptography (ML-KEM), AI-driven smart aquaculture monitoring (SHRIMP Agri), local desktop AI assistant (AEGIS), and assembly-level 8051 microcontrollers.",
    specs: [
      "Hardware Acceleration & Verification of ML-KEM (PQC)",
      "IoT Multiparameter Water Quality Sensor Arrays for Aquaculture",
      "Bare-Metal Assembly & C Interfacing on 8051 Microcontrollers",
      "Closed-Loop Real-Time Peripheral Control",
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
    role: "B.Tech ECE (AI & ML Specialization) · CGPA 8.58 (Expected June 2027)",
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
    tone: "red",
    title: "Automotive Systems\n& ADAS",
    body: "Calibrating safety-critical ADAS perception, multi-modal sensor fusion (LiDAR, Radar, Cameras), and real-time TTC braking decision logic under high-density Indian traffic in CARLA UE5 and RoadRunner.",
  },
  {
    tone: "silver",
    title: "Embedded &\nReal-Time Systems",
    body: "Bare-metal C & C++, FreeRTOS task scheduling, and device drivers across STM32 and ESP32 microcontrollers. Interfacing CAN Bus (ISO 15765-4), UART, SPI, and sensor data acquisition close to silicon.",
  },
  {
    tone: "dark",
    title: "Computer\nArchitecture",
    body: "Cycle-accurate microarchitecture simulation with gem5 v25.1.0.1. Characterizing Ruby MESI_Two_Level cache coherence, Garnet 4x4 2D Mesh NoC flit latency, and SPEC CPU2017 workload bottlenecks.",
  },
  {
    tone: "silver",
    title: "Applied AI/ML\n& Deep Learning",
    body: "Noise-Conditioned Residual Transformers (NCRT/NCRN) for Massive MIMO CSI channel estimation, YOLOv8-CBAM attention models for traffic sign detection, and fuzzy logic control engines.",
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
      "Garnet 4x4 2D Mesh NoC interconnect analysis",
      "SPEC CPU2017 workload instrumentation",
      "AMAT & memory latency characterization",
    ],
    img: withBase("assets/projects/gem5_architecture.svg"),
  },
  {
    id: "svc-product",
    title: "Automotive Systems\n& ADAS",
    items: [
      "CARLA UE5 & RoadRunner digital twins",
      "Multi-modal sensor fusion (LiDAR/Radar/Camera)",
      "Time-to-collision (TTC) safety governance",
      "Automotive ECU architecture & CAN diagnostics",
      "High-axle commercial freight calibration",
    ],
    img: withBase("assets/projects/carla_ue5.png"),
  },
  {
    id: "svc-ai",
    title: "Edge AI &\nComputer Vision",
    items: [
      "YOLOv8-CBAM spatial & channel attention",
      "Edge INT8 neural network quantization",
      "ConvLSTM temporal sequence modeling",
      "Noise-conditioned residual transformers (NCRT)",
      "PyTorch deep learning pipelines",
    ],
    img: withBase("assets/projects/ncrt_arch.png"),
  },
  {
    id: "svc-motion",
    title: "Hardware Prototyping\n& Sensors",
    items: [
      "Functionalized nanocomposite gas sensors",
      "MiCS-4514 dual gas sensor benchmarking",
      "12-bit ADC data acquisition & drift correction",
      "Analog signal conditioning & PCB prototyping",
      "Hardware debug with logic analyzers & DSOs",
    ],
    img: withBase("assets/projects/agnis_fesem.png"),
  },
  {
    id: "svc-marketing",
    title: "Systems Software\n& Infrastructure",
    items: [
      "FleetEase logistics & dispatch engine",
      "PostgreSQL relational schemas & PostGIS queries",
      "Dockerized continuous integration testbeds",
      "Linux systems programming & bash tooling",
      "RESTful system APIs & backend services",
    ],
    img: withBase("assets/projects/banner.png"),
  },
];

const stats: Stat[] = [
  {
    n: 9,
    displayValue: "8.58",
    label: "8.58 Academic CGPA",
    body: "Electronics & Communication Engineering (AI & ML Specialization) at MIT World Peace University, Pune.",
  },
  {
    n: 12,
    displayValue: "12+",
    label: "Engineering Projects",
    body: "Spanning heavy vehicle ADAS, cycle-accurate gem5 simulation, Massive MIMO transformers, and nanocomposite gas sensing.",
  },
  {
    n: 4,
    displayValue: "4+",
    label: "Research & Industry Labs",
    body: "Practical engineering at Tata Technologies (InnoVent), IIT Guwahati Computer Systems Lab, iACE Gujarat, and MIT-WPU.",
  },
];

export default function Home() {
  const resumeUrl = withBase("assets/Apurva_Kumar_Resume.pdf");

  return (
    <CrimsonReachTemplate
      brand="Apurva Kumar"
      name="Apurva Kumar"
      role="Embedded Systems · Automotive Electronics · Simulation · AI/ML"
      avatar={withBase("assets/apurva_emblem.png")}
      logoImg={withBase("assets/apurva_emblem.png")}
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
      journeyTitle="Core Engineering Disciplines"
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
      ctaImg={withBase("assets/projects/automotive_cta_backdrop.png")}
    />
  );
}
