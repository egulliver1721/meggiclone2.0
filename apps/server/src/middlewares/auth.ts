import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { PrismaClient } from '../../node_modules/.prisma/client';

const prisma = new PrismaClient();

// Configure passport to use local strategy
passport.use(
    new LocalStrategy(
      {
        // Tell passport to look for email and password fields in request body
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          // Find user by email
          const user = await prisma.user.findUnique({ where: { email: email } });
  
          // If user not found, return error
          if (!user) {
            return done(null, false, { message: 'Invalid username or password' });
          }
  
          // Compare password hash with provided password
          const passwordsMatch = await bcrypt.compare(password, user.password);
  
          // If passwords don't match, return error
          if (!passwordsMatch) {
            return done(null, false, { message: 'Invalid username or password' });
          }
  
          // Login successful, return user object
          return done(null, user);
        } catch (error) {
          // If there's an error, call done with error object
          done(error);
        }
      }
    )
  );

// Configure passport to serialize user to session
passport.serializeUser((user: any, done) => {
  // Call done with null and user id to serialize user to session
  done(null, user.id);
});

// Configure passport to deserialize user from session
passport.deserializeUser(async (id: number, done) => {
  try {
    // Find user by id
    const user = await prisma.user.findUnique({ where: { id } });
    // Call done with null and user object to deserialize user from session
    done(null, user);
  } catch (error) {
    // If there's an error, call done with error object
    done(error);
  }
});

export default passport;
