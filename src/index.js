import express, { response } from "express";
import mongoose from "mongoose";
import {User} from "./models/user.models.js"
import connectDB from "./config/database.js";
 const app=express();
 app.use(express.json())


 app.post("/signup",async(req,res)=>{
    
    try{
    const user=new User(req.body)
    await user.save();
     return res.status(201).json({success:true,message:"User Added successfully",data:user})
    }
    catch(error){
      return   res.status(404).send("Error has been found",error.message)
    }
   
 })

 app.get("/user",async(req,res)=>{
    const userEmail=req.body.email;
    try{
      const user=await User.find({email:userEmail})

    
      if(user.length===0){
       return  res.status(404).json({message:"User Not found"})
      }
      else{
        // res.send(user)
      return res.status(200).json({success:true,data:user})
      } 
    }
    catch(error){
        res.status(404).send("Error hai bhai")
    }
 })

 app.get("/form",async(req,res)=>{
    try{
       const users=await User.find({});
       console.log(users)
       res.status(200).json({success:true,message:"All clear",data:users})
      
    }
    catch(error){
        res.status(404).send("Something went wrong")
    }
 })
 app.get("/form1",async(req,res)=>{
    try{
       const userEmail=req.body.email;
       const users=await User.findOne({email:userEmail});
       console.log(users)
       if(!users){
       res.status(404).json({success:false,message:"All not Clear",data:users})
       } 
       else{
        res.status(200).json({success:true,message:"All clear Bro"})
        
       }
    }
    catch(error){
        res.status(404).send("Something went wrong",error.message)
    }
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


