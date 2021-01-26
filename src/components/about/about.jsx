import { Button, Form } from "react-bootstrap";
import Footer from "../footer/footer";
import "./about.css";
import CarouselComponent from "./carousel";

const About = (props) => {
  return (
    <div className="text-white">
      <div className="d-flex flex-column align-items-center mt-5">
        <h1 className="mt-5">iQueue</h1>
        <h5 className="mt-4 ">Queue management made easy</h5>
        <Button
          type="button"
          className="btn btn-primary mt-5 py-3 px-5"
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
          <br /> In an age where customers expect instant service, nothing says
          "poor customer experience" like a long line. Create a virtual queue
          and let your customers scan a QR code to join the line. It's as simple
          as that.
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
        <Form className="form-styles mt-3">
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter your name"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              size="sm"
              type="email"
              placeholder="Enter your email address"
              required
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              size="sm"
              as="textarea"
              rows={3}
              required
              placeholder="What would you like to tell us?"
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

export default About;
