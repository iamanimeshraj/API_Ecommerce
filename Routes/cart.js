import express from 'express'
import { addToCart, decreaseProductqty, increaseProductqty, removeAllproduct, removeProductFromCart, userCart } from '../Controllers/cart.js';
import { isAuthenticated } from '../Middlewares/Auth.js';
const router=express.Router();

//add to cart
//@api- api/cart/add
router.post('/add',isAuthenticated, addToCart)

//view user cart
//@api- api/cart/viewcart
router.get('/viewcart', isAuthenticated, userCart)

//remove froduct from cart

router.delete('/removeproduct',isAuthenticated, removeProductFromCart)

//clear cart
router.delete('/clearcart', isAuthenticated,removeAllproduct)

//decrease qty
router.post('/-qty',isAuthenticated, decreaseProductqty)

//increase qty
router.post('/incqty',isAuthenticated, increaseProductqty)


export default router;
