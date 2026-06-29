import { create } from "zustand";

// Tipo de um ativo no store
export interface MarketAsset {
  symbol:    string;
  name?:     string;
  price:     number;
  change:    number; // variação % 24h
  volume?:   number;
  marketCap?: number;
  type:      "crypto" | "stock_br" | "stock_us" | "forex" | "index" | "commodity";
  updatedAt: number; // timestamp ms
  isLive:    boolean; // true = veio do WebSocket
}

interface MarketState {
  assets:       Record<string, MarketAsset>;
  isLoading:    boolean;
  dataSource:   "mock" | "live" | "mixed";
  lastFetch:    number;

  // Actions
  setAssets:    (assets: MarketAsset[]) => void;
  updatePrice:  (symbol: string, price: number, change: number) => void;
  setLoading:   (loading: boolean) => void;
  setSource:    (source: "mock" | "live" | "mixed") => void;

  // Selectors
  getAsset:     (symbol: string) => MarketAsset | undefined;
  getByType:    (type: MarketAsset["type"]) => MarketAsset[];
  getTickerList:() => MarketAsset[];
}

export const useMarketStore = create<MarketState>((set, get) => ({
  assets:     {},
  isLoading:  true,
  dataSource: "mock",
  lastFetch:  0,

  setAssets: (incoming) => {
    set(state => {
      const next = { ...state.assets };
      for (const asset of incoming) {
        next[asset.symbol] = { ...next[asset.symbol], ...asset };
      }
      return { assets: next };
    });
  },

  updatePrice: (symbol, price, change) => {
    set(state => ({
      assets: {
        ...state.assets,
        [symbol]: {
          ...state.assets[symbol],
          symbol,
          price,
          change,
          updatedAt: Date.now(),
          isLive:    true,
          type:      state.assets[symbol]?.type ?? "crypto",
        },
      },
    }));
  },

  setLoading: (isLoading) => set({ isLoading }),
  setSource:  (dataSource) => set({ dataSource }),

  getAsset:     (symbol) => get().assets[symbol],
  getByType:    (type)   => Object.values(get().assets).filter(a => a.type === type),
  getTickerList:()       => Object.values(get().assets).slice(0, 20),
}));
