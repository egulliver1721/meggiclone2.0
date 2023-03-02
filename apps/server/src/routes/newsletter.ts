import { router, publicProcedure } from '../trpc';
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
      return await ctx.prisma.subscribe.create({
        data: {
          email: input.email,
        },
      });
    }),
});

export default newsletterRouter;