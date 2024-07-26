const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addToCart = new Schema({
   productId : {
        ref : 'product',
        type : String,
   },
   quantity : {
        type  : Number,
   },
   userId : {
        type  : String,
   }
},{
    timestamps : true
})


const addToCartModel = mongoose.model("addToCart",addToCart)

module.exports = addToCartModel;


// const mongoose = require('mongoose');

// const cartProductSchema = new mongoose.Schema({
//     productId: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'product', 
//         required: true 
//     },
//     userId: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'user', 
//         required: true 
//     },
//     quantity: { 
//         type: Number, 
//         required: true 
//     }
// }, {
//     timestamps: true
// });

// const cartProductModel = mongoose.model('cartProduct', cartProductSchema);

// module.exports = cartProductModel;

