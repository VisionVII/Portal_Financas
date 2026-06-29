import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Sidebar from "@/components/layout/Sidebar";
import MarketTicker from "@/components/market/MarketTicker";
import PageLayout from "@/components/layout/PageLayout";
import ForexContent from "@/components/forex/ForexContent";

export const metadata: Metadata = { title: "Forex" };

export default function ForexPage() {
  return (
    <div className="min-h-screen bg-cosmos flex flex-col">
      <MarketTicker />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <PageLayout
            title="Forex"
            subtitle="Pares de moedas, câmbio e mercado internacional"
            badge="24h"
          >
            <ForexContent />
          </PageLayout>
        </main>
      </div>
    </div>
  );
}
