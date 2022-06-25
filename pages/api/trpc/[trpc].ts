import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';

import { supabase } from '@/lib';
import type { ShortUrl } from '@/types';

export const appRouter = trpc
  .router()
  .query('slugCheck', {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input }) {
      const { count } = await supabase
        .from<ShortUrl>('shortUrl')
        .select('id', { count: 'exact' })
        .match({ slug: input.slug });

      return { isUsed: Boolean(count) };
    },
  })
  .mutation('createSlug', {
    input: z.object({
      slug: z.string().min(1),
      url: z.string().url().min(1),
    }),
    async resolve({ input }) {
      try {
        const { data } = await supabase
          .from<ShortUrl>('shortUrl')
          .insert({ slug: input.slug, url: input.url })
          .throwOnError()
          .single();

        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
