import { current } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";

const CommentLayout = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState();
  const [remaining, setRemaining] = useState(200);

  useEffect(() => {
    console.log(comment);
  }, [comment]);

  return (
    <div className=" max-w-3xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 text-gary-500 text-sm">
          <p>Signed as :</p>
          <img
            src={currentUser.user.profilePic}
            className="h-5 w-5 object-fill rounded-full"
          />
          @{currentUser.user.username}
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
            className="border border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Add your comment...."
            onChange={(e) => {
              setComment(e.target.value);
              setRemaining(200 - e.target.value.length);
            }}
          />
          <div className="flex justify-between items-center mt-5 ">
            <p className="text-gray-400">length remaining {remaining} </p>
            <Button>post</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentLayout;
