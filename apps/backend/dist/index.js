"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _express = /*#__PURE__*/ _interopRequireDefault(require("express"));
const _stripe = require("stripe");
const _dotenv = /*#__PURE__*/ _interopRequireDefault(require("dotenv"));
const _cors = /*#__PURE__*/ _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
_dotenv.default.config();
// Create a new express app instance
const app = (0, _express.default)();
// Set port to 8080
const port = process.env.PORT || 8080;
// Create a new Stripe client
const stripe = new _stripe.Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_4eC39HqLyjWDarjtT1zdp7dc', {
    apiVersion: '2022-11-15'
});
// Allow cross-origin requests from localhost:5173
app.use((0, _cors.default)({
    origin: 'http://localhost:5173'
}));
// Parse JSON request bodies
app.use(_express.default.json());
app.get('/', (req, res)=>{
    res.send('Hello from backend');
});
// Create a checkout session
app.post('/create-checkout-session', async (req, res)=>{
    try {
        const { cartItems  } = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: [
                'card'
            ],
            line_items: cartItems.map((item)=>({
                    price_data: {
                        currency: 'aud',
                        product_data: {
                            name: item.itemName,
                            images: [
                                item.thumbnail
                            ]
                        },
                        unit_amount: item.price * 100
                    },
                    quantity: item.quantity
                })),
            mode: 'payment',
            success_url: 'http://localhost:5173/checkout/success',
            cancel_url: 'http://localhost:5173/checkout/cancel'
        });
        res.json({
            id: session.id
        });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({
            error: 'Failed to create checkout session'
        });
    }
});
app.listen(port, ()=>{
    console.log(`backend listening at http://localhost:${port}`);
});
