import downloads from "../../../src/data/downloads";
import {
  incrementDownloadCount,
  type DownloadCountEnv,
} from "../../../src/lib/download-count-store";

type Env = DownloadCountEnv;

export const onRequestGet: PagesFunction<Env> = async ({
  env,
  params,
}: PagesFunctionContext<Env>) => {
  const slug = String(params.slug ?? "");
  const item = downloads.find((candidate) => candidate.slug === slug);

  if (!item) {
    return new Response("Not found", { status: 404 });
  }

  await incrementDownloadCount(env, item);

  return Response.redirect(item.downloadUrl, 302);
};
