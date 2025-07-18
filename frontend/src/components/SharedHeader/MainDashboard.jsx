import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardCard from "./DashboardCard";
import { convertToReadableFormat } from "@/lib/utils";

const MainDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers");
        const data = await res.json();
        if (res.ok) {
          setTotalUsers(data.totalUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts");
        const data = await res.json();
        if (res.ok) {
          setTotalPosts(data.totalPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments");
        const data = await res.json();
        if (res.ok) {
          setTotalComments(data.totalComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser?.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  const dateRange = `${convertToReadableFormat(
    currentUser?.createdAt
  )} - ${convertToReadableFormat(Date.now())}`;

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <DashboardCard
          title="All Users"
          description={dateRange}
          chartData={[{ value: totalUsers, fill: "blue" }]}
          chartConfig={{ users: { label: "Users" } }}
          totalValue={totalUsers}
          footerText={"Showing total users for all time"}
          endAngle={250}
        />

        <DashboardCard
          title="All Comments"
          description={dateRange}
          chartData={[{ value: totalComments, fill: "orange" }]}
          chartConfig={{ comments: { label: "Comments" } }}
          totalValue={totalComments}
          footerText={"Showing total comments for all time"}
          endAngle={160}
        />

        <DashboardCard
          title="All Posts"
          description={dateRange}
          chartData={[{ value: totalPosts, fill: "green" }]}
          chartConfig={{ posts: { label: "Posts" } }}
          totalValue={totalPosts}
          footerText={"Showing total posts for all time"}
          endAngle={110}
        />
      </div>
    </div>
  );
};

export default MainDashboard;
