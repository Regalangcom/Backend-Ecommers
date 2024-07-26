const orderModel = require("../../models/orderModel")
const userModel = require("../../models/userModel")


const allordersControlers = async ( req , res ) => {


    const userId = req.userId;


    const user = await userModel.findById(userId)




    if (user.role !== "ADMIN") {
        return res.status(403).json({ 
            message : " not access "
        })
    }
    
    const AllOrders = await orderModel.find().sort({ createdAt: -1 })

    return res.status(200).json({
        data : AllOrders,
        message : "all orders found"
    })



}


module.exports = allordersControlers