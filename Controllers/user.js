import { User } from "../Models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
//register
export const register =async (req, res)=> {
    const {name,email,password} =req.body;
    if (name == "" || email == "" || password == "")
        return res.json({ message: "All fields are Required", Success: false });

    let user =await User.findOne({email});
    if (user) return res.json({message:"User Already Exist" ,success:false});
    
    const hashpassword = await bcrypt.hash(password,10);
    user= await User.create({
        name,
        email,
        password:hashpassword
    })
    res.json ({message:"User created Successfully" ,success:true});
};
//login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required", Success: false });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User does not exist", Success: false });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid password", Success: false });
  }

  const token = jwt.sign({ userId: user._id }, process.env.KEY, { expiresIn: "1d" });

  return res.status(200).json({ message: `Welcome ${user.name}`, token, Success: true });
};

//get all users
export const users=async (req, res)=>{
    try {
        let users= await User.find().sort({createdAt:-1})
        res.json ({message:"Fetched all users", users, success :true})
    } catch (error) {
        res.json (error.message)
    }
}

//get user profile

export const profile = async (req,res)=>{
    res.json({user: req.user})
}
