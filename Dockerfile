FROM node:18.20.7-alpine3.21 AS base

#step1) install dependency
FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json .yarnrc.yml .pnp.cjs .pnp.loader.mjs yarn.lock ./
COPY .yarn ./.yarn
RUN yarn install --immutable

#step2) build it
FROM base AS builder

WORKDIR /app
COPY --from=deps /app/.yarn ./.yarn
COPY --from=deps /app/.pnp.cjs ./.pnp.cjs

COPY . .

RUN yarn next build

FROM base AS runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.pnp.cjs ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN rm -rf ./.yarn/cache
COPY --from=builder --chown=nextjs:nodejs /app/.yarn ./.yarn/

USER nextjs

EXPOSE 3000

ENV PORT 3000

ENTRYPOINT ["node","--require","./.pnp.cjs", "server.js"]
