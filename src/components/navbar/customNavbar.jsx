import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./customNavbar.module.css";
import logo from "../../easyQ-logo.png";
const CustomNavbar = (props) => {
  return (
    <Navbar style={{ backgroundColor: "#FCA311" }}>
      <Navbar.Brand>
        {/* change to logo */}
        <NavLink to="/"><img src={logo} className={styles["logo"]}/></NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {/* display when signed in */}
          {props.isLoggedIn && (
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
              Log in
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
