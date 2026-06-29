// Cliente tipado para as API Routes internas
// Usado pelos componentes React para buscar dados de mercado

import type { MarketAsset } from "@/store/useMarketStore";

interface ApiResponse<T> {
  data:   T;
  source: "mock" | "live" | "mock_fallback" | "coingecko" | "brapi" | "twelve_data";
}

interface RawTickerItem {
  symbol: string;
  price:  number;
  change: number;
  type:   string;
}

interface RawCryptoItem {
  id:        string;
  symbol:    string;
  name:      string;
  price:     number;
  change24h: number;
  marketCap: number;
  volume24h: number;
}

interface RawStockItem {
  symbol: string;
  name:   string;
  price:  number;
  change: number;
  volume: number;
}

function isLive(source: string): boolean {
  return source !== "mock" && source !== "mock_fallback";
}

export async function fetchTicker(): Promise<MarketAsset[]> {
  const res  = await fetch("/api/market/ticker", { next: { revalidate: 15 } });
  const json = await res.json() as ApiResponse<RawTickerItem[]>;
  const live = isLive(json.source);

  return json.data.map(item => ({
    symbol:    item.symbol,
    price:     item.price,
    change:    item.change,
    type:      item.type as MarketAsset["type"],
    updatedAt: Date.now(),
    isLive:    live,
  }));
}

export async function fetchCrypto(): Promise<MarketAsset[]> {
  const res  = await fetch("/api/market/crypto", { next: { revalidate: 30 } });
  const json = await res.json() as ApiResponse<RawCryptoItem[]>;
  const live = isLive(json.source);

  return json.data.map(item => ({
    symbol:    `${item.symbol}/USD`,
    name:      item.name,
    price:     item.price,
    change:    item.change24h,
    marketCap: item.marketCap,
    volume:    item.volume24h,
    type:      "crypto" as const,
    updatedAt: Date.now(),
    isLive:    live,
  }));
}

export async function fetchStocksBR(): Promise<MarketAsset[]> {
  const res  = await fetch("/api/market/stocks/br", { next: { revalidate: 60 } });
  const json = await res.json() as ApiResponse<RawStockItem[]>;
  const live = isLive(json.source);

  return json.data.map(item => ({
    symbol:    item.symbol,
    name:      item.name,
    price:     item.price,
    change:    item.change,
    volume:    item.volume,
    type:      "stock_br" as const,
    updatedAt: Date.now(),
    isLive:    live,
  }));
}

export async function fetchStocksUS(): Promise<MarketAsset[]> {
  const res  = await fetch("/api/market/stocks/us", { next: { revalidate: 60 } });
  const json = await res.json() as ApiResponse<RawStockItem[]>;
  const live = isLive(json.source);

  return json.data.map(item => ({
    symbol:    item.symbol,
    name:      item.name,
    price:     item.price,
    change:    item.change,
    volume:    item.volume,
    type:      "stock_us" as const,
    updatedAt: Date.now(),
    isLive:    live,
  }));
}
