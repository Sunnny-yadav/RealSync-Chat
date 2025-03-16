import React, { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useChatContext } from "../../../context/chat.context";
import { useUserContext } from "../../../context/auth.context";

function Messages() {
  const { selectedChat, chatMessageList, sendChatMessage, istyping, typingIndicator } = useChatContext();
  const [message, setMessage] = useState("");
  const { userData } = useUserContext();
  const msgRef = useRef();

  const typingHandeller = (e)=>{
   setMessage(e.target.value);
   typingIndicator();
  }
  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  }, [chatMessageList]);

  // Check if selectedChat and users exist before accessing properties
  const userData_ToBeDisplayed =
    selectedChat?.users && selectedChat?.users.length > 1
      ? selectedChat.users[0]._id === userData._id
        ? selectedChat.users[1]
        : selectedChat.users[0]
      : null;

  return (
    <div className="bg-gray-900 text-white h-full w-full m-0 md:m-2 rounded-none md:rounded-xl flex flex-col overflow-hidden">
      {selectedChat && userData_ToBeDisplayed ? (
        <>
          {/* Header */}
          <div className="p-4 bg-gray-800 flex items-center gap-4 border-b border-gray-700 rounded-t-none md:rounded-t-xl">
            {/* Profile Image */}
            <img
              src={userData_ToBeDisplayed?.avatar || "/default-avatar.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-gray-600 flex-shrink-0"
            />
            
            {/* User Info */}
            <div className="flex flex-col min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-green-400 truncate">
                {userData_ToBeDisplayed?.name}
              </h2>
              <p className="text-gray-400 text-sm truncate">{userData_ToBeDisplayed?.email}</p>
            </div>
          </div>
          
          {/* Message Body */}
          <div ref={msgRef} className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 space-y-2">
            {chatMessageList?.length > 0 ? (
              chatMessageList.map((message) => {
                const isOwnMessage = message?.sender?._id === userData?._id;
                
                return (
                  <div key={message._id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-2`}>
                    <div
                      className={`max-w-[75%] px-4 py-2 rounded-lg ${
                        isOwnMessage ? "bg-green-500 text-white" : "bg-gray-700 text-white"
                      }`}
                    >
                      {/* Message Content */}
                      <p className="break-words">{message?.content}</p>
                      
                      {/* Timestamp */}
                      <span className="block text-xs text-gray-300 text-right mt-1">
                        {new Date(message?.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-gray-400 text-center">No messages yet.</div>
            )}
          </div>

          {/* typing indicator  */}
          {
            istyping ?    <div className="flex items-center gap-3 bg-gray-800 px-4 py-3 rounded-xl max-w-fit shadow-lg">
            <div className="w-2 h-2 bg-blue-300 rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-pink-300 rounded-full animate-ping delay-100"></div>
            <div className="w-2 h-2 bg-green-300 rounded-full animate-ping delay-200"></div>
          </div>:<div></div>
          }
          
          {/* Footer */}
          <div className="p-4 bg-gray-800 flex items-center gap-2 border-t border-gray-700 rounded-b-none md:rounded-b-xl">
            <input
              type="text"
              value={message}
              onChange={typingHandeller}
              placeholder="Type a message..."
              className="flex-1 p-2 bg-gray-700 text-white rounded-lg outline-none"
            />
            <button
              onClick={()=>{
                if (message.trim()) {
                  sendChatMessage({
                    content: message,
                    chatId: selectedChat._id
                  });
                  setMessage("");
                }
              }}
              className="bg-green-500 p-2 rounded-lg hover:bg-green-600 transition flex-shrink-0"
            >
              <FaPaperPlane size={18} />
            </button>
          </div>
        </>
      ) : (
        // Default Message if no chat is selected
        <div className="flex items-center font-semibold justify-center h-full text-gray-400 text-xl p-4 text-center">
          Click on a user to start chatting
        </div>
      )}
    </div>
  );
}

export default Messages;