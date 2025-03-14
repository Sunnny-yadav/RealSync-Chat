import { createContext, useContext, useState } from "react";
import { useUserContext } from "./auth.context";
import toast from "react-hot-toast";

const chatContext = createContext()

export const ChatProvider = ({children})=>{
  const [isSearchOpen, setIsSearchOpen] = useState(false);
    
    const [loading, setloading] = useState(false);
    const {Token} = useUserContext();
    const [userList, setuserList] = useState([]);
    const [chatList, setchatList] = useState([]);


    const insert_NewCreated_Chat = (chatObj)=>{
        setchatList((prevChats)=> [chatObj, ...prevChats])
    };

    const SearchRequestedUser = async (inputText)=>{
        setloading(true);
        try {
            const result = await fetch(`http://localhost:8000/api/v1/users/getUser?search=${inputText}`,{
                method: "GET",
                headers:{
                    Authorization:Token
                }
            });

            const response = await result.json();
            if(result.ok){
                setloading(false)
                setuserList(response.data)
            }else{
                setloading(false)
                toast.error(response.message)
                throw new Error("error in fetching list of user")
            }

        } catch (error) {
            console.error("Error in chatContext::SerachRequestedUser",error)
        }
    };

    const createChat = async (idObj)=>{
        const toastId = toast.loading("chat creation under progress")
        try {
            const result = await fetch("http://localhost:8000/api/v1/chats/createChat",{
                method:"POST",
                headers:{
                    Authorization:Token,
                    "Content-type":"application/json"
                },
                body:JSON.stringify(idObj)
            });
            const response = await result.json()
        
            if(result.ok){
                insert_NewCreated_Chat(response.data)
                toast.dismiss(toastId)
                setIsSearchOpen(false)
            }else{
            toast.error(response.message,{id:toastId})
            }
        } catch (error) {
            console.error("Error in chatContext::createChat::", error)
        }
    };

    const fetchchatList = async ()=>{
        try {
            const result = await fetch("http://localhost:8000/api/v1/chats/fetchchats",{
                method:"GET",
                headers:{
                    Authorization:Token 
                }
            }); 

            const response = await result.json()
            if(result.ok){
                setchatList(response.data)
            }else{
                throw new Error("request failed to fetch chats of current logged in user")
            }
        } catch (error) {
            console.error("chatContext:: createChat::",error)
        }
    }

    return(
        <>
            <chatContext.Provider value={{SearchRequestedUser,loading, userList, createChat, fetchchatList, chatList, isSearchOpen, setIsSearchOpen}}>
                {children}
            </chatContext.Provider>
        </>
    )
}


export const useChatContext = ()=>{
    return useContext(chatContext)
}