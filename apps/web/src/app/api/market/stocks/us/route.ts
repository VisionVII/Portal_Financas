import { NextResponse } from "next/server";
import { API_CONFIG } from "@/lib/api-config";

const US_SYMBOLS = ["AAPL", "NVDA", "MSFT", "TSLA", "META", "GOOGL", "AMZN", "AMD"];

const MOCK_US = [
  { symbol: "AAPL",  name: "Apple Inc.",       price: 228.50, change:  1.23, volume: 7_200_000_000 },
  { symbol: "NVDA",  name: "NVIDIA Corp.",     price: 486.20, change:  3.41, volume:18_400_000_000 },
  { symbol: "MSFT",  name: "Microsoft Corp.",  price: 415.30, change:  0.87, volume: 5_100_000_000 },
  { symbol: "TSLA",  name: "Tesla Inc.",       price: 248.80, change: -1.55, volume:12_300_000_000 },
  { symbol: "META",  name: "Meta Platforms",   price: 542.10, change:  2.10, volume: 8_600_000_000 },
  { symbol: "GOOGL", name: "Alphabet Inc.",    price: 178.90, change:  0.65, volume: 3_200_000_000 },
  { symbol: "AMZN",  name: "Amazon.com Inc.",  price: 196.40, change:  1.42, volume: 4_800_000_000 },
  { symbol: "AMD",   name: "AMD Inc.",         price: 156.20, change: -0.88, volume: 6_100_000_000 },
];

export async function GET() {
  if (!API_CONFIG.twelveData.ready) {
    return NextResponse.json({ data: MOCK_US, source: "mock" });
  }

  try {
    const symbols = US_SYMBOLS.join(",");
    const url = `${API_CONFIG.twelveData.baseUrl}/quote?symbol=${symbols}&apikey=${API_CONFIG.twelveData.key}`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`TwelveData ${res.status}`);

    const json = await res.json();

    // Twelve Data retorna objeto quando é 1 símbolo, array quando vários
    const entries: Record<string, unknown>[] = Array.isArray(json)
      ? json
      : Object.values(json);

    const data = entries
      .filter((q: Record<string, unknown>) => q.symbol)
      .map((q: Record<string, unknown>) => ({
        symbol: q.symbol,
        name:   q.name,
        price:  parseFloat(q.close as string),
        change: parseFloat(q.percent_change as string),
        volume: parseInt(q.volume as string, 10),
      }));

    return NextResponse.json({ data, source: "twelve_data" });
  } catch (err) {
    console.error("[/api/market/stocks/us]", err);
    return NextResponse.json({ data: MOCK_US, source: "mock_fallback" });
  }
}
