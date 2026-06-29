import { NextResponse } from "next/server";
import { API_CONFIG } from "@/lib/api-config";

// Ticker unificado: crypto + ações BR + índices + forex
// Usado pelo MarketTicker no topo da tela

const CRYPTO_IDS  = "bitcoin,ethereum,solana,ripple";
const FOREX_PAIRS = "USD/BRL,EUR/USD,GBP/USD";

const MOCK_TICKER = [
  { symbol: "BTC/USD",  price: 67450.00, change:  2.34, type: "crypto" },
  { symbol: "ETH/USD",  price:  3521.80, change:  1.87, type: "crypto" },
  { symbol: "SOL/USD",  price:   182.50, change:  4.21, type: "crypto" },
  { symbol: "XRP/USD",  price:     0.682,change:  5.12, type: "crypto" },
  { symbol: "PETR4",    price:    38.72, change: -0.51, type: "stock_br" },
  { symbol: "VALE3",    price:    62.15, change:  0.82, type: "stock_br" },
  { symbol: "ITUB4",    price:    35.64, change:  1.05, type: "stock_br" },
  { symbol: "IBOV",     price: 134250,   change:  0.71, type: "index"   },
  { symbol: "S&P500",   price:  5842.50, change:  0.45, type: "index"   },
  { symbol: "USD/BRL",  price:     5.123,change:  0.33, type: "forex"   },
  { symbol: "EUR/USD",  price:     1.084,change: -0.12, type: "forex"   },
  { symbol: "GOLD",     price:  2648.30, change:  0.28, type: "commodity"},
  { symbol: "WTI",      price:    78.42, change: -1.15, type: "commodity"},
  { symbol: "AAPL",     price:   228.50, change:  1.23, type: "stock_us" },
  { symbol: "NVDA",     price:   486.20, change:  3.41, type: "stock_us" },
];

interface TickerItem {
  symbol: string;
  price: number;
  change: number;
  type: string;
}

export async function GET() {
  const results: TickerItem[] = [];
  let source = "mock";

  // 1. Tentar crypto via CoinGecko
  const cgKey = API_CONFIG.coingecko.key;
  const hasCG = cgKey && !cgKey.startsWith("COLOQUE");

  if (hasCG) {
    try {
      const url = `${API_CONFIG.coingecko.url}/simple/price?ids=${CRYPTO_IDS}&vs_currencies=usd&include_24hr_change=true`;
      const res = await fetch(url, {
        headers: { "x-cg-demo-api-key": cgKey },
        next: { revalidate: 15 },
      });
      if (res.ok) {
        const json = await res.json();
        const MAP: Record<string, string> = {
          bitcoin: "BTC/USD", ethereum: "ETH/USD", solana: "SOL/USD", ripple: "XRP/USD",
        };
        for (const [id, symbol] of Object.entries(MAP)) {
          if (json[id]) {
            results.push({
              symbol,
              price:  json[id].usd,
              change: json[id].usd_24h_change ?? 0,
              type:   "crypto",
            });
          }
        }
        source = "live";
      }
    } catch { /* continua com mock */ }
  }

  // 2. Tentar ações BR via brapi
  if (API_CONFIG.brapi.ready) {
    try {
      const symbols = "PETR4,VALE3,ITUB4";
      const url = `${API_CONFIG.brapi.baseUrl}/quote/${symbols}?token=${API_CONFIG.brapi.token}`;
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (res.ok) {
        const json = await res.json();
        for (const q of (json.results ?? [])) {
          results.push({
            symbol: q.symbol,
            price:  q.regularMarketPrice,
            change: q.regularMarketChangePercent,
            type:   "stock_br",
          });
        }
        source = "live";
      }
    } catch { /* continua */ }
  }

  // Se nenhuma API respondeu, retorna mock completo
  if (results.length === 0) {
    return NextResponse.json({ data: MOCK_TICKER, source: "mock" });
  }

  // Completa com mock para itens que as APIs não cobriram
  const covered = new Set(results.map(r => r.symbol));
  const missing = MOCK_TICKER.filter(m => !covered.has(m.symbol));
  const data = [...results, ...missing];

  return NextResponse.json({ data, source });
}
