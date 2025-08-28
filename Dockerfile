# # syntax = docker/dockerfile:1
#
FROM node:22-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
#
# # Install pnpm globally using corepack
RUN corepack enable && corepack prepare pnpm@latest --activate
#
# # Dependencies stage
FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
#
# # Build stage
FROM base AS build
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
# Use placeholder envs for build
ENV NEXT_PUBLIC_SUPABASE_URL=https://deja__gu__nod.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=deja__gu__nod
RUN pnpm build
#
# # Final runtime stage
FROM node:22-slim AS run
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
# Add non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --home /home/nextjs nextjs
#
# # Copy only the minimal output for production
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
#
COPY entry.sh /entry.sh
RUN chmod +x /entry.sh
#
# USER nextjs
#
EXPOSE 3000
ENTRYPOINT ["/entry.sh"]
CMD ["node", "server.js"]

