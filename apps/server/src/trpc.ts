import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';
import { z } from 'zod';
import { PrismaClient } from '../node_modules/.prisma/client';

const prisma = new PrismaClient();

export const t = initTRPC.create();
    const router = t.router;
    const middleware = t.middleware;
    const procedure = t.procedure;

    const subscribeRouter = router({
        createSubscriber: procedure
        .input(z.object({
            email: z.string().email(),
        }))
        .mutation(({ input }) => {
            prisma.subscription.create({
                data: {
                    email: input.email,
                },
            });
        }),
    });

export const appRouter = router({
    subscribe: subscribeRouter,
})
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;