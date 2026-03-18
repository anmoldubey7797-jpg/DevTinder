import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setlastName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [error, setError] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user || res.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message || "Something Went Wrong");
    }
  };

  const signupFrom = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true });

      dispatch(addUser(res.data.data))
      navigate("/profile");
    }
    catch (error) {
      setError(error?.response?.data?.message || "Something Went Wrong");
    }
  }

  return (
    <div className="h-[500px] flex items-center justify-center bg-gray-100">

      <div className="w-[350px] bg-white p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-5">
          {isLoggedIn ? "Login" : "Sign Up"}
        </h2>

        {!isLoggedIn && (
          <>
            <div className="mb-3">
              {/* <label className="block text-sm mb-1">First Name</label> */}
              <input
                type="text"
                value={firstName}
                placeholder="Enter First Name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              {/* <label className="block text-sm mb-1">Last Name</label> */}
              <input
                type="text"
                value={lastName}
                placeholder="Enter Last Name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setlastName(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="mb-3">
          {/* <label className="block text-sm mb-1">Email</label> */}
          <input
            type="email"
            value={email}
            placeholder="Enter email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          {/* <label className="block text-sm mb-1">Password</label> */}
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <p className="text-red-500 text-sm mb-2">{error}</p>

        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          onClick={isLoggedIn ? handleLogin : signupFrom}
        >
          {isLoggedIn ? "Login" : "Sign Up"}
        </button>

        <p
          className="text-center mt-4 text-sm text-blue-500 cursor-pointer hover:underline"
          onClick={() => setIsLoggedIn((value) => !value)}
        >
          {isLoggedIn ? "New User? Sign Up Here" : "Already have an account? Login"}
        </p>

      </div>
    </div>
  )
}

export default Login