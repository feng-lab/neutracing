import downloads from "../../src/data/downloads";

interface Env {
  DOWNLOAD_COUNTS?: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async ({
  env,
}: PagesFunctionContext<Env>) => {
  const counts: Record<string, number> = {};

  await Promise.all(
    downloads.map(async (item) => {
      if (env.DOWNLOAD_COUNTS) {
        const stored = await env.DOWNLOAD_COUNTS.get(item.slug);
        counts[item.slug] = Number(stored ?? item.seedCount ?? 0);
      } else {
        counts[item.slug] = item.seedCount ?? 0;
      }
    })
  );

  return Response.json(counts, {
    headers: {
      "cache-control": "no-store",
    },
  });
};
