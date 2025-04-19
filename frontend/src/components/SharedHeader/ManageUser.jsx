import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageUser = () => {
  const [user, setUser] = useState([]);
  const [id, setId] = useState("");

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/get-all",
        { withCredentials: true }
      );
      setUser(response.data);
      console.log("users are ", response.data);
    } catch (error) {
      console.error("Error while fetching users:", error);
    }
  };

  //   const handelDelete = async (id) => {
  //     const confirmDelete = window.confirm(
  //       "Are you sure you want to delete this post?"
  //     );
  //     if (!confirmDelete) return;
  //     try {
  //       await axios.delete(`http://localhost:5000/api/admin/deletePost/${id}`, {
  //         withCredentials: true,
  //       });
  //       toast.success("post deleted");
  //       fetchUser();
  //     } catch (error) {
  //       console.error("Error deleting post :", error);
  //     }
  //   };

  useEffect(() => {
    fetchUser();
    console.log(user);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl underline text-blue-500 font-semibold text-center mb-5">
        USER DATA
      </h1>
      <div className="overflow-y-auto">
        <table className="w-3/4 border-2 rounded-2xl mx-auto ">
          <thead className="bg-teal-100 text-center ">
            <tr>
              <th className="px-4 py-2 border">Photo</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Admin</th>
              <th className="px-4 py-2 border">Id</th>
              <th className="px-4 py-2 border">Delete</th>
            </tr>
          </thead>
          <tbody className="font-serif">
            {user.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="p-2 h-32  border  w-1/4">
                  <img
                    src={item.profilePic}
                    alt="post"
                    className="w-20 h-20 mx-auto object-fit rounded"
                  />
                </td>
                <td className="px-4 py-2 border w-1/4">{item.userName}</td>
                <td className="px-4 py-2 border w-1/4">{item.email}</td>
                <td className="px-4 py-2 border w-1/4 uppercase">
                  {item.isAdmin.toString()}
                </td>

                <td className="px-4 py-2  border text-blue-500 cursor-pointer w-1/4">
                  {item._id}
                </td>
                <td
                  className="px-4 py-2 border text-red-500 cursor-pointer w-1/4 text-center"
                  onClick={() => handelDelete(item._id)}
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
