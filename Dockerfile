# syntax = docker/dockerfile:1

FROM node:22-slim AS base

ARG PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Dependencies
FROM base AS dependencies

COPY package.json pnpm-lock.yaml ./
RUN pnpm install
# RUN pnpm install --frozen-lockfile

# Build
FROM base AS build

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .


ENV NEXT_PUBLIC_SUPABASE_URL=https://example.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=example_key

RUN pnpm build

# Run
FROM base AS run

ENV NODE_ENV=production
ENV PORT=$PORT

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE $PORT
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
