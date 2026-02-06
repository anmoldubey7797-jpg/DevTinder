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

export default validateSignUp;