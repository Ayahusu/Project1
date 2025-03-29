import React, { useState } from "react";
import axios from "axios";

export default function AddComment({ postId, onCommentAdded }) {
  const [comment, setComment] = useState("");
  const token = window.localStorage.getItem("authToken");

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/posts/comment/${postId}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onCommentAdded(response.data.comment);

      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <form onSubmit={handleAddComment}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        className="w-full p-2 border rounded-lg"
      />
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white p-2 rounded-lg"
      >
        Add Comment
      </button>
    </form>
  );
}
