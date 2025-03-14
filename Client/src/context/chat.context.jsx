import { createContext, useContext, useState } from "react";
import { useUserContext } from "./auth.context";
import toast from "react-hot-toast";

const chatContext = createContext()

export const ChatProvider = ({children})=>{
    
    const [loading, setloading] = useState(false);
    const {Token} = useUserContext()
    const [userList, setuserList] = useState([])

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
    }

    const createChat = async (idObj)=>{
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
            console.log(response)
        } catch (error) {
            console.error("Error in chatContext::createChat::", error)
        }
    }
    return(
        <>
            <chatContext.Provider value={{SearchRequestedUser,loading, userList, createChat}}>
                {children}
            </chatContext.Provider>
        </>
    )
}


export const useChatContext = ()=>{
    return useContext(chatContext)
}