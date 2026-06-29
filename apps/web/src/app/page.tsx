import TopBar from "@/components/layout/TopBar";
import Sidebar from "@/components/layout/Sidebar";
import MarketTicker from "@/components/market/MarketTicker";
import HeroMarket from "@/components/dashboard/HeroMarket";
import MarketGrid from "@/components/dashboard/MarketGrid";
import AIInsightPanel from "@/components/ai/AIInsightPanel";
import WatchlistPanel from "@/components/dashboard/WatchlistPanel";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cosmos flex flex-col">
      {/* Ticker em tempo real — topo */}
      <MarketTicker />

      {/* Layout principal */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Conteúdo */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <TopBar />

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
              {/* Hero com gráfico principal */}
              <HeroMarket />

              {/* Grid: Mercados + IA + Watchlist */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 space-y-6">
                  <MarketGrid />
                </div>
                <div className="space-y-6">
                  <AIInsightPanel />
                  <WatchlistPanel />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
