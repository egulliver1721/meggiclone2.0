// Set port to 8080
const port = process.env.PORT || 8080;
// Create a new Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_4eC39HqLyjWDarjtT1zdp7dc', {
  apiVersion: '2022-11-15',
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