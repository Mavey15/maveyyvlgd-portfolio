// ============================================================================
// FILE KONFIGURASI UTAMA PORTOFOLIO — MUHAMMAD ADHITYA PRATAMA (MaveyyVlgd)
// ============================================================================
// Cukup edit file ini untuk mengubah seluruh isi website pribadi Anda:
// mulai dari profil, foto, tentang saya, keahlian, daftar projek,
// hingga kontak dan sosial media.
// ============================================================================

const portfolioData = {
  // --------------------------------------------------------------------------
  // 1. IDENTITAS & HERO SECTION
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
      "Halo, saya Muhammad Adhitya Pratama (dikenal sebagai MaveyyVlgd / MvyVlgd di setiap projek). Berangkat dari dunia Rekam Medis & Informasi Kesehatan (RMIK) di Pacitan—bukan berlatar belakang IT murni, tapi suka mengeksekusi ide-ide besar menjadi aplikasi nyata lewat Vibe Coding.",
    location: "PACITAN, IDN",
    coordinates: "8.1945° S, 111.1033° E",
    status: "BUILDING COOL STUFF",
    available: true,
    editionTag: "MAVEYYVLGD // ARCHIVE 2026",
    serialCode: "MV-15-PCTN",
    // Kosongkan ("") untuk menggunakan ilustrasi avatar Streetwear SVG bawaan,
    // atau isi dengan URL foto Anda / path file lokal (misal: "./avatar.jpg")
    avatarUrl: "./avatar.jpg",
    cvUrl: "#contact",
    marqueeItems: [
      "MUHAMMAD ADHITYA PRATAMA // MAVEYYVLGD",
      "RSUD VOLDIGOAD SIMRS & RME CREATOR",
      "E-SOP KLINIK ASY-SYIFA HUSADA",
      "KALKULATOR STATISTIK RS (WEB & APK)",
      "BASED IN PACITAN // EAST JAVA",
      "COFFEE • GAMING • GOOD MUSIC • VIBE CODING",
    ],
    stats: [
      { value: "04", label: "PROJEK UTAMA DIRILIS", code: "DRP // 01" },
      { value: "20+", label: "MODUL RME & KLINIS", code: "MED // 02" },
      { value: "100%", label: "PURE VIBE CODING", code: "VIB // 03" },
    ],
  },

  // --------------------------------------------------------------------------
  // 2. TENTANG SAYA (MANIFESTO & CERITA SINGKAT)
  // --------------------------------------------------------------------------
  about: {
    sectionCode: "SEC // 01 — MANIFESTO",
    title: "WHO IS MAVEYYVLGD?",
    subtitle:
      "Anak RMIK dari Pacitan yang menolak dibatasi oleh rumitnya koding—mengubah kebutuhan dunia kesehatan menjadi aplikasi nyata lewat Vibe Coding.",
    paragraphs: [
      "Kenalin, saya Muhammad Adhitya Pratama—atau lebih sering mencantumkan nama MaveyyVlgd (MvyVlgd) di setiap projek yang saya bangun. Berdomisili di Pacitan, latar belakang saya adalah Rekam Medis dan Informasi Kesehatan (RMIK).",
      "Jujur saja, saya bukan anak IT dan tidak bisa koding secara konvensional. Namun saya sangat menyukai dunia digital dan eksplorasi teknologi seperti ini. Dengan pendekatan Vibe Coding, saya menerjemahkan ilmu RMIK yang saya pelajari menjadi sistem yang benar-benar hidup: mulai dari SIMRS & RME 20 Modul (RSUD Voldigoad), Sistem E-SOP Internal Klinik Asy-Syifa Husada, hingga Kalkulator Statistik Rumah Sakit versi Web & Android.",
    ],
    quote:
      "“You don’t need to be a traditional programmer to build cool stuff. Understand the problem, set the vibe, and make it real.”",
    highlights: [
      {
        tag: "MINDSET // 01",
        title: "RMIK Domain Knowledge",
        description:
          "Memahami langsung alur kerja fasilitas kesehatan: mulai dari pendaftaran, input SOAP & CPPT, koding ICD-10 / ICD-9-CM, klaim INA-CBG, tata kelola SOP, hingga statistik Barber-Johnson.",
      },
      {
        tag: "MINDSET // 02",
        title: "Vibe Coding Execution",
        description:
          "Tidak bisa koding manual bukan alasan untuk berhenti berkarya. Fokus pada visi produk, merancang alur logika, dan mengarahkan AI hingga tercipta aplikasi utuh yang siap diuji.",
      },
      {
        tag: "MINDSET // 03",
        title: "Aesthetic & Daily Vibe",
        description:
          "Menggabungkan fungsionalitas aplikasi medis dengan antarmuka modern yang enak dipandang—selalu ditemani kopi, game, dan semua lagu yang enak didengar.",
      },
    ],
    currentVibe: {
      listeningTo: "Semua Lagu yang Enak Didengar (All-Genre Good Vibes)",
      aesthetic: "Streetwear Pop-Culture × Modern Health-Tech UI",
      fuel: "Kopi, Gaming & Eksplorasi Vibe Coding",
    },
  },

  // --------------------------------------------------------------------------
  // 3. KEAHLIAN / SPECS (VIBE CODING & RMIK ARSENAL)
  // --------------------------------------------------------------------------
  skills: {
    sectionCode: "SEC // 02 — VIBE & DOMAIN SPECS",
    title: "THE ARSENAL",
    subtitle:
      "Perpaduan antara pemahaman Rekam Medis (RMIK), eksekusi Vibe Coding, dan selera visual.",
    categories: [
      {
        id: "vibecoding",
        name: "VIBE CODING // CRAFT",
        badge: "MAIN MODE",
        items: [
          { name: "Prompt-to-Product Execution", level: 96, tag: "VIBE CODING" },
          { name: "AI-Assisted Fullstack Building", level: 95, tag: "BUILDER" },
          { name: "Perancangan Alur Sistem & UI/UX", level: 92, tag: "SYSTEM FLOW" },
          { name: "Portable & Standalone App Packaging", level: 90, tag: "DEPLOYMENT" },
        ],
      },
      {
        id: "rmik",
        name: "RMIK // HEALTH DOMAIN",
        badge: "CORE BACKGROUND",
        items: [
          { name: "Alur SIMRS & Rekam Medis Elektronik (SOAP/CPPT)", level: 95, tag: "RME" },
          { name: "Klasifikasi Klinis (ICD-10, ICD-9-CM & INA-CBG)", level: 92, tag: "KODING MEDIS" },
          { name: "Statistik RS (BOR, LOS, TOI, BTO, NDR, GDR & BJ)", level: 96, tag: "ANALITIK RS" },
          { name: "Tata Kelola SOP Elektronik Fasyankes", level: 94, tag: "GOVERNANCE" },
        ],
      },
      {
        id: "dailyvibe",
        name: "CULTURE // DAILY LIFE",
        badge: "PERSONALITY",
        items: [
          { name: "Coffee & Late Night Exploring", level: 100, tag: "FUEL" },
          { name: "Gaming & Digital Entertainment", level: 95, tag: "HOBBY" },
          { name: "All-Genre Good Music Listener", level: 98, tag: "PLAYLIST" },
          { name: "Streetwear & Aesthetic Culture", level: 92, tag: "STYLE" },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 4. DAFTAR PROJEK ASLI (SELECTED DROPS // MAVEYYVLGD ARCHIVE)
  // --------------------------------------------------------------------------
  projects: [
    {
      id: "drop-01",
      dropNumber: "DROP // 001",
      title: "RSUD VOLDIGOAD // SIMRS & RME",
      subtitle: "Sistem Informasi Manajemen RS & RME Portabel 20 Modul (11 Hak Akses)",
      category: "RMIK & Health-Tech",
      year: "2026",
      featured: true,
      accentColor: "#D4FF00", // Acid Lime
      visualTheme: "rme",
      imageUrl: "",
      summary:
        "Sistem Informasi Manajemen Rumah Sakit (SIMRS) & Rekam Medis Elektronik (RME) terintegrasi dengan 20 modul lengkap dan 11 role pengguna. Dikemas sebagai paket portabel mandiri (Zero-Installation) yang langsung berjalan dalam 1 klik tanpa perlu install XAMPP/MySQL.",
      challenge:
        "Aplikasi SIMRS/RME umumnya sulit dijalankan saat presentasi atau pengujian karena harus menginstal server rumit. RSUD Voldigoad dirancang 100% portabel (berjalan offline maupun online lewat fitur One-Click HTTPS Tunneling Demo) dengan master data ICD-10, ICD-9, poliklinik, kamar, dan apotek yang sudah terisi penuh.",
      features: [
        "11 Role Login Instan (One-Click Demo): Super Admin, Admin, Direktur RS, Dokter DPJP, Perawat, Pendaftaran/Admisi, Farmasi, Lab (LIS), Radiologi (RIS), Kasir Billing, serta Casemix & BPJS",
        "Rekam Medis Elektronik (RME) komprehensif: Triage IGD, Rawat Jalan, Rawat Inap, CPPT, SOAP, Multi ICD-10, ICD-9-CM, dan e-Resep",
        "Manajemen Farmasi dengan pemotongan stok otomatis berprinsip FEFO, serta modul LIS (Laboratorium) & RIS (Radiologi)",
        "Modul Casemix & Klaim INA-CBG (simulasi Bridging VClaim BPJS & SATUSEHAT) serta Laporan Eksekutif RL Direktur",
        "Paket Portabel Mandiri (PHP 8.3 + Laravel Standalone) dengan fitur BUKA_ONLINE_DEMO.bat untuk pengujian jarak jauh dari HP/laptop penguji",
      ],
      techStack: [
        "Vibe Coding",
        "Laravel & PHP 8.3 Portable",
        "RME 20 Modul",
        "ICD-10 & INA-CBG",
        "Zero-Install Standalone",
      ],
      liveUrl: "https://github.com/Mavey15/simrs",
      repoUrl: "https://github.com/Mavey15/simrs",
    },
    {
      id: "drop-02",
      dropNumber: "DROP // 002",
      title: "E-SOP // KLINIK ASY-SYIFA HUSADA",
      subtitle: "Sistem Pengelolaan Standar Operasional Prosedur Internal Klinik",
      category: "Sistem & Governance",
      year: "2026",
      featured: true,
      accentColor: "#FF4D00", // Safety Orange
      visualTheme: "esop",
      imageUrl: "",
      summary:
        "Aplikasi web full-stack pengelolaan Standar Operasional Prosedur (E-SOP) internal untuk Klinik Asy-Syifa Husada. Memudahkan penyusunan, pemantauan status dokumen (Aktif, Draft, Revisi, Tidak Aktif), distribusi per unit kerja, hingga pencetakan lembar SOP resmi.",
      challenge:
        "Menggantikan pengelolaan dokumen SOP manual menjadi sistem terpusat yang memiliki kontrol versi/revisi, visualisasi statistik per unit, dan format cetak standar akreditasi klinik.",
      features: [
        "Dashboard Analitik Interaktif dengan grafik Bar & Doughnut (distribusi jumlah SOP per unit kerja dan ringkasan status dokumen)",
        "Siklus Manajemen SOP Lengkap: Daftar & Filter SOP, Tambah SOP baru, Detail SOP, Edit/Revisi, serta status badge (Aktif, Draft, Revisi, Tidak Aktif)",
        "Fitur Cetak Dokumen SOP Resmi (/cetak/:id) dengan tata letak halaman siap cetak",
        "Manajemen Unit Pelayanan Klinik & Manajemen Hak Akses Pengguna (Protected Role-Based Auth)",
      ],
      techStack: [
        "Vibe Coding",
        "React + Vite",
        "Tailwind CSS & Chart.js",
        "Node.js & Express API",
        "SQLite Database",
      ],
      liveUrl: "https://github.com/Mavey15/klinikasysyifa",
      repoUrl: "https://github.com/Mavey15/klinikasysyifa",
    },
    {
      id: "drop-03",
      dropNumber: "DROP // 003",
      title: "KALKULATOR STATISTIK RS",
      subtitle: "BOR, AvLOS, TOI, BTO, NDR, GDR & Grafik Barber-Johnson (Web + APK)",
      category: "RMIK & Health-Tech",
      year: "2026",
      featured: true,
      accentColor: "#00F5D4", // Cyber Mint
      visualTheme: "statrs",
      imageUrl: "",
      summary:
        "Aplikasi kalkulator statistik rumah sakit berstandar Depkes RI & Barber-Johnson dengan antarmuka bergaya mobile native dan juga dikemas sebagai aplikasi Android (APK).",
      challenge:
        "Mempercepat perhitungan 6 indikator mutu rumah sakit, pencarian variabel dasar yang belum diketahui (rumus bolak-balik), rumus pintas antar-indikator, serta penggambaran daerah efisiensi Grafik Barber-Johnson secara otomatis.",
      features: [
        "Hitung otomatis 6 Indikator RS (BOR, AvLOS, TOI, BTO, NDR, GDR) lengkap dengan indikator standar ideal",
        "Visualisasi Grafik Barber-Johnson otomatis (HTML5 Canvas) yang memetakan titik (TOI, AvLOS) terhadap zona efisien",
        "Tab Cari Komponen Dasar (rumus bolak-balik mencari nilai A, HP, LD, D, atau angka kematian dari indikator yang diketahui)",
        "Kalkulator Pintas Antar-Indikator (mencari indikator lain hanya dari 2 indikator yang diketahui di soal)",
        "Dilengkapi langkah penyelesaian rumus langkah-demi-langkah dan tersedia dalam proyek Android APK",
      ],
      techStack: [
        "Vibe Coding",
        "HTML5 Canvas",
        "JavaScript",
        "Android Gradle APK",
        "Statistik RS RMIK",
      ],
      liveUrl: "./kalkulatorstatistik/index.html",
      repoUrl: "https://github.com/Mavey15/kalkulator-statistik-rs",
    },
    {
      id: "drop-04",
      dropNumber: "DROP // 004",
      title: "MAVEYYVLGD // PERSONAL ARCHIVE",
      subtitle: "Streetwear Lookbook & Vibe Coding Personal Website",
      category: "Creative Web",
      year: "2026",
      featured: false,
      accentColor: "#FF007F", // Hot Magenta
      visualTheme: "portfolio",
      imageUrl: "",
      summary:
        "Website pribadi Muhammad Adhitya Pratama (MaveyyVlgd) yang memadukan identitas sebagai mahasiswa/insan RMIK, karya-karya hasil Vibe Coding, dan estetika visual Streetwear / Urban Pop Culture.",
      challenge:
        "Menciptakan ruang portofolio digital yang jujur, ekspresif, dan berkarakter—lengkap dengan sistem satu file konfigurasi agar mudah diperbarui kapan saja.",
      features: [
        "Dual Streetwear Theme: Mode Asphalt (Dark Carbon) & Mode Zine Paper (Light Archive)",
        "Lookbook Hero Card dengan ilustrasi kustom, barcode tag, koordinat Pacitan, dan jam WIB real-time",
        "Arsip projek interaktif dengan filter kategori, pencarian cepat, dan modal spesifikasi lengkap",
        "Terintegrasi langsung dengan Live Demo Kalkulator Statistik RS dan kanal sosial media resmi",
      ],
      techStack: [
        "Vibe Coding",
        "React & Next.js",
        "Tailwind CSS",
        "Streetwear Pop-Culture UI",
      ],
      liveUrl: "https://mavey15.github.io/maveyyvlgd-portfolio/",
      repoUrl: "https://github.com/Mavey15/maveyyvlgd-portfolio",
    },
  ],

  // --------------------------------------------------------------------------
  // 5. KONTAK & SOSIAL MEDIA
  // --------------------------------------------------------------------------
  contact: {
    sectionCode: "SEC // 04 — TRANSMISSION",
    headline: "LET'S CONNECT & SHARE VIBES.",
    subheadline:
      "Mau ngobrol soal dunia RMIK, diskusi projek RME / E-SOP / Statistik RS, bertukar ide vibe coding, atau mabar game? Langsung hubungi saya lewat email atau sosial media di bawah.",
    email: "maveymeaningless@gmail.com",
    whatsappNumber: "",
    locationNote: "Pacitan, Jawa Timur, Indonesia (GMT+7) — MaveyyVlgd Archive",
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

// Mendukung penggunaan langsung di Browser (index.html) maupun import di Next.js/React
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = portfolioData;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = portfolioData;
}
