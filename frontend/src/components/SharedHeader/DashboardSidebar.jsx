import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "@/redux/userSlice.js";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { GrArticle } from "react-icons/gr";
import { Link } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import { SiNginxproxymanager } from "react-icons/si";
import { MdManageAccounts } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";

const DashboardSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  // console.log("current isAdmin is ", currentUser.user.isAdmin);

  const handleClick = async () => {
    try {
      dispatch(signOutStart());
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(signOutSuccess());
      toast.success("Logged out successfully");
      navigate("/sign-in");
    } catch (error) {
      toast.error("Failed to log out");
      dispatch(signOutFailure());
    }
  };

  return (
    <aside className="bg-gradient-to-b font-semibold from-gray-100 to-gray-300 w-60 h-full text-gray-800 flex flex-col  p-6 shadow-md">
      {/* Dashboard Title */}

      <h2 className="text-xl font-bold mb-10 text-center">
        {currentUser.user.isAdmin ? "Admin Dashboard" : "Dashboard"}
      </h2>

      {/* Profile Item */}
      <div className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer mb-6">
        <FaUser />
        <Link to="/DashboardProfile">
          <span>Profile</span>
        </Link>
      </div>
      {currentUser.user.isAdmin && (
        <div className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer mb-6">
          <TbLayoutDashboardFilled />
          <Link to="/Admin-Dashboard">
            <span>Dashbaord</span>
          </Link>
        </div>
      )}

      {currentUser.user.isAdmin && (
        <div className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer mb-6">
          <IoIosCreate />
          <Link to="/create-post">
            <span>Create Post</span>
          </Link>
        </div>
      )}

      {currentUser.user.isAdmin && (
        <div className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer mb-6">
          <SiNginxproxymanager />
          <Link to="/manage-post">
            <span>Manage Post</span>
          </Link>
        </div>
      )}
      {currentUser.user.isAdmin && (
        <div className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer mb-6">
          <MdManageAccounts />
          <Link to="/manage-user">
            <span>Manage User</span>
          </Link>
        </div>
      )}
      {/* <div className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer mb-6">
        <FcAbout />
        <Link to="/about">
          <span>About</span>
        </Link>
      </div> */}

      {/* Logout Item */}
      <div
        className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer"
        onClick={handleClick}
      >
        <FiLogOut />
        <span>Logout</span>
      </div>
    </aside>
  );
};
export default DashboardSidebar;
