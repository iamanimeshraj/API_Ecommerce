import express from 'express'
import { addProduct, deleteProductbyId, getAllProducts, getSpecificProduct, updateProductbyid } from '../Controllers/product.js';

const router= express.Router();
//@api - api/product/addProduct
//add product
router.post('/addProduct',addProduct )
//@api - api/product/fetchProducts
//Fetch all products
router.get('/fetchProducts',getAllProducts )
//@api - api/product/id
//Fetch specific product
router.get('/:id',getSpecificProduct)
//@api - api/product/id
//Update product by id
router.put('/:id',updateProductbyid)
//@api - api/product/id
//delete product by id
router.delete('/:id',deleteProductbyId)

export default router;