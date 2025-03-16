import React, { useState } from "react";
import Messages from "./chatMessage/Messages";
import Chats from "./MyChats/Chats";
import Navbar from "./Navbar/Navbar";
import { ChevronRight } from "lucide-react";

export default function ChatPage() {
    const [showChatList, setShowChatList] = useState(false);
    
    // Function to handle chat selection on mobile
    const handleChatSelected = () => {
        setShowChatList(false);
    };
    
    return (
        <>
            <div className="bg-gray-700 min-h-screen flex flex-col">
                <Navbar setShowChatList={setShowChatList} showChatList={showChatList} />
                
                {/* Added gap-2 md:gap-4 to create spacing between components */}
                <div className="flex flex-1 relative gap-2 md:gap-4 p-2">
                    {/* Mobile toggle button for showing Chats (visible only on mobile) */}
                    {!showChatList && (
                        <button 
                            onClick={() => setShowChatList(true)}
                            className="absolute z-10 top-4 left-4 bg-gray-800 p-2 rounded-full md:hidden"
                        >
                            <ChevronRight className="h-5 w-5 text-green-400" />
                        </button>
                    )}
                    
                    {/* Chats component - hidden by default on mobile */}
                    <div className={`
                        ${showChatList ? 'block' : 'hidden'}
                        md:block w-full md:w-1/3 h-[88vh]
                    `}>
                        <Chats onChatSelected={handleChatSelected} />
                    </div>
                    
                    {/* Messages component - visible by default on mobile */}
                    <div className={`
                        ${showChatList ? 'hidden' : 'block'}
                        md:block w-full md:w-2/3 h-[88vh]
                    `}>
                        <Messages />
                    </div>
                </div>
            </div>
        </>
    );
}