import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket.js";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";

const Chat = () => {

  const { targetUserId } = useParams();

  const user = useSelector((store) => store.user.user);

  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const fetchChatMessage= async()=>{
  const chat=await axios.get(BASE_URL+"/chat/"+targetUserId,{withCredentials:true})

  console.log(chat.data)

  const chatMessages=await chat?.data?.messages.map(msg=>{
    const {senderId,text}=msg;
    return {
      firstName:senderId?.firstName,
      userId:senderId?._id,
      text
    }
  });
  setMessages(chatMessages);
  };

  useEffect(()=>{
    fetchChatMessage();
  },[])
  useEffect(() => {

    if (!userId || !targetUserId) return;

    const newSocket = createSocketConnection();
    setSocket(newSocket);

    newSocket.on("connect", () => {

      console.log("Socket connected:", newSocket.id);

      newSocket.emit("joinchat", {
        firstName: user.firstName,
        userId,
        targetUserId
      });

    });

    newSocket.on("messageReceived", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => newSocket.disconnect();

  }, [userId, targetUserId]);

  const sendMessage = () => {

    if (!socket) return;

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage
    });

    setNewMessage("");
  };
  return (
    <div className="h-screen flex justify-center items-center bg-gray-400 overflow-hidden">

      <div className="w-[650px] h-[80vh] bg-white shadow-2xl rounded-2xl flex flex-col border">

        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between bg-gray-200 rounded-t-2xl">
          <h1 className="text-lg font-semibold text-gray-700">Chat</h1>
          <div className="text-sm text-gray-400">Online</div>
        </div>

        {/* Messages */}
       <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-green-100">

  {messages.map((msg, index) => {
    return (
      <div
        key={index}
       className={`chat ${msg.userId === userId ? "chat-end" : "chat-start"}`}
      >
        <div className="chat-header">
          {msg.firstName}
          <time className="text-xs opacity-50 ml-2">Just now</time>
        </div>

        <div className="chat-bubble">
          {msg.text}
        </div>

        <div className="chat-footer opacity-50">
          Seen
        </div>
      </div>
    );
  })}

</div>

        {/* Input */}
        <div className="p-4 border-t  flex items-center gap-3 rounded-b-2xl bg-slate-200">

          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none focus:border-violet-400 bg-slate-300"
          />

          <button onClick={sendMessage}
            className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-2 rounded-full transition">
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default Chat;