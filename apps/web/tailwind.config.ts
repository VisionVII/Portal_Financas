import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/design-system/tokens.ts",
  ],
  theme: {
    extend: {
      // === PALETA QUANTUM FINANCE ===
      colors: {
        // Fundos
        void:    "#080B14",
        cosmos:  "#0D1117",
        nebula:  "#161B27",
        crater:  "#1E2538",
        orbit:   "#252D42",

        // Accents
        aurora:  "#00D4FF",
        plasma:  "#7B61FF",
        pulse:   "#00FF94",
        flare:   "#FF4D6D",
        solar:   "#FFB800",
        nova:    "#FF6B35",

        // Texto
        star:      "#E8EDF5",
        moonlight: "#B8C2D4",
        comet:     "#8892A4",
        asteroid:  "#4A5568",

        // Semânticas financeiras
        bullish:   "#00FF94",
        bearish:   "#FF4D6D",
        neutral:   "#FFB800",

        // Alias de sistema
        background: "#0D1117",
        foreground:  "#E8EDF5",
        border:      "#252D42",
        input:       "#1E2538",
        ring:        "#00D4FF",

        primary: {
          DEFAULT: "#00D4FF",
          foreground: "#080B14",
        },
        secondary: {
          DEFAULT: "#7B61FF",
          foreground: "#E8EDF5",
        },
        accent: {
          DEFAULT: "#1E2538",
          foreground: "#E8EDF5",
        },
        muted: {
          DEFAULT: "#161B27",
          foreground: "#8892A4",
        },
        destructive: {
          DEFAULT: "#FF4D6D",
          foreground: "#E8EDF5",
        },
        card: {
          DEFAULT: "#161B27",
          foreground: "#E8EDF5",
        },
        popover: {
          DEFAULT: "#161B27",
          foreground: "#E8EDF5",
        },
      },

      // === TIPOGRAFIA ===
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans:    ["Inter", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1" }],
      },

      // === BORDAS ===
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "6px",
      },

      // === SOMBRAS ===
      boxShadow: {
        aurora:  "0 0 20px rgba(0,212,255,0.15)",
        plasma:  "0 0 20px rgba(123,97,255,0.15)",
        pulse:   "0 0 20px rgba(0,255,148,0.15)",
        flare:   "0 0 20px rgba(255,77,109,0.15)",
        card:    "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(0,212,255,0.1)",
        glow:    "0 0 40px rgba(0,212,255,0.2)",
      },

      // === GRADIENTES (via background-image) ===
      backgroundImage: {
        "gradient-aurora": "linear-gradient(135deg, #00D4FF 0%, #7B61FF 100%)",
        "gradient-pulse":  "linear-gradient(135deg, #00FF94 0%, #00D4FF 100%)",
        "gradient-cosmos": "linear-gradient(180deg, #0D1117 0%, #080B14 100%)",
        "gradient-card":   "linear-gradient(135deg, #161B27 0%, #1E2538 100%)",
        "gradient-bullish":"linear-gradient(135deg, #00FF94 0%, #00D4FF 80%)",
        "gradient-bearish":"linear-gradient(135deg, #FF4D6D 0%, #FF6B35 100%)",
        "gradient-radial": "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
      },

      // === ANIMAÇÕES ===
      keyframes: {
        "pulse-aurora": {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0.5" },
        },
        "slide-up": {
          "0%":   { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)",    opacity: "1" },
        },
        "slide-down": {
          "0%":   { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)",     opacity: "1" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "ticker": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "number-change": {
          "0%":   { transform: "scale(1.05)", color: "#00FF94" },
          "100%": { transform: "scale(1)",    color: "inherit" },
        },
        shimmer: {
          "0%":    { backgroundPosition: "-200% 0" },
          "100%":  { backgroundPosition: "200% 0" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,212,255,0.15)" },
          "50%":       { boxShadow: "0 0 40px rgba(0,212,255,0.35)" },
        },
      },
      animation: {
        "pulse-aurora":  "pulse-aurora 2s ease-in-out infinite",
        "slide-up":      "slide-up 0.25s ease-out",
        "slide-down":    "slide-down 0.25s ease-out",
        "fade-in":       "fade-in 0.25s ease-out",
        "ticker":        "ticker 30s linear infinite",
        "number-change": "number-change 0.4s ease-out",
        shimmer:         "shimmer 2s infinite",
        "glow-pulse":    "glow-pulse 3s ease-in-out infinite",
      },

      // === SPACING EXTRA ===
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
