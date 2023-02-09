FROM node:18

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm ci

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]