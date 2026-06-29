"use client";

import { useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  CrosshairMode,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type LineData,
  type AreaData,
  type Time,
} from "lightweight-charts";

export type ChartType = "candle" | "line" | "area";

export interface OHLCVBar {
  time: string; // "YYYY-MM-DD" ou timestamp Unix
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

interface LightweightChartProps {
  data: OHLCVBar[];
  type?: ChartType;
  height?: number;
  className?: string;
}

// Gera dados OHLCV realistas para demonstração
export function generateMockOHLCV(
  basePrice: number,
  days = 90,
  volatility = 0.025
): OHLCVBar[] {
  const bars: OHLCVBar[] = [];
  let price = basePrice;
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    // Skip weekends for stock-like data
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    const change = (Math.random() - 0.48) * volatility * price;
    const open = price;
    price = Math.max(price + change, price * 0.8);
    const high = Math.max(open, price) * (1 + Math.random() * 0.008);
    const low  = Math.min(open, price) * (1 - Math.random() * 0.008);

    bars.push({
      time:   date.toISOString().split("T")[0],
      open:   parseFloat(open.toFixed(2)),
      high:   parseFloat(high.toFixed(2)),
      low:    parseFloat(low.toFixed(2)),
      close:  parseFloat(price.toFixed(2)),
      volume: Math.floor(1_000_000 + Math.random() * 9_000_000),
    });
  }
  return bars;
}

export default function LightweightChart({
  data,
  type = "candle",
  height = 320,
  className = "",
}: LightweightChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef     = useRef<IChartApi | null>(null);
  const seriesRef    = useRef<ISeriesApi<"Candlestick" | "Line" | "Area"> | null>(null);

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#080B14" },
        textColor:  "#8892A4",
        fontSize:   11,
        fontFamily: "'JetBrains Mono', monospace",
      },
      grid: {
        vertLines:  { color: "#1E2538", style: 1 },
        horzLines:  { color: "#1E2538", style: 1 },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { color: "#00D4FF44", labelBackgroundColor: "#161B27" },
        horzLine: { color: "#00D4FF44", labelBackgroundColor: "#161B27" },
      },
      rightPriceScale: {
        borderColor:     "#252D42",
        textColor:       "#8892A4",
        scaleMargins:    { top: 0.1, bottom: 0.1 },
      },
      timeScale: {
        borderColor:       "#252D42",
        timeVisible:       true,
        secondsVisible:    false,
        fixLeftEdge:       true,
        fixRightEdge:      true,
      },
      handleScroll:  true,
      handleScale:   true,
      width:  containerRef.current.clientWidth,
      height,
    });

    chartRef.current = chart;

    if (type === "candle") {
      const series = chart.addCandlestickSeries({
        upColor:          "#00FF94",
        downColor:        "#FF4D6D",
        borderUpColor:    "#00FF94",
        borderDownColor:  "#FF4D6D",
        wickUpColor:      "#00FF9480",
        wickDownColor:    "#FF4D6D80",
      });
      series.setData(data as CandlestickData<Time>[]);
      seriesRef.current = series;
    } else if (type === "line") {
      const series = chart.addLineSeries({
        color:       "#00D4FF",
        lineWidth:   2,
        crosshairMarkerBackgroundColor: "#00D4FF",
      });
      series.setData(
        data.map((d) => ({ time: d.time as Time, value: d.close })) as LineData<Time>[]
      );
      seriesRef.current = series;
    } else {
      const series = chart.addAreaSeries({
        lineColor:    "#00D4FF",
        topColor:     "#00D4FF25",
        bottomColor:  "#00D4FF00",
        lineWidth:    2,
        crosshairMarkerBackgroundColor: "#00D4FF",
      });
      series.setData(
        data.map((d) => ({ time: d.time as Time, value: d.close })) as AreaData<Time>[]
      );
      seriesRef.current = series;
    }

    chart.timeScale().fitContent();

    const ro = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      chart.applyOptions({ width });
    });
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      chart.remove();
      chartRef.current  = null;
      seriesRef.current = null;
    };
  }, [data, type, height]);

  return (
    <div
      ref={containerRef}
      className={`w-full ${className}`}
      style={{ height }}
    />
  );
}
