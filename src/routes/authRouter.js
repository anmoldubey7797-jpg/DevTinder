import express from "express";
const authRouter=express();
import authUser from "../middlewares/auth.middleware.js";

import validateSignUp from "../utils/validation.js";
import  {User}  from "../models/user.models.js";
import bcrypt from "bcrypt";


authRouter.post("/signup",async(req,res)=>{
    
    try{

    await validateSignUp(req);
    
    const {firstName,lastName,email,password}=req.body

    if(!firstName ||!lastName ||!email||!password){
        throw new Error("Please complete your details first")
    }

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


authRouter.post("/login",async(req,res)=>{
  try{
    const{email,password}=req.body;
    
    const user=await User.findOne({email:email});
 
    if(!user){
       throw new Error("user is not present here")
    }
    const isPasswordValid=await user.isPasswordValidate(password)
 
    if(isPasswordValid){
 
       const token=await user.validatetoken()
       console.log(token);
       res.cookie("token",token)
       res.send("Login successfully")
 
       console.log(isPasswordValid)
      
    }
    else{
       throw new Error("Something went wrong here")
    }

  }catch(error){
    res.status(404).json({message:"Not login successfully"})
  }
  })
 
  authRouter.post("/logout",async(req,res)=>{
    try{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    })
    
    res.status(200).json({message:"Logout successfully"})
}catch(error){
    res.status(401).send("Something went wrong in logout")
}
  })



export default authRouter;