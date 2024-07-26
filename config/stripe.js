// npm install --save stripe

const stripe = require("stripe")
// start 
const Stripe = stripe(process.env.STRIPE_SECRET_KEY)


module.exports = Stripe


