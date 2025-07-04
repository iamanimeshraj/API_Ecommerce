import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'express'
import {config} from 'dotenv'
import userRouter from './Routes/user.js'
import productRouter from './Routes/product.js'
const app = express();
app.use(bodyParser.json())
config({path:".env"})

mongoose.connect(process.env.MONGODB_URI,
    {dbName: "Ecommerce"}).then(()=>console.log("MongoDB Connected")).catch((error)=>console.log(error));

//HOME ROUTE
app.get('/', (req,res)=>{
    res.json({message:"Home Route"});
})

//user route
app.use('/api/user', userRouter)
//product route
app.use('/api/product', productRouter)

const port=process.env.PORT;

app.listen(port, ()=>console.log(`Server is running at port ${port}`))