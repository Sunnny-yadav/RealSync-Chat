import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./auth.context";
import toast from "react-hot-toast";

//below imports belong to socket.io
import io from 'socket.io-client'

const ENDPOINT = "http://localhost:8000";
let socket;

const chatContext = createContext()

export const ChatProvider = ({ children }) => {
    //below state variables are related directly to chat 
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [loading, setloading] = useState(false);
    const { Token } = useUserContext();
    const [userList, setuserList] = useState([]);
    const [chatList, setchatList] = useState([]);
    const [selectedChat, setselectedchat] = useState({});
    const [chatMessageList, setchatMessageList] = useState([])

    //below state variables are for socket
    const { userData } = useUserContext();
    const [socketConntected, setsocektConnected] = useState(false);
    const [typing, settyping] = useState(false);
    const [istyping, setIstyping] = useState(false);
    const [Notification, setNotification] = useState([])

    // below code is belonging to socket.io programming
    useEffect(() => {
        if (Object.keys(userData).length > 0) {
            socket = io(ENDPOINT);
            socket.emit("setUp", userData);
            socket.on("connected", () => setsocektConnected(true));
            socket.on("typing", () => setIstyping(true))
            socket.on("stop typing", () => setIstyping(false))
        }
    }, [userData])

    useEffect(() => {
        if (!socket) return

        socket.on("message received", (newMessgeReceivedObj) => {
            if (!selectedChat || selectedChat._id !== newMessgeReceivedObj.chat._id) {

                if (!Notification.includes(newMessgeReceivedObj)) {
                    console.log("Adding new notification");
                    setNotification((msg) => [newMessgeReceivedObj, ...msg]);
                }
            } else {
                
                setchatMessageList((prevMsg) => [...prevMsg, newMessgeReceivedObj])
            }
        })

        return () => {
            socket.off("message received");
          };
    });

    const typingIndicator = () => {
        if (!socketConntected) return

        if (!typing) {
            settyping(true)
            socket.emit("typing", selectedChat._id);
        }

        const lastTypingTime = new Date().getTime();
        const timerLength = 2000;
        setTimeout(() => {
            const currenttime = new Date().getTime();
            const timerDifference = currenttime - lastTypingTime;

            if (timerDifference >= timerLength && typing) {
                settyping(false);
                socket.emit("stop typing", selectedChat._id)
            }
        }, timerLength);
    }

    // below functions are just for performing certain task
    const insert_NewCreated_Chat = (chatObj) => {
        setchatList((prevChats) => [chatObj, ...prevChats])
    };


    const storeSelectedChat = (chatId) => {
        const chatData = chatList.find((chat) => chat._id === chatId);
        if (!chatData) {
            console.error("chatContext :: storeSelectedChat:: issue occured while fetching the chatData")
            return
        };

        setselectedchat(chatData);

    }

    // below functions are the api calls 
    const SearchRequestedUser = async (inputText) => {
        setloading(true);
        try {
            const result = await fetch(`http://localhost:8000/api/v1/users/getUser?search=${inputText}`, {
                method: "GET",
                headers: {
                    Authorization: Token
                }
            });

            const response = await result.json();
            if (result.ok) {
                setloading(false)
                setuserList(response.data)
            } else {
                setloading(false)
                toast.error(response.message)
                throw new Error("error in fetching list of user")
            }

        } catch (error) {
            console.error("Error in chatContext::SerachRequestedUser", error)
        }
    };

    const createChat = async (idObj) => {
        const toastId = toast.loading("chat creation under progress")
        try {
            const result = await fetch("http://localhost:8000/api/v1/chats/createChat", {
                method: "POST",
                headers: {
                    Authorization: Token,
                    "Content-type": "application/json"
                },
                body: JSON.stringify(idObj)
            });
            const response = await result.json()

            if (result.ok) {
                insert_NewCreated_Chat(response.data)
                toast.dismiss(toastId)
                setIsSearchOpen(false)
            } else {
                toast.error(response.message, { id: toastId })
            }
        } catch (error) {
            console.error("Error in chatContext::createChat::", error)
        }
    };

    const fetchchatList = async () => {
        try {
            const result = await fetch("http://localhost:8000/api/v1/chats/fetchchats", {
                method: "GET",
                headers: {
                    Authorization: Token
                }
            });

            const response = await result.json()
            if (result.ok) {
                setchatList(response.data)
            } else {
                throw new Error("request failed to fetch chats of current logged in user")
            }
        } catch (error) {
            console.error("chatContext:: createChat::", error)
        }
    };

    const fetchChatMessage = async (chatId) => {

        try {
            const result = await fetch(`http://localhost:8000/api/v1/chats/${chatId}/getMessages`, {
                method: "GET",
                headers: {
                    Authorization: Token
                }
            });

            const response = await result.json()
            if (result.ok) {
                if (response?.data?.length > 0) {
                    setchatMessageList(response.data);
                } else {
                    setchatMessageList([])
                }
                socket.emit("join room", chatId)
            } else {
                toast.error(response.message)
                throw new Error("error occured while fetching the message")
            }

        } catch (error) {
            console.error("chatContext:: fetchChatmessage::", error)
        }
    };

    const sendChatMessage = async (chatObj) => {
        try {
            const result = await fetch(`http://localhost:8000/api/v1/chats/${chatObj.chatId}/sendMessage`, {
                method: "POST",
                headers: {
                    Authorization: Token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(chatObj)
            });

            const response = await result.json();

            if (result.ok) {
                socket.emit("new message", response.data)
                setchatMessageList((prevMsg) => [...prevMsg, response.data])
            } else {
                toast.error(response.message)
                throw new Error("sending msg failed")
            }
        } catch (error) {
            console.error("chatContext:: sendChatMessage::", error)
        }
    };



    return (
        <>
            <chatContext.Provider value={{
                SearchRequestedUser,
                loading, userList,
                createChat,
                fetchchatList,
                chatList,
                isSearchOpen,
                setIsSearchOpen,
                selectedChat,
                storeSelectedChat,
                setselectedchat,
                fetchChatMessage,
                chatMessageList,
                sendChatMessage,

                //variables of socekt 
                istyping,
                typingIndicator,
                Notification,
                setNotification
            }}>
                {children}
            </chatContext.Provider>
        </>
    )
}


export const useChatContext = () => {
    return useContext(chatContext)
}