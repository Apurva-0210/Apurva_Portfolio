export type SystemNode = {
  label: string;
  kicker: string;
  detail: string;
  technologies: string[];
};

export type Experience = {
  index: string;
  organisation: string;
  role: string;
  location: string;
  period: string;
  description: string;
  secondPoint: string;
  tags: string[];
};

export type Project = {
  index: string;
  title: string;
  fullTitle: string;
  category: string;
  description: string;
  technologies: string[];
  status: string;
  statusNote: string;
  objective: string;
  architecture: string[];
  contribution: string;
  results: string;
  github: string;
  githubLabel: string;
};

export type ResearchItem = {
  index: string;
  title: string;
  description: string;
  status: string;
};

export const withBase = (path: string) => {
  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return `${normalizedBase}${path.replace(/^\//, "")}`;
};

export const profile = {
  name: "Apurva Kumar",
  shortName: "Apurva",
  degree: "B.Tech in Electronics & Communication Engineering",
  specialization: "AI & ML Specialization",
  university: "MIT World Peace University",
  graduation: "June 2027",
  cgpa: "8.58",
  location: "Pune, Maharashtra, India",
  email: "apurvak916@gmail.com",
  githubUsername: "Apurva-0210",
  portfolioUrl: "https://apurva-0210.github.io",
  links: {
    linkedin: "https://linkedin.com/in/apurvakumar55",
    github: "https://github.com/Apurva-0210",
    githubLabel: "GitHub profile · Apurva-0210",
    resume: withBase("assets/Apurva_Kumar_Resume.pdf"),
  },
  resume: {
    path: withBase("assets/Apurva_Kumar_Resume.pdf"),
    filename: "Apurva_Kumar_Resume.pdf",
  },
  availability: "AVAILABLE FOR ENGINEERING / RESEARCH OPPORTUNITIES",
  navItems: [
    { label: "About", id: "about" },
    { label: "Focus", id: "focus" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Research", id: "research" },
    { label: "Skills", id: "skills" },
    { label: "Contact", id: "contact" },
  ],
};

export const systemNodes: SystemNode[] = [
  {
    label: "EMBEDDED",
    kicker: "REAL-TIME LAYER",
    detail: "Building and validating systems close to the hardware.",
    technologies: ["STM32", "ESP32", "Embedded C", "UART", "SPI", "I2C", "Sensors"],
  },
  {
    label: "ARCHITECTURE",
    kicker: "PERFORMANCE LAYER",
    detail: "Tracing performance from cache hierarchy to NoC topologies.",
    technologies: ["gem5", "SPEC CPU2017", "Cache", "Memory Hierarchy", "NoC", "Garnet"],
  },
  {
    label: "AI / ML",
    kicker: "INTELLIGENCE LAYER",
    detail: "Turning signals and images into measurable system behaviour.",
    technologies: ["Python", "PyTorch", "TensorFlow", "Computer Vision", "Deep Learning"],
  },
  {
    label: "AUTOMOTIVE",
    kicker: "VEHICLE LAYER",
    detail: "Exploring dependable perception and control in intelligent vehicles.",
    technologies: ["ADAS", "ECU", "CAN", "Sensor Integration", "Diagnostics"],
  },
  {
    label: "SIMULATION",
    kicker: "VALIDATION LAYER",
    detail: "Using simulated worlds to ask better engineering questions.",
    technologies: ["CARLA", "RoadRunner", "Sensor Fusion", "Autonomous Driving"],
  },
];

export const currentlyExploring = [
  "Embedded AI",
  "Computer Architecture",
  "ADAS & Autonomous Systems",
  "Edge Computing",
  "Deep Learning",
  "VLSI / Semiconductor Technologies",
];

export const focusAreas = [
  {
    number: "01",
    title: "Embedded Systems",
    shortTitle: "EMBEDDED SYSTEMS",
    description: "Building and validating real-time embedded systems involving microcontrollers, sensors and hardware interfaces.",
    technologies: ["C", "C++", "Embedded C", "STM32", "ESP32", "Arduino", "UART", "SPI", "I2C"],
    signal: "MCU → SENSOR → DATA",
  },
  {
    number: "02",
    title: "Computer Architecture",
    shortTitle: "COMPUTER ARCHITECTURE",
    description: "Analyzing system performance from cache hierarchy to memory systems and Network-on-Chip architectures.",
    technologies: ["gem5", "SPEC CPU2017", "Ruby", "Cache Analysis", "AMAT", "Memory Hierarchy", "NoC", "Garnet"],
    signal: "CACHE → MEMORY → NoC",
  },
  {
    number: "03",
    title: "AI / Machine Learning",
    shortTitle: "AI / MACHINE LEARNING",
    description: "Applying machine learning and deep learning to perception, prediction and intelligent system behavior.",
    technologies: ["Python", "PyTorch", "TensorFlow", "Scikit-learn", "OpenCV", "Deep Learning", "Computer Vision"],
    signal: "DATA → MODEL → INFERENCE",
  },
  {
    number: "04",
    title: "Automotive & ADAS",
    shortTitle: "AUTOMOTIVE & ADAS",
    description: "Exploring intelligent vehicle systems through embedded control, simulation, perception and ADAS validation.",
    technologies: ["ADAS", "ECU", "CAN", "Sensor Integration", "CARLA", "RoadRunner", "Sensor Fusion"],
    signal: "SENSORS → PERCEPTION → CONTROL",
  },
];

export const experiences: Experience[] = [
  {
    index: "01",
    organisation: "Tata Technologies",
    role: "Embedded Systems Intern",
    location: "Pune, India",
    period: "June 2026 — Present",
    description: "Contributing to embedded software development and validation for automotive electronic systems.",
    secondPoint: "Assisting with firmware integration, hardware testing and engineering verification of embedded control modules.",
    tags: ["Embedded Systems", "Automotive Electronics", "Firmware", "Testing", "Validation"],
  },
  {
    index: "02",
    organisation: "Indian Institute of Technology Guwahati",
    role: "Research Intern",
    location: "Guwahati, India",
    period: "May 2026 — June 2026",
    description: "Instrumented cache statistics and evaluated memory hierarchy performance using gem5 and SPEC CPU2017 benchmarks.",
    secondPoint: "Implemented and validated Network-on-Chip routing algorithms using C++, Python and Docker.",
    tags: ["gem5", "SPEC CPU2017", "C++", "Python", "Docker", "Cache", "NoC"],
  },
  {
    index: "03",
    organisation: "International Automobile Centre of Excellence (iACE)",
    role: "Automotive Systems Trainee",
    location: "Gujarat, India",
    period: "June 2025",
    description: "Hands-on training in automotive embedded systems, ECU architecture, sensor interfacing, CAN communication and ADAS technologies.",
    secondPoint: "Practical exposure to EV systems, automotive diagnostics and embedded software integration.",
    tags: ["ECU", "CAN", "ADAS", "Diagnostics", "Automotive Electronics", "EV Systems"],
  },
];

export const projects: Project[] = [
  {
    index: "01",
    title: "AUTERA",
    fullTitle: "AUTERA — An India-Calibrated ADAS Framework for Heavy Commercial Vehicles in Heterogeneous Urban Traffic",
    category: "Automotive / ADAS / Simulation / Research",
    description: "An India-calibrated ADAS framework for heavy commercial vehicles operating in heterogeneous urban traffic.",
    technologies: ["CARLA", "RoadRunner", "ADAS", "Sensor Fusion", "TTC", "Computer Vision", "Simulation"],
    status: "Research / Under Review",
    statusNote: "Research Work — Under Review",
    objective: "Study a high-level path from simulated sensing to ADAS decision support for complex urban traffic.",
    architecture: ["CAMERA / LiDAR / RADAR", "SENSOR PROCESSING", "SENSOR FUSION", "PERCEPTION", "TTC / DECISION", "ADAS CONTROL"],
    contribution: "Simulation and systems work spanning scenario design, sensor reasoning and safety-oriented decision flow.",
    results: "Detailed research data remains private until publication permissions allow more information.",
    github: "https://github.com/Apurva-0210/Autera",
    githubLabel: "VIEW REPOSITORY · Autera",
  },
  {
    index: "02",
    title: "ISVD-Net",
    fullTitle: "Attention-Augmented Detection and Closed-Loop Speed Governance for Indian Highway Speed-Limit Signs",
    category: "AI/ML / Computer Vision / Automotive",
    description: "Attention-augmented speed-sign detection and closed-loop speed governance for Indian highways.",
    technologies: ["Python", "YOLOv8", "CBAM", "LSTM", "Computer Vision", "OBD-II", "CAN", "Edge AI"],
    status: "Research / Under Review",
    statusNote: "Research Work — Under Review",
    objective: "Connect visual speed-limit sign understanding with a high-level vehicle speed governance loop.",
    architecture: ["CAMERA", "IMAGE PREPROCESSING", "YOLOv8-CBAM", "TEMPORAL REASONING", "SPEED LIMIT", "SPEED GOVERNANCE"],
    contribution: "Worked across perception, temporal reasoning and vehicle-interface concepts for an edge-oriented system.",
    results: "No unpublished performance claims or research results are presented here.",
    github: "https://github.com/Apurva-0210/ISDV_NET",
    githubLabel: "VIEW REPOSITORY · ISDV_NET",
  },
  {
    index: "03",
    title: "GAS SENSOR",
    fullTitle: "AI-Enabled Gas Detection using PANI-based Composite Sensor",
    category: "Embedded Systems / Sensors / AI",
    description: "Embedded multi-gas monitoring using functionalized MiCS gas sensors with ESP32-based data acquisition.",
    technologies: ["ESP32", "MiCS Sensors", "Embedded C", "Sensor Data Acquisition", "Python", "Data Analysis"],
    status: "Research",
    statusNote: "Embedded sensing system",
    objective: "Explore an embedded data-acquisition path for multi-gas monitoring and later analysis.",
    architecture: ["MiCS SENSORS", "ESP32 ACQUISITION", "SIGNAL CONDITIONING", "DATA LOGGING", "PYTHON ANALYSIS"],
    contribution: "Built around the practical intersection of sensor interfacing, embedded firmware and data analysis.",
    results: "Public details are intentionally limited to the system direction and technologies used.",
    github: "https://github.com/Apurva-0210/AGNIS-gas-sensing-project",
    githubLabel: "VIEW REPOSITORY · AGNIS-gas-sensing-project",
  },
  {
    index: "04",
    title: "gem5 PERFORMANCE ANALYSIS",
    fullTitle: "Performance Analysis of Memory Hierarchy and Network-on-Chip Architectures Using gem5",
    category: "Computer Architecture / Systems Research",
    description: "gem5-based analysis of memory hierarchy and NoC performance with source-level instrumentation.",
    technologies: ["gem5", "SPEC CPU2017", "C++", "Python", "Docker", "Ruby", "Cache", "Memory Hierarchy", "Garnet", "NoC"],
    status: "Research / Technical Documentation",
    statusNote: "Research Work — Technical Documentation",
    objective: "Understand how workload behaviour, cache hierarchy and on-chip communication shape system performance.",
    architecture: ["WORKLOAD", "CPU", "L1 CACHE", "L2 CACHE", "MEMORY", "PERFORMANCE METRICS"],
    contribution: "Instrumented cache statistics and worked with routing algorithms across the gem5 and Garnet ecosystem.",
    results: "Metrics are shown only where approved for public display.",
    github: "https://github.com/Apurva-0210/Gem5-Memory-NoC-Analysis",
    githubLabel: "VIEW REPOSITORY · Gem5-Memory-NoC-Analysis",
  },
  {
    index: "05",
    title: "FLEETEASE",
    fullTitle: "FleetEase — Fleet & Booking Management Platform",
    category: "Full Stack / Database Systems",
    description: "A full-stack fleet and booking management platform designed around vehicle tracking, booking workflows and secure authentication.",
    technologies: ["React", "Flutter", "Node.js", "Express", "PostgreSQL"],
    status: "Engineering project",
    statusNote: "Systems software project",
    objective: "Design a practical platform around fleet visibility, booking workflows and role-aware access.",
    architecture: ["CLIENT APPS", "API LAYER", "AUTHENTICATION", "BOOKING WORKFLOWS", "POSTGRESQL"],
    contribution: "Worked across product flows, frontend surfaces, backend services and relational data modelling.",
    results: "A systems-oriented software project; repository and implementation details are editable in the profile config.",
    github: "https://github.com/Apurva-0210/FleetEase",
    githubLabel: "VIEW REPOSITORY · FleetEase",
  },
];

export const research: ResearchItem[] = [
  {
    index: "01",
    title: "Noise-Conditioned Residual Learning for Robust Channel Estimation in Massive MIMO",
    description: "Research on neural-network-based channel estimation for high-mobility wireless communication scenarios.",
    status: "UNDER REVIEW",
  },
  {
    index: "02",
    title: "FleetEase: Simulation-Driven ADAS Validation Framework",
    description: "Simulation-driven ADAS validation using CARLA and RoadRunner with multi-sensor fusion and adaptive TTC reasoning.",
    status: "UNDER REVIEW",
  },
];

export const skillCategories = {
  PROGRAMMING: ["C", "C++", "Python", "Java", "Embedded C"],
  EMBEDDED: ["STM32", "ESP32", "Arduino", "STM32CubeMX", "Keil", "UART", "SPI", "I2C", "Sensor Interfacing"],
  SYSTEMS: ["gem5", "SPEC CPU2017", "Cache Analysis", "Memory Hierarchy", "Network-on-Chip"],
  "AI / ML": ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "Deep Learning", "Computer Vision"],
  AUTOMOTIVE: ["ADAS", "ECU Diagnostics", "CAN", "Sensor Integration", "Automotive Electronics"],
  SIMULATION: ["CARLA", "RoadRunner", "Sensor Fusion", "Autonomous Driving"],
  TOOLS: ["Docker", "Linux", "Git", "GitHub", "MATLAB", "Simulink", "Jupyter", "VS Code", "Cadence", "AMD Vivado"],
};

export const skillConnections: Record<string, string[]> = {
  gem5: ["Computer Architecture", "Cache", "Memory Hierarchy", "SPEC CPU2017", "NoC"],
  CARLA: ["ADAS", "Autonomous Driving", "Simulation", "Sensor Fusion"],
  ESP32: ["MCU", "Sensor", "Data", "Embedded C"],
  "AI / ML": ["Data", "Model", "Inference", "Edge AI"],
};

export const timeline = [
  { year: "2024", label: "Embedded Driver Assistance System", details: ["Embedded systems", "Driver assistance" ] },
  { year: "2025", label: "Automotive Systems Training · FleetEase · Intelligent Traffic / AI work", details: ["Automotive systems training", "FleetEase platform", "Intelligent traffic / AI work"] },
  { year: "2026", label: "IIT Guwahati · Tata Technologies · gem5 · Autonomous Vehicle Simulation", details: ["IIT Guwahati research", "Tata Technologies", "gem5 research", "Autonomous vehicle simulation", "ADAS / research projects"] },
  { year: "2027", label: "B.Tech Graduation", details: ["B.Tech in Electronics & Communication Engineering", "AI & ML specialization"] },
];