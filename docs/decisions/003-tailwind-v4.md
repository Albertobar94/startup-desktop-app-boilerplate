# ADR 003: Tailwind CSS v4 Configuration

## Status

Accepted

## Context

Tailwind CSS v4 introduces a CSS-first configuration model, replacing the JavaScript-based `tailwind.config.js`.

## Decision

Use Tailwind CSS v4 with CSS-first `@theme` configuration.

### Theme Location

`packages/config/tailwind/index.css` — Single source of truth for the design system.

### Integration

- **Desktop app (Vite)**: `@tailwindcss/vite` plugin in `electron.vite.config.ts`
- **Next.js apps**: `@tailwindcss/postcss` in `postcss.config.mjs`
- **All apps**: Import shared theme via `@import "@acme/config/tailwind";`

### Theme Variables

- Colors use oklch color space for perceptual uniformity
- CSS custom properties for semantic tokens (background, foreground, muted, etc.)
- Dark mode via `@variant dark` with `.dark` class strategy

### No JavaScript Config

- No `tailwind.config.js` or `tailwind.config.ts` anywhere
- All customization in CSS using `@theme` directive
- Plugins loaded via CSS `@plugin` directive if needed

## Consequences

- Theme changes only require editing CSS, not rebuilding config
- Shared theme automatically propagates to all apps
- IDE support requires Tailwind CSS IntelliSense v4+
- Class-based dark mode requires adding `.dark` class to `<html>` element
