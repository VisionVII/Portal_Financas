# SDD-001 — Arquitetura Geral

**Status:** Draft  
**Versão:** 0.1  
**Data:** Junho 2026  
**Responsável:** Arquitetura

---

## 1. Visão Geral

O Portal Finanças é uma plataforma financeira de próxima geração com IA integrada nativamente. A arquitetura foi projetada para suportar alta disponibilidade, baixa latência em dados de mercado e escalabilidade independente por domínio.

## 2. Princípios Arquiteturais

- **AI-First:** IA é a espinha dorsal, não uma feature
- **Modular:** cada domínio é um serviço independente
- **Event-Driven:** comunicação assíncrona via Kafka
- **API-First:** todos os serviços expõem contratos via OpenAPI
- **Observability-First:** telemetria desde o dia zero
- **Security-First:** modelo Zero Trust

## 3. Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        Internet                              │
└─────────────────────┬───────────────────────────────────────┘
                       │
┌─────────────────────▼───────────────────────────────────────┐
│               Cloudflare Enterprise                          │
│     CDN │ WAF │ DDoS Protection │ Rate Limiting │ Bots       │
└─────────────────────┬───────────────────────────────────────┘
                       │
┌─────────────────────▼───────────────────────────────────────┐
│                   API Gateway                                │
│         Roteamento │ Auth Check │ Rate Limit │ Logs          │
└──────┬──────────────┬───────────────────────┬───────────────┘
       │              │                        │
┌──────▼──────┐  ┌───▼────┐          ┌───────▼───────┐
│  Frontend   │  │  BFF   │          │  WebSocket    │
│  Next.js 16 │  │        │          │  Gateway      │
└─────────────┘  └───┬────┘          └───────────────┘
                      │
        ┌─────────────┼─────────────────────────┐
        │             │                          │
┌───────▼──┐  ┌───────▼──┐             ┌────────▼──┐
│  Auth    │  │  Market  │   ...       │  AI       │
│  Service │  │  Service │             │  Service  │
└──────────┘  └──────────┘             └───────────┘
        │             │                          │
┌───────▼─────────────▼──────────────────────────▼──┐
│                    Kafka                            │
│         (Event Bus — Message Streaming)             │
└───────┬─────────────┬──────────────────────────────┘
        │             │
┌───────▼──┐  ┌───────▼──┐
│ Workers  │  │ Workers  │
│   AI     │  │ Crawler  │
└──────────┘  └──────────┘
        │
┌───────▼───────────────────────────────────────────┐
│                  Data Layer                         │
│  PostgreSQL │ TimescaleDB │ Redis │ OpenSearch      │
│  MinIO / S3                                         │
└────────────────────────────────────────────────────┘
```

## 4. Fluxos Principais

### 4.1 Dados de Mercado em Tempo Real
```
API Externa → Kafka (market.prices) → Market Worker
  → TimescaleDB (persistência)
  → Redis (cache L1)
  → AI Worker (recalcula indicadores)
  → WebSocket Gateway → Clientes conectados
```

### 4.2 Requisição de Usuário
```
Usuário → Cloudflare → API Gateway
  → JWT Validation (Auth Service)
  → BFF (agrega dados)
  → Microserviços específicos
  → Redis Cache (se hit) ou DB
  → Response ao Usuário
```

### 4.3 Fluxo de IA
```
Novo dado → Kafka (market.analysis) → AI Worker
  → LLM Gateway (Claude Sonnet)
  → Agentes especializados
  → Resultados em Redis
  → WebSocket → Dashboard usuário
```

## 5. Serviços e Responsabilidades

| Serviço | Porta | Responsabilidade |
|---------|-------|-----------------|
| api-gateway | 8000 | Roteamento, rate limit, autenticação |
| bff | 8001 | Agregação para o frontend |
| auth | 8010 | JWT, OAuth, MFA, sessões |
| user | 8011 | Perfil, preferências |
| market | 8020 | Ingestão de dados de mercado |
| charts | 8021 | Dados históricos para gráficos |
| indicators | 8022 | Cálculo de indicadores técnicos |
| ai | 8030 | Orquestração de agentes de IA |
| news | 8040 | Crawler e agregação de notícias |
| calendar | 8041 | Calendário econômico |
| crypto | 8050 | Dados específicos de crypto |
| forex | 8051 | Dados de câmbio |
| stocks | 8052 | Dados de ações |
| alerts | 8060 | Motor de alertas |
| portfolio | 8061 | Gestão de carteira |
| backtesting | 8062 | Engine de backtesting |
| scanner | 8063 | Screener de ativos |
| notification | 8070 | Envio de notificações |
| search | 8071 | Busca full-text |
| payment | 8080 | Pagamentos e subscriptions |
| admin | 8090 | Painel administrativo |

## 6. Decisões Arquiteturais (ADRs)

### ADR-001: Monorepo com Turborepo
**Contexto:** Múltiplos apps e packages compartilhados.  
**Decisão:** Monorepo gerenciado com Turborepo + pnpm workspaces.  
**Consequências:** Build incremental, cache distribuído, DX superior.

### ADR-002: Event Sourcing com Kafka
**Contexto:** Dados de mercado chegam de múltiplas fontes simultaneamente.  
**Decisão:** Kafka como barramento de eventos central.  
**Consequências:** Desacoplamento, replay de eventos, auditoria completa.

### ADR-003: TimescaleDB para Séries Temporais
**Contexto:** Preços históricos com bilhões de linhas por ativo.  
**Decisão:** TimescaleDB (extensão PostgreSQL) para dados de mercado.  
**Consequências:** Compressão automática, queries otimizadas para time-series.

### ADR-004: Redis como Cache L1
**Contexto:** Dados de preço precisam de latência sub-milissegundo.  
**Decisão:** Redis para cache quente de preços, sessões e pub/sub.  
**Consequências:** Latência <1ms, alta disponibilidade.

## 7. Considerações de Escalabilidade

- Todos os microserviços são stateless e horizontalmente escaláveis
- Banco de dados com read replicas para queries pesadas
- Kafka particionado por símbolo do ativo
- Redis Cluster para alta disponibilidade
- CDN para assets estáticos e SSG pages

## 8. Próximos SDDs

- SDD-002: Infraestrutura detalhada (K8s, Terraform)
- SDD-003: Modelo de banco de dados
- SDD-004: API Gateway (regras, rate limits)
- SDD-006: Modelo de segurança completo
