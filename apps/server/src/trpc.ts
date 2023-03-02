import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express'; 
import { PrismaClient } from 'database'
import {
    newsletterRouter, 
} from './routes';
 
const prisma = new PrismaClient();

export const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({
    req,
    res,
    prisma
});

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const middleware = t.router;
export const publicProcedure = t.procedure; 

export const appRouter = router({
    newsletter: newsletterRouter,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;