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
      setQueue(res.data);
    });
  }, []);

  useEffect(() => {
    setInterval(() => {
      axios.get(baseUrl + "/line/" + lineId).then((res) => {
        setQueue(res.data);
      });
    }, 15000);
  });

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

  return (
    <div>
      <TitleBanner title={storeName} />
      <div className="" style={{ color: "#ffffff" }}>
        <div className="d-flex justify-content-center my-3">
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
            <button
              onClick={handleServeNext}
              style={{
                backgroundColor: "#14213D",
                color: "white",
                border: "none",
                marginTop: 10,
                height: "50px",
                width: "80%",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            >
              Next Customer
            </button>
          )}

          {isActive ? (
            <button
              onClick={handlePauseQueue}
              style={{
                backgroundColor: "#14213D",
                color: "white",
                border: "none",
                marginTop: 10,
                height: "50px",
                width: "80%",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            >
              Stop additional queueing
            </button>
          ) : (
            <button
              onClick={handleResumeQueue}
              style={{
                backgroundColor: "#14213D",
                color: "white",
                border: "none",
                marginTop: 10,
                height: "50px",
                width: "80%",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            >
              Reopen queue
            </button>
          )}

          <button
            style={{
              backgroundColor: "#14213D",
              color: "white",
              border: "none",
              marginTop: 10,
              height: "50px",
              width: "80%",
              borderRadius: "8px",
            }}
          >
            Delete queue
          </button>
        </div>
        <div className="d-flex align-items-center text-white flex-column px-3">
          <h4 className="mb-3">Customer Analytics</h4>
          <div className="d-flex justify-content-center align-items-center">
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
          <div className="d-flex justify-content-center align-items-center">
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
          <div className="d-flex justify-content-center align-items-center">
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
        {/* onSubmit Update information */}
        {/* <Form className="mx-3 mb-5">
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
          </Form.Group> */}

        {/* Button to prevent implicit submission of the form  */}

        {/* <button
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
        </Form> */}
      </div>
    </div>
  );
};

export default Line;
