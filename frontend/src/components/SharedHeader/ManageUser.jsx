import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageUser = () => {
  const [users, setUser] = useState([]);
  const [id, setId] = useState("");

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/get-all",
        { withCredentials: true }
      );
      console.log("this is from managesuer", response);
      setUser(response.data);
    } catch (error) {
      console.error("Error while fetching users:", error);
    }
  };

  const handelDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this User?"
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/deleteUser/${id}`, {
        withCredentials: true,
      });
      toast.success("User deleted");
      fetchUser();
    } catch (error) {
      console.error("Error deleting User :", error);
    }
  };

  useEffect(() => {
    fetchUser();
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
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-2 h-32  border  w-1/4">
                  <img
                    src={user.profilePic}
                    alt="post"
                    className="w-20 h-20 mx-auto object-fit rounded"
                  />
                </td>
                <td className="px-4 py-2 border w-1/4">{user.userName}</td>
                <td className="px-4 py-2 border w-1/4">{user.email}</td>
                <td className="px-4 py-2 border w-1/4 uppercase">
                  {user.isAdmin.toString()}
                </td>

                <td className="px-4 py-2  border text-blue-500 cursor-pointer w-1/4">
                  {user._id}
                </td>
                <td
                  className="px-4 py-2 border text-red-500 cursor-pointer w-1/4 text-center"
                  onClick={() => handelDelete(user._id)}
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
