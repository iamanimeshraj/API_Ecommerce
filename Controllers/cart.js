import { Cart } from "../Models/Cart.js";

//add to cart
export const addToCart= async (req,res)=>{
    const {productId, title,price,qty,image}=req.body;
    const userId =req.user;

    let cart = await Cart.findOne({userId});
    if (!cart){
        cart= new Cart({userId, items:[]});
    }
    const itemIndex= cart.items.findIndex(
        (item)=>item.productId.toString()==productId
    )
    if(itemIndex>-1){
        cart.items[itemIndex].qty +=qty;
        cart.items[itemIndex].totalprice = cart.items[itemIndex].price * cart.items[itemIndex].qty;

    }else{
        cart.items.push({productId, title,price,totalprice:price*qty,qty,image})
    }

    await cart.save();
    res.json({message:"Item Added to Cart", cart, success:true})

}
//user cart
export const userCart = async (req,res)=>{
    const userId= req.user;
    const cart=await Cart.findOne({userId});
    if(!cart){
       return res.json({message:"No Cart Available", success:false})
    }
    res.json({message:'User Cart', cart, success:true})
}
// remove product from cart
export const removeProductFromCart= async (req, res)=>{
    const {productId}= req.body
    const userId= req.user

    let cart =await Cart.findOne({userId});
    if(!cart){
        return res.json ({message:"Cart Not Found"})
    }
    const initialLength = cart.items.length;
    cart.items= cart.items.filter((item)=>item.productId.toString() !== productId)
    
    if (cart.items.length === initialLength) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }
    await cart.save()
    res.json({message:"Item remove from the cart"})
}

//clear cart
export const removeAllproduct= async (req, res)=>{
    const userId=req.user
    let cart =await Cart.findOne({userId})
    if(!cart){
        cart= new Cart({items:[]});
    }else{
        cart.items=[]
    }
    await cart.save()

    res.json ({message:"Removed all items"})
}
//decrease Item from cart
export const decreaseProductqty= async (req, res)=>{
        const {productId, qty}=req.body;
    const userId =req.user;

    let cart = await Cart.findOne({userId});
    if (!cart){
        cart= new Cart({userId, items:[]});
    }
    const itemIndex= cart.items.findIndex(
        (item)=>item.productId.toString()==productId
    )
    if(itemIndex>-1){
    const item = cart.items[itemIndex];
       if(item.qty>qty){
        item.qty -=qty
        item.totalprice = item.price * item.qty;
       }else{
        cart.items.splice(itemIndex,1)
       }
    }else{
        return res.json({message:"Invalid Product id"})
    }

    await cart.save();
    res.json({message:"Item qty decreased", cart, success:true})

}
// ✅ Increase Item from Cart
export const increaseProductqty = async (req, res) => {
  const { productId, qty } = req.body;
  const userId = req.user;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({ message: "Cart not found", success: false });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      const item = cart.items[itemIndex];
      item.qty += qty;
      item.totalprice = item.price * item.qty;
    } else {
      return res.json({ message: "Invalid Product ID", success: false });
    }

    await cart.save();
    res.json({ message: "Item quantity increased", cart, success: true });

  } catch (err) {
    console.error("Error increasing quantity:", err);
    res.status(500).json({ message: "Server Error", success: false });
  }
};
