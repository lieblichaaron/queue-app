import React from "react";
import { Button, Carousel, Form } from "react-bootstrap";
import "./about.css";

const About = () => {
  return (
    <div className="text-white">
      <div className="d-flex flex-column align-items-center mt-5">
        <h1 className="mt-5">iQueue</h1>
        <h5 className="mt-4 ">Queue management made easy</h5>
        <Button type="button" className="btn btn-primary mt-5 py-3 px-5">
          Get started today
        </Button>
      </div>
      <div className="mt-4">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL + "/People-standing-in-line.png"}
              alt="People In  Line"
            />
            <Carousel.Caption>
              <h5>No time wasted waiting in line</h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL + "/Burger-Food-Truck.png"}
              alt="Food Truck"
            />

            <Carousel.Caption>
              <h5>Help to avoid overcrowded public places</h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL + "/wooden-hut-shop.png"}
              alt="Wooden Hut Shop"
            />

            <Carousel.Caption>
              <h5>Simple and jsut perfect for local businesses</h5>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="what-we-do d-flex flex-column align-items-center pt-5 ">
        <h4 className="text-center">What we do</h4>
        <p className="px-4 mt-2 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          condimentum eleifend congue. Cras egestas suscipit turpis quis
          venenatis. Vivamus eget orci nec sem dapibus commodo. Sed vitae
          aliquam augue, vel sollicitudin felis. Nullam ullamcorper blandit
          convallis.
        </p>
        <Button type="button" className="btn btn-secondary mt-4 py-3 px-5">
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
      <div className="footer d-flex flex-row align-items-end pb-3">
        <img
          className="social-media-icons ml-3"
          src={process.env.PUBLIC_URL + "/Facebook_icon.png"}
          alt="Facebook Icon"
        ></img>
        <img
          className="social-media-icons ml-3"
          src={process.env.PUBLIC_URL + "/Twitter_icon.png"}
          alt="Twitter Icon"
        ></img>
        <img
          className="social-media-icons ml-3"
          src={process.env.PUBLIC_URL + "/Instagram_icon.png"}
          alt="Instagram Icon"
        ></img>
      </div>
    </div>
  );
};

export default About;
