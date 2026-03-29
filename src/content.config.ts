import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    navTitle: z.string().optional(),
    navOrder: z.number().optional(),
    homeFeatured: z.boolean().default(false),
  }),
});

export const collections = { pages };
