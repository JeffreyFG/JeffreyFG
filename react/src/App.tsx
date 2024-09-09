import "./styles/global.scss";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import BlogPage from "./pages/BlogPage";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useLocalStorage } from "./hooks/useLocalStorage";
import userInterface from "./interfaces/userInterface";
declare global {
  interface Window {
    google: any;
    user: boolean;
  }
}

function App() {
  const initialValue: userInterface = {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
    token: "",
  };
  const [user] = useLocalStorage<userInterface>("user", initialValue);
  if (user) {
    window.user = true;
  } else {
    window.user = false;
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/createPostPage"
            element={
              user ? (
                <CreatePostPage {...user} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route path="/Projects" element={<ProjectsPage />} />
          <Route path="/Blog" element={<BlogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
