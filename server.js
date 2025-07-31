import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'express'
import {config} from 'dotenv'
import userRouter from './Routes/user.js'
import productRouter from './Routes/product.js'
import cartRouter from './Routes/cart.js'
import addressRouter from './Routes/address.js'
import paymentRouter from './Routes/payment.js'
import orderRouter from './Routes/order.js'
import collectionRouter from './Routes/collection.js'
import cors from 'cors'

const app = express();
app.use(bodyParser.json())
config({path:".env"})

app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))


mongoose.connect(process.env.MONGODB_URI,
    {dbName: "Ecommerce"}).then(()=>console.log("MongoDB Connected")).catch((error)=>console.log(error));

//HOME ROUTE
app.get('/', (req,res)=>{
    res.json({message:"Ecommerce Backend "});
})

//user route
app.use('/api/user', userRouter)
//product route
app.use('/api/product', productRouter)
//cart route
app.use('/api/cart',cartRouter)
//address route
app.use('/api/address', addressRouter)
//payment route
app.use('/api/payment', paymentRouter)
//order route
app.use('/api/order', orderRouter)
//order route
app.use('/api/collection', collectionRouter)

const port=process.env.PORT;

app.listen(port, ()=>console.log(`Server is running at port ${port}`))