import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        coal: "var(--coal)",
        ash: "var(--ash)",
        graphite: "var(--graphite)",
        bone: "var(--bone)",
        "bone-dim": "var(--bone-dim)",
        red: {
          shobbl: "var(--shobbl-red)",
          deep: "var(--shobbl-red-deep)",
        },
        line: "var(--line)",
      },
      fontFamily: {
        headline: ["var(--font-headline)", "Georgia", "serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        editorial: ["var(--font-editorial)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        brand: ["var(--font-brand)", "sans-serif"],
      },
      maxWidth: {
        manifesto: "62rem",
        wall: "84rem",
        narrow: "44rem",
      },
    },
  },
  plugins: [],
};

export default config;
