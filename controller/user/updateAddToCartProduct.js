const addToCartModel = require("../../models/cartProduct")

const updateAddToCartProduct = async(req,res)=>{
    try{
        // const currentUserId = req.userId 
        const addToCartProductId = req?.body?._id

        const qty = req.body.quantity

        const updateProduct = await addToCartModel.updateOne({_id : addToCartProductId},{
            ...(qty && {quantity : qty})
        })

        res.json({
            message : "Product Updated",
            data : updateProduct,
            error : false,
            success : true
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = updateAddToCartProduct

// const addToCartModel = require("../../models/cartProduct");

// const updateAddToCartProduct = async (req, res) => {
//     try {
//         const { _id, quantity } = req.body;

//         // Validasi input
//         if (!_id || quantity == null) {
//             throw new Error("Missing required fields: _id or quantity");
//         }

//         const cartProduct = await addToCartModel.fin
//         if (!cartProduct) {
//             throw new Error("Cart product not found");
//         }

//         // Perbarui quantity
//         cartProduct.quantity = quantity;
//         const updatedCartProduct = await cartProduct.save();

//         res.json({
//             message: "Cart product updated successfully",
//             data: updatedCartProduct,
//             error: false,
//             success: true
//         });
//     } catch (err) {
//         res.status(400).json({
//             message: err.message || err,
//             error: true,
//             success: false
//         });
//     }
// };

// module.exports = updateAddToCartProduct;





// const addToCartModel = require("../../models/cartProduct");

// const updateAddToCartProduct = async (req, res) => {
//     try {
//         const { _id, quantity } = req.body;

//         // Validasi input
//         if (!_id || quantity == null) {
//             throw new Error("Missing required fields: _id or quantity");
//         }

//         // Update cart product
//         const updatedCartProduct = await addToCartModel.findOneAndUpdate(
//             { _id },
//             { quantity },
//             { new: true } // Untuk mengembalikan dokumen yang baru diperbarui
//         );

//         // Periksa apakah cart product ditemukan
//         if (!updatedCartProduct) {
//             throw new Error("Cart product not found");
//         }

//         res.json({
//             message: "Cart product updated successfully",
//             data: updatedCartProduct,
//             error: false,
//             success: true
//         });
//     } catch (err) {
//         res.status(400).json({
//             message: err.message || err,
//             error: true,
//             success: false
//         });
//     }
// };

// module.exports = updateAddToCartProduct;
