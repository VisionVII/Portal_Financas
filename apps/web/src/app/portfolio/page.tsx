import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Sidebar from "@/components/layout/Sidebar";
import MarketTicker from "@/components/market/MarketTicker";
import PageLayout from "@/components/layout/PageLayout";
import PortfolioContent from "@/components/portfolio/PortfolioContent";

export const metadata: Metadata = { title: "Portfólio" };

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-cosmos flex flex-col">
      <MarketTicker />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <PageLayout
            title="Portfólio"
            subtitle="Gerencie suas posições e acompanhe seu desempenho"
            actions={
              <button className="qf-btn-primary text-xs px-4 py-2">
                + Nova Posição
              </button>
            }
          >
            <PortfolioContent />
          </PageLayout>
        </main>
      </div>
    </div>
  );
}
