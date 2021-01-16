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

function Account(props) {
  const user = {
    displayName: "Jake",
    email: "jakenudels@gmail.com",
  };

  const [canEdit, setCanEdit] = useState(false);

  return (
    <div>
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
              <FormGroup className="account-form-group">
                <FormLabel htmlFor="displayName">Display name</FormLabel>
                <Field
                  className={`form-input ${canEdit || "no-edit-field"}`}
                  name="displayName"
                />
              </FormGroup>
              <FormGroup className="account-form-fieldset">
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Field
                  className={`form-input ${canEdit || "no-edit-field"}`}
                  name="email"
                  type="email"
                />
              </FormGroup>
              <Row className="d-flex justify-content-around mt-3">
                {canEdit ? (
                  <>
                    <Col>
                      <Button className="w-100" type="submit" value="submit">
                        Confirm
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
                    className="w-100"
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
            </Container>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Account;
