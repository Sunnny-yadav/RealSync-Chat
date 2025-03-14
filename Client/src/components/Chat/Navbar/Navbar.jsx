import React, { useState } from "react";
import { FaSearch, FaBell, FaChevronDown, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 bg-black text-white shadow-lg">
        {/* Search Section */}
        <div
          className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition min-w-[150px]"
          onClick={() => setIsSearchOpen(true)}
          aria-label="Search User"
        >
          <FaSearch size={18} className="text-green-500" />
          <span className="text-sm text-gray-300">Search User</span>
        </div>

        {/* Title */}
        <div className="text-xl font-semibold text-green-400">
          RealSync-Chat
        </div>

        {/* Icons & Profile */}
        <div className="flex items-center space-x-4">
          <FaBell
            size={20}
            className="text-green-500  rounded-full cursor-pointer transition"
            aria-label="Notifications"
          />
          {/* Profile Section */}
          <div
            className="relative flex items-center space-x-2 p-2 rounded-full hover:bg-gray-700 cursor-pointer transition"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.62vIM9Jk0un2ldc2g2u1ZAHaHa&pid=Api&P=0&h=180"
              width={35}
              className="rounded-full border-2 border-green-500"
              alt="User Avatar"
            />
            <FaChevronDown
              size={18}
              className="text-green-500 transition"
            />
            
            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute top-13 right-1 bg-gray-800 shadow-lg rounded-lg w-40 py-2">
                <button className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition">Profile</button>
                <button className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Side Drawer for Search */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gray-800 p-4 transform ${
          isSearchOpen ? "translate-x-0" : "-translate-x-full"
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
            placeholder="Enter user name..."
            className="bg-transparent outline-none text-white w-full"
          />
          <button className="ml-2 bg-green-500 cursor-pointer text-white px-4 py-1 rounded-lg">
            Go
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
