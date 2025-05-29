import React from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-dark mt-auto py-4 border-top ">
      <Container>
        <Row className="mb-3">
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              Learn more <a href="/about">about us</a> and what we do.
            </p>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedin size={24} />
              </a>
            </div>
          </Col>

          <Col md={4}>
            <h5>Preferences</h5>
            <div className="d-flex flex-column gap-2">
              <DropdownButton
                as={ButtonGroup}
                title="Language"
                id="dropdown-language"
                variant="outline-secondary"
              >
                <Dropdown.Item>English</Dropdown.Item>
                <Dropdown.Item>हिंदी</Dropdown.Item>
                <Dropdown.Item>Français</Dropdown.Item>
              </DropdownButton>

              <DropdownButton
                as={ButtonGroup}
                title="Country"
                id="dropdown-country"
                variant="outline-secondary"
              >
                <Dropdown.Item>India</Dropdown.Item>
                <Dropdown.Item>USA</Dropdown.Item>
                <Dropdown.Item>France</Dropdown.Item>
              </DropdownButton>

              <DropdownButton
                as={ButtonGroup}
                title="Currency"
                id="dropdown-currency"
                variant="outline-secondary"
              >
                <Dropdown.Item>INR (₹)</Dropdown.Item>
                <Dropdown.Item>USD ($)</Dropdown.Item>
                <Dropdown.Item>EUR (€)</Dropdown.Item>
              </DropdownButton>
            </div>
          </Col>

          <Col md={4}>
            <h5>Legal</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/privacy">Privacy Notice</a>
              </li>
              <li>
                <a href="/terms">Terms of Use</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <small>
              &copy; {new Date().getFullYear()} Your Company. All rights
              reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
