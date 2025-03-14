import React from "react";

function Chats() {
  // Sample Data (Replace with API data later)
  const chatList = [
    { name: "John Doe", recentMessage: "Hey! How are you?" },
    { name: "Alice Smith", recentMessage: "Let's catch up tomorrow!" },
    { name: "Michael Brown", recentMessage: "Great job on the project!" },
    { name: "Emma Wilson", recentMessage: "See you soon!" },
    { name: "David Johnson", recentMessage: "Meeting at 5 PM." },
    { name: "Sophia Miller", recentMessage: "How was your trip?" },
    { name: "Sophia Miller", recentMessage: "How was your trip?" },
    { name: "Sophia Miller", recentMessage: "How was your trip?" },
    { name: "Sophia Miller", recentMessage: "How was your trip?" },
    { name: "Sophia Miller", recentMessage: "How was your trip?" },
  ];

  return (
    <div className="w-1/3 bg-gray-900 text-white h-[86vh] p-4 m-2 rounded-xl">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-green-400 mb-4">My Chats</h2>

      {/* Chat Cards (Scrollable) */}
      <div className="space-y-3 w-[95%] m-auto h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {chatList.map((chat, index) => (
          <div
            key={index}
            className="p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition"
          >
            <h3 className="text-white font-medium">{chat.name}</h3>
            <p className="text-gray-400 text-sm">{chat.recentMessage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chats;
