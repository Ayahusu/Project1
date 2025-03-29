import React, { useEffect, useState } from "react";
import Post from "../../components/Post";
import axios from "axios";
import { useSearch } from "../../context/SearchContext";

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchQuery } = useSearch();

  useEffect(() => {
    const token = window.localStorage.getItem("authToken");
    if (!token) {
      setError("Unauthorized: Please log in.");
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/posts/allPosts?page=1&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full w-full overflow-auto no-scrollbar p-6">
      {loading ? (
        <p className="text-center text-gray-500">Loading posts...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Post
                key={post._id}
                postId={post._id}
                userId={post.author?._id}
                username={post.author?.username || "Unknown"}
                title={post.title}
                description={post.description}
                likes={post.likes?.length || 0}
                comments={post.comments || []}
                setPosts={setPosts}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No posts found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
