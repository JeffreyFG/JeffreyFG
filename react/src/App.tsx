import "./styles/global.scss";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import BlogPage from "./pages/BlogPage";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import userInterface from "./interfaces/userInterface";
import { useState } from "react";

import React from "react";
import ServerDesignPage from "./pages/ServerDesignPage";
import FullStackPage from "./pages/FullStackPage";
declare global {
  interface Window {
    google: any;
  }
}
const initialValue: userInterface = {
  email: "",
  firstName: "",
  lastName: "",
  picture: "",
  token: "",
};
const App = () => {
  const [stateUser, setStateUser] = useState<userInterface>(initialValue);
  React.useEffect(() => {
    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      setStateUser(JSON.parse(theUser));
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage isLoggedIn={stateUser.email != ""} setStateUser={setStateUser} />} />

      <Route path="/Projects" element={<ProjectsPage isLoggedIn={stateUser.email != ""} setStateUser={setStateUser} />} />
      <Route path="/Blog" element={<BlogPage isLoggedIn={stateUser.email != ""} setStateUser={setStateUser} />} />
      <Route path="/ServerDesign" element={<ServerDesignPage isLoggedIn={stateUser.email != ""} setStateUser={setStateUser} />} />
      <Route path="/FullStack" element={<FullStackPage isLoggedIn={stateUser.email != ""} setStateUser={setStateUser} />} />
      <Route
        path="/Login"
        element={stateUser?.email ? <Navigate to="/" /> : <LoginPage isLoggedIn={stateUser.email != ""} setStateUser={setStateUser} />}
      />
      <Route
        path="/SignUp"
        element={stateUser?.email ? <Navigate to="/" /> : <SignUpPage isLoggedIn={stateUser.email != ""} setStateUser={setStateUser} />}
      />

      <Route path="/createPostPage" element={<CreatePostPage isLoggedIn={stateUser.email != ""} user={stateUser} setStateUser={setStateUser} />} />
    </Routes>
  );
};
export default App;
