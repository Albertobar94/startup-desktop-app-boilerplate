# ADR 001: Monorepo Structure

## Status

Accepted

## Context

We need a project structure that supports multiple applications (desktop, marketing, docs) sharing common code (types, UI components, utilities).

## Decision

Use a monorepo with pnpm workspaces for dependency management and Turborepo for task orchestration.

### Structure

- `apps/` — Deployable applications
- `packages/` — Shared libraries consumed by apps

### Why pnpm

- Fast installation with content-addressable storage
- Strict dependency resolution (no phantom dependencies)
- Native workspace protocol (`workspace:*`)

### Why Turborepo

- Incremental builds with caching
- Parallel task execution
- Simple configuration via `turbo.json`

## Consequences

- All packages must declare their dependencies explicitly
- Cross-package imports use workspace protocol
- CI runs `pnpm install --frozen-lockfile` for reproducible builds
