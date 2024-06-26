import React from "react";
import { Form, Nav, Navbar, Dropdown, Container, Image } from "react-bootstrap";
import { useAuth } from "../../context/AuthenticationContext";

import { RxPerson } from "react-icons/rx";
import { MdOutlineBookmarks } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo2.png";
import { PiNotePencilThin } from "react-icons/pi";
import { TfiBell } from "react-icons/tfi";
import "./styles.css";
import User from "../user/User";
import {
  SearchQueryProvider,
  useSearchQuery,
} from "../../context/SearchQueryContext";
import { useUser } from "../../context/UserContext";

const HomeNavBar = () => {
  const { logout } = useAuth();
  const { userData } = useUser();
  const { searchQuery, setSearchQuery } = useSearchQuery();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/posts?query=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const userEmail = userData ? userData.email : "";
  const hiddenEmail = userEmail;

  return (
    <div className="navbar-container">
      <SearchQueryProvider>
        <Navbar expand="lg" className="sticky-top top-0">
          <Navbar.Brand href="/">
            <Image className="blog-navbar-brand ms-3" alt="logo" src={logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Form
                className="d-flex mt-3 mt-lg-0"
                onSubmit={handleSearchSubmit}
              >
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 form-control-navbar"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form>
            </Nav>
            <Link
              className="d-flex align-items-center pointer write"
              to="/new-blog"
            >
              <PiNotePencilThin className="PiNotePencilThin fs-4 mx-1" /> Write
            </Link>
            <div className="d-flex justify-content-between align-items-center">
              <TfiBell className="mx-1 my-2 my-lg-0 fs-5 mx-lg-3 TfiBell pointer" />
              <div className="btn-group">
                <Dropdown align="end">
                  <Dropdown.Toggle
                    className="dropdown-toggle"
                    variant="light"
                    id="dropdown-basic"
                  >
                    <User />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <div className="my-4">
                      <Container>
                        <div className="mx-2">
                          <Link to="/profile">
                            <div className="d-flex align-items-center pointer font-weight">
                              <RxPerson className="fs-5" />
                              <p className="ms-3">Profile</p>
                            </div>
                          </Link>
                          <Link to="/authors">
                            <div className="mt-3 d-flex align-items-center pointer font-weight">
                              <BsPeople className="fs-5" />
                              <p className="ms-3">Authors</p>
                            </div>
                          </Link>
                          <Link to="/posts">
                            <div className="mt-3 d-flex align-items-center pointer font-weight">
                              <MdOutlineBookmarks className="fs-5" />
                              <p className="ms-3">Library</p>
                            </div>
                          </Link>
                        </div>
                      </Container>
                      <hr />
                      <Container>
                        <div onClick={handleLogout}>
                          <div className="mx-2 sign-out">
                            <p className="pointer">Sign Out</p>
                            <p className="userEmail mt-1">{hiddenEmail}</p>
                          </div>
                        </div>
                      </Container>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </SearchQueryProvider>
    </div>
  );
};

export default HomeNavBar;
