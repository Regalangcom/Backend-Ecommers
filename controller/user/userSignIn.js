const bcrypt = require('bcryptjs')
const userModel = require('../../models/userModel')
const jwt = require('jsonwebtoken');

const userSignInController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            };

            const tokenOption = {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            };

        
            const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1m' 
            });

          
            const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '1d' 
            });

          
            user.refreshToken = refreshToken;
            await user.save();

            
            res.cookie("token", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 1 * 60 * 1000
            } );
                

            // Set cookie refresh token
            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge:  24 * 60 * 60 * 1000
            });

            res.status(200).json({
                message: "Login successfully",
                data: {
                    accessToken,
                    refreshToken
                },
                success: true,
                error: false
            });
        } else {
            throw new Error("Please check Password");
        }
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = userSignInController;
