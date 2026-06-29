"use client";

import React, { useState } from "react";
import { Zap, RefreshCw, ChevronRight, Brain, TrendingUp, AlertTriangle, Target } from "lucide-react";

const INSIGHTS = [
  {
    id: 1,
    type: "bullish",
    icon: TrendingUp,
    label: "Sinal de Alta",
    asset: "BTC/USD",
    message: "Cruzamento de médias móveis EMA 9/21 no gráfico diário. RSI saindo da sobrevenda.",
    confidence: 78,
    time: "2 min",
  },
  {
    id: 2,
    type: "alert",
    icon: AlertTriangle,
    label: "Atenção",
    asset: "PETR4",
    message: "Suporte em R$37.80 sendo testado. Volume acima da média. Monitorar rompimento.",
    confidence: 65,
    time: "8 min",
  },
  {
    id: 3,
    type: "target",
    icon: Target,
    label: "Alvo Técnico",
    asset: "ETH/USD",
    message: "Formação de bandeira de alta identificada. Projeção de movimento até $3.850.",
    confidence: 72,
    time: "15 min",
  },
  {
    id: 4,
    type: "bullish",
    icon: TrendingUp,
    label: "Tendência",
    asset: "IBOV",
    message: "Índice mantém estrutura de alta no semanal. Próxima resistência em 136.500 pontos.",
    confidence: 81,
    time: "32 min",
  },
];

const TYPE_STYLES: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  bullish: {
    border: "border-pulse/20",
    bg:     "bg-pulse/5",
    text:   "text-pulse",
    badge:  "qf-badge-bullish",
  },
  alert: {
    border: "border-solar/20",
    bg:     "bg-solar/5",
    text:   "text-solar",
    badge:  "qf-badge-neutral",
  },
  target: {
    border: "border-aurora/20",
    bg:     "bg-aurora/5",
    text:   "text-aurora",
    badge:  "qf-badge-aurora",
  },
};

export default function AIInsightPanel() {
  const [loading, setLoading] = useState(false);

  const refresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <div className="qf-card">
      {/* Header */}
      <div className="p-4 border-b border-orbit flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-plasma/10 border border-plasma/30 flex items-center justify-center">
            <Brain className="w-4 h-4 text-plasma" />
          </div>
          <div>
            <h3 className="text-sm font-semibold font-display text-star">AI Insights</h3>
            <p className="text-2xs text-comet">Atualizado em tempo real</p>
          </div>
        </div>
        <button
          onClick={refresh}
          className="p-1.5 rounded-md text-comet hover:text-star hover:bg-crater transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* AI status */}
      <div className="px-4 py-2.5 border-b border-orbit bg-plasma/5">
        <div className="flex items-center justify-between">
          <span className="ai-signal">Analisando 847 ativos</span>
          <span className="text-2xs font-mono text-comet">Modelo: v2.4</span>
        </div>
      </div>

      {/* Insights list */}
      <div className="divide-y divide-orbit/40">
        {INSIGHTS.map((insight) => {
          const Icon = insight.icon;
          const styles = TYPE_STYLES[insight.type];
          return (
            <div
              key={insight.id}
              className={`p-3 border-l-2 ${styles.border} ${styles.bg} hover:bg-opacity-80 transition-colors cursor-pointer group`}
            >
              <div className="flex items-start gap-2.5">
                <div className={`mt-0.5 ${styles.text}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`qf-badge text-2xs ${styles.badge}`}>{insight.label}</span>
                    <span className="text-xs font-mono font-bold text-star">{insight.asset}</span>
                    <span className="text-2xs text-asteroid ml-auto">{insight.time} atrás</span>
                  </div>
                  <p className="text-xs text-moonlight leading-relaxed line-clamp-2">
                    {insight.message}
                  </p>
                  {/* Confidence bar */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xs text-comet">Confiança</span>
                    <div className="flex-1 h-1 bg-orbit rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${styles.text} transition-all`}
                        style={{
                          width: `${insight.confidence}%`,
                          backgroundColor: "currentColor",
                        }}
                      />
                    </div>
                    <span className={`text-2xs font-mono font-bold ${styles.text}`}>
                      {insight.confidence}%
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-comet opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="p-3 border-t border-orbit">
        <button className="w-full flex items-center justify-center gap-2 py-2 bg-plasma/10 border border-plasma/20 rounded-lg text-xs font-medium text-plasma hover:bg-plasma/20 transition-colors">
          <Zap className="w-3.5 h-3.5" />
          Ver análise completa com IA
        </button>
      </div>
    </div>
  );
}
