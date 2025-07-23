import jwt from 'jsonwebtoken'
import { User } from '../Models/User.js'
 export const isAuthenticated=async (req,res, next)=>{
    const token=req.header('Auth')
    if(!token) return res.json({message:'Login First' , Success:false})
        const decoded =jwt.verify(token,process.env.KEY)
    const id=decoded.userId;
    let user=await User.findById(id);
    if(!user) return res.json({message:"User not found"});
    req.user=user;
    next();
 }