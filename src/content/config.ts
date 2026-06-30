import { defineCollection, z } from "astro:content";

// Blog posts. `date` is kept as a raw string because some legacy posts use
// non-standard values (e.g. "2017-11-00 00:00:00"); normalization for
// sorting/display happens in src/utils/date.ts.
const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    path: z.string(),
    date: z.string(),
    video: z.string().optional(),
  }),
});

export const collections = { posts };
