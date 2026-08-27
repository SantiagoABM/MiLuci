import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#1B2A4A",
        indigo: "#3B4C8C",
        periwinkle: "#7B8FD6",
        peony: "#E893B3",
        "peony-deep": "#C65D82",
        blush: "#FBE4EC",
        cream: "#FFF8F5",
        gold: "#D9B382",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
      },
      keyframes: {
        bloom: {
          "0%": { transform: "scale(0.85) rotate(-4deg)", opacity: "0.7" },
          "60%": { transform: "scale(1.05) rotate(2deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px 2px rgba(198,93,130,0.35)" },
          "50%": { boxShadow: "0 0 34px 8px rgba(59,76,140,0.45)" },
        },
        petals: {
          "0%": { strokeDashoffset: "300" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        bloom: "bloom 900ms cubic-bezier(0.22,1,0.36,1) forwards",
        drift: "drift 6s ease-in-out infinite",
        glow: "glow 3.2s ease-in-out infinite",
        petals: "petals 1.6s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;
