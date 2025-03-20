import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Hello() {
  const [userDetails, setUserDetails] = useState({});
  const user = JSON.parse(window.localStorage.getItem("user")); // Parse the user data from localStorage

  useEffect(() => {
    if (user) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND}/api/user/profile/${user._id}`
          );
          setUserDetails(response.data); // Set the fetched data
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserDetails();
    }
  }, [user]);

  const capitalizeFirstLetter = (str) => {
    return str.replace(/^./, (char) => char.toUpperCase());
  };

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
            {capitalizeFirstLetter(userDetails.username)}
          </h1>
          <div className="flex gap-2 mt-3">
            <span>{userDetails.followers?.length || 0} Followers</span>
            <span>{userDetails.posts?.length || 0} Posts</span>
          </div>
        </div>
      </div>

      <p className="text-center my-5 text-2xl text-gray-500">Posts</p>
      <div className="overflow-auto no-scrollbar px-12 py-10 grid grid-cols-2 gap-6">
        {/* Render user posts here if available */}
        {userDetails.posts?.map((post) => (
          <div key={post._id} className="post-card">
            {/* Render Post here */}
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
