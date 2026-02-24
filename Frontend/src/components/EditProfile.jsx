import React, { useState ,useEffect} from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const dispatch=useDispatch()

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setGender(user.gender || "");
    }
  }, [user]);

  if (!user) return null;


  const saveProfile=async()=>{
    try{
      const res=await axios.patch(BASE_URL +"/profile/edit",{
        firstName,
        lastName,
        age,
        gender
      },
        {withCredentials:true});
       
       dispatch(addUser(res.data.user || res.data))


    }
    catch(error){
       console.log(error.message)
    }
  }

  return (
    <div className="flex justify-center  gap-16">
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-96 bg-green-400 shadow-xl">
        <div className="card-body items-start">

          <h2 className="w-full text-center text-2xl text-gray-700 mb-4">
            Edit Profile
          </h2>

          {/* First Name */}
          <div className="w-full mb-2">
            <span className="block text-left text-sm text-gray-800 ">
              First Name
            </span>
            <input
              type="text"
              value={firstName}
              placeholder="Enter First Name"
              className="input input-warning w-full  bg-slate-400 text-white"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="w-full mb-3">
            <span className="block text-left text-sm text-gray-700 mb-1">
              Last Name
            </span>
            <input
              type="text"
              value={lastName}
              placeholder="Enter Last Name"
              className="input input-warning w-full  bg-slate-400 text-white"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Age */}
          <div className="w-full mb-3">
            <span className="block text-left text-sm text-gray-700 mb-1">
              Age
            </span>
            <input
              type="number"
              value={age}
              placeholder="Enter Age"
              className="input input-warning w-full  bg-slate-400 text-white"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          {/* Gender */}
          <div className="w-full mb-5">
            <span className="block text-left text-sm text-gray-700 mb-1">
              Gender
            </span>
            <input
              type="text"
              value={gender}
              placeholder="Gender"
              className="input input-warning w-full bg-slate-400 text-white"
              onChange={(e) => setGender(e.target.value)}
            />
          </div>

          <button className="btn btn-primary bg-blue-400 w-full" onClick={saveProfile}>
             Edit Save
          </button>

        </div>
      </div>
    </div>
     <UserCard  user={{firstName,lastName,age,gender, _id: user._id,}}/>
</div>
  );
};

export default EditProfile;
