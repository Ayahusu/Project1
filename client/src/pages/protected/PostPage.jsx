import React, { useEffect, useState } from "react";
import Post from "../../components/Post";
import SearchComponent from "../../components/SearchComponent";
import axios from "axios";

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/posts/all`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

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
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              username={post.user?.username || "Unknown"}
              title={post.title}
              description={post.description}
              likes={post.likes.length}
              comments={post.comments}
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
