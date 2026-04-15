import downloads from "../data/downloads";

type DownloadItem = (typeof downloads)[number];

type CounterServiceBinding = {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
};

export interface DownloadCountEnv {
  DOWNLOAD_COUNTS?: KVNamespace;
  DOWNLOAD_COUNTER_SERVICE?: CounterServiceBinding;
}

interface CountResponse {
  count?: unknown;
}

interface CountsResponse {
  counts?: Record<string, unknown>;
}

const JSON_HEADERS = {
  "content-type": "application/json",
};

const normalizeCount = (value: unknown) => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }

  return parsed;
};

const parseStoredCount = (stored: string | null, seedCount: number | null) => {
  if (stored === null) {
    return normalizeCount(seedCount);
  }

  return normalizeCount(stored);
};

async function getLegacyCount(env: DownloadCountEnv, item: DownloadItem) {
  if (!env.DOWNLOAD_COUNTS) {
    return normalizeCount(item.seedCount);
  }

  const stored = await env.DOWNLOAD_COUNTS.get(item.slug);
  return parseStoredCount(stored, item.seedCount ?? 0);
}

async function requestCounterService<ResponseShape>(
  env: DownloadCountEnv,
  path: string,
  body: unknown,
) {
  if (!env.DOWNLOAD_COUNTER_SERVICE) {
    return undefined;
  }

  const response = await env.DOWNLOAD_COUNTER_SERVICE.fetch(
    `https://download-counter${path}`,
    {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    throw new Error(`Counter service request failed with status ${response.status}`);
  }

  return (await response.json()) as ResponseShape;
}

export async function getDownloadCount(env: DownloadCountEnv, item: DownloadItem) {
  const fallbackCount = await getLegacyCount(env, item);

  try {
    const response = await requestCounterService<CountResponse>(env, "/count", {
      slug: item.slug,
      fallbackCount,
    });

    if (response && response.count !== undefined) {
      return normalizeCount(response.count);
    }
  } catch (error) {
    console.error(`Failed to read download count for ${item.slug}`, error);
  }

  return fallbackCount;
}

export async function getDownloadCounts(
  env: DownloadCountEnv,
  items: readonly DownloadItem[],
) {
  const fallbackEntries = await Promise.all(
    items.map(async (item) => [item.slug, await getLegacyCount(env, item)] as const),
  );
  const fallbackCounts = Object.fromEntries(fallbackEntries) as Record<string, number>;

  try {
    const response = await requestCounterService<CountsResponse>(env, "/counts", {
      items: items.map((item) => ({
        slug: item.slug,
        fallbackCount: fallbackCounts[item.slug] ?? 0,
      })),
    });

    if (response?.counts) {
      const mergedCounts = { ...fallbackCounts };

      for (const item of items) {
        if (response.counts[item.slug] !== undefined) {
          mergedCounts[item.slug] = normalizeCount(response.counts[item.slug]);
        }
      }

      return mergedCounts;
    }
  } catch (error) {
    console.error("Failed to read batched download counts", error);
  }

  return fallbackCounts;
}

export async function incrementDownloadCount(
  env: DownloadCountEnv,
  item: DownloadItem,
) {
  const fallbackCount = await getLegacyCount(env, item);

  try {
    const response = await requestCounterService<CountResponse>(env, "/increment", {
      slug: item.slug,
      fallbackCount,
    });

    if (response && response.count !== undefined) {
      return normalizeCount(response.count);
    }
  } catch (error) {
    console.error(`Failed to increment download count for ${item.slug}`, error);
  }

  if (env.DOWNLOAD_COUNTS) {
    const nextCount = fallbackCount + 1;
    await env.DOWNLOAD_COUNTS.put(item.slug, String(nextCount));
    return nextCount;
  }

  return fallbackCount + 1;
}
