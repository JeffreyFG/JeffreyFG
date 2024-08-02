import  {  useState } from "react";
import NavBarElement from "./NavBarElement.tsx"; 
import { routeType } from "./types/routeType.ts";
//import { GoogleLogin } from '@react-oauth/google';

export default function NavBar() 
{
  
  const [] = useState([]);
  const NavBarLinksItemListProperty:routeType[]=[{id:0,route:"/",routeName:"Home"},{id:1,route:"/Projects",routeName:"Projects"},{id:2,route:"/blog" ,routeName: "Blog"},{id:4,route:"/createpostpage" ,routeName: "Create"}]
  return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <>
          {NavBarLinksItemListProperty.map(NavBarItem => <NavBarElement key={NavBarItem.id} {...NavBarItem} />)}
        </>
      
      </ul>
      <form className="form-inline my-2 my-lg-0">
    </form>
    </div>
  </div>
</nav>);
}