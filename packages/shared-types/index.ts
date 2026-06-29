/**
 * @portal-financas/shared-types
 * Interfaces TypeScript compartilhadas entre todos os serviços
 */

// ============================================================
// ATIVOS FINANCEIROS
// ============================================================

export type AssetClass = "stock" | "crypto" | "forex" | "commodity" | "index" | "etf";

export interface Asset {
  symbol: string;
  name: string;
  assetClass: AssetClass;
  exchange?: string;
  currency: string;
  country?: string;
  sector?: string;
}

export interface Price {
  symbol: string;
  price: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: number;
  changePercent: number;
  timestamp: Date;
}

export interface OHLCV {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type Timeframe = "1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "1D" | "1W" | "1M";

// ============================================================
// INDICADORES TÉCNICOS
// ============================================================

export interface IndicatorResult {
  name: string;
  symbol: string;
  timeframe: Timeframe;
  values: Array<{ timestamp: Date; value: number | null }>;
  computedAt: Date;
}

export type SignalStrength = "strong_buy" | "buy" | "neutral" | "sell" | "strong_sell";

export interface TechnicalSignal {
  symbol: string;
  indicator: string;
  signal: SignalStrength;
  value: number;
  confidence: number; // 0-100
  timestamp: Date;
}

// ============================================================
// USUÁRIO
// ============================================================

export interface User {
  id: string;
  email: string;
  name: string;
  plan: "free" | "pro" | "elite";
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  userId: string;
  theme: "dark" | "light" | "system";
  language: "pt-BR" | "en-US" | "es";
  currency: string;
  timezone: string;
  defaultChart: "candle" | "line" | "area";
  defaultTimeframe: Timeframe;
}

// ============================================================
// PORTFÓLIO
// ============================================================

export interface Position {
  id: string;
  userId: string;
  symbol: string;
  quantity: number;
  avgCost: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  openedAt: Date;
}

export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  totalValue: number;
  totalCost: number;
  totalPnl: number;
  totalPnlPercent: number;
  positions: Position[];
  updatedAt: Date;
}

// ============================================================
// ALERTAS
// ============================================================

export type AlertCondition =
  | "price_above"
  | "price_below"
  | "price_change_percent"
  | "volume_spike"
  | "ma_crossover"
  | "rsi_overbought"
  | "rsi_oversold"
  | "pattern_detected";

export interface Alert {
  id: string;
  userId: string;
  symbol: string;
  condition: AlertCondition;
  value: number;
  triggered: boolean;
  triggeredAt?: Date;
  createdAt: Date;
  channels: Array<"email" | "push" | "telegram" | "whatsapp" | "discord">;
}

// ============================================================
// IA
// ============================================================

export type AgentType =
  | "market_intelligence"
  | "technical_analysis"
  | "fundamental_analysis"
  | "pattern_recognition"
  | "elliott_wave"
  | "fibonacci"
  | "smart_money"
  | "sentiment"
  | "risk_analysis";

export interface AIInsight {
  id: string;
  symbol?: string;
  agentType: AgentType;
  title: string;
  content: string;
  signal?: SignalStrength;
  confidence: number; // 0-100
  tags: string[];
  generatedAt: Date;
  expiresAt?: Date;
}

export interface AIAnalysis {
  symbol: string;
  timeframe: Timeframe;
  summary: string;
  trend: "uptrend" | "downtrend" | "sideways";
  trendStrength: number; // 0-100
  keyLevels: {
    support: number[];
    resistance: number[];
  };
  signals: TechnicalSignal[];
  insights: AIInsight[];
  generatedAt: Date;
}

// ============================================================
// NOTÍCIAS
// ============================================================

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: Date;
  sentiment: "positive" | "negative" | "neutral";
  sentimentScore: number; // -1 a 1
  relatedAssets: string[];
  tags: string[];
}

// ============================================================
// MERCADO
// ============================================================

export interface MarketStatus {
  exchange: string;
  isOpen: boolean;
  session: "pre" | "regular" | "post" | "closed";
  nextOpen?: Date;
  nextClose?: Date;
  timezone: string;
}

export interface EconomicEvent {
  id: string;
  title: string;
  country: string;
  impact: "low" | "medium" | "high";
  date: Date;
  forecast?: string;
  previous?: string;
  actual?: string;
  currency?: string;
}

// ============================================================
// API RESPONSES
// ============================================================

export interface ApiResponse<T> {
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    hasNext?: boolean;
  };
  timestamp: Date;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}

// ============================================================
// WEBSOCKET EVENTS
// ============================================================

export type WsEventType =
  | "price.update"
  | "trade.executed"
  | "alert.triggered"
  | "ai.insight"
  | "news.published"
  | "portfolio.updated";

export interface WsEvent<T = unknown> {
  type: WsEventType;
  payload: T;
  timestamp: Date;
}
