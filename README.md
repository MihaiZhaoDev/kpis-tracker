# WSP — Project & KPI Tracker

A full-stack application for managing projects and tracking flexible KPIs with real-time progress visualization.

## Tech Stack

- **Frontend:** React 19, Vite, HeroUI (wrapped via @wsp/ui), TanStack Query, Recharts
- **Backend:** NestJS 11, TypeORM, PostgreSQL 16, JWT Authentication
- **Monorepo:** Turborepo, pnpm workspaces
- **Infrastructure:** Docker Compose, Nginx

## Quick Start

### Docker (recommended)

```bash
# Copy environment variables
cp .env.example .env

# Start all services (migrations run automatically on API startup)
docker compose up --build
```

- Web UI: http://localhost:8080
- API: http://localhost:3000/api
- Health: http://localhost:3000/api/health

### Local Development

Prerequisites: Node.js 22+, pnpm 9+, PostgreSQL 16

```bash
# Install dependencies
pnpm install

# Start Postgres
docker compose up -d postgres

# Configure API environment
cp apps/api/.env.example apps/api/.env

# Start dev servers (migrations run automatically on API startup)
pnpm dev
```

- Web UI: http://localhost:5173
- API: http://localhost:3000/api

## Project Structure

```
wsp/
├── apps/
│   ├── api/          # NestJS backend
│   └── web/          # React frontend (Vite)
├── packages/
│   ├── shared/       # Zod schemas, TypeScript types, enums
│   └── ui/           # UI component library (wraps HeroUI)
├── docker-compose.yml
└── turbo.json
```

## Assumptions

- Single-tenant: each user sees only their own projects
- KPI status is computed from target vs actual (not stored), preventing stale data
- KPI values are append-only (immutable history) — no editing past measurements
- Status thresholds: >=100% completed, >=70% on track, >=40% at risk, <40% behind

## Key Design Decisions

See [DECISIONS.md](./DECISIONS.md) for detailed architecture rationale.

## Testing

```bash
# Unit tests (API)
cd apps/api && pnpm test

# Integration tests (requires Postgres)
docker compose up -d postgres
cd apps/api && pnpm run test:e2e

# Frontend tests
cd apps/web && pnpm test
```

## Trade-offs

- **Offset pagination over cursor-based:** simpler implementation, adequate for expected data volumes
- **No E2E tests:** scoped to unit + integration for assessment focus
- **JSONB metadata over rigid schema:** flexibility prioritized for varying KPI shapes
- **No real-time updates:** polling via TanStack Query staleTime rather than WebSockets

## Future Improvements

- WebSocket support for real-time KPI updates
- Role-based access control (admin, viewer, editor)
- KPI templates library for common metrics
- Export KPI reports (PDF, CSV)
- Dashboard customization (drag-and-drop widgets)
- Cursor-based pagination for large datasets
- Redis caching layer for summary endpoints
- CI/CD pipeline with GitHub Actions
