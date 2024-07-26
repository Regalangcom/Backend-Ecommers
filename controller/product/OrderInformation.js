const OrderInformation = require("../../models/orderlistProduct")
const  addToCartModel  = require("../../models/cartProduct")



const ConfirmInformationProduct =  async ( req , res ) => {





     const orderinformationResult = await addToCartModel.find()


    const {
        shippingAddress,
        city,
        country,
        phone,
        totalPrice,
        user
    } = req.body



    const ValuedOrderInformation = new OrderInformation({ OrderItems : orderinformationResult,
                                                          shippingAddress,
                                                          city,
                                                          country,
                                                          phone,
                                                          totalPrice,
                                                          user 
                                                        })


    try {
        const SaveInformationProductUsers = await ValuedOrderInformation.save();
        return res.status(200).json({ 
            message : "information users Orders saved successfully",
            success : true,
            error : false,
            data : [ SaveInformationProductUsers ]
        })
    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = ConfirmInformationProduct; 
