import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Sidebar from "@/components/layout/Sidebar";
import MarketTicker from "@/components/market/MarketTicker";
import PageLayout from "@/components/layout/PageLayout";
import AIContent from "@/components/ai/AIContent";

export const metadata: Metadata = { title: "AI Insights" };

export default function AIPage() {
  return (
    <div className="min-h-screen bg-cosmos flex flex-col">
      <MarketTicker />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <PageLayout
            title="AI Insights"
            subtitle="Análises geradas por agentes de inteligência artificial especializados"
            badge="Claude Sonnet"
          >
            <AIContent />
          </PageLayout>
        </main>
      </div>
    </div>
  );
}
