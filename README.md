## WIP

# 📝 Notebin

A self-hosted pastebin and code snippet manager. Create, share, and manage snippets with syntax highlighting — fully under your control.

## Features

- Create snippets with syntax highlighting
- Auto-generated share links via unique slugs
- Optional expiration dates
- Clean REST API
- Self-hostable via Docker

## Tech Stack

**Backend** — `apps/api`
- Node.js + Express + TypeScript
- Drizzle ORM + SQLite (PostgreSQL migration planned)
- tsx for development

**Frontend** — `apps/web`
- Next.js + TypeScript
- Tailwind CSS + shadcn/ui

**Monorepo** — Turborepo

## Project Structure

```
notebin/
├── apps/
│   ├── api/          # Express backend
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   ├── db/
│   │   │   └── middleware/
│   │   └── drizzle/  # Migrations
│   └── web/          # Next.js frontend
└── packages/
    ├── db/           # Shared Drizzle schema
    ├── types/        # Shared TypeScript types
    ├── ui/           # Shared UI components
    └── typescript-config/
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/your-username/notebin.git
cd notebin
npm install
```

### Development

```bash
# Start all apps
npm run dev

# Start only the API
cd apps/api
npm run dev
```

The API runs on `http://localhost:3002`.

### Database Setup

```bash
cd apps/api
npx drizzle-kit generate
npx drizzle-kit migrate
```

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/snippets` | Get all snippets |
| `GET` | `/api/snippets/:slug` | Get snippet by slug |
| `POST` | `/api/snippets` | Create a new snippet |
| `DELETE` | `/api/snippets/:slug` | Delete a snippet |

### Create a Snippet

```bash
curl -X POST http://localhost:3002/api/snippets \
  -H "Content-Type: application/json" \
  -d '{"title": "Hello World", "content": "console.log(\"hello\")", "language": "javascript"}'
```

## Roadmap

- [ ] Frontend with Next.js + shadcn/ui
- [ ] Syntax highlighting
- [ ] Share as image export
- [ ] Password-protected snippets
- [ ] Multi-user support with Auth
- [ ] Docker + Docker Compose setup
- [ ] PostgreSQL migration

## License

MIT