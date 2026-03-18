import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addrequest } from '../utils/requestSlice'

const Requests = () => {
      const requests=useSelector((store)=>store.requests)
     const dispatch=useDispatch()

     const reviewrequest=async(status,_id)=>{
      try{
         const res=await axios.post(`${BASE_URL}/request/review/${status}/${_id}`,{},{withCredentials:true})

         console.log(res)
         dispatch(addrequest(requests.filter(r => r._id !== _id)));
      }
      catch(error){
        console.log(error.message)
      }
     }
      const requestProfile=async()=>{
         try{
         const res=await axios.get(BASE_URL+"/user/request/received",{withCredentials:true})
        const requestsData = Array.isArray(res.data.data)
                ? res.data.data
               : [];
              dispatch(addrequest(requestsData));
         }
         catch(error){
            console.log(error.message)
         }
    }

    useEffect(()=>{
      requestProfile();
    },[])

    if(!requests) return <h1>Loading....</h1>

    if (requests.length === 0)
    return <h1 className='text-4xl text-black py-20'>No Requests  Avilable Here 😄</h1>
  return (
    <div className="p-6 text-white flex flex-col items-center">
  <h1 className="text-2xl text-gray-800 font-bold mb-6 p-2">
    Request
  </h1>

  <div className="flex flex-col gap-4">
    {requests
       ?.filter(r => r.fromUserId)
    .map((r) => (
      <div
        key={r._id}
        className="flex justify-center w-[500px] gap-10 bg-gray-800 p-4 "
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
            {r.fromUserId.firstName} {r.fromUserId.lastName}
          </h2>

          <p className="text-sm text-gray-300">
            Age: {r.fromUserId.age}
          </p>

          <p className="text-sm text-gray-300 capitalize">
            Gender: {r.fromUserId.gender}
          </p>
        </div>
        <div className="flex gap-3 items-center">
  <button
    className="
      px-4 py-2 rounded-lg text-sm font-semibold
      bg-red-500 hover:bg-red-600
      transition duration-200
      active:scale-95
    "
     onClick={()=>reviewrequest("rejected",r._id)}
  >
    Reject
  </button>

  <button
    className="
      px-4 py-2 rounded-lg text-sm font-semibold
      bg-green-500 hover:bg-green-600
      transition duration-200
      active:scale-95
    "
    onClick={()=>reviewrequest("accepted",r._id)}
  >
    Accept
  </button>
</div>
      </div>
    ))}
  </div>
</div>
  )
}

export default Requests