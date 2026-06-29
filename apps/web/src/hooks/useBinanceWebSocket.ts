"use client";

import { useEffect, useRef, useCallback } from "react";

export interface BinanceTick {
  symbol: string; // ex: "BTCUSDT"
  price:  number;
  change: number; // variação percentual 24h
}

type OnTickCallback = (tick: BinanceTick) => void;

// Streams públicos da Binance — sem autenticação necessária
const WS_BASE = "wss://stream.binance.com:9443/stream";

// Pares a monitorar (formato Binance: minúsculo + usdt)
const STREAMS = [
  "btcusdt", "ethusdt", "solusdt", "bnbusdt",
  "xrpusdt", "adausdt", "avaxusdt", "dogeusdt",
].map(s => `${s}@ticker`);

const SYMBOL_MAP: Record<string, string> = {
  BTCUSDT:  "BTC/USD",
  ETHUSDT:  "ETH/USD",
  SOLUSDT:  "SOL/USD",
  BNBUSDT:  "BNB/USD",
  XRPUSDT:  "XRP/USD",
  ADAUSDT:  "ADA/USD",
  AVAXUSDT: "AVAX/USD",
  DOGEUSDT: "DOGE/USD",
};

export function useBinanceWebSocket(onTick: OnTickCallback) {
  const wsRef          = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef     = useRef(true);

  const connect = useCallback(() => {
    if (!mountedRef.current) return;

    const url = `${WS_BASE}?streams=${STREAMS.join("/")}`;
    const ws  = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen  = () => console.log("[Binance WS] conectado");
    ws.onerror = (e) => console.warn("[Binance WS] erro:", e);

    ws.onmessage = (event) => {
      try {
        const msg  = JSON.parse(event.data as string);
        const data = msg.data;
        if (!data || !data.s) return;

        const symbol = SYMBOL_MAP[data.s as string];
        if (!symbol) return;

        onTick({
          symbol,
          price:  parseFloat(data.c),  // close price
          change: parseFloat(data.P),  // 24h % change
        });
      } catch { /* ignora frames malformados */ }
    };

    ws.onclose = () => {
      if (!mountedRef.current) return;
      console.log("[Binance WS] desconectado — reconectando em 3s...");
      reconnectTimer.current = setTimeout(connect, 3_000);
    };
  }, [onTick]);

  useEffect(() => {
    mountedRef.current = true;
    connect();

    return () => {
      mountedRef.current = false;
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
    };
  }, [connect]);
}
