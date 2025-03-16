import React, { useState } from "react";
import { FaSearch, FaBell, FaChevronDown, FaTimes } from "react-icons/fa";
import { useUserContext } from "../../../context/auth.context";
import { useNavigate } from 'react-router-dom'
import { useChatContext } from "../../../context/chat.context";
import toast from "react-hot-toast"
import SkeletonCard from "./userSkeleton";

function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { Logout, userData } = useUserContext()
  const navigate = useNavigate()
  const { setselectedchat } = useChatContext()

  // state variable and functions for search user for chat
  const { SearchRequestedUser, loading, userList, createChat, isSearchOpen, setIsSearchOpen } = useChatContext();
  const [text, settext] = useState("")

  const SearchUser = (e) => {
    e.preventDefault()
    if (text === "") {
      return toast.error("Input Filed is empty")
    } else {
      SearchRequestedUser(text)
    }
  }

  return (
    <>
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 bg-black text-white shadow-lg h-16">
        {/* Search Section */}
        <div
          className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition max-w-[150px]"
          onClick={() => setIsSearchOpen(true)}
          aria-label="Search User"
        >
          <FaSearch size={18} className="text-green-500" />
          <span className="text-sm text-gray-300 hidden sm:inline">Search User</span>
        </div>

        {/* Title */}
        <div className="text-xl font-semibold text-green-400">
          RealSync-Chat
        </div>

        {/* Icons & Profile */}
        <div className="flex items-center space-x-4">
          <FaBell
            size={20}
            className="text-green-500 rounded-full cursor-pointer transition"
            aria-label="Notifications"
          />
          {/* Profile Section */}
          <div
            className="relative flex items-center space-x-2 p-2 rounded-full hover:bg-gray-700 cursor-pointer transition"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10">
              <img
                src={userData?.avatar}
                className="rounded-full border-2 w-full h-full object-cover border-green-500"
                alt="User Avatar"
              />
            </div>
            <FaChevronDown
              size={16}
              className="text-green-500 transition hidden sm:block"
            />

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-1 bg-gray-800 shadow-lg rounded-lg w-40 py-2 z-30">
                <button className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition">Profile</button>
                <button onClick={() => {
                  Logout()
                  setselectedchat({})
                  navigate("/login")
                }} className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Side Drawer for Search */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-full bg-gray-800 p-4 z-30 transform ${isSearchOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 shadow-lg`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-400">Search User</h2>
          <FaTimes
            size={20}
            className="cursor-pointer text-white"
            onClick={() => setIsSearchOpen(false)}
          />
        </div>

        {/* Search Input */}
        <div className="flex items-center bg-gray-700 p-2 rounded-lg">
          <input
            type="text"
            value={text}
            onChange={(e) => settext(e.target.value)}
            placeholder="Enter user name..."
            className="bg-transparent outline-none text-white w-full"
          />
          <button onClick={(e) => { SearchUser(e) }} className="ml-2 bg-green-500 cursor-pointer text-white px-4 py-1 rounded-lg">
            Go
          </button>
        </div>
        {/* the fetched users  */}
        <div className="mt-4 overflow-y-auto max-h-[80vh]">
          {loading ? (
            [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            userList?.map((user) => (
              <div
               key={user._id} 
               onClick={()=>{
                createChat({
                  searchedUserId:user._id
                });
                setIsSearchOpen(false); // Close the search drawer after selecting a user
               }}
               className="flex items-center gap-3 p-2 bg-gray-700 rounded-lg my-2 cursor-pointer hover:bg-gray-600">
                <img
                  src={user.avatar || "https://via.placeholder.com/40"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-green-500 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-white font-semibold truncate">{user.name}</p>
                  <p className="text-gray-400 text-sm truncate">{user.email}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Overlay for mobile when search is open */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSearchOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Navbar;