"use client";

import React, { useState } from "react";
import { TrendingUp, TrendingDown, MoreHorizontal, Wifi, WifiOff } from "lucide-react";
import { useMarketStore, type MarketAsset } from "@/store/useMarketStore";

const CATEGORIES = ["Todos", "Ações BR", "Crypto", "Ações US", "Índices"];

// Pre-computed sparklines fixas por tendência (evita hydration mismatch)
const SPARK_UP   = "M 0 28 L 9 24 L 18 26 L 27 20 L 36 22 L 45 16 L 55 18 L 64 12 L 73 14 L 82 8 L 91 10 L 100 4";
const SPARK_DOWN = "M 0 4 L 9 8 L 18 6 L 27 12 L 36 10 L 45 16 L 55 14 L 64 20 L 73 18 L 82 24 L 91 22 L 100 28";

function MiniSpark({ up }: { up: boolean }) {
  return (
    <svg viewBox="0 0 100 30" className="w-16 h-8" preserveAspectRatio="none">
      <path d={up ? SPARK_UP : SPARK_DOWN} fill="none"
        stroke={up ? "#00FF94" : "#FF4D6D"} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function formatPrice(asset: MarketAsset): string {
  const { price, symbol } = asset;
  if (symbol.includes("USD/") || (price < 1 && price > 0)) return price.toFixed(4);
  if (price >= 10_000) return price.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
  return price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getIcon(asset: MarketAsset): string {
  const icons: Record<string, string> = {
    "PETR4": "🛢️", "VALE3": "⛏️", "ITUB4": "🏦", "BBDC4": "🏦",
    "BTC/USD": "₿", "ETH/USD": "Ξ", "SOL/USD": "◎", "BNB/USD": "⬡",
    "AAPL": "🍎", "NVDA": "🟢", "MSFT": "🪟", "TSLA": "⚡",
  };
  return icons[asset.symbol] ?? (
    asset.type === "crypto"   ? "🪙" :
    asset.type === "forex"    ? "💱" :
    asset.type === "index"    ? "📈" :
    asset.type === "stock_br" ? "🇧🇷" : "🇺🇸"
  );
}

const TYPE_FILTER: Record<string, MarketAsset["type"][]> = {
  "Ações BR": ["stock_br"],
  "Crypto":   ["crypto"],
  "Ações US": ["stock_us"],
  "Índices":  ["index"],
};

export default function MarketGrid() {
  const [category, setCategory] = useState("Todos");
  const { assets, isLoading, dataSource } = useMarketStore();

  const allAssets = Object.values(assets);

  const filtered = category === "Todos"
    ? allAssets
    : allAssets.filter(a => TYPE_FILTER[category]?.includes(a.type));

  const displayList = filtered.length > 0 ? filtered : allAssets.slice(0, 14);

  return (
    <div className="qf-card">
      {/* Header */}
      <div className="p-4 border-b border-orbit flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold font-display text-star">Visão de Mercado</h3>
          {dataSource === "live" ? (
            <span className="flex items-center gap-1 text-2xs text-pulse">
              <Wifi className="w-3 h-3" /> Live
            </span>
          ) : (
            <span className="flex items-center gap-1 text-2xs text-solar">
              <WifiOff className="w-3 h-3" /> Mock
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 bg-void rounded-lg p-0.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                category === cat ? "bg-crater text-aurora" : "text-comet hover:text-star"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-2 border-b border-orbit">
        {["Ativo", "Preço", "Variação", "7D", ""].map((h, i) => (
          <span key={i} className={`text-2xs font-semibold uppercase tracking-wider text-comet ${i > 0 ? "text-right" : ""}`}>
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-orbit/50 min-h-[200px]">
        {isLoading && displayList.length === 0 ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-3 items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg qf-skeleton" />
                <div className="space-y-1">
                  <div className="w-16 h-3 qf-skeleton rounded" />
                  <div className="w-24 h-2.5 qf-skeleton rounded" />
                </div>
              </div>
              <div className="w-20 h-4 qf-skeleton rounded ml-auto" />
              <div className="w-14 h-4 qf-skeleton rounded" />
              <div className="w-16 h-8 qf-skeleton rounded" />
              <div className="w-6 h-6 qf-skeleton rounded" />
            </div>
          ))
        ) : displayList.slice(0, 14).map((asset) => {
          const isUp = asset.change >= 0;
          return (
            <div
              key={asset.symbol}
              className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-3 items-center hover:bg-crater/40 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-orbit flex items-center justify-center flex-shrink-0 text-sm">
                  {getIcon(asset)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold font-mono text-star truncate">{asset.symbol}</p>
                    {asset.isLive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-pulse animate-pulse-aurora flex-shrink-0" title="Dados ao vivo" />
                    )}
                  </div>
                  {asset.name && <p className="text-xs text-comet truncate">{asset.name}</p>}
                </div>
              </div>

              <span className="text-sm font-mono font-semibold text-star text-right tabular">
                {formatPrice(asset)}
              </span>

              <div className={`flex items-center justify-end gap-1 ${isUp ? "text-pulse" : "text-flare"}`}>
                {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                <span className="text-xs font-mono font-semibold tabular">
                  {isUp ? "+" : ""}{asset.change.toFixed(2)}%
                </span>
              </div>

              <div className="hidden md:flex justify-end">
                <MiniSpark up={isUp} />
              </div>

              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-orbit">
                <MoreHorizontal className="w-4 h-4 text-comet" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="p-3 border-t border-orbit text-center">
        <button className="text-xs text-aurora hover:text-aurora/80 transition-colors font-medium">
          Ver todos os ativos →
        </button>
      </div>
    </div>
  );
}
