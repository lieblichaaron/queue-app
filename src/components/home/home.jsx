import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Footer from "../footer/footer";
import "./home.css";
import CarouselComponent from "./carousel";
import emailjs from "emailjs-com";
import logo from "../../easyQ-logo.png";
import { Redirect } from "react-router-dom";

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const body = {
      name: name,
      email: email,
      message: message,
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        body,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          alert("Thank you for your message. \nWe will be in touch shortly!");
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      )
      .then(() => {
        setName("");
        setEmail("");
        setMessage("");
      });
  };

  const handleChange = (event) => {
    if (event.target.id === "name") setName(event.target.value);
    if (event.target.id === "contactEmail") setEmail(event.target.value);
    if (event.target.id === "message") setMessage(event.target.value);
  };

  if (props.isLoggedIn) {
    return <Redirect to="/dashboard" />;
  } else
    return (
      <div className="text-white">
        <div className="d-flex flex-column align-items-center mt-5">
          <img className="main-logo mt-5" src={logo} alt="easyQ logo" />
          <h5 className="mt-4 px-4">Queue management made easy</h5>
          <Button
            type="button"
            className="btn btn-primary my-5 py-3 px-5"
            onClick={(event) => props.handleSignUp(event)}
          >
            Get started today
          </Button>
        </div>
        <CarouselComponent />
        <div className="what-we-do d-flex flex-column align-items-center pt-5 ">
          <h4 className="text-center">What we do</h4>
          <p className="px-4 mt-2 text-justify">
            Why are queues still a thing in {new Date().getFullYear()}? <br />
            <br /> In an age where customers expect instant service, nothing
            says "poor customer experience" like a long line. Create a virtual
            queue and let your customers scan a QR code to join the line. It's
            as simple as that.
          </p>
          <Button
            type="button"
            className="btn btn-secondary mt-4 py-3 px-5"
            onClick={(event) => props.handleSignUp(event)}
          >
            Get started today
          </Button>
        </div>
        <div className="contact-us d-flex flex-column align-items-center pt-5 ">
          <p className="px-4 mt-1 text-justify">
            Let us know what you think. We are looking forward to your feedback!
          </p>
          <Form
            className="form-styles mt-3"
            onSubmit={(event) => handleFormSubmit(event)}
          >
            <Form.Group>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter your name"
                id="name"
                required
                value={name}
                onChange={(event) => handleChange(event)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                size="sm"
                type="email"
                placeholder="Enter your email address"
                id="contactEmail"
                value={email}
                required
                onChange={(event) => handleChange(event)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                size="sm"
                as="textarea"
                id="message"
                rows={3}
                required
                value={message}
                placeholder="What would you like to tell us?"
                onChange={(event) => handleChange(event)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <Footer />
      </div>
    );
};

export default Home;
