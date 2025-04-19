import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NewsArticle from "./Pages/NewsArticle";
import About from "./Pages/About";
import AboutUs from "./Pages/AboutUs";
import Home from "./Pages/Home";
import SignInform from "./auth/forms/SignInform";
import SignUpform from "./auth/forms/SignUpform";
import Header from "./components/SharedHeader/Header";

// Import Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/SharedHeader/Footer";
import PrivateRoute from "./components/SharedHeader/PrivateRoute";
import CreatePost from "./Pages/CreatePost";
import AdminRoute from "./components/SharedHeader/AdminRoute";
import DashboardLayout from "./components/SharedHeader/adminLayout";
import DashboardProfile from "./components/SharedHeader/DashboardProfile";
import PostCard from "./components/SharedHeader/PostCard";
import ManagePost from "./components/SharedHeader/ManagePost";
import PostPReview from "./Pages/PostPReview";

const App = () => {
  return (
    <BrowserRouter>
      {/* redering header  */}
      <Header />
      <Routes>
        {/* main body parts */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignInform />} />
        <Route path="/sign-up" element={<SignUpform />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/view-post" element={<PostCard />} />
        <Route path="/posts/slug/:slug" element={<PostPReview />} />

        {/* // private route for dashbord access */}
        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/DashboardProfile" element={<DashboardProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<NewsArticle />} />
            <Route path="/posts/slug/:slug" element={<PostPReview />} />
            {/* <Route path="/view-post" element={<PostCard />} /> */}
          </Route>
        </Route>

        {/* // private route for Admin access */}

        <Route element={<AdminRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/manage-post" element={<ManagePost />} />
            <Route path="/DashboardProfile" element={<DashboardProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<NewsArticle />} />
            <Route path="/posts/slug/:slug" element={<PostPReview />} />
            {/* <Route path="/view-post" element={<PostCard />} /> */}
          </Route>
        </Route>
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        theme="colored"
      />

      {/* rendering footer  */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;
