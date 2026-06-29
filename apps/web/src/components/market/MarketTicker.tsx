"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useMarketStore } from "@/store/useMarketStore";

// Fallback estático enquanto o store carrega
const FALLBACK = [
  { symbol: "BTC/USD", price: 67450,   change:  2.34 },
  { symbol: "ETH/USD", price: 3521.8,  change:  1.87 },
  { symbol: "PETR4",   price: 38.72,   change: -0.51 },
  { symbol: "VALE3",   price: 62.15,   change:  0.82 },
  { symbol: "EUR/USD", price: 1.0842,  change: -0.12 },
  { symbol: "USD/BRL", price: 5.1230,  change:  0.33 },
  { symbol: "IBOV",    price: 134250,  change:  0.71 },
  { symbol: "S&P500",  price: 5842.50, change:  0.45 },
  { symbol: "GOLD",    price: 2648.30, change:  0.28 },
  { symbol: "WTI",     price: 78.42,   change: -1.15 },
  { symbol: "SOL/USD", price: 182.50,  change:  4.21 },
  { symbol: "AAPL",    price: 228.50,  change:  1.23 },
  { symbol: "NVDA",    price: 486.20,  change:  3.41 },
  { symbol: "NASDAQ",  price: 18760,   change:  0.62 },
  { symbol: "BNB/USD", price: 602.40,  change: -0.88 },
];

function formatPrice(price: number, symbol: string): string {
  if (symbol.includes("USD/") || price < 1) return price.toFixed(4);
  if (price >= 10_000) return price.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (price >= 100) return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return price.toFixed(2);
}

export default function MarketTicker() {
  const { assets, isLoading, dataSource } = useMarketStore();

  const tickerItems = isLoading || Object.keys(assets).length === 0
    ? FALLBACK
    : Object.values(assets).slice(0, 20).map(a => ({
        symbol: a.symbol,
        price:  a.price,
        change: a.change,
      }));

  // Duplica para loop contínuo sem saltos
  const items = [...tickerItems, ...tickerItems];

  return (
    <div
      className="bg-void border-b border-orbit h-9 flex items-center overflow-hidden relative z-50"
      aria-label="Ticker de mercado em tempo real"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-void to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-void to-transparent pointer-events-none" />

      {/* Label */}
      <div className="flex-shrink-0 px-3 border-r border-orbit mr-2 flex items-center gap-1.5 h-full bg-void z-20">
        <span className={`w-1.5 h-1.5 rounded-full ${dataSource === "live" ? "bg-pulse" : "bg-solar"} animate-pulse-aurora`} />
        <span className="text-2xs font-mono font-medium text-comet uppercase tracking-widest">
          {dataSource === "live" ? "AO VIVO" : "MOCK"}
        </span>
      </div>

      {/* Scrolling ticker */}
      <div className="flex animate-ticker gap-0 hover:[animation-play-state:paused]">
        {items.map((item, idx) => (
          <TickerItem key={idx} {...item} />
        ))}
      </div>
    </div>
  );
}

function TickerItem({ symbol, price, change }: { symbol: string; price: number; change: number }) {
  const isUp = change >= 0;
  return (
    <div className="flex items-center gap-2 px-5 border-r border-orbit/40 flex-shrink-0 h-9">
      <span className="text-xs font-semibold text-moonlight tracking-wide">{symbol}</span>
      <span className="text-xs font-mono font-medium text-star tabular">{formatPrice(price, symbol)}</span>
      <span className={`flex items-center gap-0.5 text-xs font-mono ${isUp ? "text-pulse" : "text-flare"}`}>
        {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {isUp ? "+" : ""}{change.toFixed(2)}%
      </span>
    </div>
  );
}
