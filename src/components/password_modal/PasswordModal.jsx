import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  FormGroup,
  FormLabel,
  Modal,
} from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "./PasswordModal.css";

function PasswordModal(props) {
  const { isOpen, onCloseModal } = props;
  const [changedPassword, setChangedPassword] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setChangedPassword(false);
    }, 0);
  }, [isOpen]);

  const changePassword = async (form, actions) => {
    await axios
      .put("http://localhost:5000" + "/owner/password", form, {
        headers: { email: props.user.email },
      })
      .then(() => {
        setChangedPassword(true);
        setTimeout(() => {
          props.onCloseModal();
        }, 3000);
      })
      .catch((err) => {
        if (err.response.data.includes("incorrect")) {
          actions.setFieldError("oldPassword", "Incorrect password");
        }
      });
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Please enter your current password"),
    newPassword: Yup.string().required("Please enter your new password"),
    newPasswordConfirm: Yup.string()
      .required("Please type your new password again")
      .oneOf([Yup.ref("newPassword"), null], "Passwords do not match"),
  });

  return (
    <Modal show={isOpen} onHide={onCloseModal} centered className={changedPassword && "password-success-modal"}>
      {changedPassword ? (
        <Modal.Body className="password-success-container">
          <FontAwesomeIcon icon={faCheckCircle} />
          Successfully changed password
        </Modal.Body>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              newPasswordConfirm: "",
            }}
            onSubmit={(values, actions) => {
              changePassword(values, actions);
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
        </>
      )}
    </Modal>
  );
}

export default PasswordModal;
