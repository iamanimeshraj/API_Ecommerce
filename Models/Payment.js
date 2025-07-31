import mongoose from "mongoose";

const paymentSchema= new mongoose.Schema({
    orderdate:{type:Date, default:Date.now},
    payStatus:{type:String, required:true}
},{strict:false})

export const Payment= mongoose.model('Payment',paymentSchema)