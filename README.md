# 🚀 Portal Finanças

> Plataforma financeira de próxima geração, orientada a IA desde a fundação.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?logo=nestjs)](https://nestjs.com/)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red)]()

---

## 🎯 Visão

Competir com Bloomberg, TradingView e Investing.com com uma arquitetura **moderna**, **modular** e **orientada a IA**.

A IA não é uma feature — é a espinha dorsal da plataforma.

---

## ✨ Diferenciais

- **IA Nativa** — agentes especializados por domínio (técnico, fundamentalista, macro, quant)
- **Tempo Real** — WebSocket + Kafka para dados de mercado com latência <50ms
- **Multi-Asset** — Ações (BR/EUA), Crypto, Forex, Commodities, Índices, ETFs
- **Análise Avançada** — Elliott, Wyckoff, Smart Money, Fibonacci, Volume Profile
- **Backtesting** — engine própria para testar estratégias
- **Design Único** — Quantum Finance Design System (identidade visual própria)

---

## 🏗️ Arquitetura

```
Internet → Cloudflare → API Gateway → BFF → Microservices → Data Layer
```

Ver [SDD-001 — Arquitetura Geral](docs/sdds/SDD-001-Arquitetura-Geral.md) para detalhes completos.

### Stack

| Camada        | Tecnologia                                    |
|---------------|-----------------------------------------------|
| Frontend      | Next.js 15, React 19, TypeScript, TailwindCSS |
| Backend       | NestJS, Fastify, Prisma ORM                   |
| Streaming     | Kafka, WebSocket, Redis Pub/Sub               |
| Banco         | PostgreSQL, TimescaleDB, Redis, OpenSearch     |
| IA            | Claude Sonnet (Anthropic), LLM Gateway        |
| Storage       | MinIO / S3                                    |
| Observ.       | Grafana, Prometheus, Loki, OpenTelemetry      |
| Segurança     | JWT, OAuth, MFA, Passkeys, RBAC/ABAC          |
| Cloud         | Cloudflare Enterprise                         |
| CI/CD         | GitHub Actions, Trivy, Dependabot             |

---

## 📁 Estrutura do Repositório

```
Portal_Financas/
├── apps/
│   ├── web/           # Next.js — Frontend
│   ├── api-gateway/   # API Gateway
│   └── bff/           # Backend for Frontend
├── services/          # 18 microserviços (NestJS)
├── packages/          # Pacotes compartilhados
├── workers/           # Workers assíncronos
├── infra/             # Docker, K8s, Terraform
├── docs/sdds/         # 40 Software Design Documents
└── CLAUDE.md          # Contexto para IA
```

---

## 🚀 Início Rápido

### Pré-requisitos

- Node.js ≥ 20
- pnpm ≥ 9
- Docker & Docker Compose

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/SEU_USER/Portal_Financas.git
cd Portal_Financas

# Instalar dependências
pnpm install

# Subir infraestrutura local
docker compose -f infra/docker/docker-compose.dev.yml up -d

# Aguardar serviços ficarem saudáveis (~30s)
docker compose -f infra/docker/docker-compose.dev.yml ps

# Rodar o frontend
pnpm --filter @portal-financas/web dev
```

Acesse: http://localhost:3000

### Serviços disponíveis em desenvolvimento

| Serviço      | URL                        |
|--------------|----------------------------|
| Frontend     | http://localhost:3000       |
| Grafana      | http://localhost:3001       |
| Kafka UI     | http://localhost:8090       |
| MinIO        | http://localhost:9001       |
| OpenSearch   | http://localhost:9200       |
| Prometheus   | http://localhost:9090       |

---

## 📋 SDDs (Software Design Documents)

40 documentos técnicos organizados em:

| Categoria           | SDDs         |
|--------------------|--------------|
| Núcleo             | 001–010      |
| Mercado            | 011–016      |
| Análise Técnica    | 017–024      |
| Fundamentalista    | 025–028      |
| IA                 | 029–032      |
| Usuário            | 033–036      |
| Conteúdo           | 037–040      |

Ver pasta [`docs/sdds/`](docs/sdds/)

---

## 🤖 Agentes de IA

O sistema usa um **Orquestrador Central** que coordena mais de 30 agentes especializados:

- **Mercado:** MarketIntelligence, TechnicalAnalysis, FundamentalAnalysis...
- **Quant:** PatternRecognition, ElliottWave, Fibonacci, SmartMoney...
- **Dados:** ETL, DataValidation, APIHealthMonitor...
- **Conteúdo:** SEO, AEO, ContentGeneration...
- **Ops:** Security, FraudDetection, Monitoring...

---

## 🛠️ Comandos Úteis

```bash
# Build completo
pnpm build

# Testes
pnpm test

# Lint
pnpm lint

# Typecheck
pnpm typecheck

# Limpar builds
pnpm clean
```

---

## 📝 Contribuição

1. Leia o `CLAUDE.md` para entender o contexto do projeto
2. Leia o SDD relevante antes de implementar qualquer módulo
3. Siga as convenções de commits (Conventional Commits)
4. Abra PR para a branch `develop`
5. Mínimo 80% de cobertura de testes

---

## 📄 Licença

Proprietário — todos os direitos reservados.

---

*Construído com ❤️ e IA desde a fundação.*
