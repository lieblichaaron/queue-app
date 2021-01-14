import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./createLine.module.css";
const CreateLine = () => {
  const [serviceTimeOptions, setServiceTimeOptions] = useState([
    ...Array(30).keys(),
  ]);
  return (
    <div>
      <header className={styles.header}>
        <h3>Line Setup</h3>
      </header>
      <div className={styles["page-container"]}>
        <p className="text-center pb-3">
          Please enter the following information to start your queue.
        </p>
        <Form>
          <Form.Group controlId="storeName">
            <Form.Label>Store name*</Form.Label>
            <Form.Control required type="text" placeholder="Enter store name" />
          </Form.Group>

          <Form.Group controlId="location">
            <Form.Label>Store location*</Form.Label>
            <Form.Control required type="text" placeholder="Enter store name" />
          </Form.Group>

          <Form.Group controlId="serviceTime">
            <Form.Label>Average service time - per customer*</Form.Label>
            <Form.Control required as="select">
              {serviceTimeOptions.map((option) => (
                <option key={option}>{option + 1 + "min"}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button
            style={{
              backgroundColor: "#fca311",
              color: "#14213d",
              border: "none",
            }}
            className="w-100"
            type="submit"
          >
            Start queue
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateLine;
