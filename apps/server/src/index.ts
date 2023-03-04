import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc';

async function main() {
  // express implementation
  const app: Application = express();

  app.use((req, _res, next) => {
    // request logger
    console.log('⬅️ ', req.method, req.path, req.body ?? req.query);

    next();
  });

  app.get('/', (req: Request, res: Response) => {
  res.send('Hello from backend');
  });

  app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
  app.use(express.json()); 

  dotenv.config();

  const port = process.env.PORT || 8080;

  app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
    }),
  );

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

void main();