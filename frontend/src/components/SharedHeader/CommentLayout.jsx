import { current } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import moment from "moment";

const CommentLayout = ({ postId, userId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState();
  const [remaining, setRemaining] = useState(500);

  const [allComment, setAllComment] = useState([]);

  const username = currentUser.user.username;
  const picture = currentUser.user.profilePic;
  console.log("picture url is", picture);
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
      console.log(response.data);
      if (response.data.success) {
        setComment("");
        setRemaining(500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/getPostComment/${postId}`
        );
        setAllComment(res.data);

        console.log("all comments are", allComment);
      } catch (error) {}
    };
    fetchComment();
  }, [postId, comment]);

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
      <h1 className="font-semibold text-blue-600">
        Comment Section : {allComment.length}
      </h1>
      {allComment.length > 0 ? (
        <div className="space-y-4">
          {allComment.map((text, index) => (
            <div
              key={index}
              className="border border-gray-300 shadow-md bg-white p-4 rounded-lg  mx-auto mt-5"
            >
              <div className="flex items-center gap-3">
                <img
                  src={text.picture}
                  className="w-8 h-8 object-cover rounded-full border border-gray-400"
                  alt="User Profile"
                />
                <span className="text-gray-700 font-semibold">
                  {text.username}
                </span>
                <span className="text-gray-600 text-sm">
                  {moment(text.createdAt).fromNow()}
                </span>
              </div>

              <p className="mt-3 text-gray-600 text-sm border-l-4 border-blue-300 pl-3">
                {text.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-center text-gray-500">No comments yet</h1>
      )}
    </div>
  );
};

export default CommentLayout;
