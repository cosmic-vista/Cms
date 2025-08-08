import React from "react";
import { useSelector } from "react-redux";

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // getting user from store
  const { currentUser } = useSelector((state) => state.user);
  
  //  Outlet is a special component that renders the content of the route
  return currentUser ? <Outlet /> : <Navigate to="sign-up" />;
};

export default PrivateRoute;
