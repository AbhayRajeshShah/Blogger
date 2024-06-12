import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//import router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import pages
import App from "./App";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProfilePage from "./pages/Profile";
import NewBlog from "./pages/New";
import Blog from "./pages/Blog";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route element={<App />} path="/" />
      <Route element={<Login />} path="/signin" />
      <Route element={<SignUp />} path="/signup" />
      <Route element={<ProfilePage />} path="/profile" />
      <Route element={<NewBlog />} path="/newPost" />
      <Route element={<Blog />} path="/blog/:id" />
    </Routes>
  </Router>
);
