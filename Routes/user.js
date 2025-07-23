import express from 'express'
import { login, profile, register, users } from '../Controllers/user.js';
import { isAuthenticated } from '../Middlewares/Auth.js';
const router =express.Router();
//@api  api/user/register
//register
router.post('/register', register)
//@api  api/user/login
//login
router.post('/login', login)
//@api api/user/fetchedusers
router.get('/fetchedusers', users)

//@api api/user/userprofile
router.get('/userprofile',isAuthenticated, profile )

export default router;