import { useState } from "react";
import { Navbar, Nav, Button, Modal } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./customNavbar.module.css";
import logo from "../../easyQ-logo.png";
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
          <Modal
            show={showSignOutConfirmModal}
            onHide={() => {
              setShowSignOutConfirmModal(false);
            }}
          >
            <Modal.Body>Are you sure you want to log out?</Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  props.handleSignOut();
                }}
              >
                Log Out
              </Button>
              <Button
                onClick={() => {
                  setShowSignOutConfirmModal(false);
                }}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
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
