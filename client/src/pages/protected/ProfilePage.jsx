import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../../components/Post";

export default function Profile() {
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
    <div className="h-full w-full overflow-auto no-scrollbar p-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start min-h-[380px] border rounded-2xl shadow-2xl p-6">
        {/* Profile Image */}
        <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] overflow-hidden rounded-xl border">
          <img
            src={userDetails.profileImg || "/default-profile.png"}
            alt="User profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Details */}
        <div className="ml-6 flex flex-col justify-center items-center md:items-start">
          <h1 className="text-4xl md:text-6xl font-bold">
            {capitalizeFirstLetter(userDetails.username) || "Username"}
          </h1>
          <div className="flex gap-4 mt-3 text-lg">
            {/* <span>{userDetails.followers?.length || 0} Followers</span> */}
            <span>{userDetails.posts?.length || 0} Posts</span>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <p className="text-center mt-6 text-2xl text-gray-500 font-semibold">
        Posts
      </p>

      <div className="overflow-auto no-scrollbar grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-3">
        {userDetails.posts?.length > 0 ? (
          userDetails.posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              username={userDetails.username || "Unknown"}
              title={post.title}
              description={post.description}
              likes={post.likes.length}
              comments={post.comments}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No posts available.
          </p>
        )}
      </div>
    </div>
  );
}
