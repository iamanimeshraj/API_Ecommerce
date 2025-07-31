import express from 'express';
import { createOrder, getUserOrders, getOrderById } from '../Controllers/order.js';
import { isAuthenticated } from '../Middlewares/Auth.js';

const router = express.Router();

router.post('/create', createOrder);
router.get('/userorder',isAuthenticated, getUserOrders);
router.get('/:orderId', getOrderById);

export default router;
