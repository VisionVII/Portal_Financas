"use client";

import React, { useState } from "react";
import { Search, Bell, User, ChevronDown, Command } from "lucide-react";

export default function TopBar() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="h-14 bg-void border-b border-orbit flex items-center px-4 gap-4 z-40 flex-shrink-0">

      {/* Search */}
      <div
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 flex-1 max-w-lg
          ${searchFocused
            ? "bg-crater border-aurora/40 shadow-aurora"
            : "bg-nebula border-orbit hover:border-orbit/80"
          }
        `}
      >
        <Search className="w-4 h-4 text-comet flex-shrink-0" />
        <input
          type="text"
          placeholder="Buscar ativo, par, índice... (⌘K)"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="flex-1 bg-transparent text-sm text-star placeholder:text-comet outline-none min-w-0"
        />
        <kbd className="hidden sm:flex items-center gap-1 bg-orbit px-1.5 py-0.5 rounded text-2xs text-comet font-mono">
          <Command className="w-2.5 h-2.5" />K
        </kbd>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 ml-auto flex-shrink-0">

        {/* Market status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-nebula rounded-lg border border-orbit">
          <span className="w-1.5 h-1.5 rounded-full bg-pulse animate-pulse-aurora" />
          <span className="text-xs text-comet">Mercado</span>
          <span className="text-xs font-semibold text-pulse">Aberto</span>
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-nebula border border-orbit hover:border-aurora/30 transition-colors">
          <Bell className="w-4 h-4 text-comet" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-flare rounded-full border border-void" />
        </button>

        {/* User */}
        <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-nebula border border-orbit hover:border-aurora/30 transition-colors">
          <div className="w-6 h-6 rounded-full bg-gradient-aurora flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-cosmos" />
          </div>
          <span className="hidden sm:block text-xs font-medium text-star">Conta</span>
          <ChevronDown className="w-3 h-3 text-comet" />
        </button>
      </div>
    </header>
  );
}
