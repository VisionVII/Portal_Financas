import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Sidebar from "@/components/layout/Sidebar";
import MarketTicker from "@/components/market/MarketTicker";
import PageLayout from "@/components/layout/PageLayout";
import CryptoContent from "@/components/crypto/CryptoContent";

export const metadata: Metadata = { title: "Criptoativos" };

export default function CryptoPage() {
  return (
    <div className="min-h-screen bg-cosmos flex flex-col">
      <MarketTicker />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <PageLayout
            title="Criptoativos"
            subtitle="Bitcoin, Ethereum e mais de 500 ativos digitais"
            badge="Live"
            actions={
              <button className="qf-btn-primary text-xs px-4 py-2">
                + Criar Alerta
              </button>
            }
          >
            <CryptoContent />
          </PageLayout>
        </main>
      </div>
    </div>
  );
}
