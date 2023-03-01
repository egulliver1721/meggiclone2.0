import { router, publicProcedure, middleware } from '../trpc';
import { z } from 'zod';

const newsletterRouter = router({
  create: publicProcedure
    // input validation using zod
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // mutate values on db using prisma
      // prisma to mutate data in backend
      return await ctx.prisma.newsletter.create({
        data: {
          email: input.email,
        },
      });
    }),
});

export default newsletterRouter;