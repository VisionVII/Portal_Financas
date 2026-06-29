"use client";

import React, { useState } from "react";
import { TrendingUp, TrendingDown, PieChart, DollarSign, Percent, Activity } from "lucide-react";

const POSITIONS = [
  { symbol: "BTC",   name: "Bitcoin",         qty: 0.45,  avgCost: 58200,  current: 67450,  type: "crypto" },
  { symbol: "ETH",   name: "Ethereum",        qty: 2.8,   avgCost: 3100,   current: 3521.8, type: "crypto" },
  { symbol: "PETR4", name: "Petrobras PN",    qty: 500,   avgCost: 36.40,  current: 38.72,  type: "stock"  },
  { symbol: "VALE3", name: "Vale ON",         qty: 200,   avgCost: 58.90,  current: 62.15,  type: "stock"  },
  { symbol: "NVDA",  name: "NVIDIA Corp.",    qty: 5,     avgCost: 420.00, current: 486.20, type: "stock"  },
  { symbol: "GOLD",  name: "Ouro Spot",       qty: 2,     avgCost: 2580,   current: 2648.3, type: "commodity" },
];

const TABS = ["Resumo", "Posições", "Histórico", "Análise"];

export default function PortfolioContent() {
  const [tab, setTab] = useState("Resumo");

  const positions = POSITIONS.map(p => {
    const totalCost    = p.qty * p.avgCost;
    const totalValue   = p.qty * p.current;
    const pnl          = totalValue - totalCost;
    const pnlPct       = (pnl / totalCost) * 100;
    return { ...p, totalCost, totalValue, pnl, pnlPct };
  });

  const totalValue = positions.reduce((a, p) => a + p.totalValue, 0);
  const totalCost  = positions.reduce((a, p) => a + p.totalCost, 0);
  const totalPnl   = totalValue - totalCost;
  const totalPct   = (totalPnl / totalCost) * 100;

  const ALLOCATION = [
    { label: "Crypto",    pct: 68, color: "#F7931A" },
    { label: "Ações BR",  pct: 18, color: "#00D4FF" },
    { label: "Ações US",  pct: 10, color: "#7B61FF" },
    { label: "Outros",    pct:  4, color: "#FFB800" },
  ];

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: DollarSign, label: "Valor Total",  value: `R$${(totalValue * 5.12).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`, color: "text-star"  },
          { icon: TrendingUp, label: "P&L Total",    value: `+R$${(totalPnl * 5.12).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`,  color: "text-pulse" },
          { icon: Percent,    label: "Retorno",      value: `+${totalPct.toFixed(2)}%`, color: "text-pulse" },
          { icon: Activity,   label: "Posições",     value: `${positions.length} ativos`, color: "text-aurora" },
        ].map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="qf-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-comet" />
                <span className="text-2xs text-comet uppercase tracking-wider">{card.label}</span>
              </div>
              <p className={`text-xl font-bold font-mono ${card.color}`}>{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-void rounded-lg p-1 w-fit">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              tab === t ? "bg-crater text-aurora" : "text-comet hover:text-star"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Resumo" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Allocation */}
          <div className="qf-card p-4">
            <h3 className="text-sm font-semibold text-star mb-4 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-aurora" />
              Alocação por Classe
            </h3>
            <div className="space-y-3">
              {ALLOCATION.map(a => (
                <div key={a.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-moonlight">{a.label}</span>
                    <span className="font-mono text-star">{a.pct}%</span>
                  </div>
                  <div className="h-2 bg-orbit rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${a.pct}%`, backgroundColor: a.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top movers */}
          <div className="qf-card p-4">
            <h3 className="text-sm font-semibold text-star mb-4">Maiores Movimentos</h3>
            <div className="space-y-2">
              {positions.sort((a, b) => Math.abs(b.pnlPct) - Math.abs(a.pnlPct)).slice(0, 5).map(p => (
                <div key={p.symbol} className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-mono font-semibold text-star">{p.symbol}</span>
                    <span className="text-xs text-comet ml-2">{p.name}</span>
                  </div>
                  <span className={`text-sm font-mono font-semibold ${p.pnlPct >= 0 ? "text-pulse" : "text-flare"}`}>
                    {p.pnlPct >= 0 ? "+" : ""}{p.pnlPct.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "Posições" && (
        <div className="qf-card overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-2 border-b border-orbit">
            {["Ativo","Qtd.","Preço Médio","Valor Atual","P&L"].map((h, i) => (
              <span key={h} className={`text-2xs font-semibold uppercase tracking-wider text-comet ${i > 0 ? "text-right" : ""}`}>{h}</span>
            ))}
          </div>
          <div className="divide-y divide-orbit/40">
            {positions.map(p => (
              <div key={p.symbol} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-3 items-center hover:bg-crater/40 transition-colors">
                <div>
                  <p className="text-sm font-mono font-semibold text-star">{p.symbol}</p>
                  <p className="text-xs text-comet">{p.name}</p>
                </div>
                <span className="text-sm font-mono text-moonlight text-right tabular">{p.qty}</span>
                <span className="text-sm font-mono text-moonlight text-right tabular">
                  {p.avgCost > 100 ? p.avgCost.toLocaleString("en-US") : p.avgCost.toFixed(2)}
                </span>
                <span className="text-sm font-mono text-star text-right tabular">
                  R${(p.totalValue * 5.12).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                </span>
                <div className="text-right">
                  <span className={`text-sm font-mono font-semibold ${p.pnl >= 0 ? "text-pulse" : "text-flare"}`}>
                    {p.pnl >= 0 ? "+" : ""}{p.pnlPct.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(tab === "Histórico" || tab === "Análise") && (
        <div className="qf-card p-8 text-center">
          <p className="text-comet text-sm">Em desenvolvimento — disponível em breve</p>
        </div>
      )}
    </div>
  );
}
