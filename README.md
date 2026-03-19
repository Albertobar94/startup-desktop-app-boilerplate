# Acme App

A production-ready Electron desktop application monorepo with React, TypeScript, and modern tooling.

## Architecture

```
acme-app/
├── apps/
│   ├── desktop/          # Electron + React desktop app
│   ├── marketing/        # Next.js marketing site
│   └── docs/             # Next.js documentation site
├── packages/
│   ├── config/           # Shared tsconfig & Tailwind theme
│   ├── types/            # Shared TypeScript types
│   ├── utils/            # Shared utilities
│   ├── ui/               # Component library (shadcn/ui + Radix)
│   ├── animations/       # Framer Motion variants
│   └── api/              # Supabase, Stripe, Sentry, PostHog clients
├── supabase/             # Database migrations & edge functions
└── docs/                 # Architecture Decision Records
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop framework | Electron 35+ |
| Build tool | electron-vite (Vite 6+) |
| Frontend | React 19, React Router 7 |
| Styling | Tailwind CSS 4, shadcn/ui |
| State | Zustand, TanStack Query |
| Forms | React Hook Form + Zod |
| Animation | Framer Motion |
| Backend | Supabase (Auth, DB, Realtime, Edge Functions) |
| Payments | Stripe |
| Error tracking | Sentry |
| Analytics | PostHog |
| Monorepo | pnpm workspaces + Turborepo |
| Linting | Biome |
| Testing | Vitest, React Testing Library, Playwright |
| CI/CD | GitHub Actions |
| Packaging | electron-builder |

## Quick Start

### Prerequisites

- Node.js 22+
- pnpm 9+

### Setup

```bash
# Clone the repository
git clone <repo-url> acme-app
cd acme-app

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development
pnpm dev
```

### Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all packages and apps |
| `pnpm lint` | Lint all packages with Biome |
| `pnpm check-types` | Type-check all packages |
| `pnpm test` | Run all tests |
| `pnpm format` | Format all files with Biome |
| `pnpm clean` | Remove all build outputs |

### Desktop App

```bash
# Development
pnpm --filter acme-desktop dev

# Package for current platform
pnpm --filter acme-desktop pack

# Build distributable
pnpm --filter acme-desktop dist
```

### Marketing Site

```bash
pnpm --filter acme-marketing dev    # http://localhost:3001
```

### Docs Site

```bash
pnpm --filter acme-docs dev         # http://localhost:3002
```

## Environment Variables

See `.env.example` for all required and optional environment variables. All third-party integrations (Supabase, Stripe, Sentry, PostHog) are guarded by environment variables and will gracefully degrade when not configured.

## Monorepo Structure

### `packages/config`
Shared TypeScript configurations and Tailwind CSS v4 theme. All apps extend these base configs.

### `packages/types`
Shared TypeScript types including the `ElectronAPI` interface for type-safe IPC, `Result<T, E>` pattern, and domain types.

### `packages/ui`
Component library built on Radix UI primitives with Tailwind CSS styling. Includes Button, Card, Dialog, Input, Tabs, and more.

### `packages/utils`
Shared utilities: ID generation (nanoid), date helpers (dayjs), and Zod validation schemas.

### `packages/api`
Service clients for Supabase, Stripe, Sentry, and PostHog. All clients are factory functions guarded by environment variables.

### `packages/animations`
Framer Motion animation variants and hooks for consistent motion throughout the app.

## Security

- Context isolation and sandbox enabled in Electron
- CSP headers enforced
- All IPC inputs validated with Zod
- Path traversal protection on file operations
- OAuth URLs validated against allowlist
- No `nodeIntegration`, no `remote` module

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

## License

Private - All rights reserved.
