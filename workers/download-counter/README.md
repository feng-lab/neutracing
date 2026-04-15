# Download Counter Worker

This Worker provides strongly consistent download counts for `neutracing.com` using one Durable Object per download slug.

It is kept separate from the Astro Pages project because Cloudflare Pages cannot define and deploy Durable Objects directly inside a Pages project.

## Commands

Deploy the Worker:

```sh
npm run counter:deploy
```

Run it locally:

```sh
npm run counter:dev
```

The deployed Worker name is `neutracing-download-counter`.

## Pages binding

Bind the Worker into the Pages project as a service:

```jsonc
"services": [
  {
    "binding": "DOWNLOAD_COUNTER_SERVICE",
    "service": "neutracing-download-counter"
  }
]
```

The Pages Functions layer uses this service in production. When the service is not bound, such as in local or preview environments, the site falls back to the catalog `seedCount` values.
