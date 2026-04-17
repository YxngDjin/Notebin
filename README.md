# 📝 Notebin

A self-hosted pastebin and code snippet manager. Create, share, and manage snippets with syntax highlighting — fully under your control.

## Features

- Create snippets with title, language and optional expiration date
- Syntax highlighting powered by Shiki with Tokyo Night theme
- 30+ supported programming languages
- Password-protected snippets
- Share snippets via unique slug URLs
- Share as image with custom gradient backgrounds
- Copy to clipboard with animated feedback
- Delete snippets
- Dark / Light mode toggle
- Mobile-friendly UI with slide-in drawer
- Self-hostable via Docker

## Tech Stack

**Backend** — `apps/api`
- Node.js + Express + TypeScript
- Drizzle ORM + SQLite (PostgreSQL migration planned)
- bcrypt for password hashing
- tsx for development

**Frontend** — `apps/web`
- Next.js 16 + TypeScript
- Tailwind CSS + shadcn/ui
- Shiki for syntax highlighting
- html-to-image for PNG export

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
│   │   │   └── utils/
│   │   └── drizzle/  # Migrations
│   └── web/          # Next.js frontend
│       ├── app/
│       ├── components/
│       └── lib/
└── packages/
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

### Environment Variables

Create `apps/web/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3002
```

### Development

```bash
# Start all apps
npm run dev

# Start only the API
cd apps/api
npm run dev
```

The API runs on `http://localhost:3002`, the frontend on `http://localhost:3000`.

### Database Setup

```bash
cd apps/api
npx drizzle-kit generate
npx drizzle-kit migrate
```

## Docker

### Run with Docker Compose

```bash
docker compose up -d --build
```

This starts both the API and the frontend. The database is persisted via a Docker volume.

### Environment Variables for Docker

Edit the `docker-compose.yml` and set `NEXT_PUBLIC_API_URL` to your server's IP or hostname:

```yaml
environment:
  - NEXT_PUBLIC_API_URL=http://192.168.0.x:3002
```

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/snippets` | Get all snippets |
| `GET` | `/api/snippets/:slug` | Get snippet by slug |
| `POST` | `/api/snippets` | Create a new snippet |
| `POST` | `/api/snippets/:slug/unlock` | Unlock a password-protected snippet |
| `DELETE` | `/api/snippets/:slug` | Delete a snippet |

### Create a Snippet

```bash
curl -X POST http://localhost:3002/api/snippets \
  -H "Content-Type: application/json" \
  -d '{"title": "Hello World", "content": "console.log(\"hello\")", "language": "javascript"}'
```

### Create a Password-Protected Snippet

```bash
curl -X POST http://localhost:3002/api/snippets \
  -H "Content-Type: application/json" \
  -d '{"title": "Secret", "content": "my secret code", "language": "javascript", "password": "mypassword"}'
```

## Known Limitations

- **Sharing requires network access** — Snippets can only be shared with people who have access to your server. For public sharing, consider setting up a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) to expose your instance to the internet.

## Roadmap

- [x] Frontend with Next.js + shadcn/ui
- [x] Syntax highlighting with Shiki
- [x] Share as image with gradient backgrounds
- [x] Password-protected snippets
- [x] Docker + Docker Compose setup
- [ ] Multi-user support with Auth
- [ ] PostgreSQL migration
- [ ] CLI support (`cat file.txt | notebin`)
- [ ] Cloudflare Tunnel guide

## License

MIT