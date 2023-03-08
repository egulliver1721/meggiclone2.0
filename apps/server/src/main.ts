// =========================== Importing modules =========================== //

import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc';
// @ts-ignore
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
            return done(null, false);
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      },
    ),
  );

  // =========================== JWT strategy =========================== //
  // Initialize JWT options
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || '',
  };

  passport.use(
    new JwtStrategy(
      jwtOptions,
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

  app.use(passport.initialize());
  app.use(passport.session());

  // =========================== Passport serialize =========================== //

  passport.serializeUser((user: any, done: any) => {
    console.log('serializing user with id:', user.id);

    done(null, user.id);
  });
  
  // =========================== Passport deserialize =========================== //
  passport.deserializeUser(async (id: any, done: any) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
  
      if (!user) {
        return done(null, false);
      }
  
      done(null, user);
    } catch (error) {
      done(error, null);
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

  // =========================== Login =========================== //

  const requireAuth = passport.authenticate('jwt', { session: false });

  app.post('/login', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, (err: any, user: { id: any; email: any; }, info: { message: any; }) => {
      if (err) {
        console.error('Error during authentication:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      if (!user) {
        console.error('Invalid credentials:', info.message);
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        jwtOptions.secretOrKey,
        { expiresIn: '1d' },
      );

      // Send success response with JWT token
      res.status(200).json({ token });
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


  app.get('/profile', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
    // Get user from request object
    const user = req.user as any;
    // Find user in database by ID
    const userProfile = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });} catch (error) {
      // Call next with error object to pass to error handling middleware
      next(error);
      }
    });


  // =========================== Logout =========================== //
  app.post('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
      // delete cookie
      res.clearCookie('token');
    });
  });

  // =========================== Products =========================== //
  // products 
  app.get('/products', async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Find all products in database
      const products = await prisma.product.findMany();
      
      // Send response with products data
      res.status(200).json(products);
    } catch (error) {
      // Call next with error object to pass to error handling middleware
      next(error);
    }
  });

  // user information
  // Update user information
  app.put('/user/:userId', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const { firstName, lastName, shippingAddress, mobileNumber } = req.body;
      
      const updatedUser = await prisma.user.update({
        where: {
          id: Number(userId),
        },
        data: {
          firstName,
          lastName,
        },
      });

      res.status(200).json({ message: 'User information updated successfully', user: updatedUser });
    } catch (error) {
      next(error);
    }
  });

  // Delete user account
  app.delete('/user/:userId', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;

      const deletedUser = await prisma.user.delete({
        where: {
          id: Number(userId),
        },
      });

      res.status(200).json({ message: 'User account deleted successfully', user: deletedUser });
    } catch (error) {
      next(error);
    }
  });

  // get user information
  app.get('/user/:userId', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;

      const user = await prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      });

      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  });

  // =========================== Stripe =========================== //

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