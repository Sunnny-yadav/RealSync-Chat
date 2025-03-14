import React, { useEffect } from "react";
import { useChatContext } from "../../../context/chat.context";
import { useUserContext } from "../../../context/auth.context";

function Chats() {

  const {fetchchatList, chatList} = useChatContext()
  const {userData} = useUserContext()


  useEffect(()=>{
    fetchchatList()
  },[])

  return (
    <div className="w-1/3 bg-gray-900 text-white h-[86vh] p-4 m-2 rounded-xl">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-green-400 mb-4">My Chats</h2>

      {/* Chat Cards (Scrollable) */}
      <div className="space-y-3 w-[95%] m-auto h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
  {chatList.map((chat, index) => {
    const chatUser = chat.users[0]._id !== userData._id ? chat.users[0] : chat.users[1];

    return (
      <div
        key={index}
        className="p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition flex items-center gap-3"
      >
        {/* User Avatar */}
        <img
          src={chatUser.avatar || "https://via.placeholder.com/40"}
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-green-500 object-cover"
        />

        {/* User Name & Latest Message */}
        <div>
          <h3 className="text-white font-medium">{chatUser.name}</h3>
          <p className="text-gray-400 text-sm truncate w-[200px]">
            {chat?.latestMessage?.content || "No recent messages"}
          </p>
        </div>
      </div>
    );
  })}
</div>

    </div>
  );
}

export default Chats;
