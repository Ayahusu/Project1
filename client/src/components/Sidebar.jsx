import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaQuestionCircle,
  FaUserFriends,
  FaBell,
  FaUser,
  FaSignOutAlt,
  FaCompass,
} from "react-icons/fa";
import LogoutModal from "./LogoutModel";
import { AiFillMessage } from "react-icons/ai";
import logo from "../assets/logo.png"; // Ensure you have a logo

export default function Sidebar() {
  const [showModal, setShowModal] = useState(false);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear token
    console.log("User logged out");
  };

  return (
    <div className="w-[250px] h-[880px] fixed bg-white border-r border-gray-300 shadow-md flex flex-col justify-between">
      {/* Navigation Links */}
      <nav className="flex flex-col space-y-2 p-4">
        <SidebarLink to="/dashboard/post" icon={<FaHome />} text="Home" />
        <SidebarLink
          to="/dashboard/ask"
          icon={<FaQuestionCircle />}
          text="Ask"
        />
        <SidebarLink
          to="/dashboard/notification"
          icon={<FaBell />}
          text="Notifications"
        />
        {/* <SidebarLink
          to="/dashboard/friends"
          icon={<FaUserFriends />}
          text="Friends"
        /> */}
        {/* <SidebarLink
          to="/dashboard/message"
          icon={<AiFillMessage />}
          text="Message"
        /> */}
        <SidebarLink to="/dashboard/profile" icon={<FaUser />} text="Profile" />
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button
          onClick={() => setShowModal(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 rounded transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleLogout={handleLogout}
      />
    </div>
  );
}

// Reusable Sidebar Link Component
function SidebarLink({ to, icon, text }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
    >
      {icon}
      {text}
    </Link>
  );
}
