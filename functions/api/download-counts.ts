import downloads from "../../src/data/downloads";
import {
  getDownloadCounts,
  type DownloadCountEnv,
} from "../../src/lib/download-count-store";

type Env = DownloadCountEnv;

export const onRequestGet: PagesFunction<Env> = async ({
  env,
}: PagesFunctionContext<Env>) => {
  const counts = await getDownloadCounts(env, downloads);

  return Response.json(counts, {
    headers: {
      "cache-control": "no-store",
    },
  });
};
