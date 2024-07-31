import React, { useEffect, useState } from "react";
import NavBarElement from "./NavBarElement.js"; 

export default function NavBar() {
  const [repos, setUsers] = useState([]);
  const NavBarLinksItemListProperty=[{id:0,route:"/",routeName:"Home"},{id:1,route:"/app/Projects/",routeName:"Projects"},{id:2,route:"/app/blog" ,routeName: "Blog"},{id:4,route:"/blog/createpostpage" ,routeName: "Create"}]
  return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <>
          {NavBarLinksItemListProperty.map(NavBarItem => <NavBarElement key={NavBarItem.id} {...NavBarItem} />)}
        </>
      </ul>
    </div>
  </div>
</nav>);
}