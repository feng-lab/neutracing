import downloads from "../../../src/data/downloads";

interface Env {
  DOWNLOAD_COUNTS?: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async ({
  env,
  params,
}: PagesFunctionContext<Env>) => {
  const slug = String(params.slug ?? "");
  const item = downloads.find((candidate) => candidate.slug === slug);

  if (!item) {
    return new Response("Not found", { status: 404 });
  }

  if (env.DOWNLOAD_COUNTS) {
    try {
      const current = Number((await env.DOWNLOAD_COUNTS.get(slug)) ?? item.seedCount ?? 0);
      await env.DOWNLOAD_COUNTS.put(slug, String(current + 1));
    } catch (error) {
      console.error(`Failed to update download count for ${slug}`, error);
    }
  }

  return Response.redirect(item.downloadUrl, 302);
};
