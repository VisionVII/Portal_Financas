import React from "react";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  badge?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export default function PageLayout({ title, subtitle, badge, actions, children }: PageLayoutProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Page header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold font-display text-star">{title}</h1>
              {badge && (
                <span className="qf-badge qf-badge-aurora text-xs">{badge}</span>
              )}
            </div>
            {subtitle && (
              <p className="text-sm text-comet">{subtitle}</p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
