import { ReactElement, useState } from "react";
import { routeType } from "./types/routeType.ts";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
//import { GoogleLogin } from "@react-oauth/google";

//import { GoogleLogin } from '@react-oauth/google';
import "bootstrap/js/src/collapse.js";
const logout = () => {
  localStorage.removeItem("user");
  console.log("logged out");
  history.pushState(null, "", "/login");
  window.location.replace("/login");
};

export default function NavBarComponent() {
  const [] = useState([]);
  const NavBarLinksItemListProperty: routeType[] = [
    { id: 0, route: "/", routeName: "Home" },
    { id: 1, route: "/Projects", routeName: "Projects" },
    { id: 2, route: "/blog", routeName: "Blog" },
    { id: 4, route: "/createPostPage", routeName: "Create" },
  ];

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Jeffrey FG</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mg-auto">
            {NavBarLinksItemListProperty.map((NavBarItem) => (
              <Nav.Link key={NavBarItem.id} href={NavBarItem.route}>
                {NavBarItem.routeName}
              </Nav.Link>
            ))}
            <UserButton></UserButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  function UserButton(): ReactElement {
    if (window.user) {
      return (
        <Nav.Link href="#">
          <Button variant="outline-danger" style={{ margin: "2px" }} onClick={logout}>
            Logout
          </Button>
        </Nav.Link>
      );
    } else {
      return (
        <>
          <Nav.Link href="/login">
            {/* <a href="/login">
              <Button variant="primary" style={{ margin: "2px" }}> */}
            Login
            {/* </Button>
            </a> */}
          </Nav.Link>
          <Nav.Link disabled>/</Nav.Link>

          <Nav.Link href="/signUp">
            {/* <a href="/login">
              <Button variant="primary" style={{ margin: "2px" }}> */}
            Sign Up
            {/* </Button>
            </a> */}
          </Nav.Link>
        </>
      );
    }
  }
}
