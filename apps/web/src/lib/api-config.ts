// Configuração centralizada das APIs externas
// Todos os valores sensíveis ficam no servidor (nunca expostos ao cliente)

export const API_CONFIG = {
  coingecko: {
    baseUrl: "https://pro-api.coingecko.com/api/v3",
    demoUrl: "https://api.coingecko.com/api/v3",
    key: process.env.COINGECKO_API_KEY ?? "",
    get url() {
      return this.key && !this.key.startsWith("COLOQUE") ? this.baseUrl : this.demoUrl;
    },
  },
  brapi: {
    baseUrl: "https://brapi.dev/api",
    token: process.env.BRAPI_TOKEN ?? "",
    get ready() { return this.token && !this.token.startsWith("COLOQUE"); },
  },
  twelveData: {
    baseUrl: "https://api.twelvedata.com",
    key: process.env.TWELVE_DATA_API_KEY ?? "",
    get ready() { return this.key && !this.key.startsWith("COLOQUE"); },
  },
  alphaVantage: {
    baseUrl: "https://www.alphavantage.co/query",
    key: process.env.ALPHA_VANTAGE_API_KEY ?? "",
    get ready() { return this.key && !this.key.startsWith("COLOQUE"); },
  },
} as const;

// Retorna true se pelo menos a API de crypto está configurada
export function hasAnyApiKey(): boolean {
  return !!(
    API_CONFIG.coingecko.key ||
    API_CONFIG.brapi.ready ||
    API_CONFIG.twelveData.ready
  );
}
