import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F1E4",
        "paper-dark": "#EDE2C9",
        ink: "#2B2118",
        maroon: {
          DEFAULT: "#7C1F2B",
          dark: "#57121B",
          light: "#9A2E3B",
        },
        indigo: {
          DEFAULT: "#1C2A47",
          dark: "#121C31",
        },
        brass: {
          DEFAULT: "#B8863B",
          light: "#E3C387",
          dark: "#8C6423",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 1px 1px, rgba(43,33,24,0.06) 1px, transparent 0)",
      },
      boxShadow: {
        board: "0 20px 45px -20px rgba(28,42,71,0.45)",
        card: "0 10px 30px -12px rgba(43,33,24,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
