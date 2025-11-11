import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kiwizOrange: "#FF6B00",
        kiwizYellow: "#FFD700",
        kiwizBlue: "#007BFF",
        kiwizBackground: "#FFF8F0",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
      },
      keyframes: {
        spinGentle: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseLight: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.8" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        spinGentle: "spinGentle 6s linear infinite",
        pulseLight: "pulseLight 3s ease-in-out infinite",
        fadeInUp: "fadeInUp 0.8s ease-out",
      },
    },
  },
  plugins: [],
}
export default config
