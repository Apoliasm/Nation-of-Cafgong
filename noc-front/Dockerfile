FROM node:18.20.7-alpine3.21 as build

WORKDIR /docker-front

COPY ./package*.json ./.yarnrc.yml ./.pnp.cjs ./.pnp.loader.mjs ./yarn.lock ./
COPY ./.yarn ./.yarn

RUN yarn install

COPY ./eslint.config.mjs ./next-env.d.ts ./next.config.ts ./postcss.config.mjs ./tsconfig.json .env ./
COPY ./src ./src
COPY ./public ./public

RUN yarn next build

FROM nginx:1.23.2-alpine as start

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /docker-front/build /usr/share/nginx/html

EXPOSE 3000

ENTRYPOINT [ "nginx" , "-g", "daemon off;"]