import { useState, useEffect } from "react";
import { Form, Button, Badge } from "react-bootstrap";
import Autocomplete from "react-google-autocomplete";
import TitleBanner from "../title_banner/titleBanner";
import MyMapComponent from "../map/map";
import NowServing from "../now_serving/nowServing";

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
    <div>
      <TitleBanner title="Line" />
      <div className="p-3" style={{ color: "#ffffff" }}>
        <h2 className="text-center pb-3">
          Current line size: <br />
          {13} people
        </h2>
        <div className="d-flex justify-content-center my-3">
          <NowServing textColor="#14213d" backgroundColor="#e5e5e5" />
        </div>
        <Button
          style={{
            backgroundColor: "#14213d",
            color: "#14213d",
            border: "none",
            marginTop: 10,
          }}
          className="w-100"
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
        <div className="d-flex align-items-center text-white flex-column mb-3">
          <h2 className="my-3">Customer Analytics</h2>
          <div className="d-flex justify-content-center align-items-center">
            <h5>Average Serving Time</h5>
            <h3>
              <Badge
                className="ml-3"
                style={{ color: "black", backgroundColor: "#fca318" }}
                pill
              >
                5 Mins
              </Badge>
            </h3>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <h5>Estimated Time of Queue</h5>
            <h3>
              <Badge
                className="ml-3"
                pill
                style={{ color: "black", backgroundColor: "#fca318" }}
              >
                5 Mins
              </Badge>
            </h3>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <h5>Average Waiting Time</h5>
            <h3>
              <Badge
                className="ml-3"
                pill
                style={{ color: "black", backgroundColor: "#fca318" }}
              >
                5 Mins
              </Badge>
            </h3>
          </div>
        </div>
        {/* onSubmit Update information */}
        <Form>
          <Form.Group controlId="storeName">
            <Form.Label>Store name*</Form.Label>
            <Form.Control
              required
              autoComplete="off"
              type="text"
              placeholder="Enter store name"
              // onChange={handleStoreName}
            />
          </Form.Group>

          <Form.Group controlId="location">
            <Form.Label>Store location*</Form.Label>

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
            <MyMapComponent
              lat={lat}
              lng={lng}
              address={address}
              isMarkerShown={address}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA0Kx9Y9puWzmvyo9yVW_fCZvAiDNnKhlA&v=3.exp&libraries=geometry,drawing,places`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `300px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </Form.Group>

          {/* Button to prevent implicit submission of the form  */}
          <button
            type="submit"
            disabled
            style={{ display: "none" }}
            aria-hidden="true"
          ></button>
          <Button
            style={{
              backgroundColor: "#fca311",
              color: "#14213d",
              border: "none",
              height: "2.5rem",
            }}
            className="w-100"
            type="submit"
            // disabled={buttonDisabled}
          >
            Update Information
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Line;
