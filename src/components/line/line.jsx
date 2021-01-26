import { useState, useEffect } from "react";
import { Form, Button, Container, Badge } from "react-bootstrap";
import Autocomplete from "react-google-autocomplete";
import TitleBanner from "../title_banner/titleBanner";
import Map from "../map/map";
import NowServing from "../now_serving/nowServing";
import "./line.css";

const Line = () => {
  const [address, setAddress] = useState();
  const [locationPicked, setLocationPicked] = useState();
  const [lat, setLat] = useState(-34.397);
  const [lng, setLng] = useState(150.644);
  const setMap = (place) => {
    setLocationPicked(false);
    setLat(place.geometry.location.lat());
    setLng(place.geometry.location.lng());
    setAddress(place.formatted_address);
  };
  useEffect(() => {
    setLocationPicked(true);
  }, [lng]);
  return (
    <Container className="m-0, p-0">
      <TitleBanner title="Line" />
      <Container className="Container1">
        <div className="p-3" style={{ color: "#ffffff" }}>
          <h1 className="text-center pb-3">Current line size: {13} people.</h1>
        </div>

        <NowServing textColor="#14213d" backgroundColor="#e5e5e5" />
      </Container>

      <Container className="Buttons" style={{}}>
        <Button
          className="Buttons1"
          style={{
            backgroundColor: "#14213d",
            color: "#14213d",
            border: "none",
            marginTop: 10,
          }}
          className="w-100"
          type="submit"
        >
          Next Customer
        </Button>
        <Button
          style={{
            backgroundColor: "#14213d",
            color: "#fca311",
            border: "none",
            marginTop: 10,
          }}
          className="w-100"
          type="submit"
        >
          Stop additional queueing
        </Button>
        <Button
          style={{
            backgroundColor: "#14213d",
            color: "#fca311",
            border: "none",
            marginTop: 10,
            marginBottom: 10,
          }}
          className="w-100"
          type="submit"
        >
          Delete queue
        </Button>
      </Container>
      <Container className="align-self-center">
        <h1 className="d-flex justify-content-center">Customer Analytics</h1>

        <h4 className="d-flex justify-content-center">
          Average Serving Time{" "}
          <h3>
            <Badge className="ml-3" variant="secondary" pill variant="warning">
              5 Mins
            </Badge>
          </h3>
        </h4>
        <h4 className="d-flex justify-content-center">
          Estimated Time of queue{" "}
          <h3>
            <Badge className="ml-3" variant="secondary" pill variant="warning">
              5 Mins
            </Badge>
          </h3>
        </h4>
        <h4 className="d-flex justify-content-center pill">
          Average Waiting Time{" "}
          <h3>
            <Badge className="ml-3" variant="secondary" pill variant="warning">
              5 Mins
            </Badge>
          </h3>
        </h4>
      </Container>
      <Form>
        <Form.Group controlId="storeName">
          <Form.Label>Store name*</Form.Label>
          <Form.Control required type="text" placeholder="Enter store name" />
        </Form.Group>
      </Form>
      <Autocomplete
        style={{
          width: "100%",
          height: "calc(1.5em + .75rem + 2px)",
          borderRadius: ".25rem",
        }}
        onPlaceSelected={(place) => {
          setMap(place);
        }}
        types={["address"]}
      />
      <Container>
        {locationPicked && (
          <Map
            lat={lat}
            lng={lng}
            address={address}
            isMarkerShown
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA0Kx9Y9puWzmvyo9yVW_fCZvAiDNnKhlA&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `300px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        )}
      </Container>
      <Container>
        <Button
          className="Buttons1"
          style={{
            backgroundColor: "#14213d",
            color: "#fca311",
            border: "none",
            marginTop: 10,
          }}
          className="w-100"
          type="submit"
        >
          Update Information
        </Button>
      </Container>
    </Container>
  );
};

export default Line;
