import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../Post";

export default function ProfileModel({ userId }) {
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(null);
  const token = window.localStorage.getItem("authToken");

  useEffect(() => {
    if (!userId) return;

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/user/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user profile.");
      }
    };

    fetchUserDetails();
  }, [userId]);

  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="w-screen">
      <div className="flex h-[380px] gap-10 rounded-2xl m-10 p-10 shadow-2xl">
        <div className="border w-[450px] h-[300px]">
          <img
            src={userDetails.profileImg}
            alt="User profile"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="w-full">
          <h1 className="text-6xl">
            <span>
              {capitalizeFirstLetter(userDetails.username) || "Unknown"}
            </span>
          </h1>
          <div className="flex gap-2 mt-3">
            <span>{userDetails.followers?.length || 0} Followers</span>
            <span>{userDetails.posts?.length || 0} Posts</span>
          </div>
        </div>
      </div>

      <p className="text-center my-5 text-2xl text-gray-500">Posts</p>
      <div className="overflow-auto no-scrollbar px-12 py-10 grid grid-cols-2 gap-6">
        {userDetails.posts?.map((post) => (
          <Post
            key={post._id}
            postId={post._id}
            username={userDetails.username || "Unknown"}
            title={post.title}
            description={post.description}
            likes={post.likes.length}
            comments={post.comments}
          />
        ))}
      </div>
    </div>
  );
}
