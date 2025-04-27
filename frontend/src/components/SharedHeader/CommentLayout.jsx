import { current } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";

const CommentLayout = ({ postId, userId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState();
  const [remaining, setRemaining] = useState(500);

  const username = currentUser.user.username;
  const picture = currentUser.user.profilePic;
  const email = currentUser.user.email;

  const handelClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/comment",
        {
          username,
          email,
          postId,
          picture,
          comment,
          userId,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        setComment("");
        setRemaining(500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" max-w-3xl mx-auto w-full p-3 mt-6">
      {currentUser ? (
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <p>Signed as :</p>
          <img src={picture} className="h-5 w-5 object-fill rounded-full" />@
          {username}
        </div>
      ) : (
        <>
          <p className="text-red font-extralight">
            You must be a registered user !
          </p>
        </>
      )}
      {currentUser && (
        <form className="border-2 border-blue-200 rounded-md p-4">
          <Textarea
            value={comment}
            className="border border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Add your comment...."
            onChange={(e) => {
              setComment(e.target.value);
              setRemaining(500 - e.target.value.length);
            }}
          />
          <div className="flex justify-between items-center mt-5 ">
            <p className="text-gray-400">length remaining {remaining} </p>
            <Button onClick={handelClick}>post</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentLayout;
