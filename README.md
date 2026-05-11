# NestJS REST API Starter 🚀

A production-ready REST API boilerplate built with **NestJS**, **TypeORM**, **MySQL**, and **JWT authentication**. Clean architecture, Swagger docs, Docker support, and CI/CD included.

![CI](https://github.com/hamzajamshed/nestjs-rest-api-starter/actions/workflows/ci.yml/badge.svg)
![Node](https://img.shields.io/badge/Node.js-20-green?logo=nodedotjs)
![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?logo=nestjs)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ Features

- 🔐 **JWT Authentication** — Register, Login, protected routes
- 👤 **Role-based access** — Admin and User roles
- 📝 **Posts CRUD** — Full Create / Read / Update / Delete with ownership checks
- 📄 **Swagger UI** — Auto-generated API docs at `/docs`
- 🗄️ **MySQL + TypeORM** — Entities, relations, query builder
- 🐳 **Docker & docker-compose** — One command to run everything
- ✅ **Validation** — `class-validator` on all DTOs
- 🚨 **Global exception filter** — Consistent error responses
- 🔄 **GitHub Actions CI** — Auto lint, build, and test on push

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | NestJS 10 |
| Language | TypeScript |
| Database | MySQL 8 via TypeORM |
| Auth | JWT + Passport |
| Docs | Swagger / OpenAPI |
| Containerization | Docker + docker-compose |
| CI | GitHub Actions |

---

## 🚀 Getting Started

### Option 1 — Docker (Recommended)

```bash
git clone https://github.com/hamzajamshed/nestjs-rest-api-starter.git
cd nestjs-rest-api-starter
docker-compose up --build
```

API: `http://localhost:3000/api/v1`
Docs: `http://localhost:3000/docs`

---

### Option 2 — Local Setup

**Prerequisites:** Node.js 18+, MySQL running locally

```bash
# Clone
git clone https://github.com/hamzajamshed/nestjs-rest-api-starter.git
cd nestjs-rest-api-starter

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your DB credentials

# Start in dev mode (auto-reload)
npm run start:dev
```

---

## 📖 API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/auth/register` | Register new user | ❌ |
| POST | `/api/v1/auth/login` | Login, get JWT | ❌ |
| GET | `/api/v1/auth/me` | Get current user | ✅ |

### Posts
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/v1/posts` | List posts (paginated) | ❌ |
| GET | `/api/v1/posts/:id` | Get single post | ❌ |
| POST | `/api/v1/posts` | Create post | ✅ |
| PUT | `/api/v1/posts/:id` | Update post (owner/admin) | ✅ |
| DELETE | `/api/v1/posts/:id` | Delete post (owner/admin) | ✅ |

Full interactive docs available at `/docs` (Swagger UI).

---

## 📁 Project Structure

```
src/
├── auth/
│   ├── dto/           # RegisterDto, LoginDto
│   ├── strategies/    # JWT strategy
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/
│   ├── entities/      # User entity (TypeORM)
│   ├── users.service.ts
│   └── users.module.ts
├── posts/
│   ├── dto/           # CreatePostDto, UpdatePostDto
│   ├── entities/      # Post entity
│   ├── posts.controller.ts
│   ├── posts.service.ts
│   └── posts.module.ts
├── common/
│   └── filters/       # Global exception filter
├── app.module.ts      # Root module, DB config
└── main.ts            # Bootstrap, Swagger, CORS
```

---

## ⚙️ Environment Variables

```env
NODE_ENV=development
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=nestjs_starter

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

---

## 🧪 Running Tests

```bash
# Unit tests
npm run test

# Test coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

---

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run start:dev` | Dev mode with auto-reload |
| `npm run build` | Compile TypeScript |
| `npm run start:prod` | Run compiled build |
| `npm run lint` | ESLint check |
| `npm run test` | Run unit tests |

---

## 📄 License

MIT — free to use, fork, and build on.

---

Built by [Hamza](https://github.com/hamzajamshed) · [LinkedIn](https://linkedin.com/in/hamzajamshed)
