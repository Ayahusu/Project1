import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import LogoutModal from "./LogoutModel";

export default function Sidebar() {
  const [showModal, setShowModal] = useState(false);

  // Simulate logout functionality (you can implement your actual logout logic here)
  const handleLogout = () => {
    // Clear user data or token, etc.
    localStorage.removeItem("authToken");
    console.log("User logged out");
  };

  return (
    <div className="h-fit shadow-2xl">
      <div className="fit flex flex-col justify-between">
        <div className="flex flex-col space-y-4 p-2">
          <Link
            to="/dashboard/post"
            className="px-4 py-2 hover:bg-gray-300 rounded"
          >
            Home
          </Link>
          <Link
            to="/dashboard/ask"
            className="px-4 py-2 hover:bg-gray-300 rounded"
          >
            Ask
          </Link>
          <Link
            to="/dashboard/ask"
            className="px-4 py-2 hover:bg-gray-300 rounded"
          >
            Explore
          </Link>
          <Link
            to="/dashboard/notification"
            className="px-4 py-2 hover:bg-gray-300 rounded"
          >
            Notification
          </Link>
          {/* <Link
            to="/dashboard/message"
            className="px-4 py-2 hover:bg-gray-300 rounded"
          >
            Messages
          </Link> */}
          <Link
            to="/dashboard/profile"
            className="px-4 py-2 hover:bg-gray-300 rounded"
          >
            Profile
          </Link>
        </div>
        <div className="border-t p-2">
          <button
            onClick={() => setShowModal(true)}
            className="w-full px-2 py-2 block text-center hover:bg-gray-300 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <LogoutModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleLogout={handleLogout}
      />
    </div>
  );
}
