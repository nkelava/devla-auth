FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE ${DOCKER_SERVER_PORT}

CMD ["pnpm", "run", "dev"]