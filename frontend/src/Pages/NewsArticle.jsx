import PostCard from "@/components/SharedHeader/PostCard";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const NewsArticle = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/sign-up" replace />;
  }

  return (
    <div className="h-screen overflow-y-scroll max-w-full">
      <PostCard />
    </div>
  );
};

export default NewsArticle;
