/**
 * Quantum Finance Design System — Tokens
 * Portal Finanças | packages/design-system
 *
 * Filosofia: Dados como arte. Clareza radical. Densidade inteligente.
 * Inspiração: a profundidade do cosmos — onde informação emerge da escuridão com precisão.
 */

export const colors = {
  // === FUNDOS — Escala cósmica ===
  void: "#080B14",      // Fundo mais profundo (overlays, modais)
  cosmos: "#0D1117",    // Fundo primário da aplicação
  nebula: "#161B27",    // Cards, painéis, sidebars
  crater: "#1E2538",    // Input fields, hover states
  orbit: "#252D42",     // Borders, dividers

  // === ACCENTS — Espectro quântico ===
  aurora: "#00D4FF",    // Accent primário — ciano elétrico
  plasma: "#7B61FF",    // Accent secundário — roxo quântico
  pulse: "#00FF94",     // Positivo / Alta / Bullish
  flare: "#FF4D6D",     // Negativo / Baixa / Bearish
  solar: "#FFB800",     // Alerta / Atenção / Neutro
  nova: "#FF6B35",      // Ação crítica / CTA especial

  // === TEXTO — Hierarquia estelar ===
  star: "#E8EDF5",      // Texto primário
  moonlight: "#B8C2D4", // Texto secundário
  comet: "#8892A4",     // Texto terciário / placeholders
  asteroid: "#4A5568",  // Texto desabilitado

  // === ESTADOS ===
  success: "#00FF94",
  warning: "#FFB800",
  error: "#FF4D6D",
  info: "#00D4FF",

  // === GRADIENTES (como strings CSS) ===
  gradients: {
    aurora: "linear-gradient(135deg, #00D4FF 0%, #7B61FF 100%)",
    pulse: "linear-gradient(135deg, #00FF94 0%, #00D4FF 100%)",
    cosmos: "linear-gradient(180deg, #0D1117 0%, #080B14 100%)",
    card: "linear-gradient(135deg, #161B27 0%, #1E2538 100%)",
    bullish: "linear-gradient(135deg, #00FF94 0%, #00D4FF 80%)",
    bearish: "linear-gradient(135deg, #FF4D6D 0%, #FF6B35 100%)",
  },
} as const;

export const typography = {
  // === FAMÍLIAS ===
  families: {
    display: "'Space Grotesk', sans-serif",   // Headings, dados, números grandes
    body: "'Inter', sans-serif",               // Interface, parágrafos, labels
    mono: "'JetBrains Mono', monospace",       // Preços, tickers, código
  },

  // === ESCALA MODULAR (base 16px, razão 1.25) ===
  sizes: {
    "2xs": "0.625rem",   //  10px
    xs:    "0.75rem",    //  12px
    sm:    "0.875rem",   //  14px
    base:  "1rem",       //  16px
    lg:    "1.125rem",   //  18px
    xl:    "1.25rem",    //  20px
    "2xl": "1.5rem",     //  24px
    "3xl": "1.875rem",   //  30px
    "4xl": "2.25rem",    //  36px
    "5xl": "3rem",       //  48px
    "6xl": "3.75rem",    //  60px
    "7xl": "4.5rem",     //  72px
  },

  weights: {
    light:    300,
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
    black:    900,
  },

  lineHeights: {
    tight:   1.1,
    snug:    1.25,
    normal:  1.5,
    relaxed: 1.625,
    loose:   2,
  },

  letterSpacings: {
    tighter: "-0.05em",
    tight:   "-0.025em",
    normal:  "0em",
    wide:    "0.025em",
    wider:   "0.05em",
    widest:  "0.1em",
  },
} as const;

export const spacing = {
  0:    "0px",
  px:   "1px",
  0.5:  "0.125rem",   //  2px
  1:    "0.25rem",    //  4px
  1.5:  "0.375rem",   //  6px
  2:    "0.5rem",     //  8px
  2.5:  "0.625rem",   // 10px
  3:    "0.75rem",    // 12px
  3.5:  "0.875rem",   // 14px
  4:    "1rem",       // 16px
  5:    "1.25rem",    // 20px
  6:    "1.5rem",     // 24px
  7:    "1.75rem",    // 28px
  8:    "2rem",       // 32px
  10:   "2.5rem",     // 40px
  12:   "3rem",       // 48px
  16:   "4rem",       // 64px
  20:   "5rem",       // 80px
  24:   "6rem",       // 96px
  32:   "8rem",       // 128px
} as const;

export const borderRadius = {
  none:  "0px",
  sm:    "4px",
  base:  "6px",
  md:    "8px",
  lg:    "12px",
  xl:    "16px",
  "2xl": "20px",
  "3xl": "24px",
  full:  "9999px",
} as const;

export const shadows = {
  sm:    "0 1px 2px rgba(0,0,0,0.3)",
  base:  "0 2px 8px rgba(0,0,0,0.4)",
  md:    "0 4px 16px rgba(0,0,0,0.5)",
  lg:    "0 8px 32px rgba(0,0,0,0.6)",
  xl:    "0 16px 48px rgba(0,0,0,0.7)",
  aurora: "0 0 20px rgba(0,212,255,0.15)",
  plasma: "0 0 20px rgba(123,97,255,0.15)",
  pulse:  "0 0 20px rgba(0,255,148,0.15)",
  flare:  "0 0 20px rgba(255,77,109,0.15)",
  card:   "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
} as const;

export const breakpoints = {
  sm:  "640px",
  md:  "768px",
  lg:  "1024px",
  xl:  "1280px",
  "2xl": "1536px",
  "3xl": "1920px",
} as const;

export const zIndex = {
  base:    0,
  raised:  10,
  overlay: 100,
  modal:   200,
  toast:   300,
  tooltip: 400,
} as const;

export const animation = {
  durations: {
    instant:   "50ms",
    fast:      "150ms",
    normal:    "250ms",
    slow:      "400ms",
    slower:    "600ms",
  },
  easings: {
    linear:     "linear",
    easeIn:     "cubic-bezier(0.4, 0, 1, 1)",
    easeOut:    "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut:  "cubic-bezier(0.4, 0, 0.2, 1)",
    spring:     "cubic-bezier(0.34, 1.56, 0.64, 1)",
    smooth:     "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
} as const;

// === TOKENS SEMÂNTICOS para componentes financeiros ===
export const financial = {
  bullish:   colors.pulse,   // Verde — alta
  bearish:   colors.flare,   // Vermelho — baixa
  neutral:   colors.solar,   // Amarelo — neutro/sem variação
  volume:    colors.aurora,  // Ciano — volume
  signal:    colors.plasma,  // Roxo — sinal de IA
} as const;

export const tokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  zIndex,
  animation,
  financial,
} as const;

export default tokens;
