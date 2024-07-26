const mongoose = require('mongoose')
const Schema = mongoose.Schema


const productSchema =  new Schema({
    productName : {
        type : String,
    },
    brandName  : {
        type : String 
    },
    category : {
        type  : String,
    },
    productImage : [],
    description : {
        type : String
    },
    price : {
       type  : Number,

    },
    sellingPrice : {
       type  : Number

    }
},{
    timestamps : true
})


const productModel = mongoose.model("product",productSchema)

module.exports = productModel