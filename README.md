# Devla Auth

A small full-stack authentication app built as a selection-process assignment for Devla. Users can register, log in, see their profile, log out and delete their account. The backend issues short-lived JWT access tokens and rotating refresh tokens stored in an HTTP-only cookie, and the frontend uses them to guard routes.

The whole stack (MongoDB, Express API, Vue client) runs with a single `docker compose up`.

## Tech stack

| Part     | Technology                                                                 |
| -------- | -------------------------------------------------------------------------- |
| Client   | Vue 3, Vite, Vue Router, Pinia (with `pinia-plugin-persistedstate`), Axios |
| API      | Node.js 18, Express, Mongoose, Joi, bcrypt, jsonwebtoken, cookie-parser    |
| Database | MongoDB                                                                    |
| Tooling  | Docker Compose, pnpm, ESLint, Prettier, Husky                              |

## Features

- **Registration and login** with email and password, validated on the server with Joi (valid email, password of at least 8 characters).
- **Password hashing** with bcrypt before the user is saved.
- **JWT authentication**: an access token is returned in the login response and sent as a `Bearer` header; a refresh token is set as an HTTP-only cookie.
- **Refresh token rotation and reuse detection**: every refresh issues a new refresh token, and reusing an old one invalidates all of the user's refresh tokens.
- **Protected routes** on the client: the home page checks the session and silently fetches a new access token when the current one is rejected.
- **Account deletion** and logout from the profile page.

## Getting started

### Prerequisites

- [Docker Engine with Docker Compose, or Docker Desktop](https://docs.docker.com/get-docker/)
- Git

Check that Docker is installed and running:

```sh
docker info
```

### Run with Docker Compose

```sh
git clone https://github.com/nkelava/devla-auth.git
cd devla-auth
docker compose up
```

The first run takes a while because the images and dependencies are built. Once everything is up:

- Client: <http://localhost:8001>
- API: <http://localhost:3001>

You should see the login page. Create an account via the register page, then log in.

The repository already contains working `.env` files with development values, so no extra setup is needed for a local run. To stop the stack press `Ctrl+C`, or run `docker compose down` (add `-v` to also remove the MongoDB volume).

## Configuration

Configuration is split across three `.env` files, each with a matching `.env.example`. Docker Compose loads them into the containers.

### `.env` (root, used by Docker Compose)

| Variable             | Description                                   | Default in repo |
| -------------------- | --------------------------------------------- | --------------- |
| `SERVER_PORT`        | Host port for the API; also the port Express listens on | `3001` |
| `DOCKER_SERVER_PORT` | API port inside the container                 | `3001`          |
| `CLIENT_PORT`        | Host port for the client                      | `8001`          |
| `DOCKER_CLIENT_PORT` | Port Vite listens on inside the container     | `8001`          |

Note: the root `.env.example` lists `DOCKER_PORT`, but `docker-compose.yaml` reads `DOCKER_SERVER_PORT`. Use `DOCKER_SERVER_PORT`.

### `server/.env`

| Variable                     | Description                                                             |
| ---------------------------- | ----------------------------------------------------------------------- |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB user; used both to initialise the database and by the API       |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB password                                                        |
| `MONGO_INITDB_IP`            | MongoDB host (`mongo`, the Compose service name)                        |
| `MONGO_INITDB_PORT`          | MongoDB port (defaults to `27017`)                                      |
| `MONGO_INITDB_DATABASE`      | Database name                                                           |
| `SALT_ROUNDS`                | Intended bcrypt salt rounds (currently the user model hardcodes `8`)    |
| `ACCESS_TOKEN_SECRET`        | Secret used to sign access tokens (valid for 7 days)                    |
| `REFRESH_TOKEN_SECRET`       | Secret used to sign refresh tokens (valid for 30 days)                  |

Change the secrets and database credentials before using this anywhere other than your own machine.

### `client/.env`

| Variable            | Description                                     | Default in repo          |
| ------------------- | ----------------------------------------------- | ------------------------ |
| `VITE_API_BASE_URL` | Base URL the client uses for API requests       | `http://localhost:3001/` |

## API

All endpoints are prefixed with `/api/v1`. Request bodies are JSON.

| Method   | Endpoint        | Description                                                           |
| -------- | --------------- | --------------------------------------------------------------------- |
| `POST`   | `/user`         | Register a user. Body: `{ "email", "password" }`                      |
| `GET`    | `/user/:id`     | Get a user's `id` and `email`                                         |
| `DELETE` | `/user/:id`     | Delete a user                                                         |
| `POST`   | `/auth/login`   | Log in. Returns `{ user: { id, email, accessToken } }` and sets the `refresh_token` cookie |
| `POST`   | `/auth/logout`  | Invalidate the current refresh token and clear the cookie             |
| `GET`    | `/auth/status`  | Check the session. Requires `Authorization: Bearer <accessToken>`     |
| `GET`    | `/jwt/refresh`  | Exchange the `refresh_token` cookie for a new access token            |

Example:

```sh
# Register
curl -X POST http://localhost:3001/api/v1/user \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"supersecret"}'

# Log in
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"supersecret"}'
```

The refresh token cookie is set with `Secure` and `SameSite=None`, so the refresh flow is meant to be exercised from the browser client.

## Project structure

```text
devla-auth/
├── docker-compose.yaml      # MongoDB, API and client services
├── .env.example             # Port settings for Docker Compose
├── package.json             # Root scripts: lint and Husky setup
├── .husky/pre-commit        # Runs the server linter before each commit
├── server/                  # Express API
│   ├── Dockerfile
│   ├── .env.example
│   └── src/
│       ├── server.js        # Entry point: DB connection, middleware, routes
│       ├── auth/            # Login, logout and session status
│       ├── user/            # User model, registration, get and delete
│       ├── jwt/             # Token generation, verification middleware, refresh endpoint
│       │   └── config/      # Token lifetimes and refresh cookie options
│       ├── joi/             # Request validation schemas
│       ├── db/              # DB config and MongoDB init script
│       └── error/           # Shared error messages
└── client/                  # Vue 3 + Vite frontend
    ├── Dockerfile
    ├── .env.example
    └── src/
        ├── main.js          # App bootstrap (Pinia, router)
        ├── App.vue
        ├── api/             # Axios instances (public and with credentials)
        ├── router/          # Routes and auth guards
        ├── stores/          # Pinia stores for the user and the forms
        ├── views/           # Login, Register and Home pages
        └── assets/          # Styles and images
```

## Development

The API and client run in development mode inside the containers (`nodemon` and `vite --host`), and the source folders are mounted as volumes, so code changes are picked up without rebuilding.

Available scripts:

| Location  | Command      | Description                                  |
| --------- | ------------ | -------------------------------------------- |
| root      | `pnpm lint`  | Lint the server (also run by the pre-commit hook) |
| `server/` | `pnpm dev`   | Start the API with nodemon                   |
| `server/` | `pnpm lint`  | Run ESLint on `src`                          |
| `client/` | `pnpm dev`   | Start the Vite dev server                    |
| `client/` | `pnpm build` | Build the client for production              |
| `client/` | `pnpm preview` | Preview the production build               |
| `client/` | `pnpm lint`  | Run ESLint with `--fix`                      |

To set up the Git hooks, run `pnpm install` in the repository root (this triggers `husky install`).

If you run the API outside Docker, note that it does not load `.env` files on its own: export the variables from `.env` and `server/.env` in your shell first, and point `MONGO_INITDB_IP` at your MongoDB host (for example `localhost`).

## Author

Nikola Kelava
