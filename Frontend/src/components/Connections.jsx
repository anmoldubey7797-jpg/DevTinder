import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import { Link } from 'react-router-dom'

const Connections = () => {
  const connections = useSelector((store) => store.connections) || [];
  const dispatch = useDispatch()

  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/connections",
        { withCredentials: true }
      )

      console.log("API DATA 👉", res.data.data)

      const connectionsData = Array.isArray(res.data.data)
        ? res.data.data
        : [];
      dispatch(addConnections(connectionsData));
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchConnections()
  }, [])

  if (!connections) return <h1>Loading...</h1>

  if (connections.length === 0)
    return <h1 className='text-4xl text-black'>No connection Found Please Make True Frendship 😄</h1>

  return (
    <div className=" min-h-screen p-6 text-white">
      <h1 className="text-2xl  text-gray-800 font-bold mb-6 p-2">
        Connections
      </h1>

      <div className="flex flex-col gap-4 ">
        {connections.map((c) => (
          <div
            key={c._id}
            className="flex justify-center w-[400px] gap-10 bg-gray-800 p-4"
          >
            {/* Dummy Image */}
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="profile"
              className="w-16 h-16 rounded-full"
            />

            {/* Details */}
            <div>
              <h2 className="font-semibold text-lg">
                {c.firstName} {c.lastName}
              </h2>

              <p className="text-sm text-gray-300">
                Age: {c.age}
              </p>

              <p className="text-sm text-gray-300 capitalize">
                Gender: {c.gender}
              </p>
            </div>
           <Link to={`/chat/${c._id}`}> <button className=" flex ml-auto bg-pink-400 text-white px-6 py-2 rounded hover:bg-yellow-300 transition-colors">
              Chat
            </button> </Link>
          </div>
        ))}
      </div>
    </div>

  );
}

export default Connections
