import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Sidebar from "@/components/layout/Sidebar";
import MarketTicker from "@/components/market/MarketTicker";
import PageLayout from "@/components/layout/PageLayout";
import ChartsContent from "@/components/charts/ChartsContent";

export const metadata: Metadata = { title: "Gráficos" };

export default function ChartsPage() {
  return (
    <div className="min-h-screen bg-cosmos flex flex-col">
      <MarketTicker />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <PageLayout
            title="Gráficos"
            subtitle="Análise técnica avançada com indicadores e ferramentas de desenho"
          >
            <ChartsContent />
          </PageLayout>
        </main>
      </div>
    </div>
  );
}
