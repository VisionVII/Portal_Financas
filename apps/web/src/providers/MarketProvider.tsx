"use client";

import { useEffect, useCallback } from "react";
import { useMarketStore } from "@/store/useMarketStore";
import { useBinanceWebSocket } from "@/hooks/useBinanceWebSocket";
import { fetchTicker, fetchCrypto, fetchStocksBR } from "@/lib/market-client";

// Provider global — carrega dados iniciais e mantém WebSocket aberto
// Deve ser colocado no layout raiz
export default function MarketProvider({ children }: { children: React.ReactNode }) {
  const { setAssets, updatePrice, setLoading, setSource } = useMarketStore();

  // Carrega dados REST na montagem e a cada 60s
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [ticker, crypto, br] = await Promise.allSettled([
          fetchTicker(),
          fetchCrypto(),
          fetchStocksBR(),
        ]);

        const all = [
          ...(ticker.status  === "fulfilled" ? ticker.value  : []),
          ...(crypto.status  === "fulfilled" ? crypto.value  : []),
          ...(br.status      === "fulfilled" ? br.value      : []),
        ];

        setAssets(all);
        const hasLive = all.some(a => a.isLive);
        setSource(hasLive ? "live" : "mock");
      } catch (err) {
        console.error("[MarketProvider] erro ao carregar:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
    const interval = setInterval(load, 60_000);
    return () => clearInterval(interval);
  }, [setAssets, setLoading, setSource]);

  // WebSocket Binance — atualiza preços crypto em tempo real (sem custo)
  const onTick = useCallback(
    (tick: { symbol: string; price: number; change: number }) => {
      updatePrice(tick.symbol, tick.price, tick.change);
      setSource("live");
    },
    [updatePrice, setSource]
  );

  useBinanceWebSocket(onTick);

  return <>{children}</>;
}
