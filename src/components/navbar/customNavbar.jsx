import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./customNavbar.module.css";
const CustomNavbar = () => {
  return (
    <Navbar style={{ "background-color": "#FCA311" }}>
      <Navbar.Brand>
        {/* change to logo */}
        <NavLink to="/">Logo</NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {/* display when signed in */}
          {true && (
            <NavLink className={styles["nav-link"]} to="/account">
              Acount settings
            </NavLink>
          )}
          {/* display when signed in && confirm modal on click */}
          {true && <div className={styles["nav-link"]}>Sign out</div>}
          {/* display when signed out */}
          {false && (
            <NavLink className={styles["nav-link"]} to="/">
              Sign in
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
