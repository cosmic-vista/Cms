import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import NewsArticle from "./Pages/NewsArticle";
import About from "./Pages/About";
import Home from "./Pages/Home";
import SignInform from "./auth/forms/SignInform";
import SignUpform from "./auth/forms/SignUpform";
import Header from "./components/SharedHeader/Header";
import Profile from "./Pages/Profile";

// Import Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/SharedHeader/Footer";
import PrivateRoute from "./components/SharedHeader/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/sign-in" element={<SignInform />} />
        <Route path="/sign-up" element={<SignUpform />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<NewsArticle />} />
        <Route path="/tab=profile" element={<Profile />} />
        {/* // private route for dashbord access */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="colored"
      />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
