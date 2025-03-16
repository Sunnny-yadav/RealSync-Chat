import React, { useEffect } from "react";
import { useChatContext } from "../../../context/chat.context";
import { useUserContext } from "../../../context/auth.context";
import { ChevronLeft } from "lucide-react";

function Chats({ onChatSelected }) {
  const { fetchchatList, chatList, storeSelectedChat, fetchChatMessage } = useChatContext();
  const { userData } = useUserContext();

  useEffect(() => {
    fetchchatList();
  }, []);

  const handleChatClick = (chatId) => {
    storeSelectedChat(chatId);
    fetchChatMessage(chatId);

    // Call the onChatSelected prop to handle mobile view switching
    if (onChatSelected) {
      onChatSelected();
    }
  };

  return (
    <div className="bg-gray-900 text-white h-full w-full p-4 m-0 md:m-2 rounded-none md:rounded-xl overflow-hidden flex flex-col">
      {/* Heading with back button for mobile */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-green-400">My Chats</h2>

        {/* Mobile back button - only visible on mobile */}
        <button
          onClick={onChatSelected}
          className="md:hidden bg-gray-800 p-2 rounded-full"
        >
          <ChevronLeft className="h-5 w-5 text-green-400" />
        </button>
      </div>

      {/* Chat Cards (Scrollable) */}
      <div className="flex-1 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {chatList.map((chat, index) => {
          const chatUser = chat.users[0]._id !== userData._id ? chat.users[0] : chat.users[1];

          return (
            <div
              key={index}
              onClick={() => handleChatClick(chat._id)}
              className="p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition flex items-center gap-3"
            >
              {/* User Avatar */}
              <img
                src={chatUser.avatar || "https://via.placeholder.com/40"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-green-500 object-cover flex-shrink-0"
              />

              {/* User Name & Latest Message */}
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-medium truncate">{chatUser.name}</h3>
                <div className="flex items-center gap-1 min-w-0">
                  <span className="text-sm whitespace-nowrap flex-shrink-0">
                    {chat?.latestMessage?.sender?.name && `${chat.latestMessage.sender.name}:`}
                  </span>
                  <p className="text-gray-400 text-sm truncate">
                    {chat?.latestMessage?.content || "No recent messages"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Chats;