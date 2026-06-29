"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, TrendingUp, LayoutDashboard, Bitcoin, DollarSign, BarChart2, Newspaper, Bell, Briefcase, Zap, LineChart, X } from "lucide-react";

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
  action: () => void;
  category: string;
}

export default function CommandPalette() {
  const [open, setOpen]       = useState(false);
  const [query, setQuery]     = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef              = useRef<HTMLInputElement>(null);
  const router                = useRouter();

  const go = useCallback((path: string) => {
    router.push(path);
    setOpen(false);
    setQuery("");
  }, [router]);

  const COMMANDS: Command[] = [
    { id: "dashboard", label: "Dashboard",    description: "Visão geral do mercado",          icon: LayoutDashboard, action: () => go("/"),          category: "Páginas" },
    { id: "stocks",    label: "Ações",         description: "B3, NYSE, NASDAQ",               icon: TrendingUp,      action: () => go("/stocks"),     category: "Páginas" },
    { id: "crypto",    label: "Criptoativos",  description: "Bitcoin, Ethereum e mais",        icon: Bitcoin,         action: () => go("/crypto"),     category: "Páginas" },
    { id: "forex",     label: "Forex",         description: "Pares de moedas e câmbio",        icon: DollarSign,      action: () => go("/forex"),      category: "Páginas" },
    { id: "charts",    label: "Gráficos",      description: "Análise técnica avançada",        icon: LineChart,       action: () => go("/charts"),     category: "Páginas" },
    { id: "portfolio", label: "Portfólio",     description: "Suas posições e P&L",             icon: Briefcase,       action: () => go("/portfolio"),  category: "Páginas" },
    { id: "news",      label: "Notícias",      description: "Feed com análise de sentimento",  icon: Newspaper,       action: () => go("/news"),       category: "Páginas" },
    { id: "alerts",    label: "Alertas",       description: "Configurar notificações",         icon: Bell,            action: () => go("/alerts"),     category: "Páginas" },
    { id: "ai",        label: "AI Insights",   description: "Análises dos agentes de IA",      icon: Zap,             action: () => go("/ai"),         category: "Páginas" },
    { id: "indices",   label: "Índices",       description: "IBOV, S&P500, NASDAQ",           icon: BarChart2,       action: () => go("/indices"),    category: "Páginas" },
  ];

  const filtered = query
    ? COMMANDS.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.description?.toLowerCase().includes(query.toLowerCase())
      )
    : COMMANDS;

  // ⌘K / Ctrl+K toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(prev => !prev);
        setQuery("");
        setSelected(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input when open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === "Enter" && filtered[selected]) { filtered[selected].action(); }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh]"
      onClick={() => setOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-void/80 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-lg mx-4 qf-card overflow-hidden shadow-glow animate-slide-down"
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-orbit">
          <Search className="w-4 h-4 text-comet flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Buscar página, ativo ou comando..."
            className="flex-1 bg-transparent text-sm text-star placeholder:text-comet outline-none"
          />
          <button onClick={() => setOpen(false)} className="text-comet hover:text-star transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-72 overflow-y-auto py-1">
          {filtered.length === 0 ? (
            <p className="text-sm text-comet text-center py-6">Nenhum resultado para &ldquo;{query}&rdquo;</p>
          ) : (
            filtered.map((cmd, i) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    i === selected ? "bg-aurora/10 text-aurora" : "text-moonlight hover:bg-crater/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${i === selected ? "text-aurora" : "text-comet"}`} />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium block">{cmd.label}</span>
                    {cmd.description && (
                      <span className="text-2xs text-comet">{cmd.description}</span>
                    )}
                  </div>
                  {i === selected && (
                    <kbd className="text-2xs text-comet bg-orbit px-1.5 py-0.5 rounded font-mono">↵</kbd>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-orbit flex items-center gap-4 text-2xs text-comet">
          <span><kbd className="bg-orbit px-1 rounded">↑↓</kbd> navegar</span>
          <span><kbd className="bg-orbit px-1 rounded">↵</kbd> abrir</span>
          <span><kbd className="bg-orbit px-1 rounded">Esc</kbd> fechar</span>
        </div>
      </div>
    </div>
  );
}
