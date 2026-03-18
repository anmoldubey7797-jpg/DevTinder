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
  <div className="h-[500px] flex justify-center items-center gap-16 bg-gray-100">

    {/* Edit Form */}
    <div className="w-[350px] bg-white p-6 rounded-xl shadow-lg">

      <h2 className="text-2xl font-bold text-center mb-5">
        Edit Profile
      </h2>

      {/* First Name */}
      <div className="mb-3">
        <label className="block text-sm mb-1">First Name</label>
        <input
          type="text"
          value={firstName}
          placeholder="Enter First Name"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      {/* Last Name */}
      <div className="mb-3">
        <label className="block text-sm mb-1">Last Name</label>
        <input
          type="text"
          value={lastName}
          placeholder="Enter Last Name"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      {/* Age */}
      <div className="mb-3">
        <label className="block text-sm mb-1">Age</label>
        <input
          type="number"
          value={age}
          placeholder="Enter Age"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      {/* Gender */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Gender</label>
        <input
          type="text"
          value={gender}
          placeholder="Enter Gender"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setGender(e.target.value)}
        />
      </div>

      {/* Button */}
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        onClick={saveProfile}
      >
        Save Changes
      </button>

    </div>

    {/* Live Preview Card */}
    <UserCard user={{ firstName, lastName, age, gender, _id: user._id }} />

  </div>
);
};

export default EditProfile;
