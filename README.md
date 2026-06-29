# Tremora

Marketing site for Tremora — continuous, objective tremor data for movement disorder care.

**Live site:** [tremoratt.github.io/tremora](https://tremoratt.github.io/tremora/)

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
pnpm typecheck
pnpm lint
```

Static export for GitHub Pages is written to `out/` when `GITHUB_PAGES=true` and `NEXT_PUBLIC_BASE_PATH=/tremora`.

## Deploy

Pushes to `main` run [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml).

In the repo **Settings → Pages**, set **Source** to **GitHub Actions** (not “Deploy from a branch”). If Pages is set to the branch root, GitHub renders this README instead of the built site.
