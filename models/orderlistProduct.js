const mongoose = require("mongoose")
const Schema = mongoose.Schema




const OrderUserInformations = new Schema({
    OrderItems : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "addToCart",
        required : true,
        type : String,
    }],

    shippingAddress  : {
        type : String,
        required : true
    },
    city  : {
        type : String,
        required : true
    },
    country  : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        Required : true
    },
    totalPrice : {
        type : Number,
        required : true,
    },
    dateOrder : {
        type : Date,
        default : Date.now()
    },
    user : {
           type : mongoose.Types.ObjectId,
           ref : "user",
           required : true
    }

})




const OrderInformation = mongoose.model("orderinformation" , OrderUserInformations)

module.exports = OrderInformation