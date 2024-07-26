const orderModel = require("../../models/orderModel")



const orderControllers = async ( req , res ) => {
     try {
        const CurrentUserId = req.userId

        const OrderList = await orderModel.find({ userId : CurrentUserId }).sort({ createdAt : -1 })


        res.json({
            data : OrderList,
            success : true,
            error : false,
            message : "Order List"
        })

     } catch (error) {
        res.status(500).json({
            message: error?.message || error,
            error: true,
            success: false,
        })
     }
}

module.exports = orderControllers
