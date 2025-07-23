import express from 'express'
import { isAuthenticated } from '../Middlewares/Auth.js';
import { addAddress, getAddress } from '../Controllers/address.js';

const router =express.Router();

//add address
//@api api/address/addaddress
router.post('/addaddress',isAuthenticated,addAddress)

//add address
//@api api/address/getaddress
router.get('/getaddress',isAuthenticated,getAddress)

export default router;