import React, { useState } from "react";
import profile from "../assets/profile.png";
import { AiFillHeart } from "react-icons/ai";
import { TfiComment } from "react-icons/tfi";
import { IoShareOutline } from "react-icons/io5";
import Comments from "./Comments";
import AddComment from "./AddComment";

export default function Post() {
  const [liked, setlike] = useState(false);
  const [clickedComment, setClickedComment] = useState(false);
  const [postHeight, setPostHeight] = useState(false);

  const handleLike = () => {
    setlike(!liked);
  };
  const handleComment = () => {
    setClickedComment(!clickedComment);
    setPostHeight(!postHeight);
  };

  return (
    <div className="w-full h-full flex justify-center col-end-1">
      <div
        className={`w-[500px] h-auto rounded-2xl p-5 my-5 shadow-2xl overflow-y-auto no-scrollbar`}
      >
        <div className="flex items-center gap-2 ">
          <img src={profile} alt="" className="w-10 h-10" />
          <span className="text-gray-400">Ayahusu</span>
          <span className="text-gray-400">1d</span>
        </div>
        <div>
          <img
            src=""
            alt="post"
            className="w-full h-[500px] my-3 border rounded-xl"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-gray-400"
          >
            <AiFillHeart
              className={`w-8 h-8 ${liked ? "text-red-500" : "text-gray-400"}`}
            />
            Like
          </button>
          <button
            className="flex items-center gap-2 text-gray-400"
            onClick={handleComment}
          >
            <TfiComment className="w-6 h-6 text-gray-400" />
            Comment
          </button>
          <button className="flex items-center gap-2 text-gray-400">
            <IoShareOutline className="w-7 h-7 text-gray-400" />
            Share
          </button>
        </div>
        <div className="mt-3 text-sm">Post Description</div>
        <div
          className={`${
            clickedComment ? "block" : "hidden"
          } my-3 rounded-xl w-full`}
        >
          <div className="border p-5 border-gray-400 mb-3 rounded-xl">
            <span className="text-gray-400">Comments</span>
            <Comments />
          </div>
          <AddComment />
        </div>
      </div>
    </div>
  );
}
