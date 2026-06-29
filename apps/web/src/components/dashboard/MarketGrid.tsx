"use client";

import React, { useState } from "react";
import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";

const CATEGORIES = ["Todos", "Ações BR", "Crypto", "Forex", "Índices"];

const ASSETS = [
  // Ações
  { symbol: "PETR4",  name: "Petrobras",    price: "38.72",    change: -0.51,  volume: "R$1.2B", sector: "Ações BR",  icon: "🛢️" },
  { symbol: "VALE3",  name: "Vale",         price: "62.15",    change: +0.82,  volume: "R$2.1B", sector: "Ações BR",  icon: "⛏️" },
  { symbol: "ITUB4",  name: "Itaú Unibanco",price: "35.64",    change: +1.05,  volume: "R$1.8B", sector: "Ações BR",  icon: "🏦" },
  { symbol: "BBDC4",  name: "Bradesco",     price: "15.88",    change: -0.25,  volume: "R$0.9B", sector: "Ações BR",  icon: "🏦" },
  // Crypto
  { symbol: "BTC",    name: "Bitcoin",      price: "67,450.00",change: +2.34,  volume: "$34.2B", sector: "Crypto",    icon: "₿" },
  { symbol: "ETH",    name: "Ethereum",     price: "3,521.80", change: +1.87,  volume: "$18.1B", sector: "Crypto",    icon: "Ξ" },
  { symbol: "SOL",    name: "Solana",       price: "182.50",   change: +4.21,  volume: "$4.3B",  sector: "Crypto",    icon: "◎" },
  { symbol: "BNB",    name: "BNB",          price: "602.40",   change: -0.88,  volume: "$2.1B",  sector: "Crypto",    icon: "⬡" },
  // Forex
  { symbol: "EUR/USD",name: "Euro / Dólar", price: "1.0842",   change: -0.12,  volume: "$52B",   sector: "Forex",     icon: "€" },
  { symbol: "USD/BRL",name: "Dólar / Real", price: "5.1230",   change: +0.33,  volume: "$8.2B",  sector: "Forex",     icon: "$" },
  { symbol: "GBP/USD",name: "Libra / Dólar",price: "1.2680",   change: +0.08,  volume: "$28B",   sector: "Forex",     icon: "£" },
  // Índices
  { symbol: "IBOV",   name: "Ibovespa",     price: "134,250",  change: +0.71,  volume: "R$24B",  sector: "Índices",   icon: "📈" },
  { symbol: "S&P500", name: "S&P 500",      price: "5,842.50", change: +0.45,  volume: "$280B",  sector: "Índices",   icon: "🇺🇸" },
  { symbol: "NASDAQ", name: "Nasdaq 100",   price: "18,760",   change: +0.62,  volume: "$190B",  sector: "Índices",   icon: "💻" },
];

// Tiny sparkline
function MiniSpark({ up }: { up: boolean }) {
  const pts = Array.from({ length: 12 }).map((_, i) => ({
    x: i,
    y: 20 + Math.random() * 60 + (up ? i * 1.5 : -i * 1.5),
  }));
  const minY = Math.min(...pts.map((p) => p.y));
  const maxY = Math.max(...pts.map((p) => p.y));
  const normalize = (y: number) =>
    ((y - minY) / (maxY - minY || 1)) * 30;

  const d = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(p.x / 11) * 100} ${30 - normalize(p.y)}`)
    .join(" ");

  return (
    <svg viewBox="0 0 100 30" className="w-16 h-8" preserveAspectRatio="none">
      <path
        d={d}
        fill="none"
        stroke={up ? "#00FF94" : "#FF4D6D"}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function MarketGrid() {
  const [category, setCategory] = useState("Todos");

  const filtered =
    category === "Todos"
      ? ASSETS
      : ASSETS.filter((a) => a.sector === category);

  return (
    <div className="qf-card">
      {/* Header */}
      <div className="p-4 border-b border-orbit flex items-center justify-between gap-4 flex-wrap">
        <h3 className="text-sm font-semibold font-display text-star">Visão de Mercado</h3>

        {/* Category filter */}
        <div className="flex items-center gap-1 bg-void rounded-lg p-0.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                category === cat
                  ? "bg-crater text-aurora"
                  : "text-comet hover:text-star"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-2 border-b border-orbit">
        {["Ativo", "Preço", "Variação", "Volume", ""].map((h, i) => (
          <span
            key={i}
            className={`text-2xs font-semibold uppercase tracking-wider text-comet ${
              i > 0 ? "text-right" : ""
            }`}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-orbit/50">
        {filtered.map((asset) => {
          const isUp = asset.change > 0;
          return (
            <div
              key={asset.symbol}
              className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-3 items-center hover:bg-crater/40 transition-colors cursor-pointer group"
            >
              {/* Asset */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-orbit flex items-center justify-center flex-shrink-0 text-sm">
                  {asset.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold font-mono text-star truncate">
                    {asset.symbol}
                  </p>
                  <p className="text-xs text-comet truncate">{asset.name}</p>
                </div>
              </div>

              {/* Price */}
              <span className="text-sm font-mono font-semibold text-star text-right tabular">
                {asset.price}
              </span>

              {/* Change */}
              <div className={`flex items-center justify-end gap-1 ${isUp ? "text-pulse" : "text-flare"}`}>
                {isUp ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                <span className="text-xs font-mono font-semibold tabular">
                  {isUp ? "+" : ""}
                  {asset.change.toFixed(2)}%
                </span>
              </div>

              {/* Sparkline */}
              <div className="hidden md:flex justify-end">
                <MiniSpark up={isUp} />
              </div>

              {/* Actions */}
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-orbit">
                <MoreHorizontal className="w-4 h-4 text-comet" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-orbit text-center">
        <button className="text-xs text-aurora hover:text-aurora/80 transition-colors font-medium">
          Ver todos os ativos →
        </button>
      </div>
    </div>
  );
}
