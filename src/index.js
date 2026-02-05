import express from "express";
import mongoose from "mongoose";
import {User} from "./models/user.models.js"
import connectDB from "./config/database.js";
 const app=express();


 app.post("/signup",(req,res)=>{
    const user=new User({
        firstName:"Kamal",
        lastName:"Kumar",
        email:"kamal@gmail.com",
        password:"kamal@123"
    })

    user.save();
    res.send("User added Successfully")
 })

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


