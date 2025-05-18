import { nanoid } from "nanoid";
import { procedure, router } from "@/server/trpc";
import { z } from "zod";
import getBaseUrl from "@/lib/baseUrl";

const urlsMap: Map<string, string> = new Map();

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
});
export type AppRouter = typeof appRouter;
