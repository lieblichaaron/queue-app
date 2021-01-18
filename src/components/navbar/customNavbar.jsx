import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./customNavbar.module.css";
const CustomNavbar = (props) => {
  return (
    <Navbar style={{ backgroundColor: "#FCA311" }}>
      <Navbar.Brand>
        {/* change to logo */}
        <NavLink to="/">Logo</NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {/* display when signed in */}
          {true && (
            <NavLink className={styles["nav-link"]} to="/dashboard">
              Dashboard
            </NavLink>
          )}
          {/* display when signed in && confirm modal on click */}
          {props.isLoggedIn && (
            <div
              className={styles["nav-link"]}
              onClick={(event) => props.handleSignOut(event)}
            >
              Sign out
            </div>
          )}
          {/* display when signed out */}
          {!props.isLoggedIn && (
            <NavLink
              className={styles["nav-link"]}
              to="/"
              onClick={(event) => props.handleSignIn(event)}
            >
              Sign in
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
