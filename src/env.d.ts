/// <reference path="../.astro/types.d.ts" />

type KVNamespace = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
};

interface PagesFunctionContext<Env = Record<string, unknown>> {
  request: Request;
  env: Env;
  params: Record<string, string | string[] | undefined>;
}

type PagesFunction<Env = Record<string, unknown>> = (
  context: PagesFunctionContext<Env>
) => Response | Promise<Response>;
