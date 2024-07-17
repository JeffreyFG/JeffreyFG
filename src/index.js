import React from "react";
import { createRoot } from 'react-dom/client';
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import "./styles/global.scss";
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
import  "bootstrap/dist/css/bootstrap.css"

root.render(<Router>
    <Routes>
      <Route path="/app/" element={<Home/>} />
    </Routes>
  </Router>);