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
import Cookie from "js-cookie";
import jwt_decode from "jwt-decode";

function PasswordModal(props) {
  const { isOpen, onCloseModal } = props;
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const changePassword = async (form, actions) => {
    setLoadingSubmit(true);
    await axios
      .put("http://localhost:5000" + "/owner/password", form, {
        headers: { authorization: Cookie.get("iQueue") },
      })
      .then((res) => {
        Cookie.set("iQueue", res.data, { path: "/" });
        props.onUserInfoChange(jwt_decode(res.data));
        props.onCloseModal();
        props.onPasswordSuccess();
      })
      .catch((err) => {
        if (err.response.data.includes("incorrect")) {
          actions.setFieldError("oldPassword", "Incorrect password");
        }
      })
      .finally(() => {
        setLoadingSubmit(false);
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
    <Modal show={isOpen} onHide={onCloseModal} centered>
      {loadingSubmit && <div className="loader" />}
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
                    className={`form-input ${
                      props.errors.oldPassword &&
                      props.touched.oldPassword &&
                      "invalid-field"
                    }`}
                    name="oldPassword"
                    type="password"
                  />
                  {props.errors.oldPassword && props.touched.oldPassword && (
                    <p className="invalid-message red-text">
                      {props.errors.oldPassword}
                    </p>
                  )}
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="newPassword">New password</FormLabel>
                  <Field
                    className={`form-input ${
                      props.errors.newPassword &&
                      props.touched.newPassword &&
                      "invalid-field"
                    }`}
                    name="newPassword"
                    type="password"
                  />
                  {props.errors.newPassword && props.touched.newPassword && (
                    <p className="invalid-message red-text">
                      {props.errors.newPassword}
                    </p>
                  )}
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="newPasswordConfirm">
                    Confirm new password
                  </FormLabel>
                  <Field
                    className={`form-input ${
                      props.errors.newPasswordConfirm &&
                      props.touched.newPasswordConfirm &&
                      "invalid-field"
                    }`}
                    name="newPasswordConfirm"
                    type="password"
                  />
                  {props.errors.newPasswordConfirm &&
                    props.touched.newPasswordConfirm && (
                      <p className="invalid-message red-text">
                        {props.errors.newPasswordConfirm}
                      </p>
                    )}
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
    </Modal>
  );
}

export default PasswordModal;
