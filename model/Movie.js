const mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    categoryName:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true

    }
})
const Movieschr = mongoose.model('Movieschr',userSchema)
module.exports={Movieschr}