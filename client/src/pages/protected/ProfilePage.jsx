import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../../components/Post";

export default function Hello() {
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(null); // To track errors
  const token = window.localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/user/profile`,
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
  }, [token]);

  const capitalizeFirstLetter = (str) => {
    if (!str) return str; // Check if the string is empty or falsy
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (error) {
    return <div>{error}</div>; // Show error if there's an issue
  }

  return (
    <div className="w-full">
      <div className="flex h-[380px] gap-10 rounded-2xl m-10 p-10 shadow-2xl">
        <div className="border w-[450px] h-[300px]">
          <img
            src={userDetails.profileImg || "#"}
            alt="User profile"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="w-full">
          <h1 className="text-6xl">
            <span>{capitalizeFirstLetter(userDetails.username)}</span>
            {/* {userDetails.username} */}
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
