import React, { useState } from "react";
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

function Account(props) {
  const user = {
    displayName: "Jake",
    email: "jakenudels@gmail.com",
  };

  const [canEdit, setCanEdit] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleCloseModal = () => {
    setShowPasswordModal(false);
  };

  return (
    <div>
      <PasswordModal
        isOpen={showPasswordModal}
        onCloseModal={handleCloseModal}
        centered
      />
      <h2 className="w-100 py-3 px-1 text-center text-wrap">
        Account Settings
      </h2>
      <Formik
        initialValues={{
          displayName: user.displayName,
          email: user.email,
        }}
        enableReinitialize={true}
        onSubmit={(values) => console.log(values)}
      >
        {(props) => (
          <Form>
            <Container fluid className="px-5">
              <FormGroup>
                <FormLabel htmlFor="displayName">Display name</FormLabel>
                <Field
                  className={`form-input ${canEdit || "no-edit-field"}`}
                  name="displayName"
                  disabled={!canEdit}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Field
                  className={`form-input ${canEdit || "no-edit-field"}`}
                  name="email"
                  type="email"
                  disabled={!canEdit}
                />
              </FormGroup>
              <Row className="d-flex justify-content-around mt-3">
                {canEdit ? (
                  <>
                    <Col>
                      <Button className="w-100" type="submit" value="submit">
                        Save changes
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        className="w-100"
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
