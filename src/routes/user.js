import express from "express";
import authUser from "../middlewares/auth.middleware.js";
import { Connection } from "../models/connectionRequest.js";
const userRouter=express.Router();

userRouter.get("/user/request/received",authUser,async(req,res)=>{
    try{
       const loggedInUser=req.user

       const connectionRequest=await Connection.find({
        toUserId:loggedInUser._id,
        status:"interested",
       }).populate("toUserId","firstName lastName")

       res.json({
        message:"Data fetch successfully",
        data:connectionRequest
       })
    }
    catch(error){
        res.status(400).json({
            message:"Error"+error.message
        })
    }
})

userRouter.get("/user/connections",authUser,async(req,res)=>{
    try{
     const loggedInUser=req.user;

     const connectionRequest=await Connection.find({
        $or:[
            {toUserId:loggedInUser._id,status:"accepted"},
            {fromUserId:loggedInUser._id,status:"accepted"},
        ],
     }).populate("fromUserId","firstName lastName")
     .populate("toUserId","firstName lastName")

    const data = connectionRequest.map((row) => {
    if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
    }
    return row.fromUserId;
});

     res.json({
        message:"User make Connection easily",
         data:data
    })
    }
    catch(error){
        res.json({message:"User Connection is not found"})
    }
})
export default userRouter