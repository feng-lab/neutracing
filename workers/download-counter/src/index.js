import { DurableObject } from "cloudflare:workers";

const JSON_HEADERS = {
  "cache-control": "no-store",
  "content-type": "application/json",
};

const normalizeCount = (value) => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }

  return parsed;
};

const createJsonResponse = (body, init = {}) =>
  Response.json(body, {
    ...init,
    headers: {
      ...JSON_HEADERS,
      ...(init.headers ?? {}),
    },
  });

const badRequest = (message) =>
  createJsonResponse({ error: message }, { status: 400 });

const parseBody = async (request) => {
  try {
    return await request.json();
  } catch {
    return null;
  }
};

const getSlug = (value) => (typeof value === "string" ? value.trim() : "");

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return new Response("ok", {
        headers: {
          "cache-control": "no-store",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const body = await parseBody(request);

    if (!body || typeof body !== "object") {
      return badRequest("Expected a JSON body.");
    }

    switch (url.pathname) {
      case "/count":
        return handleCount(env, body);
      case "/counts":
        return handleCounts(env, body);
      case "/increment":
        return handleIncrement(env, body);
      default:
        return new Response("Not found", { status: 404 });
    }
  },
};

async function handleCount(env, body) {
  const slug = getSlug(body.slug);

  if (!slug) {
    return badRequest("Missing slug.");
  }

  const stub = env.DOWNLOAD_COUNTERS.getByName(slug);
  const count = await stub.getValue(normalizeCount(body.fallbackCount));

  return createJsonResponse({ count });
}

async function handleCounts(env, body) {
  if (!Array.isArray(body.items)) {
    return badRequest("Missing items.");
  }

  const counts = {};

  await Promise.all(
    body.items.map(async (item) => {
      const slug = getSlug(item?.slug);

      if (!slug) {
        return;
      }

      const stub = env.DOWNLOAD_COUNTERS.getByName(slug);
      counts[slug] = await stub.getValue(normalizeCount(item?.fallbackCount));
    }),
  );

  return createJsonResponse({ counts });
}

async function handleIncrement(env, body) {
  const slug = getSlug(body.slug);

  if (!slug) {
    return badRequest("Missing slug.");
  }

  const stub = env.DOWNLOAD_COUNTERS.getByName(slug);
  const count = await stub.increment(normalizeCount(body.fallbackCount));

  return createJsonResponse({ count });
}

export class DownloadCounter extends DurableObject {
  async getValue(fallbackCount = 0) {
    const fallbackFloor = normalizeCount(fallbackCount);
    const stored = await this.ctx.storage.get("value");
    let value = normalizeCount(stored);

    if (value < fallbackFloor) {
      value = fallbackFloor;
      await this.ctx.storage.put("value", value);
    }

    return value;
  }

  async increment(fallbackCount = 0) {
    let value = await this.getValue(fallbackCount);
    value += 1;
    await this.ctx.storage.put("value", value);
    return value;
  }
}
