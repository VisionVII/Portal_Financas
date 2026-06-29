import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Sidebar from "@/components/layout/Sidebar";
import MarketTicker from "@/components/market/MarketTicker";
import PageLayout from "@/components/layout/PageLayout";
import StocksContent from "@/components/stocks/StocksContent";

export const metadata: Metadata = { title: "Ações" };

export default function StocksPage() {
  return (
    <div className="min-h-screen bg-cosmos flex flex-col">
      <MarketTicker />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <PageLayout
            title="Ações"
            subtitle="Mercado brasileiro e internacional em tempo real"
            badge="B3 + NYSE + NASDAQ"
            actions={
              <button className="qf-btn-primary text-xs px-4 py-2">
                + Adicionar à Watchlist
              </button>
            }
          >
            <StocksContent />
          </PageLayout>
        </main>
      </div>
    </div>
  );
}
