const mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
    }
})
const User = mongoose.model('User',userSchema)
module.exports={User}