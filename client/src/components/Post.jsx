import React, { useEffect, useState } from "react";
import axios from "axios";
import profile from "../assets/profile.png";
import { AiFillHeart } from "react-icons/ai";
import { TfiComment } from "react-icons/tfi";
import { BsThreeDotsVertical } from "react-icons/bs";
import Comments from "./Comments";
import AddComment from "./AddComment";
import OptionModel from "./OptionModel";
import ProfileModal from "./Modal/ProfileModal";

export default function Post({
  postId,
  userId,
  username,
  title,
  description,
  likes,
  comments,
  setPosts,
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes || 0);
  const [postComments, setPostComments] = useState(comments || []);
  const [toggleComment, setToggleComment] = useState(false);
  const [toggleOptions, setToggleOptions] = useState(false);
  const [toggleProfileModel, setToggleProfileModel] = useState(false);

  const token = window.localStorage.getItem("authToken");

  useEffect(() => {
    setPostComments(comments || []);
  }, [comments]);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/post/like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update like count based on response
      setLiked(response.data.liked);
      setLikeCount(response.data.likeCount); // Assuming backend returns updated count
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Function to close modal when clicking on overlay
  const handleOverlayClick = (e) => {
    if (e.target.id === "overlay") {
      setToggleComment(false);
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  return (
    <>
      {/* Post Card */}
      <div className="w-[500px] h-[370px] rounded-2xl p-3 shadow-2xl flex flex-col relative">
        {/* Options Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={() => setToggleOptions(!toggleOptions)}
        >
          <BsThreeDotsVertical />
        </button>

        {toggleOptions && <OptionModel postId={postId} setPosts={setPosts} />}

        {/* Post Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Post Header */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setToggleProfileModel(true)}
          >
            <img
              src={profile}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <span>{capitalizeFirstLetter(username)}</span>
            <span className="text-gray-500 text-sm">1d</span>
          </div>

          {/* Post Body */}
          <div className="mt-2 p-3 rounded-xl bg-gray-200 h-[250px] overflow-y-auto no-scrollbar">
            <div className="border py-1 rounded border-white pl-2">{title}</div>
            <p className="whitespace-pre-wrap break-words mt-1">
              {description}
            </p>
          </div>

          {/* Post Actions (Like, Comment) */}
          <div className="flex justify-around items-center mt-3">
            <div
              className="w-[150px] flex justify-center items-center gap-1 cursor-pointer rounded py-1 hover:bg-gray-200 transition"
              onClick={handleLike}
            >
              <AiFillHeart
                className={`w-6 h-6 ${
                  liked ? "text-red-500" : "text-gray-400"
                }`}
              />
              <span>{likeCount} Likes</span>
            </div>

            <div
              className="w-[150px] flex justify-center items-center gap-1 rounded py-1 cursor-pointer hover:bg-gray-200 transition"
              onClick={() => setToggleComment(true)}
            >
              <TfiComment className="w-5 h-5 text-gray-500" />
              <span>{postComments.length} Comments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Modal */}
      {toggleComment && (
        <div
          id="overlay"
          className="fixed inset-0 bg-gray-400 bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white w-[80%] md:w-[600px] h-[820px] p-5 rounded-xl shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setToggleComment(false)}
            >
              ✖
            </button>

            {/* Post Content in Modal */}
            <div className="text-center text-2xl font-semibold">
              {capitalizeFirstLetter(username)}'s Post
            </div>
            <div className="mt-2 p-3 rounded-xl bg-gray-200 h-[250px] overflow-y-auto no-scrollbar">
              <div className="border py-1 rounded border-white pl-2">
                {title}
              </div>
              <p className="whitespace-pre-wrap break-words mt-1">
                {description}
              </p>
            </div>

            {/* Like & Comment Section */}
            <div className="flex justify-around items-center mt-3">
              <div
                className="w-[150px] flex justify-center items-center gap-1 cursor-pointer rounded py-1 hover:bg-gray-200 transition"
                onClick={handleLike}
              >
                <AiFillHeart
                  className={`w-6 h-6 ${
                    liked ? "text-red-500" : "text-gray-400"
                  }`}
                />
                <span>{likeCount} Likes</span>
              </div>

              <div
                className="w-[150px] flex justify-center items-center gap-1 rounded py-1 cursor-pointer hover:bg-gray-200 transition"
                onClick={() => setToggleComment(true)}
              >
                <TfiComment className="w-5 h-5 text-gray-500" />
                <span>{postComments.length} Comments</span>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-4">
              <span className="mb-3 font-semibold">Comments</span>
              <div className="h-[250px] overflow-y-auto no-scrollbar">
                {postComments.length > 0 ? (
                  postComments.map((comment, index) => (
                    <Comments key={index} name={username} comment={comment} />
                  ))
                ) : (
                  <p className="text-gray-500 text-center">No comments yet.</p>
                )}
              </div>
              <AddComment postId={postId} setPostComments={setPostComments} />
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {toggleProfileModel && <ProfileModal userId={userId} />}
    </>
  );
}
