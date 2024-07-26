const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const resetPassword = require("../controller/user/forgetPassword.js")
const paymentController = require('../controller/order/paymentControllers.js')
const Webhooks = require('../controller/order/webhook.js')
const orderController = require("../controller/order/orderControllers.js")
const orderAllController = require("../controller/order/orderAllControllers.js")
const orderSavedPDF = require("../controller/order/orderPdfSaved.js")


router.post("/signup",userSignUpController) /* oke */
router.post("/signin",userSignInController) /* oke */
router.get("/user-details",authToken,userDetailsController) /* oke */
router.get("/userLogout",userLogout) /* oke */
router.put("/resetPassword",resetPassword) /* oke guys */


//admin panel 
router.get("/all-user",authToken,allUsers) /* oke */
router.post("/update-user",authToken,updateUser) /* oke */


//product
router.post("/upload-product",authToken,UploadProductController) /* ok */
router.get("/get-product",getProductController) /* ok */
router.put("/update-product",authToken,updateProductController) /* ok */
router.get("/get-categoryProduct",getCategoryProduct) /* ok */
router.post("/category-product",getCategoryWiseProduct) /* ok */
router.post("/product-details",getProductDetails) /* ok */
router.get("/search",searchProduct) /* ok */
router.post("/filter-product",filterProductController) /* oke */



//user add to cart
router.post("/addtocart",authToken,addToCartController) /* oke */
router.get("/countAddToCartProduct",authToken,countAddToCartProduct) /* oke */
router.get("/view-card-product",authToken,addToCartViewProduct) /* oke */
router.put("/update-cart-product",authToken,updateAddToCartProduct) /* oke */
router.delete("/delete-cart-product",authToken,deleteAddToCartProduct) /* oke */



// paymet and order 
router.post("/create-checkout-session" ,  authToken , paymentController)
router.post("/webhooks" ,   Webhooks) /* api webhooks */
router.get("/order-list" , authToken  , orderController)
router.get("/allOrder" , authToken ,  orderAllController ) /* ok */
router.get("/orderSavedPDF/:orderId" , authToken ,  orderSavedPDF ) /* try again */





module.exports = router