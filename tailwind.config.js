/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "sans-serif"],
        poster: ["Anton", "sans-serif"],
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        acid: "#D4FF00",
        safety: "#FF4D00",
        asphalt: "#0B0B0C",
        concrete: "#151518",
        paper: "#F3EFE6",
      },
      boxShadow: {
        brutal: "5px 5px 0px 0px #D4FF00",
        "brutal-orange": "5px 5px 0px 0px #FF4D00",
        "brutal-dark": "5px 5px 0px 0px #111111",
        "brutal-white": "5px 5px 0px 0px #F3EFE6",
      },
    },
  },
  plugins: [],
};
