import PostCard from "@/components/SharedHeader/PostCard";
import React from "react";
import { useState, useEffect } from "react";

const NewsArticle = () => {
  return (
    <div className="max-h-screen overflow-y-scroll max-w-full">
      <h1 className="text-5xl">News Article</h1>
      <PostCard />
    </div>
  );
};

export default NewsArticle;
