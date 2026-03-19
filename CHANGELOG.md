# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.0.1] - 2026-03-19

### Added

- Initial monorepo scaffold with pnpm workspaces and Turborepo
- Electron desktop app with React 19, React Router 7, and electron-vite
- Shared packages: config, types, utils, ui, animations, api
- Frameless window with custom title bar (macOS/Windows/Linux)
- Type-safe IPC bridge with Zod validation
- Security hardening: CSP, context isolation, sandbox, path traversal protection
- Auth flow with Supabase (email/password, OAuth)
- Settings UI: General, Account, Appearance, Billing tabs
- Dashboard with stats cards and activity feed
- File browser with open/save dialogs
- Payment integration stubs (Stripe)
- Notification system stub
- Feedback dialog
- Theme support (Light/Dark/System)
- Auto-updater via electron-updater
- System tray with context menu
- Deep link protocol (acmeapp://)
- Next.js marketing site
- Next.js documentation site
- Supabase setup: migrations, RLS policies, edge function stub
- Vitest + React Testing Library test setup
- Playwright E2E test setup
- GitHub Actions CI/CD workflows
- Biome for linting and formatting
