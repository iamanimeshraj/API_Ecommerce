import mongoose from "mongoose";

const addressSchema= new mongoose.Schema({
    userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
    fullname:{type:String , require:true},
    address:{type:String , require:true},
    city:{type:String , require:true},
    state:{type:String , require:true},
    country:{type:String , require:true},
    pincode:{type:Number , require:true},
    phone:{type:Number , require:true},
    createdAt:{type:Date, default:Date.now}
})

export const Address= mongoose.model("Address", addressSchema)