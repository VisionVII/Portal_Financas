"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const TICKER_DATA = [
  { symbol: "BTC/USD", price: "67,450.00", change: "+2.34%", up: true },
  { symbol: "ETH/USD", price: "3,521.80", change: "+1.87%", up: true },
  { symbol: "PETR4",   price: "38.72",    change: "-0.51%", up: false },
  { symbol: "VALE3",   price: "62.15",    change: "+0.82%", up: true },
  { symbol: "EUR/USD", price: "1.0842",   change: "-0.12%", up: false },
  { symbol: "USD/BRL", price: "5.1230",   change: "+0.33%", up: false },
  { symbol: "IBOV",    price: "134,250",  change: "+0.71%", up: true },
  { symbol: "S&P500",  price: "5,842.50", change: "+0.45%", up: true },
  { symbol: "GOLD",    price: "2,648.30", change: "+0.28%", up: true },
  { symbol: "WTI",     price: "78.42",    change: "-1.15%", up: false },
  { symbol: "SOL/USD", price: "182.50",   change: "+4.21%", up: true },
  { symbol: "BBDC4",   price: "15.88",    change: "-0.25%", up: false },
  { symbol: "ITUB4",   price: "35.64",    change: "+1.05%", up: true },
  { symbol: "NASDAQ",  price: "18,760",   change: "+0.62%", up: true },
  { symbol: "BTC/BRL", price: "345,200",  change: "+2.68%", up: true },
];

// Duplicar para loop contínuo sem saltos
const ITEMS = [...TICKER_DATA, ...TICKER_DATA];

export default function MarketTicker() {
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
        <span className="w-1.5 h-1.5 rounded-full bg-pulse animate-pulse-aurora" />
        <span className="text-2xs font-mono font-medium text-comet uppercase tracking-widest">AO VIVO</span>
      </div>

      {/* Scrolling ticker */}
      <div className="flex animate-ticker gap-0 hover:[animation-play-state:paused]">
        {ITEMS.map((item, idx) => (
          <TickerItem key={idx} {...item} />
        ))}
      </div>
    </div>
  );
}

function TickerItem({
  symbol,
  price,
  change,
  up,
}: {
  symbol: string;
  price: string;
  change: string;
  up: boolean;
}) {
  return (
    <div className="flex items-center gap-2 px-5 border-r border-orbit/40 flex-shrink-0 h-9">
      <span className="text-xs font-semibold text-moonlight tracking-wide">{symbol}</span>
      <span className="text-xs font-mono font-medium text-star tabular">{price}</span>
      <span
        className={`flex items-center gap-0.5 text-xs font-mono ${
          up ? "text-pulse" : "text-flare"
        }`}
      >
        {up ? (
          <TrendingUp className="w-3 h-3" />
        ) : (
          <TrendingDown className="w-3 h-3" />
        )}
        {change}
      </span>
    </div>
  );
}
