import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import CommandPalette from "@/components/layout/CommandPalette";
import MarketProvider from "@/providers/MarketProvider";
import "../styles/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0D1117",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Portal Finanças — Inteligência Financeira em Tempo Real",
    template: "%s | Portal Finanças",
  },
  description:
    "Plataforma financeira de próxima geração com IA integrada. Análise técnica, fundamentalista, crypto, forex, ações e muito mais.",
  keywords: [
    "finanças",
    "investimentos",
    "análise técnica",
    "crypto",
    "forex",
    "ações",
    "inteligência artificial",
    "mercado financeiro",
  ],
  authors: [{ name: "Portal Finanças" }],
  creator: "Portal Finanças",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Portal Finanças",
    description: "Plataforma financeira orientada a IA",
    siteName: "Portal Finanças",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-cosmos text-star antialiased">
        <MarketProvider>
          {children}
        </MarketProvider>
        <CommandPalette />
        <Analytics />
      </body>
    </html>
  );
}
