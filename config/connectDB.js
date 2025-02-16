const mongoose = require('mongoose')
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DATA_BASE)
    }catch(error){
        console.error("Error connecting to database:", error)
    }
}

module.exports = {connectDB}