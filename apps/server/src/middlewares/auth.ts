import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { PrismaClient } from '../../node_modules/.prisma/client';

const prisma = new PrismaClient();

passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      async (username, password, done) => {
        try {
          // Find user by username
          const user = await prisma.user.findUnique({ where: { username } });
  
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
          done(error);
        }
      }
    )
  );
  
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  
  export default passport;
