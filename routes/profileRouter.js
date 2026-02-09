import express from "express";
const profileRouter=express.Router();
import authUser from "../src/middlewares/auth.middleware.js"
import {validateEditProfile} from "../src/utils/validation.js"

profileRouter.get("/profile/view",authUser,async(req,res)=>{
  res.status(200).json({
   success:true,
   user:req.user
  });
 })

 profileRouter.patch("/profile/edit",authUser,async(req,res)=>{
  try{
   if(!(await validateEditProfile(req))){
     throw new Error("Invalid Edit Request")
   }
   

   const loggedInUser = req.user;
   

    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();
    res.send("Edit profile route exists,use Patch to update")

  }
  catch(error){
    res.status(400).json({message:"Not find the profile Sorry User"})
  }
 })

export default profileRouter
