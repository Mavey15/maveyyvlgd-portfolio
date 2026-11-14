import "./globals.css";

export const metadata = {
  title: "MaveyyVlgd (Muhammad Adhitya Pratama) — Personal Archive & Vibe Coding Portfolio",
  description:
    "Website pribadi Muhammad Adhitya Pratama (MaveyyVlgd) — RMIK Enthusiast & Vibe Coder dari Pacitan. Berisi profil dan arsip projek (Kalkulator Statistik RS, RME & SIMRS, E-SOP, Klinik Asy-Syifa).",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:ital,wght@0,400..800;1,400..800&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-[#D4FF00] selection:text-black">
        {children}
      </body>
    </html>
  );
}
