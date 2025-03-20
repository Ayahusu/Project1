import React, { useState } from "react";
import profile from "../assets/profile.png";
import { AiFillHeart } from "react-icons/ai";
import { TfiComment } from "react-icons/tfi";
import { IoShareOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Comments from "./Comments";
import AddComment from "./AddComment";
import OptionModel from "./OptionModel";

export default function Post({
  postId,
  username,
  title,
  description,
  likes,
  comments,
  setPosts,
}) {
  const [liked, setLiked] = useState(false);
  const [toggleComment, setToggleComment] = useState(false);
  const [toggleOptions, setToggleOptions] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  // Function to close modal when clicking on overlay
  const handleOverlayClick = (e) => {
    if (e.target.id === "overlay") {
      setToggleComment(false);
    }
  };

  const optionClick = () => {
    setToggleOptions(!toggleOptions); // Correct way to toggle the state
  };
  const capitalizeFirstLetter = (str) => {
    return str.replace(/^./, (char) => char.toUpperCase());
  };
  return (
    <>
      {/* Normal Post */}
      <div className="w-[500px] h-[370px] rounded-2xl p-3 border flex flex-col relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={optionClick}
        >
          <BsThreeDotsVertical />
        </button>

        {toggleOptions && <OptionModel postId={postId} setPosts={setPosts} />}

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Post Header */}
          <div className="flex items-center gap-2">
            <img
              src={profile}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <span>{capitalizeFirstLetter(username)}</span>
            <span>1d</span>
          </div>

          {/* Post Content */}
          <div className="mt-2 p-3 rounded-xl bg-gray-200 h-[250px] overflow-y-auto no-scrollbar">
            <div className="border py-1 rounded border-white pl-2">{title}</div>
            <p className="whitespace-pre-wrap break-words mt-1">
              {description}
            </p>
          </div>

          {/* Post Actions (Like, Comment, Share) */}
          <div className="flex justify-around items-center mt-3">
            <div
              className="w-[150px] flex justify-center items-center gap-1 cursor-pointer rounded py-1 hover:bg-gray-200 transition"
              onClick={handleLike}
            >
              <button className="flex justify-center items-center gap-2 text-gray-400">
                <AiFillHeart
                  className={`w-6 h-6 ${
                    liked ? "text-red-500" : "text-gray-400"
                  }`}
                />
              </button>
              <span>Like</span>
            </div>

            {/* Click to open modal */}
            <div
              className="w-[150px] flex justify-center items-center gap-1 rounded py-1 cursor-pointer hover:bg-gray-200 transition"
              onClick={() => setToggleComment(true)}
            >
              <button className="flex items-center gap-2 text-gray-400">
                <TfiComment className="w-5 h-5 bg-gray" />
              </button>
              <span>Comment</span>
            </div>

            <div className="w-[150px] flex justify-center items-center gap-1 rounded py-1 cursor-pointer hover:bg-gray-200 transition">
              <button className="flex items-center gap-2 text-gray-400">
                <IoShareOutline className="w-6 h-6 text-gray-400" />
              </button>
              <span>Share</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Comments */}
      {toggleComment && (
        <div
          id="overlay"
          className="fixed inset-0 bg-gray-400 bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleOverlayClick} // Close when clicking on overlay
        >
          <div className="bg-white w-[80%] md:w-[600px] h-[820px] p-5 rounded-xl shadow-lg relative">
            {/* Close button */}
            <div>
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={() => setToggleComment(false)}
              >
                ✖
              </button>

              {/* Post Content Inside Modal */}
              <div className="text-center">
                <span className="text-2xl">
                  {capitalizeFirstLetter(username)}'s
                </span>
              </div>
              <div className="mt-2 p-3 rounded-xl bg-gray-200 h-[250px] overflow-y-auto no-scrollbar">
                <div className="border py-1 rounded border-white pl-2">
                  {title}
                </div>
                <p className="whitespace-pre-wrap break-words mt-1">
                  {description}
                </p>
              </div>

              <div className="flex justify-around items-center mt-3">
                <div
                  className="w-[150px] flex justify-center items-center gap-1 cursor-pointer rounded py-1 hover:bg-gray-200 transition"
                  onClick={handleLike}
                >
                  <button className="flex justify-center items-center gap-2 text-gray-400">
                    <AiFillHeart
                      className={`w-6 h-6 ${
                        liked ? "text-red-500" : "text-gray-400"
                      }`}
                    />
                  </button>
                  <span>Like</span>
                </div>

                {/* Click to open modal */}
                <div
                  className="w-[150px] flex justify-center items-center gap-1 rounded py-1 cursor-pointer hover:bg-gray-200 transition"
                  onClick={() => setToggleComment(true)}
                >
                  <button className="flex items-center gap-2 text-gray-400">
                    <TfiComment className="w-5 h-5 bg-gray" />
                  </button>
                  <span>Comment</span>
                </div>

                <div className="w-[150px] flex justify-center items-center gap-1 rounded py-1 cursor-pointer hover:bg-gray-200 transition">
                  <button className="flex items-center gap-2 text-gray-400">
                    <IoShareOutline className="w-6 h-6 text-gray-400" />
                  </button>
                  <span>Share</span>
                </div>
              </div>
            </div>
            {/* Comments Section */}
            <div className="mt-4">
              <span className="mb-3">Comments</span>
              <div className="h-[250px] overflow-y-auto no-scrollbar">
                {/* <Comments />
                <Comments />
                <Comments />
                <Comments />
                <Comments />
                <Comments /> */}
              </div>
              <AddComment />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
