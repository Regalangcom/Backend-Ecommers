const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');




const ForgotPassword = async( req , res ) => {

    const { email , newPassword , confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword ) {
        res.status(400).json({message : "can not be empty"})
        return;
    }


    if (newPassword != confirmPassword) {
        res.status(400).json({message : "password not match"})
        return;
    }



    try {
        const users = await userModel.
                                     findOne({ email }) 

        if (!users) {
            res.status(400).json({message : "user not found"})
            return;
        }
        

        const salt = await bcrypt.genSalt();
        const resetPassword = await bcrypt.hash(newPassword , salt)


        users.password = resetPassword;
        await users.save();


        res.status(200).json({ 
            message : "password reset successfully" , 
            data : resetPassword,
            success : true,
            error : false,
        })
        return; 

    } catch (error) {
        res.status(200).json({ 
            message : err.message || err ,
            success : false,
            error : true,
        })
    }
}


module.exports = ForgotPassword;