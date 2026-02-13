import mongoose from "mongoose";
import {User}  from "../models/user.models.js";

const connectionrequestSchema=new mongoose.Schema(
    {
        toUserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        } ,
        fromUserId:{
            type:mongoose.Schema.Types.ObjectId,
             ref:"User",
            required:true
        },
        status:{
            type:String,
            required:true,
            enum:{
               values:["ignored","interested","accepted","rejected"],
               message:`{VALUE} is not supported`
            }
        }
    },
    {timestamps:true})

connectionrequestSchema.index=({toUserId:1,fromUserId:1})

export const Connection=mongoose.model("Connection",connectionrequestSchema)