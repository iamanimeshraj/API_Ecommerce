import { Product } from "../Models/Product.js";
// add Product
export const addProduct = async (req,res)=>{
    try{
        const product= await Product.create(req.body)
        res.json({message:"Product Added" , product, success:true})
    }catch (error) {
        res.json(error.message)
    }
}

//get all products
export const getAllProducts=async (req,res)=>{
    try {
    let product= await Product.find()
    if(!product) return res.json ({message:"No product found", success:false})
    res.json({message:"All products Fetched", product, success:true})
    } catch (error) {
        res.json(error.message)
    }
}
//get specific product
export const getSpecificProduct=async (req,res)=>{
    try {
        const id=req.params.id
        let product=await Product.findById(id)
        if(!product) return res.json({message:"Invalid id" ,success:false})
        res.json({message:"Product Fetched", product, success:true})
    } catch (error) {
        res.json(error.message)
    }
}

//update Product by id
export const updateProductbyid=async (req,res)=>{
    try {
        const id=req.params.id
        let product= await Product.findByIdAndUpdate(id,req.body,{new:true});
        if(!product) return res.json({message:"Invalid Product id", Success :false});
        
        res.json({message:"Product Updated", product, success:true})
    } catch (error) {
        res.json(error.message)
    }
}
//delete product by id
export const deleteProductbyId=async(req,res)=>{
    try {
        const id=req.params.id
        let product=await Product.findByIdAndDelete(id)
        if(!product) return res.json({message:"Invalid Product id", Success :false});
        res.json({message:"Product deleted Successfully", success:true})
    } catch (error) {
        res.json(error.message)
    }
}