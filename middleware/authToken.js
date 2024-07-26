const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

async function authToken(req, res, next) {
    try {
        let token = req.cookies?.token;

        
        if (!token) {
            const refreshToken = req.cookies?.refresh_token;
            if (!refreshToken) {
                return res.status(401).json({
                    message: "Please Login...!",
                    error: true,
                    success: false
                });
            }

           
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async function (err, decoded) {
                if (err) {
                    return res.status(401).json({
                        message: "Invalid refresh token",
                        error: true,
                        success: false
                    });
                }

              
                const user = await userModel.findById(decoded._id);
                if (!user) {
                    return res.status(401).json({
                        message: "User not found",
                        error: true,
                        success: false
                    });
                }

               
                const newAccessToken = jwt.sign({ _id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '5s' 
                });

        
                res.cookie("token", newAccessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    maxAge: 5
                });

                req.userId = user._id;
                next();
            });

        } else {
            // Verifikasi access token
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
                if (err) {
                    return res.status(401).json({
                        message: "Invalid access token",
                        error: true,
                        success: false
                    });
                }

                req.userId = decoded._id;
                next();
            });
        }

    } catch (err) {
        res.status(401).json({
            message: err.message || "Unauthorized",
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
