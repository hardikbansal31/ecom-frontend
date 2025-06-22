import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import { FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";

const CustomNavbar = () => {
  const { username, logout } = useContext(AuthContext);

  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaHome />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/all">
              All Products
            </Nav.Link>
            {/* <NavDropdown title="Categories" id="categories-dropdown">
              <NavDropdown.Item as={Link} to="/orders">
                Popular
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/phones">
                Phones
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/laptops">
                Laptops
              </NavDropdown.Item>
            </NavDropdown> */}

            <Nav.Link as={Link} to="/cart">
              <FiShoppingCart className="me-1" /> Cart
            </Nav.Link>

            <NavDropdown
              title={
                <>
                  <FiUser className="me-1" />
                  {username || "Profile"}
                </>
              }
              id="profile-dropdown"
            >
              {username ? (
                <>
                  <NavDropdown.Item as={Link} to="/orders">
                    Your Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/settings">
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Sign Out</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item as={Link} to="/login">
                    Sign In
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/register">
                    Register
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>

          {/* Search */}
          <Form className="d-flex">
            <FormControl type="search" placeholder="Search" className="me-2" />
            <Button variant="outline-success">
              <FiSearch />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
