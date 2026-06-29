"use client";

import React, { useState } from "react";
import { TrendingUp, TrendingDown, Minus, ExternalLink, Clock } from "lucide-react";

const CATEGORIES = ["Todos", "Macro", "Ações BR", "Crypto", "Forex", "Internacional"];

const NEWS = [
  {
    id: 1, category: "Macro",
    title: "Copom mantém SELIC em 10,50% e sinaliza cautela para próximas reuniões",
    summary: "Banco Central do Brasil decidiu por unanimidade manter a taxa básica de juros estável, citando persistência inflacionária e incertezas fiscais como fatores determinantes para a decisão.",
    source: "Valor Econômico", time: "12 min", sentiment: "neutral" as const, assets: ["USD/BRL","IBOV"],
  },
  {
    id: 2, category: "Crypto",
    title: "Bitcoin supera $68.000 após aprovação de novos ETFs institucionais nos EUA",
    summary: "Maior criptomoeda do mundo registra nova alta semanal impulsionada por entrada de capital institucional. Analistas projetam continuidade do movimento com alvo em $72.000.",
    source: "CoinDesk", time: "28 min", sentiment: "positive" as const, assets: ["BTC","ETH"],
  },
  {
    id: 3, category: "Ações BR",
    title: "Petrobras anuncia dividendos extraordinários e ações sobem 3% no pré-mercado",
    summary: "Petrobras (PETR4) divulgou pagamento de dividendos extraordinários de R$1,20 por ação, surpreendendo positivamente o mercado. Resultado operacional do trimestre superou expectativas.",
    source: "InfoMoney", time: "45 min", sentiment: "positive" as const, assets: ["PETR4","PETR3"],
  },
  {
    id: 4, category: "Internacional",
    title: "Fed mantém juros inalterados; Powell indica possível corte em setembro",
    summary: "Federal Reserve decidiu manter a taxa de juros na faixa de 5,25%-5,50%. Chairman Jerome Powell afirmou que mais dados positivos de inflação podem abrir espaço para flexibilização monetária.",
    source: "Reuters", time: "1h", sentiment: "positive" as const, assets: ["S&P500","USD"],
  },
  {
    id: 5, category: "Ações BR",
    title: "Vale reporta queda de 8% no volume de minério de ferro no segundo trimestre",
    summary: "Companhia atribuiu redução à manutenção programada em minas do Pará. Preço do minério no mercado spot recuou para $98/ton, afetando perspectivas de receita para o semestre.",
    source: "Exame", time: "1h 20min", sentiment: "negative" as const, assets: ["VALE3"],
  },
  {
    id: 6, category: "Forex",
    title: "Dólar recua ante o real após dados positivos da balança comercial brasileira",
    summary: "Superávit comercial de US$8,2 bilhões em junho supera estimativas e pressiona o dólar para baixo. Moeda americana opera abaixo dos R$5,10 pela primeira vez em três semanas.",
    source: "Bloomberg", time: "2h", sentiment: "positive" as const, assets: ["USD/BRL"],
  },
  {
    id: 7, category: "Crypto",
    title: "Ethereum atinge $3.600 com upgrade Pectra melhorando eficiência da rede",
    summary: "Segunda maior criptomoeda valoriza após atualização técnica reduzir taxas de transação em 40%. Desenvolvedores da plataforma reportam aumento de 25% em transações diárias.",
    source: "The Block", time: "3h", sentiment: "positive" as const, assets: ["ETH"],
  },
  {
    id: 8, category: "Macro",
    title: "IPCA de junho vem acima do esperado; inflação anual atinge 4,2%",
    summary: "Índice Nacional de Preços ao Consumidor Amplo registrou alta de 0,52% em junho, acima da projeção de 0,40%. Alimentação e energia foram os principais vilões da inflação no período.",
    source: "IBGE", time: "4h", sentiment: "negative" as const, assets: ["USD/BRL","IBOV"],
  },
];

const SENTIMENT_CONFIG = {
  positive: { icon: TrendingUp,  color: "text-pulse",  bg: "bg-pulse/10",  border: "border-pulse/20",  label: "Positivo" },
  negative: { icon: TrendingDown, color: "text-flare",  bg: "bg-flare/10",  border: "border-flare/20",  label: "Negativo" },
  neutral:  { icon: Minus,        color: "text-solar",  bg: "bg-solar/10",  border: "border-solar/20",  label: "Neutro"   },
};

export default function NewsContent() {
  const [category, setCategory] = useState("Todos");

  const filtered = category === "Todos" ? NEWS : NEWS.filter(n => n.category === category);

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex gap-1 bg-void rounded-lg p-1 w-fit flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              category === cat ? "bg-crater text-aurora" : "text-comet hover:text-star"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((news, idx) => {
          const sent = SENTIMENT_CONFIG[news.sentiment];
          const SentIcon = sent.icon;
          const isFeature = idx === 0 && category === "Todos";

          return (
            <div
              key={news.id}
              className={`qf-card p-4 cursor-pointer hover:border-aurora/20 transition-all ${
                isFeature ? "lg:col-span-2" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  {/* Meta */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-2xs font-medium text-aurora bg-aurora/10 px-2 py-0.5 rounded">
                      {news.category}
                    </span>
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded ${sent.bg} border ${sent.border}`}>
                      <SentIcon className={`w-3 h-3 ${sent.color}`} />
                      <span className={`text-2xs font-medium ${sent.color}`}>{sent.label}</span>
                    </div>
                    <div className="flex items-center gap-1 text-2xs text-comet ml-auto">
                      <Clock className="w-3 h-3" />
                      {news.time}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`font-semibold font-display text-star mb-1.5 leading-snug ${isFeature ? "text-base" : "text-sm"}`}>
                    {news.title}
                  </h3>

                  {/* Summary */}
                  <p className={`text-comet leading-relaxed ${isFeature ? "text-sm line-clamp-3" : "text-xs line-clamp-2"}`}>
                    {news.summary}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {news.assets.map(asset => (
                        <span key={asset} className="qf-badge qf-badge-aurora text-2xs">{asset}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xs text-comet">{news.source}</span>
                      <ExternalLink className="w-3 h-3 text-comet hover:text-aurora transition-colors cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
