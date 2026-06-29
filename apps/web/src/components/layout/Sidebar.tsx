"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  TrendingUp,
  Bitcoin,
  DollarSign,
  BarChart2,
  LineChart,
  Newspaper,
  Calendar,
  Bell,
  Briefcase,
  Search,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  ScanLine,
  FlaskConical,
  BookOpen,
  Shield,
} from "lucide-react";

const NAV_SECTIONS = [
  {
    label: "Principal",
    items: [
      { icon: LayoutDashboard, label: "Dashboard",   href: "/",          active: true },
      { icon: Search,          label: "Buscar",       href: "/search" },
      { icon: Bell,            label: "Alertas",      href: "/alerts",    badge: "3" },
    ],
  },
  {
    label: "Mercados",
    items: [
      { icon: TrendingUp, label: "Ações",       href: "/stocks" },
      { icon: Bitcoin,    label: "Criptoativos", href: "/crypto" },
      { icon: DollarSign, label: "Forex",        href: "/forex" },
      { icon: BarChart2,  label: "Índices",      href: "/indices" },
    ],
  },
  {
    label: "Análise",
    items: [
      { icon: LineChart,    label: "Gráficos",    href: "/charts" },
      { icon: ScanLine,     label: "Scanner",     href: "/scanner" },
      { icon: FlaskConical, label: "Backtesting", href: "/backtest" },
    ],
  },
  {
    label: "IA",
    items: [
      { icon: Zap,       label: "AI Insights",  href: "/ai",      glow: true },
      { icon: Shield,    label: "Risk Monitor", href: "/risk" },
    ],
  },
  {
    label: "Ferramentas",
    items: [
      { icon: Briefcase, label: "Portfólio",   href: "/portfolio" },
      { icon: Newspaper, label: "Notícias",    href: "/news" },
      { icon: Calendar,  label: "Calendário",  href: "/calendar" },
      { icon: BookOpen,  label: "Educação",    href: "/learn" },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        relative flex-shrink-0 bg-void border-r border-orbit flex flex-col
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-14" : "w-[220px]"}
      `}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-orbit flex-shrink-0">
        <div className="flex items-center gap-2.5 overflow-hidden">
          {/* Logo mark */}
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-aurora to-plasma flex items-center justify-center flex-shrink-0">
            <span className="text-cosmos font-black text-xs font-display">PF</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold font-display text-star">Portal</span>
              <span className="text-xs font-medium text-aurora tracking-wider">FINANÇAS</span>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2 scrollbar-none">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="mb-4">
            {!collapsed && (
              <p className="text-2xs font-semibold text-asteroid uppercase tracking-widest px-2 mb-1.5">
                {section.label}
              </p>
            )}
            {section.items.map((item) => (
              <NavItem key={item.href} item={item} collapsed={collapsed} />
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom: Settings + collapse */}
      <div className="border-t border-orbit p-2 space-y-0.5">
        <NavItem
          item={{ icon: Settings, label: "Configurações", href: "/settings" }}
          collapsed={collapsed}
        />

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-2 py-2 rounded-md text-comet hover:text-star hover:bg-crater transition-colors text-xs"
          title={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs">Recolher</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

interface NavItemProps {
  item: {
    icon: React.ElementType;
    label: string;
    href: string;
    active?: boolean;
    badge?: string;
    glow?: boolean;
  };
  collapsed: boolean;
}

function NavItem({ item, collapsed }: NavItemProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      className={`
        flex items-center gap-2.5 px-2 py-2 rounded-md text-sm transition-all duration-150 group relative
        ${item.active
          ? "bg-aurora/10 text-aurora border border-aurora/20"
          : "text-comet hover:text-star hover:bg-crater border border-transparent"
        }
        ${item.glow ? "hover:shadow-plasma" : ""}
      `}
    >
      <Icon
        className={`w-4 h-4 flex-shrink-0 transition-colors ${
          item.active
            ? "text-aurora"
            : item.glow
            ? "text-plasma group-hover:text-plasma"
            : "text-comet group-hover:text-star"
        }`}
      />

      {!collapsed && (
        <span className="flex-1 font-medium truncate">{item.label}</span>
      )}

      {!collapsed && item.badge && (
        <span className="flex-shrink-0 bg-flare text-cosmos text-2xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {item.badge}
        </span>
      )}

      {/* AI glow dot */}
      {!collapsed && item.glow && (
        <span className="w-1.5 h-1.5 rounded-full bg-plasma animate-pulse-aurora flex-shrink-0" />
      )}
    </Link>
  );
}
