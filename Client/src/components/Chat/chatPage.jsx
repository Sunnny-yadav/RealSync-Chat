import Messages from "./chatMessage/Messages";
import Chats from "./MyChats/Chats";
import Navbar from "./Navbar/Navbar";

export default function ChatPage() {
    return (
        <>
            <div className="bg-gray-700">
                <div>
                    <Navbar />
                </div>
                <div className="flex justify-between">
                    <Chats />
                    <Messages />
                </div>
            </div>
        </>
    )
}