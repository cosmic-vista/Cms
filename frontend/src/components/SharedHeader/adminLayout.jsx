// src/layouts/DashboardLayout.jsx
import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";

const DashboardLayout = () => {
  return (
    <div className="flex ">
      <div className="min-h-screen">
        <DashboardSidebar />
      </div>
      <div className="w-full mx-auto ">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
