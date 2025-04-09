import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <nav className="shadow-lg border-2 rounded-xl">
      <div className="flex flex-col md:flex-row md:justify-between items-center p-4 gap-4">
        {/* Logo */}
        <Link
          to={"/"}
          className="text-2xl font-bold flex flex-wrap text-center md:text-left"
        >
          <span className="text-slate-700">Daily</span>
          <span className="text-rose-400">Desk</span>
        </Link>

        {/* Search */}
        <form className="bg-slate-200 rounded-lg flex items-center w-full max-w-sm md:mx-auto">
          <input
            type="text"
            className="p-2 focus:outline-none w-full bg-transparent"
            placeholder="Search"
          />
          <button type="submit" className="p-2 text-gray-500">
            <FaSearch />
          </button>
        </form>

        {/* Nav Links */}

        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
          <ul className="flex flex-col md:flex-row gap-4 text-lg text-center md:text-left">
            <li>
              <Link
                to={"/"}
                className="hover:text-cyan-500 font-serif transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className="hover:text-cyan-500 font-serif transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to={"/news"}
                className="hover:text-cyan-500 font-serif transition-colors"
              >
                Articles
              </Link>
            </li>
          </ul>

          {/* Login Button */}

          <Link to={"/sign-in"}>
            <button className="bg-black text-white px-4 py-2 rounded-2xl font-medium cursor-pointer">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
