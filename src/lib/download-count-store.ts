import downloads from "../data/downloads";

type DownloadItem = (typeof downloads)[number];

type CounterServiceBinding = {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
};

export interface DownloadCountEnv {
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

const getSeedCount = (item: DownloadItem) => normalizeCount(item.seedCount);

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

export async function getDownloadCounts(
  env: DownloadCountEnv,
  items: readonly DownloadItem[],
) {
  const fallbackEntries = items.map((item) => [item.slug, getSeedCount(item)] as const);
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
  const fallbackCount = getSeedCount(item);

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

  return fallbackCount;
}
