"use client";

import React, { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, BarChart2, Filter } from "lucide-react";
import LightweightChart, { generateMockOHLCV } from "@/components/charts/LightweightChart";

const SECTORS = ["Todos", "Financeiro", "Energia", "Mineração", "Varejo", "Tecnologia", "Utilidades"];

const STOCKS = [
  { symbol: "PETR4",  name: "Petrobras PN",       price: 38.72,  change: -0.51, volume: "R$1.2B", mktCap: "R$509B", sector: "Energia",    base: 38   },
  { symbol: "VALE3",  name: "Vale ON",             price: 62.15,  change: +0.82, volume: "R$2.1B", mktCap: "R$278B", sector: "Mineração",  base: 62   },
  { symbol: "ITUB4",  name: "Itaú Unibanco PN",   price: 35.64,  change: +1.05, volume: "R$1.8B", mktCap: "R$347B", sector: "Financeiro", base: 35   },
  { symbol: "BBDC4",  name: "Bradesco PN",         price: 15.88,  change: -0.25, volume: "R$0.9B", mktCap: "R$170B", sector: "Financeiro", base: 16   },
  { symbol: "WEGE3",  name: "WEG SA ON",           price: 43.80,  change: -1.10, volume: "R$0.6B", mktCap: "R$193B", sector: "Tecnologia", base: 44   },
  { symbol: "MGLU3",  name: "Magazine Luiza ON",   price: 9.14,   change: +2.35, volume: "R$0.5B", mktCap: "R$28B",  sector: "Varejo",     base: 9    },
  { symbol: "RENT3",  name: "Localiza ON",         price: 42.20,  change: +0.68, volume: "R$0.7B", mktCap: "R$43B",  sector: "Varejo",     base: 42   },
  { symbol: "ELET3",  name: "Eletrobras ON",       price: 38.90,  change: -0.77, volume: "R$0.8B", mktCap: "R$85B",  sector: "Utilidades", base: 39   },
  { symbol: "ABEV3",  name: "Ambev ON",            price: 13.22,  change: +0.30, volume: "R$0.9B", mktCap: "R$208B", sector: "Varejo",     base: 13   },
  { symbol: "BBAS3",  name: "Banco do Brasil ON",  price: 28.50,  change: +1.42, volume: "R$1.1B", mktCap: "R$160B", sector: "Financeiro", base: 28   },
  { symbol: "AAPL",   name: "Apple Inc.",          price: 228.50, change: +1.23, volume: "$7.2B",  mktCap: "$3.5T",  sector: "Tecnologia", base: 228  },
  { symbol: "NVDA",   name: "NVIDIA Corp.",        price: 486.20, change: +3.41, volume: "$18.4B", mktCap: "$1.2T",  sector: "Tecnologia", base: 486  },
  { symbol: "MSFT",   name: "Microsoft Corp.",     price: 415.30, change: +0.87, volume: "$5.1B",  mktCap: "$3.1T",  sector: "Tecnologia", base: 415  },
  { symbol: "TSLA",   name: "Tesla Inc.",          price: 248.80, change: -1.55, volume: "$12.3B", mktCap: "$793B",  sector: "Tecnologia", base: 249  },
];

const CHART_STOCK = STOCKS[0];

export default function StocksContent() {
  const [sector, setSector]   = useState("Todos");
  const [selected, setSelected] = useState(CHART_STOCK.symbol);

  const filtered = sector === "Todos" ? STOCKS : STOCKS.filter(s => s.sector === sector);
  const sel = STOCKS.find(s => s.symbol === selected) ?? STOCKS[0];
  const chartData = useMemo(() => generateMockOHLCV(sel.base, 90, 0.022), [selected]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Chart + stats */}
      <div className="xl:col-span-2 space-y-4">
        <div className="qf-card overflow-hidden">
          <div className="p-4 border-b border-orbit flex items-center justify-between">
            <div>
              <span className="text-lg font-bold font-mono text-star">{sel.symbol}</span>
              <span className="ml-2 text-sm text-comet">{sel.name}</span>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold font-mono text-star">
                R${sel.price.toFixed(2)}
              </p>
              <span className={`text-sm font-mono font-semibold ${sel.change >= 0 ? "text-pulse" : "text-flare"}`}>
                {sel.change >= 0 ? "+" : ""}{sel.change.toFixed(2)}%
              </span>
            </div>
          </div>
          <LightweightChart data={chartData} type="candle" height={280} />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Volume",    value: sel.volume },
            { label: "Market Cap",value: sel.mktCap },
            { label: "P/L",       value: "14.2x"    },
            { label: "Dividend",  value: "6.8%"     },
          ].map(stat => (
            <div key={stat.label} className="qf-card p-3">
              <p className="text-2xs text-comet uppercase tracking-wider">{stat.label}</p>
              <p className="text-base font-mono font-bold text-star mt-1">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="qf-card overflow-hidden flex flex-col">
        {/* Filters */}
        <div className="p-3 border-b border-orbit flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-comet flex-shrink-0" />
          <div className="flex gap-1 flex-wrap">
            {SECTORS.map(s => (
              <button
                key={s}
                onClick={() => setSector(s)}
                className={`px-2 py-0.5 rounded text-xs transition-all ${
                  sector === s ? "bg-crater text-aurora" : "text-comet hover:text-star"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="grid grid-cols-[1fr_auto_auto] gap-3 px-3 py-2 border-b border-orbit">
          {["Ativo", "Preço", "Var."].map((h, i) => (
            <span key={h} className={`text-2xs font-semibold uppercase tracking-wider text-comet ${i > 0 ? "text-right" : ""}`}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        <div className="flex-1 overflow-y-auto divide-y divide-orbit/40">
          {filtered.map(stock => {
            const isUp = stock.change >= 0;
            return (
              <button
                key={stock.symbol}
                onClick={() => setSelected(stock.symbol)}
                className={`w-full grid grid-cols-[1fr_auto_auto] gap-3 px-3 py-2.5 items-center transition-colors text-left ${
                  selected === stock.symbol ? "bg-aurora/5 border-l-2 border-aurora" : "hover:bg-crater/40 border-l-2 border-transparent"
                }`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-mono font-semibold text-star truncate">{stock.symbol}</p>
                  <p className="text-2xs text-comet truncate">{stock.name}</p>
                </div>
                <span className="text-sm font-mono text-star tabular text-right">
                  {stock.price.toFixed(2)}
                </span>
                <span className={`text-xs font-mono font-semibold text-right flex items-center gap-0.5 justify-end ${isUp ? "text-pulse" : "text-flare"}`}>
                  {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {isUp ? "+" : ""}{stock.change.toFixed(2)}%
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
