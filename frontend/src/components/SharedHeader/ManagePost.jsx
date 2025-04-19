import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagePost = () => {
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState("");
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/getPost",
        { withCredentials: true }
      );
      setPosts(response.data);
      console.log("posts are ", response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handelDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/deletePost/${id}`, {
        withCredentials: true,
      });
      toast.success("post deleted");
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post :", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl underline text-blue-500 font-semibold text-center mb-5">
        Manage Post
      </h1>
      <div className="overflow-y-auto">
        <table className="w-3/4 border-2 rounded-2xl mx-auto ">
          <thead className="bg-teal-100 text-center ">
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Delete</th>
              <th className="px-4 py-2 border">Edit</th>
            </tr>
          </thead>
          <tbody className="font-serif">
            {posts.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border w-1/4">{item.title}</td>
                <td className="px-4 py-2 border w-1/4">{item.category}</td>
                <td className="p-2 h-32  border  w-1/4">
                  <img
                    src={item.image}
                    alt="post"
                    className="w-full h-full mx-auto object-cover"
                  />
                </td>
                <td
                  className="px-4 py-2 border text-red-500 cursor-pointer w-1/4 text-center"
                  onClick={() => handelDelete(item._id)}
                >
                  Delete
                </td>
                <td className="px-4 py-2  border text-blue-500 cursor-pointer w-1/4">
                  Edit
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePost;
