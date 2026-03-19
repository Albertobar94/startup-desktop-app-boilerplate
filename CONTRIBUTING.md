# Contributing

## Development Setup

1. Install Node.js 22+ and pnpm 9+
2. Clone the repository
3. Run `pnpm install`
4. Copy `.env.example` to `.env` and fill in values
5. Run `pnpm dev` to start development

## Code Style

This project uses [Biome](https://biomejs.dev/) for linting and formatting.

- Double quotes, semicolons always, trailing commas
- 2-space indentation, 80 character line width
- Import sorting enforced automatically

Run `pnpm lint` to check and `pnpm format` to auto-fix.

## Commit Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — New feature
- `fix:` — Bug fix
- `chore:` — Maintenance tasks
- `refactor:` — Code restructuring
- `docs:` — Documentation changes
- `test:` — Test additions or changes

## Pull Request Process

1. Create a feature branch: `feature/your-feature`
2. Make your changes
3. Ensure `pnpm lint`, `pnpm check-types`, and `pnpm test` pass
4. Submit a PR to `main`
5. Squash merge after approval

## Project Structure

See [README.md](./README.md) for the full architecture overview.

## Adding Dependencies

Always discuss new dependencies before adding them. Prefer existing libraries already in the project.
