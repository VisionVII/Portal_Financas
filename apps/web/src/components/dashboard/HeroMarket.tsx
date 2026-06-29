"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingUp, TrendingDown, BarChart2, Activity,
  RefreshCw, Star, Share2, ChevronDown,
} from "lucide-react";
import LightweightChart, { generateMockOHLCV, type ChartType } from "@/components/charts/LightweightChart";

const TIME_FRAMES = ["1m", "5m", "15m", "1h", "4h", "1D", "1W", "1M"];

const CHART_TYPES: { id: ChartType; label: string }[] = [
  { id: "candle", label: "Candles" },
  { id: "line",   label: "Linha"   },
  { id: "area",   label: "Área"    },
];

const TF_DAYS: Record<string, number> = {
  "1m": 1, "5m": 2, "15m": 5, "1h": 14, "4h": 30, "1D": 90, "1W": 365, "1M": 730,
};

const VOLUME_HEIGHTS = [
  45, 62, 38, 71, 55, 83, 47, 66, 52, 79, 41, 68,
  57, 74, 49, 85, 43, 61, 76, 39, 88, 53, 67, 44,
  72, 58, 81, 46, 63, 77, 42, 69, 54, 86, 48, 64,
  78, 40, 91, 56, 70, 45, 82, 50, 65, 79, 43, 98,
];

export default function HeroMarket() {
  const [tf,        setTf]        = useState("1D");
  const [chartType, setChartType] = useState<ChartType>("candle");
  const [starred,   setStarred]   = useState(false);

  // Gera dados mock realistas baseados no timeframe selecionado
  const chartData = useMemo(
    () => generateMockOHLCV(67450, TF_DAYS[tf] ?? 90, 0.025),
    [tf]
  );

  const lastBar  = chartData[chartData.length - 1];
  const firstBar = chartData[0];
  const priceDiff = lastBar && firstBar ? lastBar.close - firstBar.close : 0;
  const pricePct  = firstBar ? (priceDiff / firstBar.close) * 100 : 0;
  const isUp      = pricePct >= 0;

  return (
    <div className="qf-card overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-orbit flex flex-wrap gap-4 items-start">
        {/* Asset info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-solar to-nova flex items-center justify-center flex-shrink-0">
            <span className="text-cosmos font-black text-sm font-mono">₿</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold font-display text-star">Bitcoin</h2>
              <button
                onClick={() => setStarred(!starred)}
                className={`transition-colors ${starred ? "text-solar" : "text-comet hover:text-solar"}`}
              >
                <Star className="w-3.5 h-3.5" fill={starred ? "currentColor" : "none"} />
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono text-comet">BTC/USD</span>
              <span className="text-asteroid">·</span>
              <span className="text-xs text-comet">Binance</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end gap-3">
          <div>
            <p className="text-3xl font-black font-mono text-star tabular">
              ${lastBar?.close.toLocaleString("en-US", { minimumFractionDigits: 2 }) ?? "—"}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`flex items-center gap-1 text-sm font-mono font-semibold ${isUp ? "text-pulse" : "text-flare"}`}>
                {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {isUp ? "+" : ""}${Math.abs(priceDiff).toFixed(2)}
              </span>
              <span className={`qf-badge ${isUp ? "qf-badge-bullish" : "qf-badge-bearish"}`}>
                {isUp ? "+" : ""}{pricePct.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Stats mini */}
        <div className="hidden lg:flex items-center gap-6 ml-4">
          {[
            { label: "Máx 24h",    value: `$${Math.max(...chartData.slice(-24).map(d => d.high)).toLocaleString("en-US", { maximumFractionDigits: 0 })}`, color: "text-pulse"  },
            { label: "Mín 24h",    value: `$${Math.min(...chartData.slice(-24).map(d => d.low)).toLocaleString("en-US", { maximumFractionDigits: 0 })}`,  color: "text-flare"  },
            { label: "Volume 24h", value: "$34.2B",   color: "text-aurora"    },
            { label: "Market Cap", value: "$1.32T",   color: "text-moonlight" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xs text-comet uppercase tracking-wider">{stat.label}</p>
              <p className={`text-sm font-mono font-semibold mt-0.5 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto">
          <button className="qf-btn-ghost text-xs py-1.5 px-3">
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Compartilhar</span>
          </button>
          <button className="qf-btn-secondary text-xs py-1.5 px-3">
            <Activity className="w-3.5 h-3.5" />
            Análise IA
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="px-4 py-2 border-b border-orbit flex items-center gap-4 flex-wrap">
        {/* Timeframes */}
        <div className="flex items-center gap-0.5 bg-void rounded-lg p-0.5">
          {TIME_FRAMES.map((t) => (
            <button
              key={t}
              onClick={() => setTf(t)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                tf === t ? "bg-crater text-aurora" : "text-comet hover:text-star"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-orbit" />

        {/* Chart types */}
        <div className="flex items-center gap-0.5 bg-void rounded-lg p-0.5">
          {CHART_TYPES.map((ct) => (
            <button
              key={ct.id}
              onClick={() => setChartType(ct.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                chartType === ct.id ? "bg-crater text-aurora" : "text-comet hover:text-star"
              }`}
            >
              {ct.label}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-orbit hidden sm:block" />

        <button className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-void rounded-lg text-xs text-comet hover:text-star transition-colors">
          <BarChart2 className="w-3.5 h-3.5" />
          Indicadores
          <ChevronDown className="w-3 h-3" />
        </button>

        <button className="ml-auto p-1.5 rounded-md text-comet hover:text-star hover:bg-crater transition-colors">
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Chart real */}
      <div className="relative bg-void">
        <LightweightChart data={chartData} type={chartType} height={320} />
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span className="ai-signal">AI analisando padrões</span>
        </div>
      </div>

      {/* Volume bar */}
      <div className="px-4 pt-2 pb-3 border-t border-orbit">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-2xs text-comet uppercase tracking-wider">Volume</span>
          <span className="text-2xs font-mono text-aurora">$34.2B (24h)</span>
        </div>
        <div className="flex gap-px h-10 items-end">
          {VOLUME_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                backgroundColor: i > 40 ? "rgba(0,212,255,0.5)" : "rgba(37,45,66,0.8)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
