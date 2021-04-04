import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
export default function Index() {
  const authent = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  function loggedOut(e) {
    e.preventDefault();
    dispatch(logout());
  }
  function loggedInlinks() {
    return (
      <Nav>
        <li className="nav-item">
          <span className="nav-link" onClick={loggedOut}>
            Signout
          </span>
        </li>
      </Nav>
    );
  }
  function notloggedIn() {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink to="signin" className="nav-link">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="signUp" className="nav-link">
            SignUp
          </NavLink>
        </li>
      </Nav>
    );
  }
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1 }}
    >
      <Container>
        <Navbar.Brand href="/">ADMIN-DASHBOARD</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            {/*
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>  */}
          </Nav>

          {authent.authenticate ? loggedInlinks() : notloggedIn()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
