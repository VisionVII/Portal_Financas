import { NextResponse } from "next/server";
import { API_CONFIG } from "@/lib/api-config";

// IDs CoinGecko para os principais ativos
const COIN_IDS = [
  "bitcoin", "ethereum", "binancecoin", "solana", "ripple",
  "cardano", "avalanche-2", "polkadot", "dogecoin", "matic-network",
];

// Dados mock para fallback quando não há chave configurada
const MOCK_CRYPTO = [
  { id: "bitcoin",      symbol: "BTC",  name: "Bitcoin",    price: 67450.00, change24h: 2.34,  marketCap: 1_320_000_000_000, volume24h: 34_200_000_000 },
  { id: "ethereum",     symbol: "ETH",  name: "Ethereum",   price: 3521.80,  change24h: 1.87,  marketCap:   423_000_000_000, volume24h: 18_100_000_000 },
  { id: "binancecoin",  symbol: "BNB",  name: "BNB",        price: 602.40,   change24h: -0.88, marketCap:    89_000_000_000, volume24h:  2_100_000_000 },
  { id: "solana",       symbol: "SOL",  name: "Solana",     price: 182.50,   change24h: 4.21,  marketCap:    86_000_000_000, volume24h:  4_300_000_000 },
  { id: "ripple",       symbol: "XRP",  name: "XRP",        price: 0.6820,   change24h: 5.12,  marketCap:    38_000_000_000, volume24h:  2_900_000_000 },
  { id: "cardano",      symbol: "ADA",  name: "Cardano",    price: 0.4510,   change24h: 1.60,  marketCap:    16_000_000_000, volume24h:    800_000_000 },
  { id: "avalanche-2",  symbol: "AVAX", name: "Avalanche",  price: 38.20,    change24h: -2.10, marketCap:    16_000_000_000, volume24h:    900_000_000 },
  { id: "polkadot",     symbol: "DOT",  name: "Polkadot",   price: 6.82,     change24h: 0.94,  marketCap:    10_000_000_000, volume24h:    500_000_000 },
  { id: "dogecoin",     symbol: "DOGE", name: "Dogecoin",   price: 0.1380,   change24h: 3.25,  marketCap:    20_000_000_000, volume24h:  1_200_000_000 },
  { id: "matic-network",symbol: "MATIC",name: "Polygon",    price: 0.5180,   change24h: -1.40, marketCap:     5_000_000_000, volume24h:    600_000_000 },
];

export async function GET() {
  const apiKey = API_CONFIG.coingecko.key;
  const hasKey = apiKey && !apiKey.startsWith("COLOQUE");

  // Sem chave → retorna mock com flag
  if (!hasKey) {
    return NextResponse.json({ data: MOCK_CRYPTO, source: "mock" });
  }

  try {
    const url = new URL(`${API_CONFIG.coingecko.url}/coins/markets`);
    url.searchParams.set("vs_currency", "usd");
    url.searchParams.set("ids", COIN_IDS.join(","));
    url.searchParams.set("order", "market_cap_desc");
    url.searchParams.set("price_change_percentage", "24h");
    url.searchParams.set("sparkline", "false");

    const res = await fetch(url.toString(), {
      headers: { "x-cg-demo-api-key": apiKey },
      next: { revalidate: 30 }, // cache 30s no Next.js
    });

    if (!res.ok) throw new Error(`CoinGecko ${res.status}`);

    const raw = await res.json();

    const data = raw.map((c: Record<string, unknown>) => ({
      id:        c.id,
      symbol:    (c.symbol as string).toUpperCase(),
      name:      c.name,
      price:     c.current_price,
      change24h: c.price_change_percentage_24h,
      marketCap: c.market_cap,
      volume24h: c.total_volume,
    }));

    return NextResponse.json({ data, source: "coingecko" });
  } catch (err) {
    console.error("[/api/market/crypto]", err);
    return NextResponse.json({ data: MOCK_CRYPTO, source: "mock_fallback" });
  }
}
