import React from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-modal";

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      formSubmitDisabled: true,
      hasAccount: false,
    };

    this.customStyles = {
      content: {
        top: "20%",
        left: "10%",
        right: "10%",
        bottom: this.state.hasAccount ? "40%" : "15%",
      },
    };

    Modal.setAppElement("#root");
  }

  changeModalType(event) {
    event.preventDefault();
    console.log("fire changeModalType");
    this.setState({ hasAccount: !this.state.hasAccount });
  }

  handleFormSubmit(event) {
    console.log("This goes to the back end eventually!!");
  }

  handleBodyChange(event) {
    event.preventDefault();
    const { email, password, passwordConfirm, hasAccount } = this.state;
    // Disable submit button if not all fields are filled
    if (
      !hasAccount &&
      email.length &&
      password.length &&
      passwordConfirm.length
    )
      this.setState({ formSubmitDisabled: false });
    else if (hasAccount && email.length && password.length)
      this.setState({ formSubmitDisabled: false });
    else this.setState({ formSubmitDisabled: true });

    // Set state per form input
    if (event.target.id === "email")
      this.setState({ email: event.target.value });
    if (event.target.id === "password")
      this.setState({ password: event.target.value });
    if (event.target.id === "passwordConfirm")
      this.setState({ passwordConfirm: event.target.value });
  }

  render() {
    const { hasAccount, formSubmitDisabled } = this.state;
    const modalStyles = {
      content: {
        top: "20%",
        left: "10%",
        right: "10%",
        bottom: this.state.hasAccount ? "25%" : "15%",
      },
    };
    console.log("loginModal shows???: ", this.props.showModal);
    return (
      <div className="vh-50">
        <Modal
          isOpen={this.props.showModal}
          onRequestClose={this.props.closeModal}
          shouldCloseOnOverlayClick={true}
          style={modalStyles}
          // ariaHideApp={false} // enabling this helps screen reader to understand that this is a Modal but it might lead to glitches
          contentLabel="SignInModal"
        >
          <h2 className="mb-5">{hasAccount ? "Log in" : "Create Account"}</h2>
          <Form onSubmit={(event) => this.handleFormSubmit(event)}>
            <Form.Group className="mt-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                onInput={(event) => this.handleBodyChange(event)}
                id="email"
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
                />
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
              disabled={formSubmitDisabled}
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
