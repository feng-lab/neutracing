# neutracing.com

Source for the public `neutracing.com` website.

The site is built with Astro and deployed on Cloudflare Pages. Most content is static Markdown and local assets. Large downloadable files remain on `repo.neutracing.com`, and the only dynamic feature is download counting.

## Stack

- Astro for the site
- Cloudflare Pages for hosting
- Cloudflare Pages Functions for the download API
- Cloudflare KV as the current count store
- Optional Durable Object counter service in `workers/download-counter`

## Local development

```sh
npm install
npm run dev
```

Useful checks:

```sh
npm run check
npm run build
npm run cf:dev
```

## Project layout

- `src/content/pages` contains the public Markdown pages.
- `src/data/downloads.ts` contains the download catalog and the centralized external asset host configuration.
- `src/data/site.ts` contains shared structured content such as tutorial embeds and download-page grouping.
- `public/images/neutube` contains local image assets used by the site.
- `functions/api/download/[slug].ts` redirects downloads and updates the counter.
- `functions/api/download-counts.ts` returns current counts for the UI.
- `workers/download-counter` contains the optional Durable Object-based counter service.

## Deployment

Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`

Production currently expects:

- `DOWNLOAD_COUNTS` KV binding
- `DOWNLOAD_COUNTER_SERVICE` service binding if the Durable Object worker is enabled

## Downloads

The website itself is self-contained in this repo, including the images used by the public pages. Large binary downloads stay on the external asset host defined in `src/data/downloads.ts` so the site repository remains lightweight and easy to deploy.
