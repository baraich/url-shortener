import { customAlphabet, urlAlphabet } from "nanoid";
import { procedure, router } from "@/server/trpc";
import { z } from "zod";
import getBaseUrl from "@/lib/baseUrl";

const urlsMap: Map<string, string> = new Map();
const nanoid = customAlphabet(urlAlphabet, 8);

export const appRouter = router({
  createUrl: procedure
    .input(z.object({ full_url: z.string() }))
    .mutation(function ({ input }) {
      const id = nanoid();
      const baseUrl = getBaseUrl();
      const shortUrl = `${baseUrl}/${id}`;

      urlsMap.set(id, input.full_url);
      return { shortUrl };
    }),

  urlLookup: procedure
    .input(z.object({ id: z.string() }))
    .query(function ({ input }) {
      if (urlsMap.has(input.id)) {
        return {
          status: true,
          full_url: urlsMap.get(input.id),
        };
      }

      return {
        status: false,
        full_url: null,
      };
    }),
});
export type AppRouter = typeof appRouter;
