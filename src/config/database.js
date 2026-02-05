import mongoose from "mongoose";

const connectDB=async()=>{
 await mongoose.connect("mongodb+srv://anmoldubey7797_db_user:Anmol99@cluster0.bderhuu.mongodb.net/DevTinder")
}

export default connectDB;