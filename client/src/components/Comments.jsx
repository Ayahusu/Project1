import React, { useState } from "react";
import { VscSend } from "react-icons/vsc";
import profile from "../assets/profile.png";
import axios from "axios";

export default function Comments({
  username,
  comment,
  replies,
  commentId,
  setPosts,
}) {
  const [toggle, setToggle] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [localReplies, setLocalReplies] = useState(replies || []); // Maintain a local state for replies

  const toggleReply = () => {
    setToggle(!toggle);
  };

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      const token = window.localStorage.getItem("authToken");
      const response = await axios.post(
        `/api/posts/reply/${commentId}`,
        { text: replyText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        console.log("Reply successful", response.data);

        // Add new reply to local state (for instant update)
        setLocalReplies((prevReplies) => [
          ...prevReplies,
          { userId: { username: "You" }, text: replyText }, // Temporary UI update
        ]);

        // Clear input field
        setReplyText("");

        // Optional: Refresh parent component state to sync data
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.comments.some((c) => c._id === commentId)
              ? {
                  ...post,
                  comments: post.comments.map((c) =>
                    c._id === commentId
                      ? { ...c, replies: [...c.replies, response.data] }
                      : c
                  ),
                }
              : post
          )
        );
      }
    } catch (error) {
      console.error(
        "Error replying:",
        error.response?.data?.message || error.message
      );
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

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

      {/* Replies Section */}
      {localReplies.length > 0 && (
        <div className="mt-2">
          <span className="text-blue-500 text-sm font-medium hover:text-blue-600 transition">
            Replies
          </span>
          <div className="pl-8 mt-2">
            {localReplies.map((reply, index) => (
              <div key={index} className="mb-2">
                <div className="flex items-center gap-3 text-gray-600">
                  <img
                    src={profile}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-gray-300"
                  />
                  <span className="font-medium text-gray-700">
                    {capitalizeFirstLetter(
                      reply.userId?.username || "Unknown User"
                    )}
                  </span>
                </div>
                <div className="mt-1 p-3 rounded-lg bg-gray-100 text-gray-800 text-sm">
                  {reply.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reply Button */}
      <button
        className="mt-2 text-blue-500 text-sm font-medium hover:text-blue-600 transition"
        onClick={toggleReply}
      >
        Reply
      </button>

      {/* Reply Input */}
      {toggle && (
        <form onSubmit={handleReply} className="mt-2 flex items-center gap-2">
          <input
            type="text"
            value={replyText}
            required
            className="w-full border-b outline-none"
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button type="submit">
            <VscSend />
          </button>
        </form>
      )}
    </div>
  );
}
