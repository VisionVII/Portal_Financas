"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  BarChart2,
  Activity,
  RefreshCw,
  Star,
  Share2,
  ChevronDown,
} from "lucide-react";

const TIME_FRAMES = ["1m", "5m", "15m", "1h", "4h", "1D", "1W", "1M"];
const CHART_TYPES = [
  { id: "candle", label: "Candles" },
  { id: "line", label: "Linha" },
  { id: "area", label: "Área" },
  { id: "bar", label: "Barras" },
];

// Pre-computed volume bars (fixed to avoid SSR hydration mismatch)
const VOLUME_HEIGHTS = [
  45, 62, 38, 71, 55, 83, 47, 66, 52, 79, 41, 68,
  57, 74, 49, 85, 43, 61, 76, 39, 88, 53, 67, 44,
  72, 58, 81, 46, 63, 77, 42, 69, 54, 86, 48, 64,
  78, 40, 91, 56, 70, 45, 82, 50, 65, 79, 43, 98,
];

// Mock sparkline data
const SPARKLINE = [
  44, 47, 43, 48, 52, 49, 54, 58, 55, 62, 59, 64, 68, 65, 71, 69, 74, 78, 75,
  80, 77, 83, 88, 85, 90, 87, 93, 98, 95, 100,
];

export default function HeroMarket() {
  const [tf, setTf] = useState("1D");
  const [chartType, setChartType] = useState("candle");
  const [starred, setStarred] = useState(false);

  const priceDiff = 2134.80;
  const pricePct  = 2.34;
  const isUp      = pricePct > 0;

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
              $67,450.00
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className={`flex items-center gap-1 text-sm font-mono font-semibold ${
                  isUp ? "text-pulse" : "text-flare"
                }`}
              >
                {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                +${priceDiff.toFixed(2)}
              </span>
              <span
                className={`qf-badge ${isUp ? "qf-badge-bullish" : "qf-badge-bearish"}`}
              >
                {isUp ? "+" : ""}{pricePct.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Stats mini */}
        <div className="hidden lg:flex items-center gap-6 ml-4">
          {[
            { label: "Máx 24h",    value: "$68,200.00", color: "text-pulse" },
            { label: "Mín 24h",    value: "$65,100.00", color: "text-flare" },
            { label: "Volume 24h", value: "$34.2B",     color: "text-aurora" },
            { label: "Market Cap", value: "$1.32T",     color: "text-moonlight" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xs text-comet uppercase tracking-wider">{stat.label}</p>
              <p className={`text-sm font-mono font-semibold mt-0.5 ${stat.color}`}>
                {stat.value}
              </p>
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
                tf === t
                  ? "bg-crater text-aurora"
                  : "text-comet hover:text-star"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-orbit" />

        {/* Chart types */}
        <div className="flex items-center gap-0.5 bg-void rounded-lg p-0.5">
          {CHART_TYPES.map((ct) => (
            <button
              key={ct.id}
              onClick={() => setChartType(ct.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                chartType === ct.id
                  ? "bg-crater text-aurora"
                  : "text-comet hover:text-star"
              }`}
            >
              {ct.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-orbit hidden sm:block" />

        {/* Indicators */}
        <button className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-void rounded-lg text-xs text-comet hover:text-star transition-colors">
          <BarChart2 className="w-3.5 h-3.5" />
          Indicadores
          <ChevronDown className="w-3 h-3" />
        </button>

        {/* Refresh */}
        <button className="ml-auto p-1.5 rounded-md text-comet hover:text-star hover:bg-crater transition-colors">
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Chart Area — placeholder visual */}
      <div className="relative h-72 bg-void overflow-hidden">
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={`${(i / 4) * 100}%`}
              x2="100%"
              y2={`${(i / 4) * 100}%`}
              stroke="#252D42"
              strokeWidth="1"
              strokeDasharray="4,4"
            />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line
              key={i}
              x1={`${(i / 7) * 100}%`}
              y1="0"
              x2={`${(i / 7) * 100}%`}
              y2="100%"
              stroke="#252D42"
              strokeWidth="1"
              strokeDasharray="4,4"
            />
          ))}
        </svg>

        {/* Sparkline chart */}
        <svg
          viewBox={`0 0 ${SPARKLINE.length - 1} 100`}
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#00D4FF" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Fill area */}
          <path
            d={`
              M 0 ${100 - SPARKLINE[0]}
              ${SPARKLINE.slice(1).map((v, i) => `L ${i + 1} ${100 - v}`).join(" ")}
              L ${SPARKLINE.length - 1} 100
              L 0 100 Z
            `}
            fill="url(#chartFill)"
          />

          {/* Line */}
          <path
            d={`
              M 0 ${100 - SPARKLINE[0]}
              ${SPARKLINE.slice(1).map((v, i) => `L ${i + 1} ${100 - v}`).join(" ")}
            `}
            fill="none"
            stroke="#00D4FF"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />

          {/* Current price dot */}
          <circle
            cx={SPARKLINE.length - 1}
            cy={100 - SPARKLINE[SPARKLINE.length - 1]}
            r="3"
            fill="#00D4FF"
            vectorEffect="non-scaling-stroke"
          >
            <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Price labels on y-axis */}
        <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between py-2 pr-2">
          {["$69k", "$68k", "$67k", "$66k", "$65k"].map((p) => (
            <span key={p} className="text-2xs font-mono text-asteroid text-right">{p}</span>
          ))}
        </div>

        {/* "Chart em desenvolvimento" overlay */}
        <div className="absolute bottom-3 left-3">
          <span className="ai-signal">AI analisando padrões</span>
        </div>
      </div>

      {/* Footer: Volume bar */}
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
