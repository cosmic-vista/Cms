import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import NewsArticle from "./Pages/NewsArticle";
import About from "./Pages/About";
import Home from "./Pages/Home";
import SignInform from "./auth/forms/SignInform";
import SignUpform from "./auth/forms/SignUpform";
import Header from "./components/SharedHeader/Header";

// Import Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </BrowserRouter>
  );
};

export default App;
