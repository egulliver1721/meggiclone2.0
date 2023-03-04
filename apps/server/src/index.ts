import express, { Application, Request, Response } from 'express';
import { Stripe } from "stripe";
import dotenv from 'dotenv';
import cors from 'cors';
import { initTRPC, inferAsyncReturnType } from '@trpc/server';
import { z } from 'zod';
import { PrismaClient } from '../node_modules/.prisma/client'

const prisma = new PrismaClient();

export const t = initTRPC.create();

const router = t.router;
const publicProcedure = t.procedure;
 
export const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query((req) => {
    req.input; // string
    return { id: req.input, name: 'Bilbo' };
  }),
  createUser: t.procedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (req) => {
      // prisma 
      return await prisma.user.create({
      });
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

dotenv.config();

// Create a new express app instance
const app: Application = express();
// Set port to 8080
const port = process.env.PORT || 8080;
// Create a new Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_4eC39HqLyjWDarjtT1zdp7dc', {
  apiVersion: '2022-11-15',
});

// Allow cross-origin requests from localhost:5173
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// Parse JSON request bodies
app.use(express.json()); 

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from backend');
});

// Create a checkout session
app.post('/create-checkout-session', async (req: Request, res: Response) => {
  try {
    const { cartItems } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map((item: any) => ({
        price_data: {
          currency: 'aud',
          product_data: {
            name: item.itemName,
            images: [item.thumbnail],
          },
          unit_amount: item.price * 100, // convert to cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:5173/checkout/success', // redirect URL after successful payment
      cancel_url: 'http://localhost:5173/checkout/cancel', // redirect URL after cancelled payment
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// start app
app.listen(port, () => {
  console.log(`🚀 Server listening on port http://localhost:${process.env.PORT}`);
});