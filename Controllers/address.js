import { Address } from "../Models/Address.js";

export const addAddress= async (req, res)=>{
    let {fullname,address,city,state,country,pincode,phone}=req.body
    let userId=req.user
    let useraddress= await Address.create({userId,fullname,address,city,state,country,pincode,phone})
    res.json ({message:"Address Saved", useraddress, success:true})
}

export const getAddress= async (req,res)=>{
    let address = await Address.find({userId:req.user}).sort({createdAt:-1})
    res.json ({message:"Address", useraddress:address[0]})
}