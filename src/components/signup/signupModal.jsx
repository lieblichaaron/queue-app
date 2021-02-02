import React from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-modal";
import axios from "axios";
import Cookie from "js-cookie";

class SignupModal extends React.Component {
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
        Cookie.set("easyQ", res.data.authToken, { path: "/" });
        window.location.assign(`${window.location.origin}/dashboard`);
      })
      .catch((err) => {
        alert(err.response.data.error);
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
    const clientWidth = document.body.clientWidth;
    const clientHeight = document.body.clientHeight;
    const { displayName, email, password, passwordConfirm } = this.state;
    const modalStyles = {
      content: {
        top: clientHeight * 0.03,
        left: clientWidth > 280 ? clientWidth * 0.1 : clientWidth * 0.01,
        right: clientWidth > 280 ? clientWidth * 0.1 : clientWidth * 0.01,
        bottom: clientHeight - 680,
      },
      overlay: { zIndex: 1000 },
    };

    return (
      <div className="vh-50">
        <Modal
          isOpen={this.props.showModal && !this.props.hasAccount}
          onRequestClose={this.props.closeModal}
          shouldCloseOnOverlayClick={true}
          style={modalStyles}
          ariaHideApp={true}
          contentLabel="SignUpModal"
        >
          <h3 className="mb-5">Create Account</h3>
          <Form onSubmit={(event) => this.handleFormSubmit(event)}>
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

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <div
                className="text-primary"
                onClick={() => this.props.changeModalType()}
              >
                Log in instead
              </div>
            </Form.Group>
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
              Sign up
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default SignupModal;
