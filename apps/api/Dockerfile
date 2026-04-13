FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
WORKDIR /app

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/ ./
COPY . .
RUN pnpm --filter @wsp/shared build && pnpm --filter @wsp/api build
RUN pnpm --filter @wsp/api deploy --prod /app/deployed
RUN cp -r /app/packages/shared/dist /app/deployed/node_modules/@wsp/shared/dist

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/deployed ./

EXPOSE 3000
CMD ["node", "dist/main.js"]
