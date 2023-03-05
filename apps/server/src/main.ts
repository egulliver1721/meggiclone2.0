// =========================== Importing modules =========================== //

import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc';
import { PrismaClient } from '../node_modules/.prisma/client';
import session from 'express-session';
import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

  // =========================== Config =========================== //
  // =========================== Express app =========================== //

  export const app: Application = express();

  // =========================== Prisma =========================== //
  const prisma = new PrismaClient();

  // =========================== Environment variables =========================== //
  dotenv.config();

  // =========================== Port =========================== //
  const port = process.env.PORT || 8080;

// =========================== Main function =========================== //
async function main() {
  // =========================== Middlewares =========================== //
  // =========================== Session =========================== //
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        sameSite: 'lax', // csrf
        secure: process.env.NODE_ENV === 'production', // cookie only works in https
      },
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  // =========================== CORS =============================== //
  app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
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
  // =========================== Passport =========================== //
  // =========================== Local strategy =========================== //
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!user) {
            return done(null, false, { message: 'Incorrect email' });
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return done(null, false, { message: 'Incorrect password' });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  // =========================== JWT strategy =========================== //
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET, // Updated with the environment variable
      },
      async (payload, done) => {
        try {
          const user = await prisma.user.findUnique({
            where: {
              id: payload.id,
            },
          });

          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      },
    ),
  );

  // =========================== Passport serialize =========================== //

  passport.serializeUser((user: any, done: any) => {
    console.log('serializing user with id:', user.id);

    done(null, user.id);
  });
  
  // =========================== Passport deserialize =========================== //
  passport.deserializeUser(async (id: any, callback) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
  
      callback(null, user);
    } catch (error) {
      callback(error, null);
    }
  });
  

  // =========================== Auth =========================== //
  // =========================== Generate JWT token =========================== //
  async function generateJwtToken(user: any) {
    console.log('Generating JWT token for user:', user);
    const token = await jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET || '',
      { expiresIn: '1d' },
    );
    console.log('Generated JWT token:', token);
    return token;
  }

  app.post('/login', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: Error, user: any, info: any) => {
      if (err) {
        console.error('Error during authentication:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (!user) {
        console.error('Invalid credentials:', info.message);
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      console.log('User logged in:', user);
      const token = generateJwtToken(req.user);
      return res.status(200).json({ token });
    })(req, res, next);
  });
  

  app.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Destructure email, password, firstName, and lastName from request body
      const { email, password, firstName, lastName } = req.body;
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user in database
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
        },
      });
  
      // Send success response
      res.status(201).json({ message: 'Your account has been created successfully' });
    } catch (error) {
      // Call next with error object to pass to error handling middleware
      next(error);
    }
  });

  // =========================== Logout =========================== //
  app.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        // handle error
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'You have been logged out successfully' });
      }
    });
  });

  // =========================== Error handler =========================== //
  app.use((err: Error, req: Request, res: Response, _next: any) => {
    console.error(err);
    res.status(500).send('Something broke!');
  });

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