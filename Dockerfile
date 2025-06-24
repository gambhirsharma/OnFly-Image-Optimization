# syntax = docker/dockerfile:1

# 🧱 Base image with Node.js and pnpm (via corepack)
FROM node:22-slim AS base

ARG PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Install pnpm globally using corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# 📦 Dependencies stage
FROM base AS dependencies

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# 🛠️ Build stage
FROM base AS build

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# ⬇️ Use placeholder envs to build safely (do NOT use real secrets)
ENV NEXT_PUBLIC_SUPABASE_URL=https://example.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=example_new

RUN pnpm build

# 🚀 Final runtime stage
FROM base AS run

ENV NODE_ENV=production
ENV PORT=$PORT

# ✅ Add non-root user with home dir to avoid corepack/pnpm cache errors
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 --home /home/nextjs nextjs
ENV HOME=/home/nextjs

WORKDIR /app

# Create required folder and fix permissions
RUN mkdir .next
RUN chown -R nextjs:nodejs /app /home/nextjs

# ✅ Copy built output and static files
COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

# ✅ Copy entrypoint script and make it executable
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Use the non-root user from now on
USER nextjs

EXPOSE $PORT
ENV HOSTNAME="0.0.0.0"

# ✅ Runtime env injection
ENTRYPOINT ["/entrypoint.sh"]

# ✅ Default command to start the server
CMD ["node", "server.js"]
