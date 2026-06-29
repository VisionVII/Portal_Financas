"use client";

import React, { useState } from "react";
import { Brain, Zap, TrendingUp, TrendingDown, Target, AlertTriangle, ChevronRight, RefreshCw } from "lucide-react";

const AGENTS = [
  { id: "market",     name: "Market Intelligence",  icon: "🌐", status: "active",  analyses: 142 },
  { id: "technical",  name: "Technical Analysis",   icon: "📊", status: "active",  analyses: 298 },
  { id: "sentiment",  name: "Sentiment Analysis",   icon: "💬", status: "active",  analyses: 87  },
  { id: "pattern",    name: "Pattern Recognition",  icon: "🔍", status: "active",  analyses: 54  },
  { id: "risk",       name: "Risk Analysis",        icon: "🛡️", status: "active",  analyses: 31  },
  { id: "fundamental",name: "Fundamental Analysis", icon: "📋", status: "idle",    analyses: 12  },
];

const INSIGHTS = [
  {
    id: 1, agent: "Technical Analysis", asset: "BTC/USD", type: "bullish",
    title: "Cruzamento Golden Cross detectado",
    body: "Média móvel de 50 dias cruzou acima da média de 200 dias no gráfico diário. Historicamente este padrão precede alta de 15-30% em 60 dias. RSI em 58 — território saudável sem sobrecompra.",
    confidence: 82, tags: ["Golden Cross", "EMA", "Tendência"], time: "3 min",
  },
  {
    id: 2, agent: "Sentiment Analysis", asset: "PETR4", type: "alert",
    title: "Sentimento negativo crescendo nas redes",
    body: "Aumento de 340% nas menções negativas sobre PETR4 nas últimas 4 horas. Principais tópicos: preocupações com política de dividendos e incertezas regulatórias. Score de sentimento: -0.62.",
    confidence: 71, tags: ["Sentimento", "Social", "Risco"], time: "11 min",
  },
  {
    id: 3, agent: "Pattern Recognition", asset: "ETH/USD", type: "bullish",
    title: "Formação de Copa e Alça identificada",
    body: "Padrão clássico de reversão de alta detectado no gráfico de 4 horas. Projeção de movimento para $4.150 com suporte forte em $3.380. Breakout confirmado acima de $3.620.",
    confidence: 74, tags: ["Cup & Handle", "Padrão", "Breakout"], time: "22 min",
  },
  {
    id: 4, agent: "Risk Analysis", asset: "Portfolio", type: "alert",
    title: "Correlação elevada detectada no portfólio",
    body: "70% do portfólio apresenta correlação acima de 0.85 com Bitcoin. Em caso de correção cripto, exposição combinada pode gerar drawdown de 22-28%. Recomenda-se diversificação em ativos não correlacionados.",
    confidence: 88, tags: ["Risco", "Correlação", "Diversificação"], time: "45 min",
  },
  {
    id: 5, agent: "Market Intelligence", asset: "IBOV", type: "target",
    title: "Ibovespa: janela de entrada macro identificada",
    body: "Combinação de SELIC estável, dólar recuando e fluxo estrangeiro positivo cria condição favorável para o índice. Resistência em 136.500 pts. Rompimento abre caminho para 140.000.",
    confidence: 67, tags: ["Macro", "IBOV", "Fluxo"], time: "1h 10min",
  },
];

const TYPE_STYLES = {
  bullish: { icon: TrendingUp,   color: "text-pulse",  bg: "bg-pulse/10",  border: "border-l-pulse"  },
  bearish: { icon: TrendingDown, color: "text-flare",  bg: "bg-flare/10",  border: "border-l-flare"  },
  alert:   { icon: AlertTriangle,color: "text-solar",  bg: "bg-solar/10",  border: "border-l-solar"  },
  target:  { icon: Target,       color: "text-aurora", bg: "bg-aurora/10", border: "border-l-aurora" },
};

export default function AIContent() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const filtered = activeAgent ? INSIGHTS.filter(i => {
    const agent = AGENTS.find(a => a.id === activeAgent);
    return agent ? i.agent === agent.name : true;
  }) : INSIGHTS;

  return (
    <div className="space-y-6">
      {/* Agents grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {AGENTS.map(agent => (
          <button
            key={agent.id}
            onClick={() => setActiveAgent(activeAgent === agent.id ? null : agent.id)}
            className={`qf-card p-3 text-left transition-all ${
              activeAgent === agent.id ? "border-plasma/40 bg-plasma/5" : "hover:border-orbit/80"
            }`}
          >
            <span className="text-xl block mb-2">{agent.icon}</span>
            <p className="text-xs font-semibold text-star leading-tight mb-1">{agent.name}</p>
            <div className="flex items-center justify-between">
              <span className={`text-2xs ${agent.status === "active" ? "text-pulse" : "text-comet"}`}>
                {agent.status === "active" ? "● Ativo" : "○ Ocioso"}
              </span>
              <span className="text-2xs font-mono text-comet">{agent.analyses}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Header + refresh */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-plasma" />
          <h2 className="text-base font-semibold text-star">
            {activeAgent ? AGENTS.find(a => a.id === activeAgent)?.name : "Todos os insights"}
          </h2>
          <span className="qf-badge qf-badge-aurora">{filtered.length}</span>
        </div>
        <button
          onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1500); }}
          className="flex items-center gap-2 px-3 py-1.5 bg-plasma/10 border border-plasma/20 rounded-lg text-xs text-plasma hover:bg-plasma/20 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Atualizar análises
        </button>
      </div>

      {/* Insights */}
      <div className="space-y-3">
        {filtered.map(insight => {
          const styles = TYPE_STYLES[insight.type as keyof typeof TYPE_STYLES];
          const Icon = styles.icon;
          return (
            <div
              key={insight.id}
              className={`qf-card p-4 border-l-4 ${styles.border} cursor-pointer hover:border-aurora/20 transition-all group`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 w-8 h-8 rounded-lg ${styles.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${styles.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-xs font-medium text-plasma bg-plasma/10 px-2 py-0.5 rounded">
                      {insight.agent}
                    </span>
                    <span className="text-sm font-mono font-bold text-star">{insight.asset}</span>
                    <span className="text-2xs text-comet ml-auto">{insight.time} atrás</span>
                  </div>

                  <h3 className="text-sm font-semibold text-star mb-1.5">{insight.title}</h3>
                  <p className="text-xs text-comet leading-relaxed line-clamp-2">{insight.body}</p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {insight.tags.map(tag => (
                        <span key={tag} className="text-2xs text-comet bg-orbit px-2 py-0.5 rounded">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-2xs text-comet">Confiança</span>
                        <div className="w-16 h-1.5 bg-orbit rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${styles.color}`} style={{ width: `${insight.confidence}%`, backgroundColor: "currentColor" }} />
                        </div>
                        <span className={`text-2xs font-mono font-bold ${styles.color}`}>{insight.confidence}%</span>
                      </div>
                      <Zap className="w-3.5 h-3.5 text-comet opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-comet opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
