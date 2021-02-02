import { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./customNavbar.module.css";
import logo from "../../easyQ-logo.png";
import SignOutModal from "../signout_modal/signOutModal";
const CustomNavbar = (props) => {
  const [showSignOutConfirmModal, setShowSignOutConfirmModal] = useState(false);

  return (
    <Navbar style={{ backgroundColor: "#FCA311" }}>
      <Navbar.Brand>
        <NavLink to="/">
          <img src={logo} alt="easyQ logo" className={styles["logo"]} />
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="h-100">
        <Nav
          className="ml-auto d-flex align-items-center text-nowrap"
          style={{ height: "100%" }}
        >
          {props.isLoggedIn && (
            <NavLink
              className={`${styles["nav-link"]} ${styles["dash-link"]}`}
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          )}
          <SignOutModal
            showSignOutConfirmModal={showSignOutConfirmModal}
            handleSignOut={props.handleSignOut}
            setShowSignOutConfirmModal={setShowSignOutConfirmModal}
          />
          {props.isLoggedIn && (
            <div
              className={styles["nav-link"]}
              onClick={() => {
                setShowSignOutConfirmModal(true);
              }}
            >
              Sign out
            </div>
          )}
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
