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

  const buttonStyle = {
    backgroundColor: "#14213D",
    color: "white",
    border: "none",
    marginTop: 10,
    height: "50px",
    width: "80%",
    borderRadius: "8px",
    marginBottom: "8px",
  };
  return (
    <div>
      <TitleBanner title="Store Name" />
      <div className="" style={{ color: "#ffffff" }}>
        <h5 className="text-center my-5">Current line size: {13} people</h5>
        <div className="d-flex justify-content-center my-3">
          <NowServing textColor="#14213d" backgroundColor="#e5e5e5" />
        </div>
        <div
          className="my-5 d-flex flex-column justify-content-center align-items-center"
          style={{ backgroundColor: "#fca311", height: "280px" }}
        >
          <button style={buttonStyle}>Next Customer</button>
          <button style={buttonStyle}>Stop additional queueing</button>
          <button style={buttonStyle}>Delete queue</button>
        </div>
        <div className="d-flex text-white flex-column px-3 mb-4">
          <div
            className="d-flex justify-content-center align-items-center mb-4"
            style={{ height: "30px" }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/icons/analytics_icon.png`}
              style={{
                height: "24px",
                width: "24px",
                marginRight: "10px",
                marginBottom: "5px",
              }}
            ></img>
            <h4>Customer Analytics</h4>
          </div>
          <div>
            <div className="d-flex justify-content-center align-items-center">
              <p>Average Serving Time</p>
              <p>
                <Badge
                  className="ml-3"
                  style={{ color: "black", backgroundColor: "#fca318" }}
                  pill
                >
                  5 Mins
                </Badge>
              </p>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <p>Estimated Time of Queue</p>
              <p>
                <Badge
                  className="ml-3"
                  pill
                  style={{ color: "black", backgroundColor: "#fca318" }}
                >
                  5 Mins
                </Badge>
              </p>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <p>Average Waiting Time</p>
              <p>
                <Badge
                  className="ml-3"
                  pill
                  style={{ color: "black", backgroundColor: "#fca318" }}
                >
                  5 Mins
                </Badge>
              </p>
            </div>
          </div>
        </div>
        <div
          style={{ height: "2px", backgroundColor: "lightgrey" }}
          className="mb-4"
        ></div>
        <div>
          <h4 className="mb-3" style={{ textAlign: "center" }}>
            Store Information
          </h4>
          <Form className="mx-3 mb-5">
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
                  marginBottom: "1rem",
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
              className="w-100 mb-3"
              type="submit"
              // disabled={buttonDisabled}
            >
              Update Information
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Line;
