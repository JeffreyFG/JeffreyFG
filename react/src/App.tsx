import "./styles/global.scss";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import BlogPage from "./pages/BlogPage";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import { Routes, Route, Navigate, useNavigate, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useLocalStorage } from "./hooks/useLocalStorage";
import userInterface from "./interfaces/userInterface";
import { useState } from "react";

import React from "react";
declare global {
  interface Window {
    google: any;
  }
}

const App = () => {
  const navigate = useNavigate();
  const callNavigate = (route: string) => {
    console.log(
      `navigate called with route ${route}, and state user ${stateUser}`
    );
    navigate(route);
  };
  const [_storageUser, setStorageUser] = useLocalStorage<
    userInterface | undefined
  >("user", undefined);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [stateUser, setStateUser] = useState<userInterface | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (stateUser) {
      console.log("storage user updated in use effect");
      setLoggedIn(true);
      setStorageUser(stateUser);
    } else {
      console.log("storage user removed in use effect");
      setLoggedIn(false);
      setStorageUser(undefined);
    }
  }, [stateUser]);

  const GuestRoute = () => {
    return !loggedIn ? <Outlet /> : <Navigate to="/" replace />;
  };

  const ProtectedRoutes = () => {
    return loggedIn ? <Outlet /> : <Navigate to="/login" replace />;
  };
  if (stateUser === null) {
    return <h1>Loading...</h1>;
  }
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route
          path="/"
          element={
            <HomePage isLoggedIn={loggedIn} setStateUser={setStateUser} />
          }
        />

        <Route
          path="/Projects"
          element={
            <ProjectsPage isLoggedIn={loggedIn} setStateUser={setStateUser} />
          }
        />
        <Route
          path="/Blog"
          element={
            <BlogPage isLoggedIn={loggedIn} setStateUser={setStateUser} />
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage
              isLoggedIn={loggedIn}
              setStateUser={setStateUser}
              callNavigate={callNavigate}
            />
          }
        />
        <Route
          path="/signUp"
          element={
            <SignUpPage isLoggedIn={loggedIn} setStateUser={setStateUser} />
          }
        />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route
          path="/createPostPage"
          element={
            <CreatePostPage
              isLoggedIn={loggedIn}
              user={stateUser}
              setStateUser={setStateUser}
            />
          }
        />
      </Route>
    </Routes>
  );
};
export default App;
