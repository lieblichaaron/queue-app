import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Form, Button, Badge } from "react-bootstrap";
import Autocomplete from "react-google-autocomplete";
import TitleBanner from "../title_banner/titleBanner";
import MyMapComponent from "../map/map";
import NowServing from "../now_serving/nowServing";
import axios from "axios";

const Line = () => {
  const [queue, setQueue] = useState({
    storeName: "",
    location: {
      lat: null,
      lng: null,
      address: "",
    },
    estServiceTime: 0,
    line: [],
  });

  const {
    _id,
    storeName,
    isActive,
    location,
    estServiceTime,
    line = [],
  } = queue;
  const baseUrl = "http://localhost:5000";
  const browserLocation = useLocation();
  const lineId = browserLocation.pathname.split("/")[2];
  const [avgService, setAvgService] = useState(estServiceTime);
  const [avgWait, setAvgWait] = useState(0);

  useEffect(() => {
    axios.get(baseUrl + "/line/" + lineId).then((res) => {
      console.log(res.data);
      setQueue(res.data);
    });
  }, []);

  const handleServeNext = async () => {
    axios.put(baseUrl + "/line/served-one/" + _id).then((res) => {
      setAvgService(res.data.avgServiceTime);
      setAvgWait(res.data.avgWaitTime);
      axios.get(baseUrl + "/line/" + lineId).then((res) => {
        setQueue(res.data);
      });
    });
  };

  const handlePauseQueue = () => {
    axios.put(baseUrl + "/line/status/" + _id, { isActive: false }).then(() => {
      axios.get(baseUrl + "/line/" + lineId).then((res) => {
        setQueue(res.data);
      });
    });
  };

  const handleResumeQueue = () => {
    axios.put(baseUrl + "/line/status/" + _id, { isActive: true }).then(() => {
      axios.get(baseUrl + "/line/" + lineId).then((res) => {
        setQueue(res.data);
      });
    });
  };

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
      <TitleBanner title={storeName} />
      <div style={{ color: "#ffffff" }}>
        <div className="d-flex justify-content-center my-3 mt-5">
          <NowServing
            textColor="#14213d"
            backgroundColor="#e5e5e5"
            currentCustomer={line.length > 0 && line[0].number}
          />
        </div>
        <h5 className="text-center my-5">
          Currently waiting: {line.length > 0 ? line.length - 1 : 0} people
        </h5>
        <div
          className="my-5 d-flex flex-column justify-content-center align-items-center"
          style={{ backgroundColor: "#fca311", height: "280px" }}
        >
          {isActive && (
            <button onClick={handleServeNext} style={buttonStyle}>
              Next Customer
            </button>
          )}

          {isActive ? (
            <button onClick={handlePauseQueue} style={buttonStyle}>
              Stop additional queueing
            </button>
          ) : (
            <button onClick={handleResumeQueue} style={buttonStyle}>
              Reopen queue
            </button>
          )}

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
            <div className="d-flex justify-content-between align-items-center mx-5">
              <p>Average Serving Time</p>
              <p>
                <Badge
                  className="ml-3"
                  style={{ color: "black", backgroundColor: "#fca318" }}
                  pill
                >
                  {avgService}mins
                </Badge>
              </p>
            </div>

            <div className="d-flex justify-content-between align-items-center mx-5">
              <p>Estimated Time of Queue</p>
              <p>
                <Badge
                  className="ml-3"
                  pill
                  style={{ color: "black", backgroundColor: "#fca318" }}
                >
                  {avgService * line.length}mins
                </Badge>
              </p>
            </div>

            <div className="d-flex justify-content-between align-items-center mx-5">
              <p>Average Waiting Time</p>
              <p>
                <Badge
                  className="ml-3"
                  pill
                  style={{ color: "black", backgroundColor: "#fca318" }}
                >
                  {avgWait}mins
                </Badge>
              </p>
            </div>
          </div>
        </div>
        <div
          style={{ height: "2px", backgroundColor: "white" }}
          className="mb-4"
        ></div>

        {/* onSubmit Update information */}
        <div>
          <h4 className="text-center pb-3">Store Information</h4>
          <Form className="mx-3 mb-5">
            <Form.Group controlId="storeName">
              <Form.Label>Store name*</Form.Label>
              <Form.Control
                required
                autoComplete="off"
                type="text"
                placeholder="Enter store name"
                value={storeName}
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
                  paddingLeft: "12px",
                }}
                // onPlaceSelected={(place) => {
                //   setMap(place);
                // }}
                types={["address"]}
                value={location.address}
              />
              <MyMapComponent
                lat={location.lat}
                lng={location.lng}
                address={location.address}
                isMarkerShown={true}
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
