import  {User}  from "../models/user.models.js";
import jwt from "jsonwebtoken";
const authUser=async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        throw new Error("Token in not find")
    }

    const decodedMessage=await jwt.verify(token,"Anmoltinder99")

    const {_id}=decodedMessage;
    
    const user=await User.findById(_id)
    if(!user){
        throw new Error("user not found")
    }

    req.user=user;
    
    next();
}

export default authUser;