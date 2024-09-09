import { ReactElement, useState } from "react";
import { routeType } from "./types/routeType.ts";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import { googleLogout } from "@react-oauth/google";
import "bootstrap/js/src/collapse.js";
const logout = () => {
  googleLogout();
  localStorage.removeItem("user");
  window.location.reload();
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
    <Navbar collapseOnSelect expand="lg" className="bg-light" sticky="top">
      <Container fluid>
        <Navbar.Brand href="/">Jeffrey FG</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {NavBarLinksItemListProperty.map((NavBarItem) => (
              <>
                {NavBarItem.routeName === "Create" ? (
                  <>
                    {window.user ? (
                      <Nav.Link key={NavBarItem.id} href={NavBarItem.route}>
                        {NavBarItem.routeName}
                      </Nav.Link>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <Nav.Link key={NavBarItem.id} href={NavBarItem.route}>
                    {NavBarItem.routeName}
                  </Nav.Link>
                )}
              </>
            ))}
          </Nav>
          <Nav className="justify-content-right">
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
          <Button
            variant="outline-danger"
            style={{ margin: "2px" }}
            onClick={logout}
          >
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
