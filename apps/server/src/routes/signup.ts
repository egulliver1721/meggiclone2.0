import express, { Request, Response, Router } from 'express';
import passport from '../middlewares/auth';

const router: Router = express.Router();

router.post('/signup', passport.authenticate('local'), (req: Request, res: Response) => {
    res.redirect('/');
});

export default router;