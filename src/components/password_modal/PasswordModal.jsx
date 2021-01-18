import React from "react";
import {
  Container,
  Button,
  FormGroup,
  FormLabel,
  Modal,
} from "react-bootstrap";
import { Formik, Form, Field } from "formik";

function PasswordModal(props) {
  return (
    <Modal show={props.isOpen} onHide={props.onCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form>
            <Container fluid>
              <FormGroup>
                <FormLabel htmlFor="oldPassword">Old password</FormLabel>
                <Field
                  className="form-input"
                  name="oldPassword"
                  type="password"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="newPassword">New password</FormLabel>
                <Field
                  className="form-input"
                  name="newPassword"
                  type="password"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="newPasswordConfirm">
                  Confirm new password
                </FormLabel>
                <Field
                  className="form-input"
                  name="newPasswordConfirm"
                  type="password"
                />
              </FormGroup>
            </Container>
          </Form>
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onCloseModal();
          }}
        >
          Save changes
        </Button>
        <Button
          onClick={() => {
            props.onCloseModal();
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PasswordModal;
