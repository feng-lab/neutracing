# neutracing.com

Source for the public `neutracing.com` site.

The site is built with Astro and deployed on Cloudflare Pages. It is mostly static content, with a small Pages Functions layer used only for download counting.

## Development

```sh
npm install
npm run dev
npm run check
npm run build
```

## Project structure

- `src/content/pages`
  Markdown content for the public pages.
- `src/data/downloads.ts`
  Download catalog metadata and the centralized asset host/base URL for large files.
- `src/data/site.ts`
  Shared structured content such as tutorial video embeds and download-page grouping.
- `public/images/neutube`
  Local image assets used by the site.
- `functions/api/download/[slug].ts`
  Increments the download counter and redirects to the file host.
- `functions/api/download-counts.ts`
  Returns the current download counts for the UI.

## Deployment

- Build command: `npm run build`
- Output directory: `dist`
- Required binding: `DOWNLOAD_COUNTS` KV namespace

Large downloadable files remain hosted on the external asset host configured in `src/data/downloads.ts`, while the site HTML, CSS, JS, and image assets are served from this repo.
