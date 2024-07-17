import React, { useEffect, useState } from "react";

export default function Home() {
  const [repos, setUsers] = useState([]);
  

  return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/projects">Projects</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/blog">Blog</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/app/">React</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/blog/createpostpage">Create</a>
        </li>
      </ul>
    </div>
  </div>
</nav>);
}