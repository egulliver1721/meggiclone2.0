// =========================== Importing modules =========================== //

import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc';
import { PrismaClient } from '../node_modules/.prisma/client';
import authRouter from './routes/auth';
import signupRouter from './routes/signup';

// =========================== Main function =========================== //
  // =========================== Express app =========================== //

export const app: Application = express();

async function main() {
  // =========================== Middlewares =========================== //
  // =========================== CORS =============================== //
  app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
  // =========================== Body parser ======================= //
  app.use(express.urlencoded({ extended: true }));
  // =========================== JSON parser ====================== //
  app.use(express.json()); 

  // =========================== Logger =========================== //
  app.use((req, _res, next) => {
    // request logger
    console.log('⬅️ ', req.method, req.path, req.body ?? req.query);

    next();
  });

  // =========================== Routes =========================== //

  app.get('/', (req: Request, res: Response) => {
  res.send('Hello from backend');
  });

  app.use('/auth', authRouter);
  app.use('/signup', signupRouter);

  // =========================== Config =========================== //

  dotenv.config();

  const port = process.env.PORT || 8080;

  // =========================== Trpc =========================== //
  /* 
    TRPC middleware is mounted on /api/trpc path to avoid conflicts with other routes 
  */
  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      // router definition are imported from trpc.ts file
      router: appRouter,
      // !important: this is where you can pass in your context
      createContext: () => {
        return {
          req: Request,
          res: Response,
          prisma: new PrismaClient(),
        };
      }
    }),
  );

  // =========================== Server =========================== //
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

// =========================== Calling main function =========================== //

void main();