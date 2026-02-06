import mongoose from "mongoose";
import validator from "validator"

const userSchema=new mongoose.Schema(
    {
        firstName:{
            type:String
        },
         lastName:{
            type:String
        },
         email:{
            type:String,
            required:true,
            validate(value) {
            if (!validator.isEmail(value)) {
             throw new Error("Invalid email");
           }
       }
        },
         password:{
            type:String
        },
    },
    {timestamps:true})

export const User=mongoose.model("User",userSchema)