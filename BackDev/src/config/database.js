import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const connectDB=async()=>{
    try{
 await mongoose.connect(process.env.MONGO_URL)
}catch(error){
    console.log("Error in connecting to MongoDB",error)
}


}

export default connectDB;