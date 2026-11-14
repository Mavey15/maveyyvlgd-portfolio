"use client";

import React, { useState, useEffect, useMemo } from "react";

// ============================================================================
// CUSTOM STREETWEAR / URBAN POP-CULTURE ARTWORK & SVG COMPONENTS
// ============================================================================

function BarcodeGraphic({ className = "h-8" }) {
  const bars = [3, 1, 2, 1, 4, 1, 2, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 4, 1, 2, 1, 3];
  return (
    <div className={`flex items-stretch gap-[2px] ${className}`} aria-hidden="true">
      {bars.map((w, i) => (
        <span
          key={i}
          className="bg-current inline-block"
          style={{ width: `${w * 2}px`, opacity: i % 5 === 0 ? 0.65 : 1 }}
        />
      ))}
    </div>
  );
}

function StreetwearAvatarSVG({ name = "TAMA" }) {
  return (
    <svg
      viewBox="0 0 400 460"
      className="w-full h-full object-cover"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Poster Grid */}
      <rect width="400" height="460" fill="#121215" />
      <g opacity="0.14" stroke="#F3EFE6" strokeWidth="1">
        <line x1="0" y1="80" x2="400" y2="80" />
        <line x1="0" y1="160" x2="400" y2="160" />
        <line x1="0" y1="240" x2="400" y2="240" />
        <line x1="0" y1="320" x2="400" y2="320" />
        <line x1="0" y1="400" x2="400" y2="400" />
        <line x1="80" y1="0" x2="80" y2="460" />
        <line x1="160" y1="0" x2="160" y2="460" />
        <line x1="240" y1="0" x2="240" y2="460" />
        <line x1="320" y1="0" x2="320" y2="460" />
      </g>

      {/* Acid Halo Sunburst */}
      <circle cx="200" cy="195" r="118" fill="#D4FF00" />
      <circle
        cx="200"
        cy="195"
        r="134"
        stroke="#FF4D00"
        strokeWidth="3"
        strokeDasharray="10 8"
      />

      {/* Oversized Streetwear Hoodie Silhouette */}
      <path
        d="M65 460 C65 345 110 295 200 295 C290 295 335 345 335 460 Z"
        fill="#1E1E24"
        stroke="#F3EFE6"
        strokeWidth="4"
      />
      {/* Hoodie Collar & Drawstrings */}
      <path
        d="M145 298 L200 350 L255 298"
        fill="#FF4D00"
        stroke="#111111"
        strokeWidth="4"
      />
      <line x1="175" y1="325" x2="170" y2="405" stroke="#D4FF00" strokeWidth="5" strokeLinecap="round" />
      <line x1="225" y1="325" x2="230" y2="405" stroke="#D4FF00" strokeWidth="5" strokeLinecap="round" />

      {/* Streetwear Chest Graphic Print */}
      <rect x="136" y="368" width="128" height="36" fill="#D4FF00" stroke="#111111" strokeWidth="3" />
      <text
        x="200"
        y="391"
        textAnchor="middle"
        fill="#111111"
        fontFamily="Anton, Syne, sans-serif"
        fontSize="16"
        fontWeight="900"
        letterSpacing="1.5"
      >
        {name}
      </text>

      {/* Head & Cap / Beanie */}
      <rect
        x="148"
        y="125"
        width="104"
        height="135"
        rx="48"
        fill="#F3EFE6"
        stroke="#111111"
        strokeWidth="5"
      />

      {/* Street Beanie / Fisherman Cap */}
      <path
        d="M144 170 C144 118 256 118 256 170 Z"
        fill="#FF4D00"
        stroke="#111111"
        strokeWidth="5"
      />
      <rect
        x="138"
        y="156"
        width="124"
        height="24"
        rx="8"
        fill="#111111"
        stroke="#F3EFE6"
        strokeWidth="2"
      />
      <rect x="178" y="162" width="44" height="12" fill="#D4FF00" />

      {/* Futuristic Street Visor / Shades */}
      <rect
        x="152"
        y="192"
        width="96"
        height="26"
        rx="6"
        fill="#111111"
        stroke="#D4FF00"
        strokeWidth="3"
      />
      <line x1="164" y1="199" x2="195" y2="199" stroke="#D4FF00" strokeWidth="3" strokeLinecap="round" />
      <line x1="208" y1="210" x2="236" y2="210" stroke="#FF4D00" strokeWidth="3" strokeLinecap="round" />

      {/* Subtle Smirk */}
      <path
        d="M185 236 Q200 245 216 235"
        stroke="#111111"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Over-Ear Studio Headphones */}
      <rect x="130" y="185" width="18" height="44" rx="8" fill="#D4FF00" stroke="#111111" strokeWidth="4" />
      <rect x="252" y="185" width="18" height="44" rx="8" fill="#D4FF00" stroke="#111111" strokeWidth="4" />

      {/* Corner Viewfinder Marks */}
      <path d="M24 44 L24 24 L44 24" stroke="#D4FF00" strokeWidth="3" />
      <path d="M376 44 L376 24 L356 24" stroke="#D4FF00" strokeWidth="3" />
      <path d="M24 416 L24 436 L44 436" stroke="#D4FF00" strokeWidth="3" />
      <path d="M376 416 L376 436 L356 436" stroke="#D4FF00" strokeWidth="3" />

      {/* Top Metadata Tag */}
      <text
        x="34"
        y="42"
        fill="#F3EFE6"
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
        letterSpacing="1.5"
      >
        REC ● [PORTRAIT_SPEC_2026]
      </text>
    </svg>
  );
}

