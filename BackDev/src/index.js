import express from "express";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


 const app=express();
 app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true
    }
 ))

 app.use(express.json())
 app.use(cookieParser())

import authRouter from "../src/routes/authRouter.js";
import profileRouter from "../src/routes/profileRouter.js";
import requestRouter from "../src/routes/request.js";
import userRouter from "./routes/user.js";


app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)

 

connectDB()
.then(()=>{
   console.log("MongoDb Connect successfully")
   app.listen(process.env.PORT,()=>{
    console.log("Thik hai Server ")
})
})
.catch((error)=>{
    console.log("Not totally Connected")
})


