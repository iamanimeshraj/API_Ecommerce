import { Payment } from "../Models/Payment.js";
import Razorpay from 'razorpay'
import dotenv from 'dotenv'
dotenv.config()

const rajorpay = new Razorpay({
    key_id: process.env.RZP_kEY_ID, 
    key_secret: process.env.RZP_KEY_SECRET
})

export const checkout =async (req,res)=>{
    const{amount, cartItem, userShipping, userId}=req.body

const options = {
  amount: amount*100,  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  currency: "INR",
  receipt: `reciept_${Date.now}`
};
const order=await rajorpay.orders.create(options);
res.json({
    orderId:order.id,
    amount:amount,
     cartItem, 
     userShipping,
    userId,
    payStatus:"Created"
})
}

export const verify= async (req,res)=>{

    const {orderId,paymentId,signature,amount,orderedItems,userId,userShipping}= req.body

    let orderConfirm= await Payment.create({orderId,
        paymentId,
        signature,
        amount,
        orderedItems,
        userId,
        userShipping,
        payStatus:"Paid"
    })

     res.json({message:"Payment Successful", success:true,orderConfirm})
}