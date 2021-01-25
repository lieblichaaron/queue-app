import React from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-modal";

import axios from "axios";

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      hasAccount: false,
    };
    Modal.setAppElement("#root");
  }

  changeModalType(event) {
    event.preventDefault();
    this.setState({ hasAccount: !this.state.hasAccount });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const ownerObject = {
      displayName: this.state.displayName,
      email: this.state.email,
      password: this.state.password,
    };
    return axios({
      method: "post",
      url: "http://localhost:5000/owner",
      data: ownerObject,
    }).then((res) => {
      alert(
        `Account creation successful. \nWelcome to iQueue ${res.data.displayName}!`
      );
      // Cookies.set("I-Pets", `${res.data.email}`, { path: "/" });
      window.location.assign(`${window.location.origin}/dashboard`);
    });
  }

  handleBodyChange(event) {
    event.preventDefault();
    if (event.target.id === "displayName")
      this.setState({ displayName: event.target.value });
    if (event.target.id === "email")
      this.setState({ email: event.target.value });
    if (event.target.id === "password")
      this.setState({ password: event.target.value });
    if (event.target.id === "passwordConfirm")
      this.setState({ passwordConfirm: event.target.value });
  }

  render() {
    const {
      displayName,
      email,
      password,
      passwordConfirm,
      hasAccount,
    } = this.state;
    const modalStyles = {
      content: {
        top: "8%",
        left: "10%",
        right: "10%",
        bottom: this.state.hasAccount ? "31%" : "5%",
      },
      overlay: { zIndex: 1000 },
    };
    return (
      <div className="vh-50">
        <Modal
          isOpen={this.props.showModal}
          onRequestClose={this.props.closeModal}
          shouldCloseOnOverlayClick={true}
          style={modalStyles}
          ariaHideApp={true}
          contentLabel="SignInModal"
        >
          <h2 className="mb-5">{hasAccount ? "Log in" : "Create Account"}</h2>
          <Form onSubmit={(event) => this.handleFormSubmit(event)}>
            {!hasAccount && (
              <Form.Group>
                <Form.Label> Display Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  required
                  maxLength="30"
                  minLength="3"
                  onInput={(event) => this.handleBodyChange(event)}
                  id="displayName"
                  value={displayName}
                />
              </Form.Group>
            )}

            <Form.Group className="mt-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                onInput={(event) => this.handleBodyChange(event)}
                id="email"
                value={email}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                maxLength="30"
                minLength="7"
                onInput={(event) => this.handleBodyChange(event)}
                id="password"
                value={password}
              />
            </Form.Group>

            {!hasAccount && (
              <Form.Group>
                <Form.Label> Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  maxLength="30"
                  minLength="7"
                  onInput={(event) => this.handleBodyChange(event)}
                  id="passwordConfirm"
                  value={passwordConfirm}
                />
                <p
                  className="ml-2 mb-0"
                  style={{
                    color: password !== passwordConfirm ? "red" : "transparent",
                    fontSize: "80%",
                  }}
                >
                  Passwords don't match
                </p>
              </Form.Group>
            )}

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <div
                className="text-primary"
                onClick={(event) => this.changeModalType(event)}
              >
                {hasAccount ? "Sign up instead" : "Login instead"}
              </div>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mt-4 float-right"
              disabled={
                !displayName ||
                !email ||
                !password ||
                !passwordConfirm ||
                password !== passwordConfirm
              }
            >
              {hasAccount ? "Sign In" : "Sign up"}
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;
