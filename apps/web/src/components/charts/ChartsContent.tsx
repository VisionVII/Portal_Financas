"use client";

import React, { useState, useMemo } from "react";
import { BarChart2, ChevronDown } from "lucide-react";
import LightweightChart, { generateMockOHLCV, type ChartType } from "@/components/charts/LightweightChart";

const ASSETS = [
  { symbol: "BTC/USD",  base: 67450,  vol: 0.04 },
  { symbol: "ETH/USD",  base: 3521,   vol: 0.04 },
  { symbol: "PETR4",    base: 38.72,  vol: 0.02 },
  { symbol: "VALE3",    base: 62.15,  vol: 0.02 },
  { symbol: "IBOV",     base: 134250, vol: 0.015 },
  { symbol: "S&P500",   base: 5842,   vol: 0.012 },
  { symbol: "EUR/USD",  base: 1.0842, vol: 0.008 },
  { symbol: "USD/BRL",  base: 5.123,  vol: 0.008 },
];

const TIMEFRAMES = ["1m","5m","15m","30m","1h","4h","1D","1W","1M"];
const TF_DAYS: Record<string, number> = {
  "1m": 1,"5m": 2,"15m": 5,"30m": 7,"1h": 14,"4h": 30,"1D": 90,"1W": 365,"1M": 730,
};

const INDICATORS = ["EMA 9","EMA 21","EMA 50","SMA 200","Bollinger","VWAP","RSI","MACD","Volume"];

export default function ChartsContent() {
  const [asset, setAsset]         = useState("BTC/USD");
  const [tf, setTf]               = useState("1D");
  const [chartType, setChartType] = useState<ChartType>("candle");
  const [activeInds, setActiveInds] = useState<string[]>(["EMA 9","EMA 21"]);

  const sel = ASSETS.find(a => a.symbol === asset) ?? ASSETS[0];
  const chartData = useMemo(() => generateMockOHLCV(sel.base, TF_DAYS[tf] ?? 90, sel.vol), [asset, tf]);

  const toggleIndicator = (ind: string) => {
    setActiveInds(prev => prev.includes(ind) ? prev.filter(i => i !== ind) : [...prev, ind]);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="qf-card p-3 flex flex-wrap items-center gap-3">
        {/* Asset selector */}
        <div className="relative">
          <select
            value={asset}
            onChange={e => setAsset(e.target.value)}
            className="qf-input text-sm font-mono pr-8 appearance-none cursor-pointer"
            style={{ minWidth: 120 }}
          >
            {ASSETS.map(a => (
              <option key={a.symbol} value={a.symbol}>{a.symbol}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-comet pointer-events-none" />
        </div>

        <div className="w-px h-6 bg-orbit" />

        {/* Timeframes */}
        <div className="flex items-center gap-0.5 bg-void rounded-lg p-0.5">
          {TIMEFRAMES.map(t => (
            <button
              key={t}
              onClick={() => setTf(t)}
              className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                tf === t ? "bg-crater text-aurora" : "text-comet hover:text-star"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="w-px h-6 bg-orbit" />

        {/* Chart type */}
        {(["candle","line","area"] as ChartType[]).map(ct => (
          <button
            key={ct}
            onClick={() => setChartType(ct)}
            className={`px-3 py-1 rounded-md text-xs transition-all capitalize ${
              chartType === ct ? "bg-crater text-aurora" : "text-comet hover:text-star"
            }`}
          >
            {ct === "candle" ? "Candles" : ct === "line" ? "Linha" : "Área"}
          </button>
        ))}
      </div>

      {/* Main chart + indicators panel */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_200px] gap-4">
        <div className="qf-card overflow-hidden">
          <LightweightChart data={chartData} type={chartType} height={480} />
        </div>

        {/* Indicators */}
        <div className="qf-card overflow-hidden">
          <div className="p-3 border-b border-orbit flex items-center gap-2">
            <BarChart2 className="w-3.5 h-3.5 text-aurora" />
            <h3 className="text-sm font-semibold text-star">Indicadores</h3>
          </div>
          <div className="divide-y divide-orbit/40">
            {INDICATORS.map(ind => (
              <label
                key={ind}
                className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-crater/40 transition-colors"
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                    activeInds.includes(ind)
                      ? "bg-aurora border-aurora"
                      : "border-orbit"
                  }`}
                  onClick={() => toggleIndicator(ind)}
                >
                  {activeInds.includes(ind) && (
                    <svg className="w-2.5 h-2.5 text-cosmos" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className={`text-sm ${activeInds.includes(ind) ? "text-star" : "text-comet"}`}>{ind}</span>
              </label>
            ))}
          </div>
          <div className="p-3 border-t border-orbit">
            <p className="text-2xs text-comet text-center">
              {activeInds.length} indicador{activeInds.length !== 1 ? "es" : ""} ativo{activeInds.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
