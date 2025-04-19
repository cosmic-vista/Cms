import PostCard from "@/components/SharedHeader/PostCard";
import React from "react";
import { useState, useEffect } from "react";

const NewsArticle = () => {
  return (
    <div className="h-screen overflow-y-scroll max-w-full">
      <PostCard />
    </div>
  );
};

export default NewsArticle;
