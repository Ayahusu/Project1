import React from "react";
import profile from "../assets/profile.png";

export default function Comments({ username, comment }) {
  return (
    <div className="p-4 bg-white shadow-sm rounded-xl border border-gray-200 mb-2">
      {/* User Info */}
      <div className="flex items-center gap-3 text-gray-600">
        <img
          src={profile}
          alt="Profile"
          className="w-8 h-8 rounded-full border border-gray-300"
        />
        <span className="font-medium text-gray-700">{username}</span>
      </div>

      {/* Comment Box */}
      <div className="mt-2 p-3 rounded-lg bg-gray-100 text-gray-800 text-sm">
        {comment}
      </div>

      {/* Reply Button */}
      <button className="mt-2 text-blue-500 text-sm font-medium hover:text-blue-600 transition">
        Reply
      </button>
    </div>
  );
}
