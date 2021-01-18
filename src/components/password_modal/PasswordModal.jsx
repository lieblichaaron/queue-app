import React from "react";
import {
  Container,
  Button,
  FormGroup,
  FormLabel,
  Modal,
} from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

function PasswordModal(props) {
  const { isOpen, onCloseModal } = props;

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Please enter your current password"),
    newPassword: Yup.string().required("Please enter your new password"),
    newPasswordConfirm: Yup.string()
      .required("Please type your new password again")
      .oneOf([Yup.ref("newPassword"), null], "Passwords do not match"),
  });

  return (
    <Modal show={isOpen} onHide={onCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          newPasswordConfirm: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={validationSchema}
      >
        {(props) => (
          <Form>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="submit"
                onClick={() => {
                  onCloseModal();
                }}
                disabled={
                  !props.isValid || Object.keys(props.touched).length === 0
                }
              >
                Save changes
              </Button>
              <Button
                onClick={() => {
                  onCloseModal();
                }}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default PasswordModal;
