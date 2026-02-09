import validator from "validator";
const validateSignUp=async(req)=>{
    const {firstName,lastName,email,password}=req.body;

    if(!firstName ||!lastName){
        throw new Error("User Name is not valid")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is weak")
    }
    else if(!validator.isEmail(email)){
        throw new Error("email is not valid")
    }
}

export const validateEditProfile=async(req)=>{
    const allowedDetailsEdit=["firstName","lastName","email","age","skills","gender"];

    const isEditallowed=Object.keys(req.body).every((field)=>allowedDetailsEdit.includes(field))

    return isEditallowed;
}

export default validateSignUp;