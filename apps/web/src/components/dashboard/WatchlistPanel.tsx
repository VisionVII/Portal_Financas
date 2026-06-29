"use client";

import React from "react";
import { Star, Plus, TrendingUp, TrendingDown } from "lucide-react";

const WATCHLIST = [
  { symbol: "AAPL",   price: "228.50",   change: +1.23, flag: "🇺🇸" },
  { symbol: "NVDA",   price: "486.20",   change: +3.41, flag: "🇺🇸" },
  { symbol: "MELI3",  price: "87.40",    change: -0.55, flag: "🇧🇷" },
  { symbol: "XRP/USD",price: "0.6820",   change: +5.12, flag: "₿"  },
  { symbol: "GOLD",   price: "2,648.30", change: +0.28, flag: "🥇" },
  { symbol: "WEGE3",  price: "43.80",    change: -1.10, flag: "🇧🇷" },
];

export default function WatchlistPanel() {
  return (
    <div className="qf-card">
      {/* Header */}
      <div className="p-4 border-b border-orbit flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-solar" fill="currentColor" />
          <h3 className="text-sm font-semibold font-display text-star">Watchlist</h3>
        </div>
        <button className="flex items-center gap-1 text-xs text-comet hover:text-aurora transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Adicionar
        </button>
      </div>

      {/* Items */}
      <div className="divide-y divide-orbit/40">
        {WATCHLIST.map((item) => {
          const isUp = item.change > 0;
          return (
            <div
              key={item.symbol}
              className="flex items-center justify-between px-4 py-2.5 hover:bg-crater/40 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{item.flag}</span>
                <span className="text-sm font-mono font-semibold text-star">{item.symbol}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-star tabular">{item.price}</span>
                <span
                  className={`flex items-center gap-0.5 text-xs font-mono font-semibold ${
                    isUp ? "text-pulse" : "text-flare"
                  }`}
                >
                  {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {isUp ? "+" : ""}{item.change.toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 border-t border-orbit text-center">
        <button className="text-xs text-aurora hover:text-aurora/80 transition-colors font-medium">
          Gerenciar watchlist →
        </button>
      </div>
    </div>
  );
}
