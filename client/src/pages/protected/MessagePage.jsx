import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
import { FaPaperPlane, FaUser } from "react-icons/fa";

// const socket = io(import.meta.env.VITE_BACKEND); // Backend WebSocket URL

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([
    // { id: 1, name: "John Doe" },
    // { id: 2, name: "Jane Smith" },
    // { id: 3, name: "Mike Johnson" },
  ]);

  // useEffect(() => {
  //   Listen for incoming messages
  //   socket.on("message", (message) => {
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   });

  //   return () => socket.off("message");
  // }, []);

  // const sendMessage = () => {
  //   if (inputMessage.trim() && selectedUser) {
  //     const newMessage = {
  //       sender: "You",
  //       text: inputMessage,
  //       timestamp: new Date().toLocaleTimeString(),
  //     };

  //     socket.emit("message", newMessage);
  //     setMessages([...messages, newMessage]);
  //     setInputMessage("");
  //   }
  // };

  return (
    <div className="h-[880px] flex">
      {/* Sidebar - Users List */}
      <div className="w-[300px] bg-gray-100 border-r p-4">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
                selectedUser?.id === user.id
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <FaUser className="text-gray-600" />
              <span>{user.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b flex items-center">
          {selectedUser ? (
            <h2 className="text-lg font-semibold">{selectedUser.name}</h2>
          ) : (
            <h2 className="text-lg text-gray-500">Select a chat</h2>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {selectedUser ? (
            messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 max-w-xs rounded-lg ${
                      msg.sender === "You"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-10">
                No messages yet.
              </p>
            )
          ) : (
            <p className="text-gray-500 text-center mt-10">
              Select a user to start chatting.
            </p>
          )}
        </div>

        {/* Message Input */}
        {selectedUser && (
          <div className="p-4 bg-white border-t flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border rounded-lg outline-none"
            />
            <button
              // onClick={sendMessage}
              className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <FaPaperPlane />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
