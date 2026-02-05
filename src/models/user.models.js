import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        firstName:{
            type:String
        },
         lastName:{
            type:String
        },
         email:{
            type:String
        },
         password:{
            type:String
        },
    },
    {timestamps:true})

export const User=mongoose.model("User",userSchema)