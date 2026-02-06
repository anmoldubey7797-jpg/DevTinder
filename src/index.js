import express, { response } from "express";
import mongoose from "mongoose";
import {User} from "./models/user.models.js"
import connectDB from "./config/database.js";
import validateSignUp from "./utils/validation.js";
import bcrypt from "bcrypt";

 const app=express();
 app.use(express.json())


 app.post("/signup",async(req,res)=>{
    
    try{

    await validateSignUp(req);
    
    const {firstName,lastName,email,password}=req.body

    const hassedpassword=await bcrypt.hash(password,10)

    const user=new User({
      firstName,lastName,email,password:hassedpassword
    })
    await user.save();
     return res.status(201).json({success:true,message:"User Added successfully",data:user})
    }
    catch(error){
      console.log(error)
      return   res.status(404).send("Error has been found"+ error.message)
    }
   
 })

 app.post("/login",async(req,res)=>{

   const{email,password}=req.body;
   
   const user=await User.findOne({email:email});

   if(!user){
      throw new Error("user is not present here")
   }
   const isPasswordValid=await bcrypt.compare(password,user.password);

   if(isPasswordValid){
      console.log(isPasswordValid)
      res.send("user login successfully")
   }
   else{
      throw new Error("Something went wrong here")
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
        res.status(404).send("Something went wrong"+error.message)
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


