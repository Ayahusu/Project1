import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

export default function AskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(""); // Clear previous success message
    setError(""); // Clear previous error message

    // Check if title and description are provided
    if (!title || !description) {
      setError("Title and description are required!");
      return;
    }

    const token = window.localStorage.getItem("authToken");

    if (!token) {
      setError("Unauthorized: No token provided");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/posts/createPost`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setSuccess("Post created successfully!");
        setTitle(""); // Clear input fields after success
        setDescription("");
      }
    } catch (error) {
      // Enhanced error handling
      if (error.response && error.response.data) {
        setError(
          error.response.data.message ||
            "An error occurred while creating the post."
        );
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 3000);

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [error, success]);

  return (
    <div className="mt-20 ml-20">
      <form
        onSubmit={handleSubmit}
        className="w-[500px] border p-5 border-gray-300 rounded shadow-2xl"
      >
        <h1 className="text-blue-500 text-4xl">Ask A Question</h1>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}

        <div className="my-3">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border w-full p-2 outline-none border-gray-300 rounded"
            placeholder="Enter the title of your question..."
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description">Description</label>
          <textarea
            className="border w-full outline-none p-2 border-gray-300 rounded"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="16"
            placeholder="Write your question here..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full p-2 border-gray-300 rounded text-white bg-blue-500 disabled:opacity-50"
        >
          Ask a Question
        </button>
      </form>
    </div>
  );
}
