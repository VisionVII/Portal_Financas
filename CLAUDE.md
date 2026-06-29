# Portal Finanças — Contexto para Claude (AI Assistant)

> Este arquivo é o ponto de entrada para o Claude (e qualquer IA assistindo o desenvolvimento).  
> Leia este documento antes de qualquer tarefa no repositório.

---

## 🎯 Visão do Projeto

**Portal Finanças** é uma plataforma financeira de próxima geração, orientada a IA desde a fundação.  
Ambição: competir com Bloomberg, TradingView e Investing.com com uma arquitetura moderna, modular e inteligente.

**Diferencial central:** IA não é uma feature — é a espinha dorsal da plataforma.

---

## 🏗️ Arquitetura de Alto Nível

```
Internet → Cloudflare → API Gateway → BFF → Microservices → Data Layer
```

### Stack Principal

| Camada       | Tecnologia                                      |
|--------------|-------------------------------------------------|
| Frontend     | Next.js 16, React, TypeScript, TailwindCSS      |
| UI System    | Design System próprio (Shadcn base + tokens)    |
| State        | Zustand, TanStack Query                         |
| Backend      | NestJS, TypeScript, Fastify                     |
| ORM          | Prisma                                          |
| Dados        | PostgreSQL, TimescaleDB, Redis, OpenSearch       |
| Streaming    | Kafka → Workers → Redis → WebSocket → UI        |
| IA           | Claude Sonnet (Anthropic), LLM Gateway próprio  |
| Storage      | MinIO / S3                                      |
| Observab.    | Grafana, Prometheus, Loki, OpenTelemetry        |
| Segurança    | JWT, OAuth, MFA, Passkeys, RBAC/ABAC            |
| Cloud        | Cloudflare Enterprise (CDN, WAF, DDoS, Rate)    |
| CI/CD        | GitHub Actions, SAST, DAST, Trivy, Dependabot  |

---

## 📁 Estrutura do Repositório

```
Portal_Financas/
├── apps/
│   ├── web/               # Next.js 16 — Frontend principal
│   ├── api-gateway/       # API Gateway (roteamento, rate limit, auth check)
│   └── bff/               # Backend for Frontend
├── services/              # Microserviços independentes (NestJS)
│   ├── auth/
│   ├── user/
│   ├── market/
│   ├── charts/
│   ├── indicators/
│   ├── ai/
│   ├── news/
│   ├── calendar/
│   ├── crypto/
│   ├── forex/
│   ├── stocks/
│   ├── alerts/
│   ├── portfolio/
│   ├── backtesting/
│   ├── scanner/
│   ├── notification/
│   ├── search/
│   ├── payment/
│   └── admin/
├── packages/              # Pacotes compartilhados (monorepo)
│   ├── design-system/     # Tokens, componentes base
│   ├── shared-types/      # TypeScript interfaces globais
│   ├── utils/             # Funções utilitárias
│   └── config/            # Configurações compartilhadas
├── workers/               # Workers assíncronos
│   ├── ai/
│   ├── crawler/
│   ├── indicator/
│   ├── image/
│   ├── email/
│   └── notification/
├── infra/                 # Infraestrutura como código
│   ├── docker/
│   ├── k8s/
│   └── terraform/
├── docs/
│   └── sdds/              # Software Design Documents (SDD-001 a SDD-040)
└── .github/
    ├── workflows/         # CI/CD pipelines
    └── ISSUE_TEMPLATE/
```

---

## 🤖 Agentes de IA

A plataforma usa um **Orquestrador Central** que coordena agentes especializados:

### Agentes de Mercado
- `MarketIntelligenceAgent` — análise macro de mercados
- `TechnicalAnalysisAgent` — análise técnica automatizada
- `FundamentalAnalysisAgent` — análise fundamentalista
- `CryptoIntelligenceAgent` — mercado cripto
- `ForexIntelligenceAgent` — câmbio e forex
- `SentimentAnalysisAgent` — sentimento de mercado

### Agentes Quantitativos
- `PatternRecognitionAgent` — padrões gráficos
- `ElliottWaveAgent` — ondas de Elliott
- `FibonacciAgent` — retração e extensão
- `SmartMoneyAgent` — fluxo institucional
- `WyckoffAgent` — método Wyckoff
- `RiskAnalysisAgent` — gestão de risco
- `BacktestingAgent` — testes de estratégia

### Agentes de Dados
- `ETLAgent`, `DataValidationAgent`, `APIHealthMonitorAgent`
- `CacheOptimizationAgent`, `SearchIndexAgent`

