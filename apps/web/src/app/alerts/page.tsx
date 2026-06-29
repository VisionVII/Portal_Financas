import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Sidebar from "@/components/layout/Sidebar";
import MarketTicker from "@/components/market/MarketTicker";
import PageLayout from "@/components/layout/PageLayout";
import AlertsContent from "@/components/alerts/AlertsContent";

export const metadata: Metadata = { title: "Alertas" };

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-cosmos flex flex-col">
      <MarketTicker />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <PageLayout
            title="Alertas"
            subtitle="Configure notificações por preço, indicadores e padrões técnicos"
            actions={
              <button className="qf-btn-primary text-xs px-4 py-2">
                + Novo Alerta
              </button>
            }
          >
            <AlertsContent />
          </PageLayout>
        </main>
      </div>
    </div>
  );
}
