import React, { useEffect, useState } from "react";
import axios from "axios";
import profile from "../assets/profile.png";
import { AiFillHeart } from "react-icons/ai";
import { TfiComment } from "react-icons/tfi";
import { BsThreeDotsVertical } from "react-icons/bs";
import Comments from "./Comments";
import AddComment from "./AddComment";

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
  const [likeCount, setLikeCount] = useState(likes?.length || 0);
  const [postComments, setPostComments] = useState(comments || []);
  const [toggleComment, setToggleComment] = useState(false);
  const [toggleOptions, setToggleOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const token = window.localStorage.getItem("authToken");
  const user = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    setPostComments(comments || []);
    setLiked(Array.isArray(likes) && likes.includes(userId));
  }, [comments, likes, userId]);

  const handleAddComment = (newComment) => {
    if (!newComment || typeof newComment !== "object") {
      console.error("Invalid comment data received:", newComment);
      return;
    }

    setPostComments((prevComments) => [
      ...prevComments,
      {
        _id: newComment._id,
        text: newComment.text,
        user: { username: newComment.username || "Unknown User" },
        createdAt: newComment.createdAt,
      },
    ]);
  };

  const handleToggle = () => {
    setToggleOptions(!toggleComment);
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "overlay") {
      setToggleComment(false);
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`/api/posts/deletePost/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEditPost = async () => {
    try {
      const updatedPost = {
        title: editedTitle,
        description: editedDescription,
      };
      await axios.put(
        `${import.meta.env.VITE_BACKEND}/api/posts/updatePost/${postId}`,
        updatedPost,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, ...updatedPost } : post
        )
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // Handle like action
  const handleLike = async () => {
    console.log("Post ID:", postId, "User ID:", user._id);
    if (!postId || !user._id) {
      console.error("postId or userId is missing!");
      return; // Prevent request if postId is missing
    }

    try {
      if (liked) {
        await axios.delete(
          `/api/posts/unlike/${postId}`,
          { data: { userId: user._id } }, // Fix: Send userId inside 'data' for DELETE request
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLiked(false);
        setLikeCount((prevCount) => prevCount - 1);
      } else {
        await axios.post(
          `/api/posts/like/${postId}`,
          { userId: user._id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLiked(true);
        setLikeCount((prevCount) => prevCount + 1);
      }
    } catch (error) {
      console.error("Error handling like action:", error);
    }
  };
  return (
    <>
      {/* Post Card */}
      <div className="w-[450px] h-[370px] rounded-2xl p-3 shadow-2xl flex flex-col relative">
        {/* Options Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={() => setToggleOptions(!toggleOptions)}
        >
          <BsThreeDotsVertical />
        </button>

        {toggleOptions && (
          <div className="absolute right-3 top-10 bg-white shadow-md rounded p-2">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => setIsEditing(true)}
            >
              Edit Post
            </button>
            <button
              className="text-red-500 hover:text-red-700 ml-2"
              onClick={handleDeletePost}
            >
              Delete Post
            </button>
          </div>
        )}

        {/* Post Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src={profile}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <span>{capitalizeFirstLetter(username)}</span>
            <span className="text-gray-500 text-sm">1d</span>
          </div>

          <div className="mt-2 p-3 rounded-xl bg-gray-200 h-[250px] overflow-y-auto no-scrollbar">
            {isEditing ? (
              <>
                <input
                  className="border py-1 px-2 rounded border-gray-400 w-full"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                  className="border py-1 px-2 rounded border-gray-400 w-full mt-2"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                ></textarea>
                <button
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={handleEditPost}
                >
                  Save Changes
                </button>
                <button
                  className="mt-2 ml-2 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className="border py-1 rounded border-white pl-2">
                  {title}
                </div>
                <p className="whitespace-pre-wrap break-words mt-1">
                  {description}
                </p>
              </>
            )}
          </div>
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
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setToggleComment(false)}
            >
              ✖
            </button>

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

            <div className="mt-4">
              <span className="mb-3 font-semibold">Comments</span>
              <div className="h-[320px] overflow-y-auto no-scrollbar">
                {postComments.length > 0 ? (
                  postComments.map((comment, index) => (
                    <Comments
                      key={comment._id || index}
                      username={comment.user?.username || "Unknown User"}
                      comment={comment.text}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-center">No comments yet.</p>
                )}
              </div>
              <AddComment postId={postId} onCommentAdded={handleAddComment} />{" "}
              {/* Pass the callback */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
