import React from "react";
import profile from "../assets/profile.png";

export default function AddComment() {
  return (
    <div className="border-t-2 border-gray-400">
      <div className="flex items-center gap-3 mt-3">
        <img src={profile} alt="Profile" className="w-7 h-7" />
        <span className="text-sm text-gray-400">User</span>
      </div>
      <div className="mt-3">
        <textarea
          name=""
          id=""
          className="w-full border text-sm p-3 outline-none rounded-xl"
          placeholder="Write Comments...."
        ></textarea>
      </div>
    </div>
  );
}
