import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const AdminRoute = () => {
  // getting user from store
  const { currentUser } = useSelector((state) => state.user);
  console.log("inside admin route");
  //  Outlet is a special component that renders the content of the route
  return currentUser && currentUser.user.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="sign-in" />
  );
};

export default AdminRoute;
