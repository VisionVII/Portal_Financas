"use client";

import React, { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, Globe } from "lucide-react";
import LightweightChart, { generateMockOHLCV } from "@/components/charts/LightweightChart";

const PAIRS = [
  { pair: "USD/BRL", base: "USD", quote: "BRL", price: 5.1230, change: +0.33, spread: "0.0003", base_price: 5.12  },
  { pair: "EUR/USD", base: "EUR", quote: "USD", price: 1.0842, change: -0.12, spread: "0.0001", base_price: 1.08  },
  { pair: "GBP/USD", base: "GBP", quote: "USD", price: 1.2680, change: +0.08, spread: "0.0002", base_price: 1.27  },
  { pair: "USD/JPY", base: "USD", quote: "JPY", price: 149.85, change: -0.42, spread: "0.01",   base_price: 149.8 },
  { pair: "EUR/BRL", base: "EUR", quote: "BRL", price: 5.5512, change: +0.21, spread: "0.0005", base_price: 5.55  },
  { pair: "AUD/USD", base: "AUD", quote: "USD", price: 0.6541, change: -0.55, spread: "0.0002", base_price: 0.65  },
  { pair: "USD/CAD", base: "USD", quote: "CAD", price: 1.3612, change: +0.18, spread: "0.0002", base_price: 1.36  },
  { pair: "USD/CHF", base: "USD", quote: "CHF", price: 0.8952, change: -0.08, spread: "0.0001", base_price: 0.90  },
];

const MACRO = [
  { name: "Taxa SELIC",  value: "10.50%", country: "🇧🇷", trend: "down"    },
  { name: "Fed Funds",   value: "5.25%",  country: "🇺🇸", trend: "neutral" },
  { name: "BCE",         value: "4.00%",  country: "🇪🇺", trend: "down"    },
  { name: "Copom Next",  value: "Set/25", country: "🇧🇷", trend: "neutral" },
];

export default function ForexContent() {
  const [selected, setSelected] = useState("USD/BRL");
  const sel = PAIRS.find(p => p.pair === selected) ?? PAIRS[0];
  const chartData = useMemo(() => generateMockOHLCV(sel.base_price, 90, 0.008), [selected]);

  return (
    <div className="space-y-6">
      {/* Macro rates */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {MACRO.map(m => (
          <div key={m.name} className="qf-card p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <span>{m.country}</span>
              <span className="text-2xs text-comet">{m.name}</span>
            </div>
            <p className="text-lg font-bold font-mono text-aurora">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="xl:col-span-2 qf-card overflow-hidden">
          <div className="p-4 border-b border-orbit flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-aurora" />
              <span className="text-lg font-bold font-mono text-star">{sel.pair}</span>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold font-mono text-star">
                {sel.price.toFixed(sel.price > 10 ? 2 : 4)}
              </p>
              <span className={`text-sm font-mono font-semibold ${sel.change >= 0 ? "text-pulse" : "text-flare"}`}>
                {sel.change >= 0 ? "+" : ""}{sel.change.toFixed(2)}%
              </span>
            </div>
          </div>
          <LightweightChart data={chartData} type="area" height={300} />
        </div>

        {/* Pairs list */}
        <div className="qf-card overflow-hidden">
          <div className="p-3 border-b border-orbit">
            <h3 className="text-sm font-semibold text-star">Pares de Moedas</h3>
          </div>
          <div className="divide-y divide-orbit/40">
            {PAIRS.map(p => {
              const isUp = p.change >= 0;
              return (
                <button
                  key={p.pair}
                  onClick={() => setSelected(p.pair)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 transition-colors text-left ${
                    selected === p.pair ? "bg-aurora/5 border-l-2 border-aurora" : "hover:bg-crater/40 border-l-2 border-transparent"
                  }`}
                >
                  <div>
                    <p className="text-sm font-mono font-semibold text-star">{p.pair}</p>
                    <p className="text-2xs text-comet">Spread: {p.spread}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-star">{p.price.toFixed(p.price > 10 ? 2 : 4)}</p>
                    <span className={`text-xs font-mono font-semibold flex items-center gap-0.5 justify-end ${isUp ? "text-pulse" : "text-flare"}`}>
                      {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {isUp ? "+" : ""}{p.change.toFixed(2)}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
