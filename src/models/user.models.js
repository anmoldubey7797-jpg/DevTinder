import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

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

    userSchema.methods.isPasswordValidate=async function(userpassword){
        const user=this;
        const passwordhashed=this.password

        const ispasswordhasshed=await bcrypt.compare(userpassword,passwordhashed)

        return ispasswordhasshed
    }

export const User=mongoose.model("User",userSchema)