import express from "express";
const profileRouter=express();
import authUser from "../src/middlewares/auth.middleware.js"

profileRouter.get("/profile",authUser,async(req,res)=>{
  res.status(200).json({
   success:true,
   user:req.user
  });
 })

export default profileRouter
