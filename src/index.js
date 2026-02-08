import express, { response } from "express";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";

 const app=express();

 app.use(express.json())
 app.use(cookieParser())

import authRouter from "../routes/authRouter.js";
import profileRouter from "../routes/profileRouter.js";

app.use("/",authRouter)
app.use("/",profileRouter)

 

connectDB()
.then(()=>{
   console.log("MongoDb Connect successfully")
   app.listen(8000,()=>{
    console.log("Thik hai Server ")
})
})
.catch((error)=>{
    console.log("Not totally Connected")
})


