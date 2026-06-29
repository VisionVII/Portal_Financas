"use client";

import React, { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, Zap } from "lucide-react";
import LightweightChart, { generateMockOHLCV } from "@/components/charts/LightweightChart";

const CRYPTOS = [
  { symbol: "BTC",  name: "Bitcoin",       price: 67450,  change: +2.34, vol: "$34.2B", mktCap: "$1.32T", dom: 52.4, base: 67450 },
  { symbol: "ETH",  name: "Ethereum",      price: 3521.8, change: +1.87, vol: "$18.1B", mktCap: "$423B",  dom: 16.8, base: 3521  },
  { symbol: "BNB",  name: "BNB",           price: 602.4,  change: -0.88, vol: "$2.1B",  mktCap: "$89B",   dom: 3.5,  base: 602   },
  { symbol: "SOL",  name: "Solana",        price: 182.5,  change: +4.21, vol: "$4.3B",  mktCap: "$86B",   dom: 3.4,  base: 182   },
  { symbol: "XRP",  name: "XRP",           price: 0.682,  change: +5.12, vol: "$2.9B",  mktCap: "$38B",   dom: 1.5,  base: 0.68  },
  { symbol: "ADA",  name: "Cardano",       price: 0.451,  change: +1.60, vol: "$0.8B",  mktCap: "$16B",   dom: 0.6,  base: 0.45  },
  { symbol: "AVAX", name: "Avalanche",     price: 38.20,  change: -2.10, vol: "$0.9B",  mktCap: "$16B",   dom: 0.6,  base: 38    },
  { symbol: "DOT",  name: "Polkadot",      price: 6.82,   change: +0.94, vol: "$0.5B",  mktCap: "$10B",   dom: 0.4,  base: 6.8   },
  { symbol: "DOGE", name: "Dogecoin",      price: 0.138,  change: +3.25, vol: "$1.2B",  mktCap: "$20B",   dom: 0.8,  base: 0.14  },
  { symbol: "MATIC",name: "Polygon",       price: 0.518,  change: -1.40, vol: "$0.6B",  mktCap: "$5B",    dom: 0.2,  base: 0.52  },
];

export default function CryptoContent() {
  const [selected, setSelected] = useState("BTC");
  const sel = CRYPTOS.find(c => c.symbol === selected) ?? CRYPTOS[0];
  const chartData = useMemo(() => generateMockOHLCV(sel.base, 90, 0.04), [selected]);

  const totalDom = CRYPTOS.slice(0, 5).reduce((a, c) => a + c.dom, 0);

  return (
    <div className="space-y-6">
      {/* Dominance bar */}
      <div className="qf-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-star">Dominância de Mercado</h3>
          <span className="text-2xs text-comet">Market Cap Total: ~$2.51T</span>
        </div>
        <div className="flex h-3 rounded-full overflow-hidden gap-px">
          {CRYPTOS.slice(0, 5).map((c, i) => {
            const colors = ["#F7931A","#627EEA","#F3BA2F","#9945FF","#00AAE4"];
            return (
              <div
                key={c.symbol}
                style={{ width: `${c.dom}%`, backgroundColor: colors[i] }}
                title={`${c.symbol}: ${c.dom}%`}
                className="transition-all"
              />
            );
          })}
          <div className="flex-1 bg-orbit" title={`Outros: ${(100 - totalDom).toFixed(1)}%`} />
        </div>
        <div className="flex items-center gap-4 mt-2 flex-wrap">
          {CRYPTOS.slice(0, 5).map((c, i) => {
            const colors = ["#F7931A","#627EEA","#F3BA2F","#9945FF","#00AAE4"];
            return (
              <div key={c.symbol} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: colors[i] }} />
                <span className="text-2xs text-comet">{c.symbol} {c.dom}%</span>
              </div>
            );
          })}
          <span className="text-2xs text-comet">Outros {(100 - totalDom).toFixed(1)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="xl:col-span-2 qf-card overflow-hidden">
          <div className="p-4 border-b border-orbit flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-solar" />
              <span className="text-lg font-bold font-mono text-star">{sel.symbol}/USD</span>
              <span className="text-sm text-comet">{sel.name}</span>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold font-mono text-star">
                ${sel.price.toLocaleString("en-US", { minimumFractionDigits: sel.price < 1 ? 4 : 2 })}
              </p>
              <span className={`text-sm font-mono font-semibold ${sel.change >= 0 ? "text-pulse" : "text-flare"}`}>
                {sel.change >= 0 ? "+" : ""}{sel.change.toFixed(2)}%
              </span>
            </div>
          </div>
          <LightweightChart data={chartData} type="candle" height={300} />
        </div>

        {/* List */}
        <div className="qf-card overflow-hidden">
          <div className="p-3 border-b border-orbit">
            <h3 className="text-sm font-semibold text-star">Top Criptoativos</h3>
          </div>
          <div className="divide-y divide-orbit/40">
            {CRYPTOS.map((c, rank) => {
              const isUp = c.change >= 0;
              return (
                <button
                  key={c.symbol}
                  onClick={() => setSelected(c.symbol)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left ${
                    selected === c.symbol ? "bg-aurora/5 border-l-2 border-aurora" : "hover:bg-crater/40 border-l-2 border-transparent"
                  }`}
                >
                  <span className="text-2xs text-asteroid w-4 text-center">{rank + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-mono font-semibold text-star">{c.symbol}</p>
                    <p className="text-2xs text-comet truncate">{c.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-star">
                      ${c.price < 1 ? c.price.toFixed(4) : c.price.toLocaleString("en-US")}
                    </p>
                    <span className={`text-xs font-mono font-semibold flex items-center gap-0.5 justify-end ${isUp ? "text-pulse" : "text-flare"}`}>
                      {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {isUp ? "+" : ""}{c.change.toFixed(2)}%
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
