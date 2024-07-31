import React from "react";
import { createRoot } from 'react-dom/client';
import HomePage from "./pages/HomePage";
import MainProjectsPage from "./pages/MainProjectsPage";
import BlogPage from "./pages/BlogPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import "./styles/global.scss";
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
import  "bootstrap/dist/css/bootstrap.css"

root.render(<Router>
    <Routes>
      <Route path="/app/Projects/" element={<MainProjectsPage/>} />
      <Route path="/app/Blog/" element={<BlogPage/>} />
      <Route path="/app/" element={<HomePage/>} />
    </Routes>
  </Router>);