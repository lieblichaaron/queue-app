import React from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-modal";
import { loginOwner } from "../../serverFuncs";

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
    const { email, password } = this.state;
    event.preventDefault();

    const ownerObject = {
      email: email,
      password: password,
    };
    loginOwner(ownerObject)
      .then((res) => {
        this.props.handleSignIn(res);
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  }

  handleBodyChange(event) {
    event.preventDefault();
    if (event.target.id === "email")
      this.setState({ email: event.target.value });
    if (event.target.id === "password")
      this.setState({ password: event.target.value });
  }

  render() {
    const clientWidth = document.body.clientWidth;
    const clientHeight = document.body.clientHeight;
    const { email, password } = this.state;
    const modalStyles = {
      content: {
        top: clientHeight * 0.03,
        left: clientWidth > 280 ? clientWidth * 0.1 : clientWidth * 0.01,
        right: clientWidth > 280 ? clientWidth * 0.1 : clientWidth * 0.01,
        bottom: clientHeight - 480,
      },
      overlay: { zIndex: 1000 },
    };

    return (
      <div className="vh-50">
        <Modal
          isOpen={this.props.showModal && this.props.hasAccount}
          onRequestClose={this.props.closeModal}
          shouldCloseOnOverlayClick={true}
          style={modalStyles}
          ariaHideApp={true}
          contentLabel="SignInModal"
        >
          <h3 className="mb-5">Log in</h3>
          <Form onSubmit={(event) => this.handleFormSubmit(event)}>
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

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <div
                className="text-primary"
                onClick={() => this.props.changeModalType()}
              >
                Sign up instead
              </div>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mt-4 float-right"
              disabled={!email || !password}
            >
              {this.props.hasAccount ? "Log In" : "Sign up"}
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;
