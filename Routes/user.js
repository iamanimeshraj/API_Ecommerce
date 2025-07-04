import express from 'express'
import { login, register } from '../Controllers/user.js';
const router =express.Router();
//@api  api/user/register
//register
router.post('/register', register)
//@api  api/user/login
//login
router.post('/login', login)


export default router;