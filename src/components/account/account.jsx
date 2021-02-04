import React, { useState, useContext } from "react";
import "./account.css";
import {
  Container,
  Row,
  Button,
  Col,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import PasswordModal from "../password_modal/PasswordModal";
import * as Yup from "yup";
import UserContext from "../../contexts/UserContext";
import Cookie from "js-cookie";
import jwt_decode from "jwt-decode";
import { updateUserInfo } from "../../serverFuncs";
import TitleBanner from "../title_banner/titleBanner";

function Account(props) {
  const user = useContext(UserContext);

  const [canEdit, setCanEdit] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);

  const handleCloseModal = () => {
    setShowPasswordModal(false);
  };

  const handlePasswordSuccess = () => {
    setShowPasswordSuccess(true);
    setTimeout(() => {
      setShowPasswordSuccess(false);
    }, 3000);
  };

  const updateInformation = async (form, actions) => {
    setLoadingSubmit(true);
    updateUserInfo(form)
      .then((data) => {
        Cookie.set("easyQ", data, { path: "/" });
        props.onUserInfoChange(jwt_decode(data));
        setCanEdit(false);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      })
      .catch((err) => {
        if (err.response.data.includes("exists")) {
          actions.setFieldError(
            "email",
            "There is already an account registered with this email address"
          );
        }
      })
      .finally(() => {
        setLoadingSubmit(false);
      });
  };

  const validationSchema = Yup.object().shape({
    displayName: Yup.string().required("You must have a display name"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("We can't identify you without an email address"),
  });

  return (
    <div>
      {loadingSubmit && <div className="loader" />}
      <PasswordModal
        isOpen={showPasswordModal}
        user={user}
        onUserInfoChange={(user) => {
          props.onUserInfoChange(user);
        }}
        onCloseModal={handleCloseModal}
        onPasswordSuccess={() => {
          handlePasswordSuccess();
        }}
        centered
      />
      <TitleBanner title={"Account Settings"}/>
      <div className="mb-4"/>
      <Formik
        initialValues={{
          displayName: user.displayName,
          email: user.email,
        }}
        enableReinitialize={true}
        onSubmit={(values, actions) => updateInformation(values, actions)}
        validationSchema={validationSchema}
      >
        {(props) => (
          <Form>
            <Container fluid className="px-5">
              <FormGroup>
                <FormLabel
                  className="white-text font-weight-bold"
                  htmlFor="displayName"
                >
                  Display name
                </FormLabel>
                <Field
                  className={`form-input ${
                    canEdit
                      ? `${props.errors.displayName && "invalid-field"}`
                      : "no-edit-field"
                  }`}
                  name="displayName"
                  disabled={!canEdit}
                />
                {props.errors.displayName && (
                  <p className="invalid-message">{props.errors.displayName}</p>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel
                  className="white-text font-weight-bold"
                  htmlFor="email"
                >
                  Email address
                </FormLabel>
                <Field
                  className={`form-input ${
                    canEdit
                      ? `${props.errors.email && "invalid-field"}`
                      : "no-edit-field"
                  }`}
                  name="email"
                  type="email"
                  disabled={!canEdit}
                />
                {props.errors.email && (
                  <p className="invalid-message">{props.errors.email}</p>
                )}
              </FormGroup>
              {showSuccess && (
                <p className="w-100 px-1 text-center text-wrap success-message green-text">
                  Successfully changed settings
                </p>
              )}
              {showPasswordSuccess && (
                <p className="w-100 px-1 text-center text-wrap success-message green-text">
                  Successfully changed password
                </p>
              )}

              <Row className="d-flex justify-content-around mt-3">
                {canEdit ? (
                  <>
                    <Col>
                      <Button
                        className="w-100 mt-3"
                        type="submit"
                        value="submit"
                        disabled={
                          !props.isValid || props.initialValues === props.values
                        }
                      >
                        Save changes
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        className="w-100 mt-3"
                        type="reset"
                        onClick={() => {
                          props.resetForm();
                          setCanEdit(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </>
                ) : (
                  <Button
                    className="w-100 mx-3 mt-3"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setCanEdit(true);
                    }}
                  >
                    Update Information
                  </Button>
                )}
              </Row>
              <Button
                className="w-100 mt-3"
                type="button"
                onClick={() => {
                  setShowPasswordModal(true);
                }}
              >
                Change Password
              </Button>
            </Container>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Account;
