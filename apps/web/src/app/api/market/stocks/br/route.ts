import { NextResponse } from "next/server";
import { API_CONFIG } from "@/lib/api-config";

const BR_TICKERS = ["PETR4", "VALE3", "ITUB4", "BBDC4", "WEGE3", "MGLU3", "RENT3", "ABEV3", "BBAS3", "ELET3"];

const MOCK_BR = [
  { symbol: "PETR4",  name: "Petrobras PN",      price: 38.72,  change: -0.51, volume: 1_200_000_000 },
  { symbol: "VALE3",  name: "Vale ON",            price: 62.15,  change:  0.82, volume: 2_100_000_000 },
  { symbol: "ITUB4",  name: "Itaú Unibanco PN",  price: 35.64,  change:  1.05, volume: 1_800_000_000 },
  { symbol: "BBDC4",  name: "Bradesco PN",        price: 15.88,  change: -0.25, volume:   900_000_000 },
  { symbol: "WEGE3",  name: "WEG SA ON",          price: 43.80,  change: -1.10, volume:   600_000_000 },
  { symbol: "MGLU3",  name: "Magazine Luiza ON",  price:  9.14,  change:  2.35, volume:   500_000_000 },
  { symbol: "RENT3",  name: "Localiza ON",        price: 42.20,  change:  0.68, volume:   700_000_000 },
  { symbol: "ABEV3",  name: "Ambev ON",           price: 13.22,  change:  0.30, volume:   900_000_000 },
  { symbol: "BBAS3",  name: "Banco do Brasil ON", price: 28.50,  change:  1.42, volume: 1_100_000_000 },
  { symbol: "ELET3",  name: "Eletrobras ON",      price: 38.90,  change: -0.77, volume:   800_000_000 },
];

export async function GET() {
  if (!API_CONFIG.brapi.ready) {
    return NextResponse.json({ data: MOCK_BR, source: "mock" });
  }

  try {
    const symbols = BR_TICKERS.join(",");
    const url = `${API_CONFIG.brapi.baseUrl}/quote/${symbols}?token=${API_CONFIG.brapi.token}&fundamental=false`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`brapi ${res.status}`);

    const json = await res.json();
    const data = (json.results ?? []).map((q: Record<string, unknown>) => ({
      symbol:    q.symbol,
      name:      q.longName ?? q.shortName,
      price:     q.regularMarketPrice,
      change:    q.regularMarketChangePercent,
      volume:    q.regularMarketVolume,
    }));

    return NextResponse.json({ data, source: "brapi" });
  } catch (err) {
    console.error("[/api/market/stocks/br]", err);
    return NextResponse.json({ data: MOCK_BR, source: "mock_fallback" });
  }
}
