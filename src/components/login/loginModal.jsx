import React from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-modal";
import axios from "axios";
import Cookie from "js-cookie";

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    };
    Modal.setAppElement("#root");
  }

  handleFormSubmit(event) {
    const { displayName, email, password } = this.state;
    event.preventDefault();
    if (!this.props.hasAccount) {
      const ownerObject = {
        displayName: displayName,
        email: email,
        password: password,
      };
      return axios({
        method: "post",
        url: "http://localhost:5000/owner",
        data: ownerObject,
      })
        .then((res) => {
          console.log(res);
          alert(
            `Account creation successful. \nWelcome to iQueue ${res.data.displayName}!`
          );
          console.log(res.data);
          Cookie.set("iQueue", res.data.authToken, { path: "/" });
          window.location.assign(`${window.location.origin}/dashboard`);
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    } else if (this.props.hasAccount) {
      const ownerObject = {
        email: email,
        password: password,
      };
      return axios({
        method: "post",
        url: "http://localhost:5000/owner/login",
        data: ownerObject,
      })
        .then((res) => {
          console.log(res);
          alert(`Welcome back ${res.data.displayName}!`);
          Cookie.set("iQueue", res.data.authToken, { path: "/" });
          window.location.assign(`${window.location.origin}/dashboard`);
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }
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
    const { displayName, email, password, passwordConfirm } = this.state;
    const modalStyles = {
      content: {
        top: "8%",
        left: "10%",
        right: "10%",
        bottom: this.props.hasAccount ? "31%" : "5%",
      },
      overlay: { zIndex: 1000 },
    };

    let submitButton;
    if (this.props.hasAccount) {
      submitButton = (
        <Button
          variant="primary"
          type="submit"
          className="mt-4 float-right"
          disabled={!email || !password}
        >
          {this.props.hasAccount ? "Log In" : "Sign up"}
        </Button>
      );
    }
    if (!this.props.hasAccount) {
      submitButton = (
        <Button
          variant="primary"
          type="submit"
          className="mt-4 float-right"
          disabled={
            !email ||
            !password ||
            !passwordConfirm ||
            !displayName ||
            password !== passwordConfirm
          }
        >
          {this.props.hasAccount ? "Log In" : "Sign up"}
        </Button>
      );
    }

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
          <h2 className="mb-5">
            {this.props.hasAccount ? "Log in" : "Create Account"}
          </h2>
          <Form onSubmit={(event) => this.handleFormSubmit(event)}>
            {!this.props.hasAccount && (
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

            {!this.props.hasAccount && (
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
                onClick={() => this.props.changeModalType()}
              >
                {this.props.hasAccount ? "Sign up instead" : "Log in instead"}
              </div>
            </Form.Group>
            {submitButton}
          </Form>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;
