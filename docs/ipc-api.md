# IPC API Reference

The Electron IPC bridge provides type-safe communication between the renderer and main processes. All methods are available via `window.electron`.

## Auth

| Method | Signature | Description |
|--------|-----------|-------------|
| `getSession` | `() => Promise<SessionInterface \| null>` | Get stored auth session |
| `setSession` | `(session: SessionInterface) => Promise<void>` | Store auth session |
| `clearSession` | `() => Promise<void>` | Clear stored auth session |
| `openOAuth` | `(url: string) => Promise<void>` | Open OAuth URL in browser (validated against allowlist) |
| `onDeepLink` | `(callback: (url: string) => void) => () => void` | Listen for deep link callbacks |

## Files

| Method | Signature | Description |
|--------|-----------|-------------|
| `openDialog` | `(options: OpenDialogOptions) => Promise<string[]>` | Show native open file dialog |
| `saveDialog` | `(options: SaveDialogOptions) => Promise<string \| null>` | Show native save file dialog |
| `readFile` | `(path: string) => Promise<string>` | Read file contents (path traversal protected) |
| `writeFile` | `(path: string, content: string) => Promise<void>` | Write file contents (path traversal protected) |

## Updates

| Method | Signature | Description |
|--------|-----------|-------------|
| `check` | `() => Promise<void>` | Check for available updates |
| `download` | `() => Promise<void>` | Download available update |
| `install` | `() => Promise<void>` | Quit and install downloaded update |
| `onUpdateAvailable` | `(callback: (info) => void) => () => void` | Listen for update available events |
| `onUpdateDownloaded` | `(callback: (info) => void) => () => void` | Listen for update downloaded events |

## Payments

| Method | Signature | Description |
|--------|-----------|-------------|
| `openCheckout` | `(priceId: string) => Promise<void>` | Open Stripe checkout in browser |
| `openPortal` | `() => Promise<void>` | Open Stripe customer portal in browser |

## System

| Method | Signature | Description |
|--------|-----------|-------------|
| `getPlatform` | `() => Promise<string>` | Get OS platform |
| `getVersion` | `() => Promise<string>` | Get app version |
| `minimize` | `() => Promise<void>` | Minimize window |
| `maximize` | `() => Promise<void>` | Toggle maximize window |
| `close` | `() => Promise<void>` | Close window |
| `isMaximized` | `() => Promise<boolean>` | Check if window is maximized |
| `getTheme` | `() => Promise<string>` | Get current theme preference |
| `setTheme` | `(theme: string) => Promise<void>` | Set theme preference |

## Security

- All IPC inputs are validated with Zod schemas in main process handlers
- File paths are checked for path traversal (`..` segments rejected)
- OAuth URLs are validated against an allowlist
- Payment URLs are validated before opening with `shell.openExternal`
- The preload script uses `contextBridge.exposeInMainWorld` for isolation

## Types

Full type definitions are in `packages/types/src/electron-api.ts`.
