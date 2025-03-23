import React from "react";
import profile from "../assets/profile.png";
import AddComment from "./AddComment";

export default function Comments({ name, comment }) {
  return (
    <div className="m-2">
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <img src={profile} alt="Profile" className="w-5 h-5" />
        <span>{name}</span>
      </div>
      <div className="w-full mt-2 p-2 rounded-xl text-sm bg-gray-200">
        <span className="block">{comment}</span>
      </div>
      <button>Reply</button>
    </div>
  );
}
