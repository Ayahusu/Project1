import axios from "axios";
import React from "react";

export default function OptionModel({ postId, setPosts }) {
  const user = JSON.parse(window.localStorage.getItem("user"));

  console.log(user._id);

  const deletePost = async () => {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND
        }/api/posts/deletepost/${postId}?userId=${user._id}`
      );

      if (response.status === 204) {
        // Remove the deleted post from the state immediately
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
