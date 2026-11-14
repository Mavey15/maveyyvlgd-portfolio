// ============================================================================
// MAIN PORTFOLIO CONFIGURATION FILE — MUHAMMAD ADHITYA PRATAMA (MaveyyVlgd)
// ============================================================================
// Edit this single file to update all content across your personal website:
// profile, photo, manifesto/about, arsenal/specs, project drops, and contacts.
// ============================================================================

const portfolioData = {
  // --------------------------------------------------------------------------
  // 1. IDENTITY & HERO SECTION
  // --------------------------------------------------------------------------
  profile: {
    name: "MAVEYYVLGD",
    fullName: "Muhammad Adhitya Pratama",
    nickname: "MAVEYYVLGD // TAMA",
    role: "RMIK Enthusiast • Vibe Coder • Digital Explorer",
    headlineTop: "NOT AN IT KID,",
    headlineAccent: "JUST VIBE CODING",
    headlineBottom: "& COOL IDEAS.",
    shortBio:
      "Hi, I'm Muhammad Adhitya Pratama (known as MaveyyVlgd / MvyVlgd across my builds). Rooted in Health Information Management & Medical Records (RMIK) in Pacitan—not a traditional CS/IT programmer, just someone who loves turning real-world ideas into working digital products through Vibe Coding.",
    location: "PACITAN, IDN",
    coordinates: "8.1945° S, 111.1033° E",
    status: "BUILDING COOL STUFF",
    available: true,
    editionTag: "MAVEYYVLGD // ARCHIVE 2026",
    serialCode: "MV-15-PCTN",
    avatarUrl: "./avatar.jpg",
    cvUrl: "#contact",
    marqueeItems: [
      "MUHAMMAD ADHITYA PRATAMA // MAVEYYVLGD",
      "MCA — MEDICAL CODING ASSISTANT (AI RAG & ICD-10)",
      "RSUD VOLDIGOAD HIS & EHR CREATOR",
      "E-SOP KLINIK ASY-SYIFA HUSADA",
      "HOSPITAL STATISTICS CALCULATOR (WEB & APK)",
      "BASED IN PACITAN // EAST JAVA",
      "COFFEE • GAMING • GOOD MUSIC • VIBE CODING",
    ],
    stats: [
      { value: "05", label: "FEATURED DROPS", code: "DRP // 01" },
      { value: "20+", label: "CLINICAL & EHR MODULES", code: "MED // 02" },
      { value: "100%", label: "PURE VIBE CODING", code: "VIB // 03" },
    ],
  },

  // --------------------------------------------------------------------------
  // 2. ABOUT ME (MANIFESTO & STORY)
  // --------------------------------------------------------------------------
  about: {
    sectionCode: "SEC // 01 — MANIFESTO",
    title: "WHO IS MAVEYYVLGD?",
    subtitle:
      "A Health Information Management (RMIK) enthusiast from Pacitan who refuses to be limited by complex syntax—turning real healthcare workflows into working apps through Vibe Coding.",
    paragraphs: [
      "What's up! I'm Muhammad Adhitya Pratama—though you'll mostly find the signature MaveyyVlgd (or MvyVlgd) stamped across my digital builds. Based in Pacitan, East Java, my academic and daily foundation lies in Health Information Management & Medical Records (RMIK).",
      "To keep it real: I'm not an IT major and I don't write code from scratch the traditional way. But I have a deep passion for digital culture, visual design, and problem solving. Through Vibe Coding, I translate my medical records domain knowledge into living software—from an AI-powered Medical Coding Assistant (MCA), to a 20-module Hospital Information System & Electronic Medical Record (RSUD Voldigoad), an Internal Clinic E-SOP System (Klinik Asy-Syifa Husada), and a Hospital Statistics Calculator for Web & Android.",
    ],
    quote:
      "“You don’t need to be a traditional programmer to build cool stuff. Understand the problem, set the vibe, and make it real.”",
    highlights: [
      {
        tag: "MINDSET // 01",
        title: "Health Info Domain Knowledge",
        description:
          "Grounded in real healthcare facility workflows: patient admission, SOAP & CPPT clinical notes, ICD-10 / ICD-9-CM coding, INA-CBG claims, SOP governance, and Barber-Johnson hospital statistics.",
      },
      {
        tag: "MINDSET // 02",
        title: "Vibe Coding Execution",
        description:
          "Not being a conventional programmer is never a barrier to creating. I focus on product vision, logical workflows, and directing AI to ship complete, ready-to-use applications.",
      },
      {
        tag: "MINDSET // 03",
        title: "Aesthetic & Daily Vibe",
        description:
          "Blending functional health-tech tools with bold, modern interfaces that never feel boring—always fueled by coffee, gaming, and an all-genre playlist of good music.",
      },
    ],
    currentVibe: {
      listeningTo: "Anything That Sounds Good (All-Genre Good Vibes)",
      aesthetic: "Streetwear Pop-Culture × Modern Health-Tech UI",
      fuel: "Coffee, Gaming & Late-Night Vibe Coding",
    },
  },

  // --------------------------------------------------------------------------
  // 3. ARSENAL / SPECS (VIBE CODING & RMIK DOMAIN)
  // --------------------------------------------------------------------------
  skills: {
    sectionCode: "SEC // 02 — VIBE & DOMAIN SPECS",
    title: "THE ARSENAL",
    subtitle:
      "A fusion of Health Information Management (RMIK) domain expertise, Vibe Coding execution, and visual culture.",
    categories: [
      {
        id: "vibecoding",
        name: "VIBE CODING // CRAFT",
        badge: "MAIN MODE",
        items: [
          { name: "Prompt-to-Product Execution", level: 96, tag: "VIBE CODING" },
          { name: "AI-Assisted Fullstack Building", level: 95, tag: "BUILDER" },
          { name: "System Workflow & UI/UX Direction", level: 92, tag: "SYSTEM FLOW" },
          { name: "RAG & Vector Search Integration", level: 94, tag: "AI / PGVECTOR" },
          { name: "Portable & Standalone App Packaging", level: 90, tag: "DEPLOYMENT" },
        ],
      },
      {
        id: "rmik",
        name: "HEALTH INFO // RMIK DOMAIN",
        badge: "CORE BACKGROUND",
        items: [
          { name: "HIS (SIMRS) & Electronic Medical Records (SOAP/CPPT)", level: 95, tag: "EHR / RME" },
          { name: "Clinical Coding (ICD-10, ICD-9-CM & INA-CBG)", level: 92, tag: "MEDICAL CODING" },
          { name: "Hospital Statistics (BOR, LOS, TOI, BTO, NDR, GDR & BJ)", level: 96, tag: "ANALYTICS" },
          { name: "Electronic SOP Governance for Healthcare", level: 94, tag: "GOVERNANCE" },
        ],
      },
      {
        id: "dailyvibe",
        name: "CULTURE // DAILY LIFE",
        badge: "PERSONALITY",
        items: [
          { name: "Coffee & Late-Night Exploring", level: 100, tag: "FUEL" },
          { name: "Gaming & Interactive Entertainment", level: 95, tag: "HOBBY" },
          { name: "All-Genre Good Music Listener", level: 98, tag: "PLAYLIST" },
          { name: "Streetwear & Pop-Culture Aesthetic", level: 92, tag: "STYLE" },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 4. SELECTED DROPS (PROJECT ARCHIVE)
  // --------------------------------------------------------------------------
  projects: [
    {
      id: "drop-01",
      dropNumber: "DROP // 001",
      title: "MCA // MEDICAL CODING ASSISTANT",
      subtitle: "AI-Assisted ICD-10 Search, Source-Grounded RAG, & Collaborative Coding Workspace",
      category: "Health-Tech & AI",
      year: "2026",
      featured: true,
      accentColor: "#7C6CF2", // Electric Lavender / Purple
      visualTheme: "mca",
      imageUrl: "",
      summary:
        "An AI-powered ICD-10 clinical coding reference, terminology lookup, and collaborative review platform designed for medical record and health information management (RMIK/PMIK) professionals.",
      challenge:
        "Medical coding requires strict accuracy and official source provenance without hallucinations. MCA bridges traditional coding manuals with modern AI through a 9-stage hybrid search engine, source-grounded RAG verification, non-diagnostic safety guardrails, and HL7 FHIR R4 interoperability.",
      features: [
        "9-Stage Hybrid ICD-10 Search Engine (Exact code, terms, PostgreSQL FTS, bilingual EN/ID synonyms, clinical abbreviations, and vector embeddings)",
        "Source-Grounded AI Medical Coding Assistant (RAG) with anti-hallucination verification, official source citations, PII redaction, and symptom refusal guardrails",
        "Collaborative Coding Workspace (Draft -> Pending Review -> Verified / Rejected) with candidate comparison, reviewer sign-off, and PDF/Excel verification exports",
        "HL7 FHIR R4 Interoperability Mapping (CodeSystem lookup, Condition resource, and SatuSehat URI compliance)",
        "Enterprise Fullstack Architecture: FastAPI + PostgreSQL 16 pgvector + Redis 7 + Next.js / Tailwind CSS with 4-role RBAC",
      ],
      techStack: [
        "Vibe Coding",
        "FastAPI & Python",
        "Next.js & React",
        "pgvector & RAG AI",
        "HL7 FHIR R4",
        "PostgreSQL 16",
      ],
      liveUrl: "https://github.com/Mavey15/medical-coding-assistant",
      repoUrl: "https://github.com/Mavey15/medical-coding-assistant",
    },
    {
      id: "drop-02",
      dropNumber: "DROP // 002",
      title: "RSUD VOLDIGOAD // HIS & EHR",
      subtitle: "20-Module Portable Hospital Information System & Electronic Medical Record (11 Roles)",
      category: "Health-Tech & EHR",
      year: "2026",
      featured: true,
      accentColor: "#D4FF00", // Acid Lime
      visualTheme: "rme",
      imageUrl: "",
      summary:
        "An integrated Hospital Information System (SIMRS) & Electronic Medical Record (RME) featuring 20 comprehensive clinical and administrative modules across 11 professional roles. Packaged as a 100% standalone portable suite (Zero-Installation) that launches in a single click without installing XAMPP or MySQL.",
      challenge:
        "Enterprise hospital systems are notoriously difficult to set up during live demos or evaluations due to complex server dependencies. RSUD Voldigoad is engineered to run 100% portably offline—or online via One-Click HTTPS Tunneling—pre-loaded with complete ICD-10, ICD-9-CM, outpatient clinics, inpatient wards, and pharmacy master data.",
      features: [
        "11 Instant One-Click Demo Roles: Super Admin, System Admin, Hospital Director, Specialist Doctor (DPJP), Clinical Nurse, Admission Officer, Pharmacist, Lab Analyst (LIS), Radiology (RIS), Cashier/Billing, and Casemix/BPJS",
        "Comprehensive Electronic Medical Record (EHR): ER Triage, Outpatient, Inpatient, CPPT, SOAP notes, Multi ICD-10, ICD-9-CM procedures, and integrated e-Prescription",
        "Pharmacy Management with automated FEFO stock deduction, alongside LIS (Laboratory) & RIS (Radiology) modules",
        "Casemix & INA-CBG Claim module (simulating BPJS VClaim & SATUSEHAT bridging) plus Executive Hospital Reports",
        "Standalone Portable Engine (PHP 8.3 + Laravel) equipped with BUKA_ONLINE_DEMO.bat for instant remote testing on any phone or laptop",
      ],
      techStack: [
        "Vibe Coding",
        "Laravel & PHP 8.3 Portable",
        "20 EHR Modules",
        "ICD-10 & INA-CBG",
        "Zero-Install Standalone",
      ],
      liveUrl: "https://github.com/Mavey15/simrs-rsud-voldigoad",
      repoUrl: "https://github.com/Mavey15/simrs-rsud-voldigoad",
    },
    {
      id: "drop-03",
      dropNumber: "DROP // 003",
      title: "E-SOP & E-SK // KLINIK ASY-SYIFA HUSADA",
      subtitle: "Desktop & Web Electronic SOP + Clinical Decree (SK) Management System",
      category: "System & Governance",
      year: "2026",
      featured: true,
      accentColor: "#FF4D00", // Safety Orange
      visualTheme: "esop",
      imageUrl: "",
      summary:
        "A standalone Windows Desktop Application (.exe via Electron) and full-stack web system built for Klinik Asy-Syifa Husada to manage internal Standard Operating Procedures (E-SOP) and Director Decrees (Surat Keputusan / SK).",
      challenge:
        "Replacing scattered physical SOP & Decree (SK) binders with a standalone desktop application featuring revision audit trails, staff read receipts, automated procedural flowcharts, and accreditation-ready official print layouts.",
      features: [
        "Packaged as a standalone Windows Desktop Application (E-SOP Klinik.exe via Electron) with built-in Node.js/Express & SQLite engine",
        "Complete E-SOP & Director Decree (Surat Keputusan / SK) Management: Draft Menimbang/Mengingat/Menetapkan clauses, categorize SOPs, and track document lifecycle (Active, Draft, Revision, Inactive)",
        "Audit History & Staff Read Receipts (sop_history & sop_read_receipts) to track who revised or read each clinical procedure",
        "Interactive Analytics Dashboard (Bar & Doughnut charts) plus Official Accreditation Print Layouts for both SOPs and SKs",
      ],
      techStack: [
        "Vibe Coding",
        "Electron Desktop (.exe)",
        "React + Tailwind CSS",
        "Node.js & Express",
        "SQLite Database",
      ],
      liveUrl: "https://github.com/Mavey15/esop-klinik-asysyifa",
      repoUrl: "https://github.com/Mavey15/esop-klinik-asysyifa",
    },
    {
      id: "drop-04",
      dropNumber: "DROP // 004",
      title: "HOSPITAL STATISTICS CALCULATOR",
      subtitle: "BOR, AvLOS, TOI, BTO, NDR, GDR & Interactive Barber-Johnson Graph (Web + APK)",
      category: "Health-Tech & EHR",
      year: "2026",
      featured: true,
      accentColor: "#00F5D4", // Cyber Mint
      visualTheme: "statrs",
      imageUrl: "",
      summary:
        "A mobile-first hospital statistics calculator built on Ministry of Health & Barber-Johnson standards, available both as an interactive web app and a native-style Android application (APK).",
      challenge:
        "Calculating the 6 core hospital indicators, reverse-solving missing base variables, computing cross-indicator shortcuts, and plotting the Barber-Johnson efficiency zone manually is time-consuming and error-prone. This app automates every formula with step-by-step solutions.",
      features: [
        "Instant calculation of all 6 Hospital Indicators (BOR, AvLOS, TOI, BTO, NDR, GDR) with ideal standard evaluation badges",
        "Automated Barber-Johnson Graph (HTML5 Canvas) plotting the hospital's (TOI, AvLOS) coordinate against the efficiency zone",
        "Reverse Component Solver tab to find missing base variables (Beds A, Inpatient Days HP, Length of Stay LD, Discharges D, or Mortality counts)",
        "Cross-Indicator Shortcut Calculator to derive unknown metrics from just 2 given indicators",
        "Complete step-by-step formula substitutions and packaged as an Android Gradle APK project",
      ],
      techStack: [
        "Vibe Coding",
        "HTML5 Canvas",
        "JavaScript",
        "Android Gradle APK",
        "Hospital Analytics",
      ],
      liveUrl: "./kalkulatorstatistik/index.html",
      repoUrl: "https://github.com/Mavey15/kalkulator-statistik-rs",
    },
    {
      id: "drop-05",
      dropNumber: "DROP // 005",
      title: "MAVEYYVLGD // PERSONAL ARCHIVE",
      subtitle: "Streetwear Lookbook & Vibe Coding Personal Portfolio Website",
      category: "Creative Web",
      year: "2026",
      featured: false,
      accentColor: "#FF007F", // Hot Magenta
      visualTheme: "portfolio",
      imageUrl: "",
      summary:
        "The personal digital archive of Muhammad Adhitya Pratama (MaveyyVlgd)—blending Health Information Management (RMIK) identity, Vibe Coding builds, and a bold Streetwear / Urban Pop Culture aesthetic.",
      challenge:
        "Crafting an expressive, authentic personal space that breaks away from generic developer templates while remaining effortless to update via a single configuration file.",
      features: [
        "Dual Streetwear Theme Switcher: Asphalt Mode (Dark Carbon) & Zine Paper Mode (Light Archive)",
        "Lookbook Hangtag Hero Card featuring custom portrait viewfinder, barcode metadata, Pacitan coordinates, and live WIB clock",
        "Interactive project archive with category filtering, instant search, and full specification modal sheets",
        "Direct integration with the live Hospital Statistics Calculator demo and official social channels",
      ],
      techStack: [
        "Vibe Coding",
        "React & Next.js",
        "Tailwind CSS",
        "Streetwear Pop-Culture UI",
      ],
      liveUrl: "https://maveyyvlgd.vercel.app",
      repoUrl: "https://github.com/Mavey15/maveyyvlgd-portfolio",
    },
  ],

  // --------------------------------------------------------------------------
  // 5. CONTACT & SOCIAL CHANNELS
  // --------------------------------------------------------------------------
  contact: {
    sectionCode: "SEC // 04 — TRANSMISSION",
    headline: "LET'S CONNECT & SHARE VIBES.",
    subheadline:
      "Want to talk about Health Information Management (RMIK), discuss EHR / E-SOP / Hospital Statistics projects, trade vibe coding ideas, or squad up for a game? Hit me up via email or social channels below.",
    email: "maveymeaningless@gmail.com",
    whatsappNumber: "",
    locationNote: "Pacitan, East Java, Indonesia (GMT+7) — MaveyyVlgd Archive",
    socials: [
      {
        platform: "Instagram",
        handle: "@a.prtamaa1",
        url: "https://www.instagram.com/a.prtamaa1/",
        tag: "DAILY LIFE & VIBE",
      },
      {
        platform: "TikTok",
        handle: "@mllvr0",
        url: "https://www.tiktok.com/@mllvr0?is_from_webapp=1&sender_device=pc",
        tag: "SHORT CLIPS & CONTENT",
      },
      {
        platform: "GitHub",
        handle: "@Mavey15 (MaveyyVlgd)",
        url: "https://github.com/Mavey15",
        tag: "PROJECT REPOSITORIES",
      },
      {
        platform: "Email",
        handle: "maveymeaningless@gmail.com",
        url: "mailto:maveymeaningless@gmail.com",
        tag: "DIRECT MAIL",
      },
    ],
  },
};

// Supports both direct Browser execution (index.html) and Next.js/React ES imports
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = portfolioData;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = portfolioData;
}
