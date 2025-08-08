import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Progress from "./Progress"; // adjust path if needed
import axios from "axios";

const MainDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComment, setTotalComment] = useState(0);

  const { currentUser } = useSelector((state) => state.user);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/get-all", {
        withCredentials: true,
      });
      setTotalUsers(res.data.length);
    } catch (error) {
      console.log("User fetch error:", error.message);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/getPost",
        { withCredentials: true }
      );
      setTotalPosts(response.data.totalPost);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const fetchComment = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/get-all-Comment",
        {
          withCredentials: true,
        }
      );
      setTotalComment(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPosts();
    fetchComment();
  }, [currentUser]);

  return (
    <div className="p-4 md:mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center">Dashboard Summary</h1>

      <div className="flex flex-wrap gap-6 justify-center">
        <Progress value={totalUsers} label="Total Users" color="#6366f1" />
        <Progress value={totalPosts} label="Total Posts" color="#6366f1" />
        <Progress value={totalComment} label="Total Comment" color="#6366f1" />
      </div>
    </div>
  );
};

export default MainDashboard;
