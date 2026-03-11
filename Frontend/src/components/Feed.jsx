// import axios from 'axios'
// import React from 'react'
// import { BASE_URL } from '../utils/constants'
// import { useDispatch, useSelector } from 'react-redux'
// import { addFeed } from '../utils/feedSlice'
// import { useEffect } from 'react'
// import UserCard from './userCard'

// const Feed = () => {
//   const feed=useSelector((store)=>store.feed);
//   const dispatch=useDispatch();
  
//   const getFeed=async()=>{
   
//   try{
//   const res=await axios.get(BASE_URL +"/feed",{withCredentials:true})
//   console.log("FEED API RESPONSE:", res.data);
//   dispatch(addFeed(res.data.data));
// }catch(error){
//   console.log(error)
// }
// }

// useEffect(()=>{
//   getFeed();
// },[])
//   return feed && (
//    <>
//    <UserCard user={feed[0]}/>
//    </>
//   )
// }

// export default Feed

import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./userCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      console.log("FEED API RESPONSE:", res.data);
     dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length === 0) {
    return <p className="text-center">No users in feed</p>;
  }

  return (
  <div className="flex flex-col items-center gap-4 mt-10 mb-32">
    {feed.map((user) => (
      <UserCard key={user._id} user={user} />
    ))}
  </div>
);
};

export default Feed;