function ProjectPosterSVG({ project }) {
  const accent = project.accentColor || "#D4FF00";
  return (
    <svg
      viewBox="0 0 600 360"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="600" height="360" fill="#101013" />
      {/* Grid */}
      <g opacity="0.12" stroke="#FFFFFF" strokeWidth="1">
        <line x1="0" y1="90" x2="600" y2="90" />
        <line x1="0" y1="180" x2="600" y2="180" />
        <line x1="0" y1="270" x2="600" y2="270" />
        <line x1="150" y1="0" x2="150" y2="360" />
        <line x1="300" y1="0" x2="300" y2="360" />
        <line x1="450" y1="0" x2="450" y2="360" />
      </g>

      {/* Dynamic Geometric Street Graphic */}
      <circle cx="465" cy="175" r="110" fill={accent} opacity="0.9" />
      <circle
        cx="465"
        cy="175"
        r="128"
        stroke={accent}
        strokeWidth="2"
        strokeDasharray="8 6"
      />
      <rect
        x="38"
        y="46"
        width="320"
        height="268"
        fill="#18181D"
        stroke="#F3EFE6"
        strokeWidth="2.5"
      />
      {/* Mock Browser / Zine Header */}
      <rect x="38" y="46" width="320" height="34" fill={accent} />
      <circle cx="58" cy="63" r="5" fill="#111111" />
      <circle cx="74" cy="63" r="5" fill="#111111" />
      <text
        x="94"
        y="67"
        fill="#111111"
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
        fontWeight="700"
      >
        {project.dropNumber} // {project.year}
      </text>

      {/* Poster Typography Inside Card */}
      <text
        x="60"
        y="135"
        fill="#F3EFE6"
        fontFamily="Anton, Syne, sans-serif"
        fontSize="34"
        fontWeight="800"
        letterSpacing="1"
      >
        {project.title}
      </text>
      <rect x="60" y="154" width="110" height="6" fill={accent} />
      <rect x="60" y="176" width="240" height="10" rx="2" fill="#2E2E38" />
      <rect x="60" y="196" width="195" height="10" rx="2" fill="#2E2E38" />

      {/* Tech Stickers inside preview */}
      <g transform="translate(60, 235)">
        <rect width="92" height="28" fill={accent} />
        <text
          x="46"
          y="18"
          textAnchor="middle"
          fill="#111111"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fontWeight="800"
        >
          {project.category.toUpperCase()}
        </text>
      </g>

      {/* Starburst / Street Stamp on Right Circle */}
      <text
        x="465"
        y="185"
        textAnchor="middle"
        fill="#111111"
        fontFamily="Anton, Syne, sans-serif"
        fontSize="36"
        fontWeight="900"
      >
        {project.dropNumber.replace("DROP // ", "#")}
      </text>
    </svg>
  );
}

// ============================================================================
// MAIN PORTFOLIO APPLICATION COMPONENT
// ============================================================================

