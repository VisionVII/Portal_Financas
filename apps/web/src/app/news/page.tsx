import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Sidebar from "@/components/layout/Sidebar";
import MarketTicker from "@/components/market/MarketTicker";
import PageLayout from "@/components/layout/PageLayout";
import NewsContent from "@/components/news/NewsContent";

export const metadata: Metadata = { title: "Notícias" };

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-cosmos flex flex-col">
      <MarketTicker />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <PageLayout
            title="Notícias"
            subtitle="Feed curado com análise de sentimento por IA"
            badge="Ao vivo"
          >
            <NewsContent />
          </PageLayout>
        </main>
      </div>
    </div>
  );
}
