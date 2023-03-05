import { Request, Response } from 'express';
import { Strategy as LocalStrategy, Strategy } from 'passport-local';
import { PrismaClient } from '../../node_modules/.prisma/client';
import bcrypt from 'bcrypt';
import passport from 'passport';

const prisma = new PrismaClient();

const localSignup: Strategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      const { email, firstName, lastName } = req.body;

      // Check if the email address is already in use
      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return done(null, false, { message: 'That email address is already in use' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
        },
      });

      return done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  }
);

passport.use('local-signup', localSignup);



passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

interface User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}


passport.serializeUser((done: any, user: any) => {
    done(null, user.id);
});

const signup = async (req: Request, res: Response) => {
  passport.authenticate('local-signup', (error: any, user: any) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ message: 'An error occurred while creating your account' });
    }

    if (!user) {
      return res.status(400).send({ message: 'Invalid signup information' });
    }

    return res.status(201).send({ message: 'Your account has been created successfully' });
  })(req, res);
};

export default signup;
