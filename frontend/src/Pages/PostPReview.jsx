import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PostPreview = () => {
  const [singlePost, setPost] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/posts/slug/${slug}`,
          {
            withCredentials: true,
          }
        );
        setPost(response.data);
        console.log("Fetched Post:", response.data);
      } catch (error) {
        console.error("Error fetching single post:", error);
      }
    };

    getData();
  }, [slug]);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-xl block">
      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        {singlePost.title}
      </h1>

      {/* Category & Created At */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
        <p className="italic">
          Category:{" "}
          <span className="text-gray-700 font-medium">
            {singlePost.category}
          </span>
        </p>
        <p>
          {singlePost.createdAt &&
            new Date(singlePost.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
        </p>
      </div>

      {/* Image */}
      {singlePost.image && (
        <div className="flex justify-center mb-6">
          <img
            src={singlePost.image}
            alt={singlePost.title}
            className="max-w-2xl w-full h-72 object-cover rounded-lg shadow"
          />
        </div>
      )}

      {/* Description */}
      <div
        className="text-gray-800 leading-relaxed text-md space-y-4"
        dangerouslySetInnerHTML={{ __html: singlePost.description }}
      />
    </div>
  );
};

export default PostPreview;
