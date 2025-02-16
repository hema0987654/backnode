const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
app.use(express.json())
app.use(cors())

const {connectDB} = require('./config/connectDB')
require('dotenv').config()


connectDB()


mongoose.connection.once('open',()=>{
    console.log("database is connect .........");
    app.listen(process.env.PORT,()=>{
        console.log("server is connect....");
    })
})
mongoose.connection.on('error',()=>{
    console.log("database is not connect.....");
    
})
module.exports = {app}
