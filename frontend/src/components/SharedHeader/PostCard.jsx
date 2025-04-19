import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const PostCard = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/getPost",
        { withCredentials: true }
      );
      setPosts(response.data);
      console.log("post array is ", posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [onload]);

  const filterPost = posts.filter((records) => {
    const searchTerms = search.toLowerCase();
    if (searchTerms === "") {
      return records;
    }
    return (
      records.title.toLowerCase().includes(searchTerms) ||
      records.description.toLowerCase().includes(searchTerms) ||
      records.category.toLowerCase().includes(searchTerms)
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        All Posts
      </h1>

      <Input
        type="text"
        placeholder="Search.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        <div className="  grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-[400px]">
          {filterPost.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300 flex flex-col justify-between "
            >
              <h2 className="text-xl font-semibold text-blue-500 mb-2 uppercase">
                {post.title}
              </h2>
              {/* <p className="text-gray-700 text-sm mb-3">
                {stripHtml(post.description).slice(0, 120)}...
              </p> */}
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
                  __html: post.description.slice(0, 120) + "...",
                }} // using this so that i can parse the incoming html from mongodb into its textual style
              />

              <div className="text-[16px] flex justify-between">
                <p>
                  {" "}
                  <span className="text-gray-800 font-bold">Category : </span>
                  <span className="font-sans illatic  text-red-300">
                    {post.category}
                  </span>
                </p>
                <span className="justify-end">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className=" flex justify-center">
                {" "}
                {/* linking to slug part so that when i click the new page opens */}
                <Link to={`/posts/slug/${post.slug}`}>
                  <Button className="  bg-blue-400 ">Read more</Button>
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
