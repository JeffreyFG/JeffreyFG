import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import BlogPage from "./pages/BlogPage";
import CreatePostPage from "./pages/CreatePostPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  "bootstrap/dist/css/bootstrap.css"
function App()
{
  return <>
  <Router>
    <Routes>
      <Route path="/createpostpage" element={<CreatePostPage/>} />
      <Route path="/Projects" element={<ProjectsPage/>} />
      <Route path="/Blog" element={<BlogPage/>} />
      <Route path="/" element={<HomePage/>} />
    </Routes>
  </Router></>;
}
export default App;
