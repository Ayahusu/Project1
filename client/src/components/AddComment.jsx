import React, { useState } from "react";
import profile from "../assets/profile.png";
import axios from "axios";

export default function AddComment() {
  const [comment, setComment] = useState("");

  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return; // Prevent empty comments

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/user/comment`,
        { comment },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        alert("Comment Added");
        setComment(""); // Reset input after successful submission
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment");
    }
  };

  return (
    <div className="mt-2 border-gray-400">
      <div className="flex gap-2 mt-3">
        <img src={profile} alt="Profile" className="w-7 h-7" />
        <div className="w-full rounded-xl p-2 bg-gray-200">
          <form onSubmit={handleComment}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-10 text-sm rounded-md outline-none resize-none overflow-hidden whitespace-pre-wrap p-1"
              placeholder="Write a comment..."
            />
            <button
              type="submit"
              className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
