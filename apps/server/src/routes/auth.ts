import express, { Request, Response, Router } from 'express';
import passport from '../middlewares/auth';
import { PrismaClient } from '../../node_modules/.prisma/client';

const prisma = new PrismaClient();
const router: Router = express.Router();

router.post('/login', passport.authenticate('local'), (req: Request, res: Response) => {
    res.redirect('/');
});

export default router;

