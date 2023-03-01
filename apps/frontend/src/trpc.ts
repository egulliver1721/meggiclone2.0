import { 
    createTRPCProxyClient,
    httpBatchLink
} from '@trpc/client';
import type { AppRouter } from '../../backend/src/trpc';
 
// Notice the <AppRouter> generic here.
const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: `http://localhost:${process.env.PORT}/trpc`,
        }),
    ],
});

