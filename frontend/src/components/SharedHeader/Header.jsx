import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Button } from "../ui/button";

import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { toast } from "react-toastify";
import {
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "@/redux/userSlice.js";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser, loading, error } = useSelector((state) => state.user);

  // best way to get username by  optional chaining
  const username = currentUser?.user?.username;
  const email = currentUser?.user?.email;

  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  // // ✅ Set searchTerm if present in URL
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(location.search);
  //   const searchTermFromUrl = urlParams.get("searchTerm");

  //   if (searchTermFromUrl) {
  //     setSearchTerm(searchTermFromUrl);
  //   }
  // }, [location.search]);

  // ✅ Sign out handler
  const handleSignout = async () => {
    try {
      dispatch(signOutStart());
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(signOutSuccess());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out");
      dispatch(signOutFailure());
    }
  };

  useEffect(() => {
    if (location.pathname.includes("/posts/slug/")) {
      setQuery("");
      setResult([]);
    }
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("query is ", query);
      const response = await axios.get(
        `http://localhost:5000/api/auth/search/?query=${query}`,
        {
          withCredentials: true,
        }
      );
      setResult(response.data.posts);
    } catch (error) {
      console.log("error is search is ", error);
    }
  };

  return (
    <div>
      <header className="shadow-lg sticky">
        <div className="flex flex-col gap-2 max-w-6xl lg:max-w-7xl mx-auto p-4">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to={"/"}>
              <h1 className="font-bold text-xl sm:text-2xl flex flex-wrap">
                <span className="text-red-400">Daily</span>
                <span className="text-slate-900">Desk</span>
              </h1>
            </Link>

            {/* Search
            <form
              className="p-3 bg-slate-100 rounded-lg flex items-center"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Search..."
                className="focus:outline-none bg-transparent w-24 sm:w-64 text-black font-medium"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button>
                <FaSearch className="text-slate-800" />
              </button>
            </form> */}

            {/* Nav Links */}
            <ul className="flex gap-6 font-semibold text-xl">
              <Link to={"/"}>
                <li className="hidden lg:inline text-slate-800 hover:underline">
                  Home
                </li>
              </Link>
              <Link to={"/aboutus"}>
                <li className="hidden lg:inline text-slate-800 hover:underline">
                  About
                </li>
              </Link>
              {currentUser ? (
                <Link to={"/news"}>
                  <li className=" w-full hidden lg:inline text-slate-800 hover:underline">
                    News Articles
                  </li>
                </Link>
              ) : (
                <Link to={"/news"}>
                  <li className="hidden lg:inline text-slate-800 hover:underline">
                    News Articles
                  </li>
                </Link>
              )}
            </ul>

            {/* User Section */}
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div>
                    <img
                      src={currentUser.user.profilePic}
                      alt="user avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel className=" mt-0.5 text-center ">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-400 mt-0.5 text-center border-2 rounded-2xl" />
                  <DropdownMenuItem className="block font-serif  border-2 rounded-xl">
                    <div className="flex flex-col gap-1">
                      <span> Name : {username.toUpperCase()}</span>
                      <span> Email : {email}</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-semibold mt-2 text-center border-2 rounded-xl">
                    <Link to="/DashboardProfile">Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="font-semibold mt-2  text-center border-2 rounded-xl"
                    onClick={handleSignout}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/sign-in">
                <button className="bg-black text-white px-4 py-2 rounded-2xl font-medium cursor-pointer">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Loader & Error Feedback */}
          <div className="text-center">
            {loading && (
              <p className="text-blue-500 text-sm font-medium">
                Logging out...
              </p>
            )}
            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
