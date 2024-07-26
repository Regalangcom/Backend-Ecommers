const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name : String,
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type :   String,
    }, 
    profilePic : {
        type : String,
    },
    role : {
        type : String,
    },
    refresh_Token: {
        type: String,
        required: false,
    },    
},{
    timestamps : true
})


const userModel =  mongoose.model("user",userSchema)


module.exports = userModel