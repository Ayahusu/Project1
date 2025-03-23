import React, { useEffect, useState } from "react";
import Post from "../../components/Post";
import SearchComponent from "../../components/SearchComponent";
import axios from "axios";

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("authToken"); // Fetch inside useEffect
    if (!token) return;

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
      }
    };

    fetchPosts();
  }, [posts]);

  // console.log(posts);
  // Filter posts based on the search query (title or description)
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full">
      <div className="w-full sticky top-0 z-50 shadow-xl p-3">
        <SearchComponent setSearchQuery={setSearchQuery} />{" "}
        {/* Pass setSearchQuery to SearchComponent */}
      </div>

      <div className="overflow-auto h-[885px] no-scrollbar mt-3 px-12 py-10 grid grid-cols-2 gap-6">
        {Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              userId={post.author?._id}
              username={post.author?.username || "Unknown"}
              title={post.title}
              description={post.description}
              likes={post.likes?.length || 0} // Ensure likes is defined
              comments={post.comments || []} // Ensure comments is an array
              setPosts={setPosts}
            />
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-500">
            No posts found.
          </p>
        )}
      </div>
    </div>
  );
}
