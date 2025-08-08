import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";

const PostCard = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Fetch all posts on mount
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/getPost",
        { withCredentials: true }
      );
      setPosts(response.data.post);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  // to laod post on visting page
  useEffect(() => {
    fetchPosts();
  }, []);

  // reload all post after deleting any posts
  useEffect(() => {
    // console.log("Updated posts:", posts);
  }, [posts]);

  // Search submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (search.trim() === "") {
        setFilteredPosts([]);
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/auth/search/?query=${search}`,
        {
          withCredentials: true,
        }
      );
      setFilteredPosts(response.data.posts);
    } catch (error) {
      console.log("Error in search:", error);
    }
  };

  // Display logic: fallback to all posts when search is empty
  const displayedPosts =
    filteredPosts.length > 0 || search.trim() ? filteredPosts : posts;

  return (
    <div className="p-6">
      {/* Search form */}
      <form
        className="p-3 bg-slate-100 rounded-lg flex items-center justify-between mx-auto w-64 mb-6"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search..."
          className="focus:outline-none bg-transparent w-44 text-black font-medium"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value.trim() === "") {
              setFilteredPosts([]);
            }
          }}
        />
        <button type="submit">
          <FaSearch className="text-slate-800" />
        </button>
      </form>

      {/* Posts Display */}
      {displayedPosts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {displayedPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow-md p-4 hover:border-4  hover:shadow-lg transition duration-300 ease-in flex flex-col justify-between max-h-[400px]"
            >
              <h1 className="text-2xl font-serif font-stretch-75% font-semibold  mb-2">
                Topic: {post.title}
              </h1>

              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
              )}

              <p
                className="text-gray-700 mb-3 overflow-y-auto"
                dangerouslySetInnerHTML={{
                  __html: post.description.slice(0, 100) + "...",
                }}
              />

              <div className="text-[20px] flex justify-between">
                <p>
                  <span className="text-gray-800 font-extrabold">
                    Category:{" "}
                  </span>
                  <span className="font-sans italic text-red-400">
                    {post.category}
                  </span>
                </p>
                <span>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="flex justify-center mt-4">
                <Link to={`/posts/slug/${post.slug}`}>
                  <Button className="bg-blue-400">Read more</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
