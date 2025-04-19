import React from "react";
import { useSelector } from "react-redux";

const About = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="h-screen w-full font-extrabold text-5xl items-center">
      this is about user {currentUser.user.username}
    </div>
  );
};

export default About;
