// // import stripe from config
// const Stripe = require("../../config/stripe")
// const userModel = require("../../models/userModel")

// const paymentController = async ( req , res ) => {

//     try {
//         const { cartItems } = req.body;

//         console.log("cartItems", cartItems);
        
//         // ambil id dari model userModel 
//         const user  = await userModel.findOne({ _id : req.userId })

//         const params = {
//             submit_type : 'pay',
//             mode : 'payment',
//             payment_method_types : ['card'],
//             billing_address_collection : 'auto',
//             shipping_options : [
//                 {
//                     shipping_rate : 'shr_1PRK3007Yu7klvkanPbayXem'
//                 }
//             ],
//             // id email akan di berikan langsung saat user login , berikan 
//             // pada sisi middleware
//             customer_email : user.email,
//             // metadata : {
//             //     userId : req.userId
//             // },

//             // lalu setelah kita memberikan id email, maka tahap selanjutnya ialah 
//             // memberikan informasi detail prpoduct  

//             line_items: cartItems.map(( item , index ) => {
//                 return {
//                     price_data : {
//                         currency : 'idr',
//                         product_data : {
//                             name : item.productId.productName,
//                             images : item.productId.productImage,
//                             metadata : {
//                                 product_id : item.productId._id
//                             }
//                         },
//                         unit_amount : item.productId.sellingPrice * 2000000,
//                     },
//                     adjustable_quantity :  {
//                         enabled : true,
//                         minimum : 1
//                     },
                    
//                     quantity : item.quantity
                     
//                 }
//             }),

//             // response data success or cancel
//             success_url : `${process.env.FRONTEND_URL}/success`,
//             cancel_url :  `${process.env.FRONTEND_URL}/cancel`

//         }

//         const session = await Stripe.checkout.sessions.create(params)

//         // console.log("cartItems:", cartItems);
//         console.log("user:", user);
//         console.log("Stripe params:", params);

//         res.status(303).json(session);

//     } catch (err) {
//         res.status(500).json({
//             message: err?.message || err,
//             error: true,
//             success: false
//         });
//     }
// }


// module.exports = paymentController;

// // Manfaat adjustable_quantity
// // Memungkinkan pengguna untuk menyesuaikan pesanan mereka sesuai kebutuhan mereka.
// // Mencegah masalah dengan kuantitas yang tidak valid atau kurang dari yang diharapkan.
// // Meningkatkan fleksibilitas dalam konfigurasi pembelian produk di aplikasi atau situs web Anda

// // Mengapa Kuantitas Penting?

// // Perhitungan Total Harga: Stripe menggunakan kuantitas untuk menghitung total harga pembayaran. Misalnya, jika seorang pelanggan memilih untuk membeli 2 unit produk A dan 3 unit produk B, Stripe akan menggunakan informasi kuantitas ini untuk menghitung subtotal dan total pembayaran.

// // Penyusunan Rincian Transaksi: Kuantitas membantu dalam menyusun rincian transaksi yang akurat. Ini termasuk menampilkan informasi produk kepada pelanggan, mencatat item yang dibeli, serta mengonfirmasi jumlah produk yang akan dikirim atau diantar.

// // Integrasi dengan Inventori dan Pengelolaan Persediaan: Informasi kuantitas juga penting untuk mengelola inventori dan persediaan produk. Dengan mengetahui jumlah produk yang dibeli, sistem dapat mengurangi stok yang tersedia dan mengelola proses pengiriman barang.



// // Note: 
// // pada saat   kita suhd membuat (lihat line 56 , 57) ingin melihat response  
const Stripe = require('../../config/stripe')
const userModel = require('../../models/userModel')

const paymentController = async(req,res)=>{
    try {
        const { cartItems } = req.body

        console.log("cartitems: " , cartItems);

        const user = await userModel.findOne({ _id : req.userId })

        const params = {
            submit_type : 'pay',
            mode : "payment",
            payment_method_types : ['card'],
            billing_address_collection : 'auto',
            shipping_options : [
                {
                    shipping_rate : 'shr_1PRK3007Yu7klvkanPbayXem'
                }
            ],
            customer_email : user.email,
            metadata : {
                userId : req.userId
            },
            line_items : cartItems.map((item,index)=>{
                return{
                    price_data : {
                      currency : 'idr',
                      product_data : {
                        name : item.productId.productName,
                        images : item.productId.productImage,
                        metadata : {
                            productId : item.productId._id
                        },
                    },
                      unit_amount : item.productId.sellingPrice * 100
                    },
                    adjustable_quantity : {
                        enabled : true,
                        minimum : 1
                    },
                    quantity : item.quantity
                }
            }),
            success_url : `${process.env.FRONTEND_URL}/success`,
            cancel_url  : `${process.env.FRONTEND_URL}/cancel`,
           
        }

        const session = await Stripe.checkout.sessions.create(params);

        // console.log(session);
        console.log("user:", user);
        console.log("Stripe params:", params);


        // res.redirect(303, session.url);
        res.status(200).json(session)
        // res.status(303).json( { session } )
        // res.status(200).json({ id: session.id, url: session.url });

    } catch (error) {
        res.json({
            message : error?.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = paymentController