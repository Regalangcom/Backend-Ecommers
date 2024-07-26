
const Stripe = require("../../config/stripe");
const orderModel = require('../../models/orderModel')
const addToCartModel = require('../../models/cartProduct')

const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOKS_SECRET;



async function getLIneItems(lineItems){
    let ProductItems = []

    /* create data untuk product yang di ambil dari array object lineItems */
    if(lineItems?.data?.length){
        for(const item of lineItems.data){
            const product = await Stripe.products.retrieve(item.price.product)
            const productId = product.metadata.productId

            const productData = {
                productId : productId,
                name : product.name,
                price : item.price.unit_amount / 100,
                quantity : item.quantity,
                image : product.images
            }
            ProductItems.push(productData)
        }
    }

    return ProductItems;
}




const Webhooks = async (req, res) => {
    const sig = req.headers['stripe-signature'];


    const payloadString = JSON.stringify(req.body)

    /* membuat header uji dari payload dan secret endpoint  */

    const header = Stripe.webhooks.generateTestHeaderString({
        payload : payloadString,
        secret : endpointSecret
    })

    let event;

    try {
        event = Stripe.webhooks.constructEvent( payloadString, header ,  endpointSecret);

    } catch (err) {
        console.error(`⚠️  Webhook signature verification failed.`, err.message);
        return res.status(400).json(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
              case 'checkout.session.completed':
        
                const sessionPayment = event.data.object;
        

                const lineItems = await Stripe.checkout.sessions.listLineItems(sessionPayment.id)


                const productDetails = await getLIneItems(lineItems)

                console.log( "product details " , productDetails);

                const orderDetails = {
                    productDetails : productDetails,
                    email : sessionPayment.customer_email,
                    userId : sessionPayment.metadata.userId,
                    paymentDetails : {
                       paymentId : sessionPayment.payment_intent,
                       payment_method_type : sessionPayment.payment_method_types,
                       payment_status : sessionPayment.payment_status,
                   },
                   shipping_options : sessionPayment.shipping_options.map(s => {
                       return {  
                           ...s,
                           shipping_amount : s.shipping_amount / 100
                       }
                   }),
                   totalAmount : sessionPayment.amount_total / 100
                 }

                 const order = new orderModel(orderDetails)
                 const saveOrder = await order.save()
        
                 if(saveOrder?._id){
                    const deleteCartItem = await addToCartModel.deleteMany({ userId : sessionPayment.metadata.userId })
                }
                // Then define and call a function to handle the event payment_intent.succeeded
                break;
              // ... handle other event types
              default:
                console.log(`Unhandled event type ${event.type}`);
            }
   
            // console.log("event " , event);


            res.status(200).send()
        };

module.exports = Webhooks;





