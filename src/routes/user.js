import express from "express";
import authUser from "../middlewares/auth.middleware.js";
import { Connection } from "../models/connectionRequest.js";
import { set } from "mongoose";
import { User } from "../models/user.models.js";
const userRouter=express.Router();

userRouter.get("/user/request/received",authUser,async(req,res)=>{
    try{
       const loggedInUser=req.user

       const connectionRequest=await Connection.find({
        toUserId:loggedInUser._id,
        status:"interested",
       }).populate("fromUserId","firstName lastName")

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

userRouter.get("/feed",authUser,async(req,res)=>{
    try{
      const loggedInUser=req.user;

      const connectionRequest=await Connection.find({
        $or:[
            {fromUserId:loggedInUser._id},
            {toUserId:loggedInUser._id},
        ]
      }).select("toUserId fromUserId")
      
      const hideUserFromFeed=new Set();
      connectionRequest.forEach((req=>{
       hideUserFromFeed.add(req.toUserId.toString()),
       hideUserFromFeed.add(req.fromUserId.toString())
      }))

      const users=await User.find({
        $and:[
          { _id: { $nin:Array.from(hideUserFromFeed)}},
          { _id:{$ne:loggedInUser._id}},
    ]
      })

      console.log(users)

      res.json({
        message:"Feed all user",
        data:users
      })
    }


    catch(error){
        res.status(400).json({
            message:"Feed connection is not formed",
            error:error.message
        })
    }
})
export default userRouter