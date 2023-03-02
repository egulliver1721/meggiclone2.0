import { 
    createTRPCProxyClient,
    httpBatchLink
} from '@trpc/client';
import type { AppRouter } from '../../server/src/trpc';
import { createTRPCReact } from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouter>();