export default function PortfolioApp({ data }) {
  const { profile, about, skills, projects, contact } = data;

  // Theme state: "dark" (Asphalt Night) or "light" (Off-White Zine Paper)
  const [theme, setTheme] = useState("dark");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProject, setActiveProject] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [localTime, setLocalTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Quick message state
  const [senderName, setSenderName] = useState("");
  const [senderMsg, setSenderMsg] = useState("");
  const [msgSentNotice, setMsgSentNotice] = useState("");

  // Live clock for Jakarta / local time
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Extract unique project categories
  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return ["ALL", ...unique];
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "ALL" || project.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.techStack.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [projects, selectedCategory, searchQuery]);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleSendQuickMessage = (via) => {
    const nameText = senderName.trim() || "New Friend";
    const bodyText =
      senderMsg.trim() ||
      "Hey Tama (MaveyyVlgd)! Love your projects and would love to connect.";

    if (via === "whatsapp" && contact.whatsappNumber) {
      const text = encodeURIComponent(
        `Hi ${profile.name}! I'm *${nameText}*.\n\n${bodyText}`
      );
      window.open(`https://wa.me/${contact.whatsappNumber}?text=${text}`, "_blank");
      setMsgSentNotice("Opening WhatsApp...");
    } else if (via === "instagram") {
      window.open("https://www.instagram.com/a.prtamaa1/", "_blank");
      setMsgSentNotice("Opening Instagram @a.prtamaa1...");
    } else {
      const subject = encodeURIComponent(
        `[MAVEYYVLGD WEB] Message from ${nameText}`
      );
      const body = encodeURIComponent(`Hi ${profile.fullName} (${profile.name}),\n\n${bodyText}\n\nBest,\n${nameText}`);
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      setMsgSentNotice("Opening Email client...");
    }
    setTimeout(() => setMsgSentNotice(""), 3500);
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-[#0B0B0C] text-[#F3EFE6] bg-urban-grid-dark"
          : "bg-[#F3EFE6] text-[#111111] bg-urban-grid-light"
      }`}
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* ===================================================================
          1. TOP STREETWEAR CAUTION / HYPE MARQUEE TAPE
         =================================================================== */}
      <div className="bg-[#D4FF00] text-[#111111] border-b-2 border-[#111111] py-2 overflow-hidden select-none">
        <div className="animate-marquee font-mono text-xs font-extrabold tracking-widest uppercase">
          {[...profile.marqueeItems, ...profile.marqueeItems].map((item, idx) => (
            <span key={idx} className="mx-6 inline-flex items-center gap-3">
              <span className="inline-block w-2 h-2 bg-[#FF4D00] rotate-45" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ===================================================================
          2. STICKY NAVIGATION BAR (INDUSTRIAL HEADER)
         =================================================================== */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b-2 transition-colors ${
          isDark
            ? "bg-[#0B0B0C]/90 border-[#282830]"
            : "bg-[#F3EFE6]/95 border-[#111111]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo / Tag */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="bg-[#D4FF00] text-[#111111] font-mono font-black text-sm px-2.5 py-1 border-2 border-[#111111] shadow-[3px_3px_0px_#FF4D00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              {profile.nickname}
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-mono text-[10px] tracking-widest uppercase opacity-70">
                {profile.editionTag}
              </span>
              <span className="font-bold text-xs tracking-wider uppercase">
                {profile.location}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 font-mono text-xs font-bold uppercase tracking-wider">
            {[
              { href: "#hero", label: "01 // HOME" },
              { href: "#about", label: "02 // ABOUT" },
              { href: "#skills", label: "03 // SPECS" },
              { href: "#projects", label: "04 // DROPS" },
              { href: "#contact", label: "05 // CONTACT" },
            ].map((nav) => (
              <a
                key={nav.href}
                href={nav.href}
                className={`px-3 py-2 border border-transparent transition-all ${
                  isDark
                    ? "hover:border-[#D4FF00] hover:bg-[#16161B] hover:text-[#D4FF00]"
                    : "hover:border-[#111111] hover:bg-[#D4FF00] hover:text-[#111111]"
                }`}
              >
                {nav.label}
              </a>
            ))}
          </nav>

          {/* Right Controls: Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`font-mono text-xs font-bold uppercase px-3 py-1.5 border-2 transition-all flex items-center gap-2 ${
                isDark
                  ? "bg-[#16161B] text-[#F3EFE6] border-[#F3EFE6] hover:bg-[#D4FF00] hover:text-[#111111] hover:border-[#D4FF00]"
                  : "bg-[#111111] text-[#F3EFE6] border-[#111111] hover:bg-[#FF4D00] hover:border-[#111111]"
              }`}
              title="Switch theme mode (Asphalt Dark / Zine Paper)"
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isDark ? "bg-[#D4FF00]" : "bg-[#FF4D00]"
                }`}
              />
              {isDark ? "MODE: ASPHALT" : "MODE: ZINE PAPER"}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 border-2 font-mono text-xs font-bold ${
                isDark
                  ? "border-[#F3EFE6] text-[#F3EFE6]"
                  : "border-[#111111] text-[#111111]"
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? "CLOSE [X]" : "MENU [≡]"}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden border-t-2 px-4 py-4 space-y-2 font-mono text-sm font-bold uppercase ${
              isDark
                ? "bg-[#121216] border-[#282830]"
                : "bg-[#F3EFE6] border-[#111111]"
            }`}
          >
            {[
              { href: "#hero", label: "01 // HOME" },
              { href: "#about", label: "02 // ABOUT ME" },
              { href: "#skills", label: "03 // ARSENAL (SPECS)" },
              { href: "#projects", label: "04 // SELECTED DROPS" },
              { href: "#contact", label: "05 // CONTACT & SOCIALS" },
            ].map((nav) => (
              <a
                key={nav.href}
                href={nav.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 border border-current/20 hover:bg-[#D4FF00] hover:text-[#111111]"
              >
                {nav.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ===================================================================
          3. HERO SECTION (LOOKBOOK ISSUE #01)
         =================================================================== */}
      <section
        id="hero"
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 lg:pt-16 lg:pb-28"
      >
        {/* Top Metadata Spec Strip */}
        <div
          className={`flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b-2 font-mono text-xs ${
            isDark ? "border-[#282830]" : "border-[#111111]"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#FF4D00] text-white font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              {profile.status}
            </span>
            <span className="opacity-75 hidden sm:inline">
              SN: {profile.serialCode}
            </span>
          </div>
          <div className="flex items-center gap-4 opacity-80">
            <span>COORDS // {profile.coordinates}</span>
            {localTime && (
              <span className="px-2 py-0.5 border border-current font-bold">
                WIB {localTime}
              </span>
            )}
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Giant Streetwear Typography & CTA (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-3 py-1.5 border-2 border-current">
              <span>★ {profile.role}</span>
            </div>

            <h1
              className="text-5xl sm:text-7xl xl:text-8xl font-black uppercase leading-[0.95] tracking-tight"
              style={{ fontFamily: "'Syne', 'Anton', sans-serif" }}
            >
              <span className="block">{profile.headlineTop}</span>
              <span className="inline-block bg-[#D4FF00] text-[#111111] px-3 py-1 my-1.5 border-2 border-[#111111] shadow-[5px_5px_0px_#FF4D00] transform -rotate-1">
                {profile.headlineAccent}
              </span>
              <span className="block">{profile.headlineBottom}</span>
            </h1>

            <p className="text-base sm:text-lg max-w-2xl leading-relaxed opacity-90 font-medium">
              {profile.shortBio}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="px-7 py-4 bg-[#D4FF00] text-[#111111] font-mono text-sm font-black uppercase tracking-wider border-2 border-[#111111] shadow-[5px_5px_0px_#FF4D00] hover:translate-x-0.5 hover:-translate-y-0.5 transition-all"
              >
                EXPLORE DROPS ({projects.length}) →
              </a>
              <a
                href="#contact"
                className={`px-7 py-4 font-mono text-sm font-bold uppercase tracking-wider border-2 transition-all ${
                  isDark
                    ? "bg-[#16161B] text-[#F3EFE6] border-[#F3EFE6] hover:bg-[#FF4D00] hover:border-[#FF4D00] hover:text-white"
                    : "bg-white text-[#111111] border-[#111111] shadow-[5px_5px_0px_#111111] hover:bg-[#FF4D00] hover:text-white"
                }`}
              >
                HIT THE LINE // COLLAB
              </a>
            </div>

            {/* Key Metrics / Garment Spec Counters */}
            <div className="pt-6 grid grid-cols-3 gap-3 sm:gap-5">
              {profile.stats.map((st, idx) => (
                <div
                  key={idx}
                  className={`p-4 border-2 transition-transform hover:-translate-y-1 ${
                    isDark
                      ? "bg-[#141418] border-[#2C2C35]"
                      : "bg-white border-[#111111] shadow-[4px_4px_0px_#111111]"
                  }`}
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#FF4D00] font-bold">
                    {st.code}
                  </div>
                  <div
                    className="text-3xl sm:text-4xl font-black mt-1"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {st.value}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-wider opacity-80 mt-1">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Streetwear Hangtag & Avatar Portrait Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            {/* Floating Rotated Street Sticker */}
            <div className="absolute -top-5 -right-2 sm:-right-4 z-20 bg-[#FF4D00] text-white font-mono text-xs font-black uppercase px-4 py-2 border-2 border-[#111111] shadow-[4px_4px_0px_#D4FF00] rotate-6 select-none">
              LIMITED EDITION // {profile.name}
            </div>

            {/* Framed Lookbook Card */}
            <div
              className={`border-2 p-3 sm:p-4 relative ${
                isDark
                  ? "bg-[#16161B] border-[#F3EFE6] shadow-[8px_8px_0px_#D4FF00]"
                  : "bg-white border-[#111111] shadow-[8px_8px_0px_#111111]"
              }`}
            >
              {/* Card Top Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-current font-mono text-xs font-bold">
                <span>ID // {profile.fullName.toUpperCase()}</span>
                <span className="px-2 py-0.5 bg-[#D4FF00] text-[#111111]">
                  VERIFIED
                </span>
              </div>

              {/* Avatar Artwork or User Photo */}
              <div className="aspect-[4/4.5] w-full overflow-hidden border-2 border-[#111111] bg-[#121215] relative group">
                {profile.avatarUrl ? (
                  <>
                    <img
                      src={profile.avatarUrl}
                      alt={profile.fullName}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Streetwear Viewfinder Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />
                    <div className="pointer-events-none absolute top-3 left-3 px-2 py-0.5 bg-black/75 border border-[#D4FF00] font-mono text-[10px] text-[#D4FF00] font-bold tracking-widest uppercase">
                      REC ● [{profile.name}]
                    </div>
                    <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <span className="px-2.5 py-1 bg-[#D4FF00] text-[#111111] border border-[#111111] font-mono text-xs font-black uppercase shadow-[3px_3px_0px_#FF4D00]">
                        {profile.fullName}
                      </span>
                      <span className="px-2 py-0.5 bg-black/80 text-white font-mono text-[10px] border border-white/30">
                        {profile.serialCode}
                      </span>
                    </div>
                  </>
                ) : (
                  <StreetwearAvatarSVG name={profile.name} />
                )}
              </div>

              {/* Garment Care / Woven Label Footer */}
              <div className="mt-4 pt-3 border-t-2 border-current flex items-center justify-between gap-4">
                <div className="font-mono text-[11px] leading-tight space-y-0.5">
                  <div className="font-black uppercase">
                    CRAFT: 100% VIBE CODING × RMIK
                  </div>
                  <div className="opacity-75">
                    ORIGIN: {profile.location} — BY {profile.name}
                  </div>
                </div>
                <BarcodeGraphic className="h-8 shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. TENTANG SAYA (SEC // 01 — MANIFESTO & VIBE)
         =================================================================== */}
      <section
        id="about"
        className={`py-20 border-t-2 ${
          isDark
            ? "border-[#282830] bg-[#101014]"
            : "border-[#111111] bg-[#EAE4D7]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-block font-mono text-xs font-black uppercase px-3 py-1 bg-[#FF4D00] text-white mb-3">
                {about.sectionCode}
              </div>
              <h2
                className="text-4xl sm:text-6xl font-black uppercase tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {about.title}
              </h2>
            </div>
            <p className="font-mono text-xs sm:text-sm max-w-md opacity-80 uppercase">
              {about.subtitle}
            </p>
          </div>

          {/* Editorial Manifesto + Woven Care Label Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Bio Narrative (8 cols) */}
            <div
              className={`lg:col-span-8 p-6 sm:p-8 border-2 space-y-5 ${
                isDark
                  ? "bg-[#16161C] border-[#F3EFE6]"
                  : "bg-white border-[#111111] shadow-[6px_6px_0px_#111111]"
              }`}
            >
              <div className="font-mono text-xs font-bold uppercase text-[#FF4D00] tracking-widest">
                // EDITORIAL BIOGRAPHY
              </div>
              {about.paragraphs.map((para, idx) => (
                <p
                  key={idx}
                  className="text-base sm:text-lg leading-relaxed opacity-95"
                >
                  {para}
                </p>
              ))}

              {/* Street Quote Highlight */}
              <div className="p-4 bg-[#D4FF00] text-[#111111] border-2 border-[#111111] font-mono text-sm sm:text-base font-black uppercase tracking-wide">
                {about.quote}
              </div>
            </div>

            {/* Daily Rotation / Culture Card (4 cols) */}
            <div
              className={`lg:col-span-4 p-6 border-2 flex flex-col justify-between ${
                isDark
                  ? "bg-[#16161C] border-[#D4FF00] shadow-[6px_6px_0px_#D4FF00]"
                  : "bg-[#111111] text-[#F3EFE6] border-[#111111] shadow-[6px_6px_0px_#FF4D00]"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-current/30 pb-3">
                  <span className="font-mono text-xs font-black uppercase text-[#D4FF00]">
                    CULTURE TAG // SPEC
                  </span>
                  <span className="font-mono text-xs">[2026]</span>
                </div>

                <div className="space-y-4 pt-2 font-mono text-xs">
                  <div>
                    <div className="opacity-60 uppercase">ON ROTATION (MUSIC):</div>
                    <div className="text-sm font-bold mt-0.5 text-[#D4FF00]">
                      ♫ {about.currentVibe.listeningTo}
                    </div>
                  </div>
                  <div>
                    <div className="opacity-60 uppercase">VISUAL DIRECTION:</div>
                    <div className="text-sm font-bold mt-0.5">
                      ✦ {about.currentVibe.aesthetic}
                    </div>
                  </div>
                  <div>
                    <div className="opacity-60 uppercase">DAILY FUEL:</div>
                    <div className="text-sm font-bold mt-0.5">
                      ⚡ {about.currentVibe.fuel}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-current/30 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest">
                  AUTHENTICATED BY {profile.name}
                </span>
                <BarcodeGraphic className="h-6" />
              </div>
            </div>
          </div>

          {/* 3 Mindset Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {about.highlights.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 border-2 transition-transform hover:-translate-y-1 ${
                  isDark
                    ? "bg-[#16161C] border-[#2E2E38] hover:border-[#D4FF00]"
                    : "bg-white border-[#111111] shadow-[5px_5px_0px_#111111]"
                }`}
              >
                <div className="font-mono text-xs font-black text-[#FF4D00] mb-2">
                  {item.tag}
                </div>
                <h3
                  className="text-xl font-black uppercase mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-85">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. KEAHLIAN / SKILLS (SEC // 02 — TECHNICAL ARSENAL)
         =================================================================== */}
      <section
        id="skills"
        className={`py-20 border-t-2 ${
          isDark ? "border-[#282830]" : "border-[#111111]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-block font-mono text-xs font-black uppercase px-3 py-1 bg-[#D4FF00] text-[#111111] border border-[#111111] mb-3">
                {skills.sectionCode}
              </div>
              <h2
                className="text-4xl sm:text-6xl font-black uppercase tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {skills.title}
              </h2>
            </div>
            <p className="font-mono text-xs sm:text-sm max-w-md opacity-80 uppercase">
              {skills.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {skills.categories.map((cat) => (
              <div
                key={cat.id}
                className={`border-2 p-6 flex flex-col justify-between ${
                  isDark
                    ? "bg-[#15151A] border-[#2E2E38] hover:border-[#F3EFE6]"
                    : "bg-white border-[#111111] shadow-[6px_6px_0px_#111111]"
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-current">
                    <h3
                      className="text-xl font-black uppercase"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {cat.name}
                    </h3>
                    <span className="font-mono text-[10px] font-black uppercase px-2.5 py-1 bg-[#FF4D00] text-white">
                      {cat.badge}
                    </span>
                  </div>

                  {/* Skill Items */}
                  <div className="space-y-5">
                    {cat.items.map((skill, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="font-bold text-sm">{skill.name}</span>
                          <span className="opacity-70 text-[10px] px-1.5 py-0.5 border border-current">
                            {skill.tag} // {skill.level}%
                          </span>
                        </div>
                        {/* Industrial Segmented Progress Bar */}
                        <div
                          className={`w-full h-3 border border-current p-0.5 ${
                            isDark ? "bg-[#0B0B0C]" : "bg-[#F3EFE6]"
                          }`}
                        >
                          <div
                            className="h-full bg-[#D4FF00] transition-all duration-500"
                            style={{
                              width: `${skill.level}%`,
                              backgroundColor:
                                idx % 2 === 0 ? "#D4FF00" : "#FF4D00",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-3 border-t border-current/20 flex items-center justify-between font-mono text-[10px] opacity-60">
                  <span>SPEC VERIFIED</span>
                  <span>STATUS: ACTIVE</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          6. DAFTAR PROJEK / PORTFOLIO (SEC // 03 — SELECTED DROPS)
         =================================================================== */}
      <section
        id="projects"
        className={`py-20 border-t-2 ${
          isDark
            ? "border-[#282830] bg-[#101014]"
            : "border-[#111111] bg-[#EAE4D7]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Controls */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-block font-mono text-xs font-black uppercase px-3 py-1 bg-[#FF4D00] text-white mb-3">
                SEC // 03 — ARCHIVE CATALOG
              </div>
              <h2
                className="text-4xl sm:text-6xl font-black uppercase tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                SELECTED DROPS
              </h2>
            </div>

            {/* Category Filter Pills + Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`font-mono text-xs font-black uppercase px-3.5 py-2 border-2 transition-all ${
                        active
                          ? "bg-[#D4FF00] text-[#111111] border-[#111111] shadow-[3px_3px_0px_#FF4D00]"
                          : isDark
                          ? "bg-[#16161C] text-[#F3EFE6] border-[#2E2E38] hover:border-[#D4FF00]"
                          : "bg-white text-[#111111] border-[#111111] hover:bg-[#D4FF00]"
                      }`}
                    >
                      {cat === "ALL" ? `ALL DROPS (${projects.length})` : cat}
                    </button>
                  );
                })}
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search drops / tech..."
                className={`font-mono text-xs px-3.5 py-2 border-2 focus:outline-none ${
                  isDark
                    ? "bg-[#16161C] border-[#2E2E38] text-[#F3EFE6] focus:border-[#D4FF00]"
                    : "bg-white border-[#111111] text-[#111111] focus:border-[#FF4D00]"
                }`}
              />
            </div>
          </div>

          {/* Project Lookbook Grid */}
          {filteredProjects.length === 0 ? (
            <div className="p-12 border-2 border-dashed border-current text-center font-mono">
              No project drops found matching "{searchQuery}".
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className={`group border-2 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                    isDark
                      ? "bg-[#16161C] border-[#F3EFE6] shadow-[6px_6px_0px_#282830] hover:shadow-[8px_8px_0px_#D4FF00]"
                      : "bg-white border-[#111111] shadow-[6px_6px_0px_#111111] hover:shadow-[8px_8px_0px_#FF4D00]"
                  }`}
                >
                  <div>
                    {/* Top Serial Strip */}
                    <div className="px-5 py-3 border-b-2 border-current flex items-center justify-between font-mono text-xs font-bold">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block w-3 h-3 border border-black"
                          style={{ backgroundColor: project.accentColor || "#D4FF00" }}
                        />
                        <span>{project.dropNumber}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {project.featured && (
                          <span className="px-2 py-0.5 bg-[#D4FF00] text-[#111111] font-black text-[10px]">
                            FEATURED DROP
                          </span>
                        )}
                        <span className="opacity-75">[{project.year}]</span>
                      </div>
                    </div>

                    {/* Visual Artwork / Screenshot Preview */}
                    <div
                      onClick={() => setActiveProject(project)}
                      className="aspect-[16/9.6] w-full overflow-hidden border-b-2 border-current bg-[#101013] relative cursor-pointer"
                    >
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <ProjectPosterSVG project={project} />
                      )}
                      <div className="absolute bottom-3 right-3 bg-[#111111]/90 text-[#D4FF00] border border-[#D4FF00] font-mono text-[11px] font-bold px-3 py-1 uppercase group-hover:bg-[#D4FF00] group-hover:text-[#111111] transition-colors">
                        CLICK FOR FULL SPEC [+]
                      </div>
                    </div>

                    {/* Project Body */}
                    <div className="p-6 space-y-4">
                      <div>
                        <div className="font-mono text-xs uppercase text-[#FF4D00] font-bold">
                          {project.category} — {project.subtitle}
                        </div>
                        <h3
                          className="text-2xl sm:text-3xl font-black uppercase mt-1"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-sm sm:text-base leading-relaxed opacity-85">
                        {project.summary}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className={`font-mono text-[11px] font-bold px-2.5 py-1 border ${
                              isDark
                                ? "bg-[#0B0B0C] border-[#2E2E38] text-[#F3EFE6]"
                                : "bg-[#F3EFE6] border-[#111111] text-[#111111]"
                            }`}
                          >
                            #{tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Buttons */}
                  <div className="px-6 py-4 border-t-2 border-current flex flex-wrap items-center justify-between gap-3 font-mono text-xs font-bold uppercase">
                    <button
                      onClick={() => setActiveProject(project)}
                      className="px-4 py-2 bg-[#D4FF00] text-[#111111] border-2 border-[#111111] font-black hover:bg-[#FF4D00] hover:text-white transition-colors"
                    >
                      INSPECT SPEC // DETAIL
                    </button>
                    <div className="flex items-center gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="underline hover:text-[#FF4D00]"
                        >
                          LIVE DEMO ↗
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="underline hover:text-[#D4FF00]"
                        >
                          GITHUB ↗
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===================================================================
          7. KONTAK & SOSIAL MEDIA (SEC // 04 — TRANSMISSION)
         =================================================================== */}
      <section
        id="contact"
        className={`py-20 border-t-2 ${
          isDark ? "border-[#282830]" : "border-[#111111]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Poster CTA & Social Media Cards (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="inline-block font-mono text-xs font-black uppercase px-3 py-1 bg-[#D4FF00] text-[#111111] border border-[#111111] mb-3">
                  {contact.sectionCode}
                </div>
                <h2
                  className="text-4xl sm:text-6xl font-black uppercase leading-none tracking-tight"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {contact.headline}
                </h2>
                <p className="mt-4 text-base sm:text-lg opacity-90 max-w-xl">
                  {contact.subheadline}
                </p>
              </div>

              {/* Direct Email Copy Box */}
              <div
                className={`p-5 border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDark
                    ? "bg-[#16161C] border-[#D4FF00]"
                    : "bg-white border-[#111111] shadow-[5px_5px_0px_#111111]"
                }`}
              >
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest opacity-70">
                    DIRECT ELECTRONIC MAIL
                  </div>
                  <div className="font-mono text-base sm:text-xl font-black break-all mt-0.5">
                    {contact.email}
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2.5 bg-[#D4FF00] text-[#111111] font-mono text-xs font-black uppercase border-2 border-[#111111] shrink-0 hover:bg-[#FF4D00] hover:text-white transition-colors"
                >
                  {copiedEmail ? "✓ COPIED TO CLIPBOARD!" : "COPY EMAIL [+]"}
                </button>
              </div>

              {/* Social Media Street Grid */}
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-wider mb-3 opacity-80">
                  // OFFICIAL CHANNELS & SOCIAL NETWORKS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contact.socials.map((soc, idx) => (
                    <a
                      key={idx}
                      href={soc.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`p-4 border-2 flex items-center justify-between group transition-all hover:-translate-y-1 ${
                        isDark
                          ? "bg-[#15151A] border-[#2E2E38] hover:border-[#D4FF00]"
                          : "bg-white border-[#111111] shadow-[4px_4px_0px_#111111] hover:bg-[#D4FF00]"
                      }`}
                    >
                      <div>
                        <div className="font-mono text-[10px] uppercase text-[#FF4D00] font-bold">
                          {soc.tag}
                        </div>
                        <div
                          className="text-lg font-black uppercase"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          {soc.platform}
                        </div>
                        <div className="font-mono text-xs opacity-75">
                          {soc.handle}
                        </div>
                      </div>
                      <span className="font-mono text-xl font-black group-hover:translate-x-1 transition-transform">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Quick Transmission Form (5 cols) */}
            <div className="lg:col-span-5">
              <div
                className={`p-6 sm:p-8 border-2 ${
                  isDark
                    ? "bg-[#16161C] border-[#F3EFE6] shadow-[8px_8px_0px_#FF4D00]"
                    : "bg-white border-[#111111] shadow-[8px_8px_0px_#111111]"
                }`}
              >
                <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-current">
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[#FF4D00] font-bold">
                      INSTANT DISPATCH
                    </div>
                    <h3
                      className="text-2xl font-black uppercase"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      SEND A MESSAGE
                    </h3>
                  </div>
                  <BarcodeGraphic className="h-7" />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-mono text-xs font-bold uppercase mb-1.5">
                      01 // YOUR NAME OR BRAND
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g., Alex / Creative Studio"
                      className={`w-full px-3.5 py-2.5 border-2 font-mono text-sm focus:outline-none ${
                        isDark
                          ? "bg-[#0B0B0C] border-[#2E2E38] text-[#F3EFE6] focus:border-[#D4FF00]"
                          : "bg-[#F3EFE6] border-[#111111] text-[#111111]"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase mb-1.5">
                      02 // PROJECT DETAILS OR MESSAGE
                    </label>
                    <textarea
                      rows={4}
                      value={senderMsg}
                      onChange={(e) => setSenderMsg(e.target.value)}
                      placeholder="Tell me about your project idea, collaboration, or just say hi..."
                      className={`w-full px-3.5 py-2.5 border-2 font-mono text-sm focus:outline-none ${
                        isDark
                          ? "bg-[#0B0B0C] border-[#2E2E38] text-[#F3EFE6] focus:border-[#D4FF00]"
                          : "bg-[#F3EFE6] border-[#111111] text-[#111111]"
                      }`}
                    />
                  </div>

                  {msgSentNotice && (
                    <div className="p-3 bg-[#D4FF00] text-[#111111] font-mono text-xs font-bold uppercase">
                      ✓ {msgSentNotice}
                    </div>
                  )}

                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleSendQuickMessage("email")}
                      className="w-full py-3.5 px-4 bg-[#D4FF00] text-[#111111] border-2 border-[#111111] font-mono text-xs font-black uppercase hover:bg-[#FF4D00] hover:text-white transition-colors"
                    >
                      SEND VIA EMAIL ✉
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleSendQuickMessage(
                          contact.whatsappNumber ? "whatsapp" : "instagram"
                        )
                      }
                      className={`w-full py-3.5 px-4 border-2 font-mono text-xs font-black uppercase transition-colors ${
                        isDark
                          ? "bg-[#111111] text-[#F3EFE6] border-[#F3EFE6] hover:bg-[#D4FF00] hover:text-[#111111] hover:border-[#D4FF00]"
                          : "bg-[#111111] text-white border-[#111111] hover:bg-[#FF4D00]"
                      }`}
                    >
                      {contact.whatsappNumber
                        ? "CHAT WHATSAPP ↗"
                        : "DM INSTAGRAM ↗"}
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-current/20 font-mono text-[11px] opacity-75">
                  📍 {contact.locationNote}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          8. FOOTER (GARMENT CARE LABEL & COPYRIGHT)
         =================================================================== */}
      <footer
        className={`border-t-2 py-10 font-mono text-xs ${
          isDark
            ? "bg-[#08080A] border-[#282830] text-[#F3EFE6]"
            : "bg-[#111111] border-[#111111] text-[#F3EFE6]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-[#D4FF00] text-[#111111] font-black">
              {profile.nickname}
            </span>
            <span>
              © {new Date().getFullYear()} {profile.fullName}. ALL RIGHTS RESERVED.
            </span>
          </div>
          <div className="flex items-center gap-4 opacity-80">
            <span>AESTHETIC CULTURE // STREETWEAR EDITION</span>
            <a href="#hero" className="text-[#D4FF00] font-bold hover:underline">
              TOP ↑
            </a>
          </div>
        </div>
      </footer>

      {/* ===================================================================
          9. INTERACTIVE PROJECT DETAIL MODAL (LOOKBOOK SPEC SHEET)
         =================================================================== */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`max-w-2xl w-full border-2 p-6 sm:p-8 relative my-8 ${
              isDark
                ? "bg-[#141419] text-[#F3EFE6] border-[#D4FF00] shadow-[10px_10px_0px_#D4FF00]"
                : "bg-[#F3EFE6] text-[#111111] border-[#111111] shadow-[10px_10px_0px_#FF4D00]"
            }`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-current">
              <div className="font-mono text-xs font-black uppercase">
                <span className="px-2 py-0.5 bg-[#FF4D00] text-white mr-2">
                  {activeProject.dropNumber}
                </span>
                <span>
                  {activeProject.category} // {activeProject.year}
                </span>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="font-mono text-xs font-black px-3 py-1 bg-[#D4FF00] text-[#111111] border border-[#111111]"
              >
                CLOSE [ESC]
              </button>
            </div>

            <h3
              className="text-3xl sm:text-4xl font-black uppercase"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {activeProject.title}
            </h3>
            <p className="font-mono text-xs uppercase text-[#FF4D00] font-bold mt-1">
              {activeProject.subtitle}
            </p>

            <div className="mt-5 space-y-4 text-sm sm:text-base">
              <p className="leading-relaxed">{activeProject.summary}</p>

              {activeProject.challenge && (
                <div
                  className={`p-4 border-l-4 border-[#D4FF00] ${
                    isDark ? "bg-[#0B0B0C]" : "bg-white"
                  }`}
                >
                  <div className="font-mono text-xs font-black uppercase text-[#FF4D00] mb-1">
                    // THE CHALLENGE & CONCEPT
                  </div>
                  <p className="text-sm leading-relaxed">
                    {activeProject.challenge}
                  </p>
                </div>
              )}

              {activeProject.features && (
                <div>
                  <div className="font-mono text-xs font-black uppercase mb-2">
                    // KEY FEATURES & SPECS:
                  </div>
                  <ul className="space-y-1.5 font-mono text-xs sm:text-sm">
                    {activeProject.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#FF4D00] font-black">■</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2">
                <div className="font-mono text-xs font-black uppercase mb-2">
                  // TECH STACK:
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeProject.techStack.map((t, i) => (
                    <span
                      key={i}
                      className="font-mono text-xs font-bold px-2.5 py-1 bg-[#D4FF00] text-[#111111] border border-[#111111]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t-2 border-current flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 bg-[#D4FF00] text-[#111111] border-2 border-[#111111] font-mono text-xs font-black uppercase hover:bg-[#FF4D00] hover:text-white transition-colors"
                  >
                    OPEN LIVE DEMO ↗
                  </a>
                )}
                {activeProject.repoUrl && (
                  <a
                    href={activeProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 border-2 border-current font-mono text-xs font-bold uppercase hover:bg-[#D4FF00] hover:text-[#111111] transition-colors"
                  >
                    SOURCE CODE ↗
                  </a>
                )}
              </div>
              <BarcodeGraphic className="h-6" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
