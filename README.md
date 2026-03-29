# neutracing.com

Astro site for `neutracing.com`, designed for Cloudflare Pages.

## Stack

- Astro + TypeScript
- Local Markdown content in `src/content/pages`
- Local structured data in `src/data`
- Cloudflare Pages Functions for download counting
- Cloudflare KV for download counts
- Public R2 bucket for hosted files: `https://repo.neutracing.com/static/neutube`

## Local commands

```sh
npm install
npm run dev
npm run build
npm run check
npm run preview
```

## Content

- Page content lives in `src/content/pages`
- Download metadata lives in `src/data/downloads.ts`
- Site metadata, tutorial videos, FAQ entries, and download sections live in `src/data/site.ts`

## Cloudflare behavior

- `functions/api/download/[slug].ts`
  Increments a KV counter and redirects to the file in R2.
- `functions/api/download-counts.ts`
  Returns the current count set used by the download cards.
- `public/_routes.json`
  Limits function execution to the API routes.

## Pages setup

1. Push this repo to GitHub.
2. Create a Cloudflare Pages project from that repo.
3. Use build command `npm run build`.
4. Use build output directory `dist`.
5. Create a KV namespace for download counts.
6. Add the KV binding as `DOWNLOAD_COUNTS` in `wrangler.jsonc` or the Pages dashboard.
7. Attach the custom domain `neutracing.com`.
