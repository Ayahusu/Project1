import axios from "axios";
import React from "react";

export default function OptionModel({ postId, setPosts }) {
  const token = window.localStorage.getItem("authToken");

  const deletePost = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND}/api/posts/deletePost/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 204) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error(
        "Error deleting post:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="w-[80px] text-center bg-white flex flex-col rounded absolute top-9 right-3">
      <div>
        <button className="cursor-pointer" onClick={deletePost}>
          {" "}
          {/* ✅ No need to pass postId again */}
          Delete
        </button>
      </div>
      <div>
        <button>Edit</button>
      </div>
    </div>
  );
}