### Agentes de Conteúdo
- `SEOAgent`, `AEOAgent`, `ContentGenerationAgent`
- `TranslationAgent`, `SchemaOrgAgent`

### Agentes Operacionais
- `SecurityAgent`, `FraudDetectionAgent`, `DevOpsAgent`
- `MonitoringAgent`, `IncidentResponseAgent`

---

## 📋 SDDs (Software Design Documents)

40 documentos organizados em:
- **Núcleo** (SDD-001 a 010): Arquitetura, Infra, DB, Gateway, Segurança
- **Mercado** (SDD-011 a 016): Stocks, Forex, Crypto, Commodities, Índices, ETFs
- **Análise Técnica** (SDD-017 a 024): Candlestick, Fibonacci, Elliott, Wyckoff, Smart Money
- **Fundamentalista** (SDD-025 a 028): Empresas, Balanços, Dividendos, Métricas
- **IA** (SDD-029 a 032): AI Engine, Agents, RAG, LLM Gateway
- **Usuário** (SDD-033 a 036): Perfil, Portfólio, Watchlist, Alertas
- **Conteúdo** (SDD-037 a 040): Notícias, Biblioteca, SEO/AEO, CMS

---

## 🔌 Provedores de Dados (com fallback automático)

```
Market Provider → Polygon → Finnhub → Twelve Data → Alpha Vantage
Crypto          → Binance → CoinGecko → CoinMarketCap
Forex           → ExchangeRate → ECB → FRED
Macro           → FRED → Yahoo Finance
```

Se uma API falhar, o sistema comuta automaticamente para o próximo provedor.

---

## 🎨 Design System

**Nome:** Quantum Finance Design System  
**Filosofia:** Dados como arte. Clareza radical. Densidade inteligente.

### Tokens Principais
```
--color-void:    #080B14   (fundo profundo)
--color-cosmos:  #0D1117   (fundo primário)
--color-nebula:  #161B27   (cards/painéis)
--color-aurora:  #00D4FF   (accent primário — ciano elétrico)
--color-plasma:  #7B61FF   (accent secundário — roxo quântico)
--color-pulse:   #00FF94   (positivo/alta)
--color-flare:   #FF4D6D   (negativo/baixa)
--color-solar:   #FFB800   (alerta/atenção)
--color-star:    #E8EDF5   (texto primário)
--color-comet:   #8892A4   (texto secundário)
```

### Tipografia
- **Display:** Space Grotesk (dados, números, headings)
- **Body:** Inter (leitura, interface)
- **Mono:** JetBrains Mono (preços, código, terminais)

---

## ⚡ Fluxo de Dados em Tempo Real

```
API Externa → Kafka → Market Worker → TimescaleDB
                    ↘ Redis Cache → WebSocket → Frontend
                    ↘ AI Workers → Recalcular indicadores → Cache → UI
```

---

## 🔐 Modelo de Segurança

- **Auth:** JWT com Refresh Token rotativo + OAuth 2.0 + MFA + Passkeys
- **Autorização:** RBAC + ABAC por recurso
- **Dados:** AES-256 em repouso, TLS 1.3 em trânsito
- **Infra:** Cloudflare WAF, Rate Limiting, Bot Protection, DDoS mitigation
- **Pipeline:** SAST, DAST, Secret Scanner, SBOM, Dependabot, Trivy

---

## 🛠️ Convenções de Desenvolvimento

### Commits
```
feat(scope): descrição curta
fix(scope): correção
docs(scope): documentação
chore(scope): manutenção
refactor(scope): refatoração
```

### Branches
```
main           → produção
develop        → integração
feat/xxx       → features
fix/xxx        → correções
release/x.x.x  → releases
```

### Código
- TypeScript strict mode em todo o projeto
- ESLint + Prettier obrigatórios
- Testes: Vitest (unit) + Playwright (e2e)
- Cobertura mínima: 80%

---

## 🚀 Como Começar (Desenvolvimento Local)

```bash
# Instalar dependências
pnpm install

# Subir infra local
docker compose -f infra/docker/docker-compose.dev.yml up -d

# Rodar frontend
pnpm --filter web dev

# Rodar todos os serviços
pnpm dev
```

---

## 📍 Status do Projeto

> **Fase atual:** Fundação — Design System + Portal base

| Módulo          | Status     |
|-----------------|------------|
| Design System   | 🟡 Em progresso |
| Portal Web      | 🟡 Em progresso |
| Auth Service    | ⬜ Planejado    |
| Market Service  | ⬜ Planejado    |
| AI Engine       | ⬜ Planejado    |

---

*Última atualização: Junho 2026*  
*Mantenha este documento atualizado a cada milestone importante.*
