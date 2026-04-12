# Architecture Decisions

## 1. Monorepo with Turborepo + pnpm

**Decision:** Single repository with Turborepo for build orchestration and pnpm workspaces for dependency management.

**Rationale:** Shared TypeScript types between frontend and backend eliminate API contract drift. Single `docker compose up` for reviewers. Turborepo provides incremental builds and task caching.

**Alternatives considered:** Separate repos (rejected: type drift, reviewer overhead), Nx (rejected: heavier setup, steeper learning curve for this scope).

## 2. KPI Flexibility: Definitions + Values + JSONB

**Decision:** Split KPIs into `kpi_definitions` (what to track) and `kpi_values` (append-only measurements). Core fields are typed columns; variable attributes use a JSONB `metadata` column.

**Rationale:** This pattern is used by production KPI systems (Quantive, KPI Network, Oslo OKR Tracker). Core fields (name, target, unit) are queryable and indexable. JSONB handles the long tail of KPI-specific attributes without schema migrations. Append-only values provide built-in audit trail and trend data.

**Alternatives considered:** EAV pattern (rejected: 50,000x slower than JSONB for unindexed queries in PostgreSQL benchmarks), single flat table with stored status (rejected: stale data risk).

## 3. Computed Status (Not Stored)

**Decision:** KPI status (completed, on_track, at_risk, behind) is computed via a PostgreSQL view from `target_value` vs latest `actual_value`.

**Rationale:** Eliminates stale status data. Status is always derived from the truth (measurements). No cache invalidation needed. Follows normalization principles — store facts, derive conclusions.

**Thresholds:** >=100% → completed, >=70% → on_track, >=40% → at_risk, <40% → behind.

## 4. UI Abstraction Layer (@wsp/ui)

**Decision:** All HeroUI components are wrapped in `packages/ui/` with custom interfaces. The application never imports HeroUI directly.

**Rationale:** Framework agnosticism. If HeroUI is replaced (e.g., with shadcn or MUI), only `packages/ui/` internals change — zero impact on feature code. Also provides a consistent API surface and a place for custom composite components.

## 5. PostgreSQL over MongoDB

**Decision:** PostgreSQL for all data storage.

**Rationale:** Projects and KPIs have clear relational structure (one-to-many). SQL aggregations power the summary endpoints efficiently. JSONB provides document-like flexibility where needed. PostgreSQL LATERAL JOIN efficiently computes "latest value per KPI."

## 6. TanStack Query for Server State

**Decision:** TanStack Query (React Query) manages all server state. No Redux, Zustand, or manual `useEffect` + `useState` for API data.

**Rationale:** Handles caching, background refetching, pagination, optimistic updates, loading/error states out of the box. `staleTime` provides client-side caching without a separate cache layer. Query invalidation on mutations keeps data consistent.

## 7. Feature-Based Frontend Architecture

**Decision:** Bulletproof React pattern — each feature owns its components, hooks, and API layer. Features do not cross-import.

**Rationale:** Clear boundaries, easy to navigate, each feature is independently understandable. Scales well as the application grows.

## 8. Testing Strategy

**Decision:** Unit tests (Jest) for business logic, integration tests (Jest + Supertest against real Postgres) for API endpoints, Vitest + React Testing Library for frontend components.

**No E2E tests.** This is an intentional scoping decision — unit + integration tests provide high confidence at lower cost for an assessment. E2E would add Playwright/Cypress setup overhead without proportional value for this scope.

## 9. Append-Only KPI Values

**Decision:** `kpi_values` rows are never updated or deleted. Each measurement is a new row.

**Rationale:** Provides a complete audit trail. Enables trend charts showing progress over time. Prevents accidental data loss. The latest value is efficiently retrieved via composite index `(kpi_id, recorded_at DESC)`.

## Scalability Considerations

- **Database indexing:** Composite indexes on foreign keys and sort columns. GIN index on JSONB metadata for flexible queries.
- **Pagination:** All list endpoints paginated. Prevents unbounded response sizes.
- **N+1 prevention:** KPI listings use LATERAL JOIN to fetch latest values in a single query.
- **Connection pooling:** TypeORM connection pool, configurable via environment variables.
- **Caching:** TanStack Query client-side caching with `staleTime: 30s`. Server-side caching possible via NestJS CacheInterceptor on summary endpoints.
- **Docker health checks:** Postgres readiness check prevents API startup before database is available.

## Shortcuts Taken

- No rate limiting (would add `@nestjs/throttler` in production)
- No request validation at nginx level (would add in production)
- Simple JWT with no refresh token rotation (would add refresh tokens in production)
- No database connection retry logic (TypeORM handles basic reconnection)
- No structured logging (would use Pino or Winston in production)
- No CI/CD pipeline (would add GitHub Actions)
