"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _express = /*#__PURE__*/ _interopRequireDefault(require("express"));
const _stripe = require("stripe");
const _dotenv = /*#__PURE__*/ _interopRequireDefault(require("dotenv"));
const _cors = /*#__PURE__*/ _interopRequireDefault(require("cors"));
const _express1 = /*#__PURE__*/ _interopRequireWildcard(require("@trpc/server/adapters/express"));
const _trpc = require("./trpc");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
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
    origin: 'http://localhost:5173',
    credentials: true
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
// trpc middleware
app.use('/api/trpc', _express1.createExpressMiddleware({
    router: _trpc.appRouter,
    createContext: _trpc.createContext
}));
// start app
app.listen(port, ()=>{
    console.log(`🚀 Server listening on port http://localhost:${process.env.PORT}`);
});
