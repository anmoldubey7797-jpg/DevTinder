import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

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


    userSchema.methods.validatetoken=async function(){
        const user=this;
        const token=await jwt.sign({_id:user._id},"Anmoltinder99")

        return token;
    }

    userSchema.methods.isPasswordValidate=async function(userpassword){
        const user=this;
        const passwordhashed=this.password

        const ispasswordhasshed=await bcrypt.compare(userpassword,passwordhashed)

        return ispasswordhasshed
    }

export const User=mongoose.model("User",userSchema)