# ADR 002: Electron Security Model

## Status

Accepted

## Context

Electron apps run in a privileged environment with access to the filesystem and OS APIs. Security misconfigurations can expose users to remote code execution and data theft.

## Decision

### Hardened Defaults

- `contextIsolation: true` — Renderer cannot access Node.js APIs
- `nodeIntegration: false` — No `require()` in renderer
- `sandbox: true` — Renderer runs in Chromium sandbox
- `webSecurity: true` — Enforce same-origin policy

### IPC Security

- All IPC uses `ipcRenderer.invoke` (request/response pattern)
- All inputs validated with Zod schemas in main process handlers
- No `ipcRenderer.send` for commands (fire-and-forget is only for events from main to renderer)

### Content Security Policy

- CSP headers set via `session.defaultSession.webRequest.onHeadersReceived`
- Script sources restricted to `'self'`
- No `unsafe-inline` or `unsafe-eval`

### File System

- Path traversal blocked (reject paths containing `..`)
- All paths resolved to absolute before filesystem operations
- File dialogs used for user-initiated file access

### External URLs

- OAuth URLs validated against allowlist before opening
- Stripe URLs validated before `shell.openExternal`
- Navigation restricted to application URLs only

### Permissions

- All permission requests denied by default
- Camera, microphone, geolocation, notifications all blocked

## Consequences

- Renderer code cannot directly access Node.js or Electron APIs
- All OS interactions go through the typed IPC bridge
- Third-party content cannot execute arbitrary code
- File access requires explicit user action via dialogs
