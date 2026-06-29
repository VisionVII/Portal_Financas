"use client";

import React, { useState } from "react";
import { Bell, BellOff, Plus, Trash2, TrendingUp, TrendingDown, Activity, CheckCircle2 } from "lucide-react";

type AlertType = "price_above" | "price_below" | "change_percent" | "volume_spike" | "pattern";

interface Alert {
  id: number;
  symbol: string;
  type: AlertType;
  value: string;
  channels: string[];
  active: boolean;
  triggered?: boolean;
  triggeredAt?: string;
}

const INITIAL_ALERTS: Alert[] = [
  { id: 1,  symbol: "BTC/USD",  type: "price_above",   value: "$70.000",  channels: ["email","push"],    active: true  },
  { id: 2,  symbol: "PETR4",    type: "price_below",   value: "R$36,00",  channels: ["push"],            active: true  },
  { id: 3,  symbol: "ETH/USD",  type: "price_above",   value: "$4.000",   channels: ["email","telegram"], active: true  },
  { id: 4,  symbol: "USD/BRL",  type: "price_above",   value: "5,20",     channels: ["push"],            active: false },
  { id: 5,  symbol: "VALE3",    type: "change_percent", value: "-3%",      channels: ["email","push"],    active: true, triggered: true, triggeredAt: "Hoje 09:34" },
  { id: 6,  symbol: "BTC/USD",  type: "volume_spike",  value: "+200% vol",channels: ["push"],            active: true  },
];

const TYPE_LABELS: Record<AlertType, string> = {
  price_above:    "Preço acima de",
  price_below:    "Preço abaixo de",
  change_percent: "Variação de",
  volume_spike:   "Spike de volume",
  pattern:        "Padrão detectado",
};

const CHANNEL_ICONS: Record<string, string> = {
  email:    "✉️",
  push:     "📱",
  telegram: "✈️",
  discord:  "💬",
  whatsapp: "📲",
};

const STATS = [
  { label: "Alertas ativos",     value: "5",  icon: Bell,          color: "text-aurora" },
  { label: "Disparados hoje",    value: "1",  icon: CheckCircle2,  color: "text-pulse"  },
  { label: "Pausados",           value: "1",  icon: BellOff,       color: "text-solar"  },
  { label: "Canais conectados",  value: "3",  icon: Activity,      color: "text-plasma" },
];

export default function AlertsContent() {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);

  const toggle = (id: number) => setAlerts(prev =>
    prev.map(a => a.id === id ? { ...a, active: !a.active } : a)
  );
  const remove = (id: number) => setAlerts(prev => prev.filter(a => a.id !== id));

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="qf-card p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-crater flex items-center justify-center flex-shrink-0">
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div>
                <p className="text-xl font-bold font-mono text-star">{s.value}</p>
                <p className="text-2xs text-comet">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alerts list */}
      <div className="qf-card overflow-hidden">
        <div className="p-4 border-b border-orbit flex items-center justify-between">
          <h3 className="text-sm font-semibold text-star">Meus Alertas</h3>
          <button className="qf-btn-primary text-xs px-3 py-1.5 flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            Novo Alerta
          </button>
        </div>

        <div className="divide-y divide-orbit/40">
          {alerts.map(alert => (
            <div
              key={alert.id}
              className={`flex items-center gap-4 px-4 py-3 transition-colors ${
                alert.triggered ? "bg-pulse/5" : alert.active ? "" : "opacity-50"
              }`}
            >
              {/* Icon */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                alert.triggered ? "bg-pulse/10" : alert.active ? "bg-aurora/10" : "bg-orbit"
              }`}>
                {alert.triggered ? (
                  <CheckCircle2 className="w-4 h-4 text-pulse" />
                ) : alert.type === "price_above" ? (
                  <TrendingUp className="w-4 h-4 text-aurora" />
                ) : alert.type === "price_below" ? (
                  <TrendingDown className="w-4 h-4 text-flare" />
                ) : (
                  <Activity className="w-4 h-4 text-solar" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-mono font-bold text-star">{alert.symbol}</span>
                  <span className="text-xs text-comet">{TYPE_LABELS[alert.type]}</span>
                  <span className="text-sm font-mono text-aurora">{alert.value}</span>
                  {alert.triggered && (
                    <span className="qf-badge qf-badge-bullish text-2xs">Disparado {alert.triggeredAt}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {alert.channels.map(ch => (
                    <span key={ch} title={ch} className="text-sm">{CHANNEL_ICONS[ch]}</span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => toggle(alert.id)}
                  className={`w-8 h-5 rounded-full transition-colors relative ${
                    alert.active ? "bg-aurora" : "bg-orbit"
                  }`}
                  title={alert.active ? "Pausar" : "Ativar"}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-cosmos transition-transform ${
                    alert.active ? "translate-x-3" : "translate-x-0.5"
                  }`} />
                </button>
                <button
                  onClick={() => remove(alert.id)}
                  className="p-1.5 rounded-md text-comet hover:text-flare hover:bg-flare/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Channel connection */}
      <div className="qf-card p-4">
        <h3 className="text-sm font-semibold text-star mb-4">Canais de Notificação</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { name: "E-mail",    emoji: "✉️",  connected: true  },
            { name: "Push App",  emoji: "📱",  connected: true  },
            { name: "Telegram",  emoji: "✈️",  connected: true  },
            { name: "Discord",   emoji: "💬",  connected: false },
            { name: "WhatsApp",  emoji: "📲",  connected: false },
          ].map(ch => (
            <div key={ch.name} className={`qf-card p-3 text-center flex flex-col items-center gap-2 ${ch.connected ? "border-aurora/20" : ""}`}>
              <span className="text-2xl">{ch.emoji}</span>
              <span className="text-xs text-star">{ch.name}</span>
              <span className={`text-2xs font-medium ${ch.connected ? "text-pulse" : "text-comet"}`}>
                {ch.connected ? "Conectado" : "Conectar"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
