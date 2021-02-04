import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Badge } from "react-bootstrap";
import Autocomplete from "react-google-autocomplete";
import TitleBanner from "../title_banner/titleBanner";
import MyMapComponent from "../map/map";
import NowServing from "../now_serving/nowServing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartArea } from "@fortawesome/free-solid-svg-icons";
import {
  getLineById,
  serveNextCustomer,
  pauseQueue,
  resumeQueue,
} from "../../serverFuncs";

const Line = () => {
  const { lineId } = useParams();
  const [isLoading, setIsLoading] = useState();
  const [queue, setQueue] = useState();
  const [avgService, setAvgService] = useState();
  const [avgWait, setAvgWait] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getLineById(lineId).then((data) => {
      setQueue(data);
      setIsLoading(false);
      setAvgService(data.estServiceTime);
    });
  }, []);

  const handleServeNext = async () => {
    serveNextCustomer(queue._id).then((data) => {
      setAvgService(data.avgServiceTime);
      setAvgWait(data.avgWaitTime);
      getLineById(queue._id).then((data) => {
        setQueue(data);
      });
    });
  };

  const handlePauseQueue = () => {
    pauseQueue(queue._id).then(() => {
      getLineById(queue._id).then((data) => {
        setQueue(data);
      });
    });
  };

  const handleResumeQueue = () => {
    resumeQueue(queue._id).then(() => {
      getLineById(queue._id).then((data) => {
        setQueue(data);
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
      {isLoading && <div className="loader" />}
      {queue && (
        <div>
          <TitleBanner title={queue.storeName} />
          <div style={{ color: "#ffffff" }}>
            <div className="d-flex justify-content-center my-3 mt-5">
              <NowServing
                textColor="#14213d"
                backgroundColor="#e5e5e5"
                currentCustomer={
                  queue.line && queue.line.length > 0
                    ? queue.line[0].number
                    : ""
                }
              />
            </div>
            <h5 className="text-center my-5">
              Currently waiting:{" "}
              {queue.line && queue.line.length > 0 ? queue.line.length - 1 : 0}{" "}
              people
            </h5>
            <div
              className="my-5 d-flex flex-column justify-content-center align-items-center"
              style={{ backgroundColor: "#fca311", height: "280px" }}
            >
              {queue.isActive && (
                <button onClick={handleServeNext} style={buttonStyle}>
                  Next Customer
                </button>
              )}

              {queue.isActive ? (
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
                <h4>
                  <FontAwesomeIcon icon={faChartArea} /> Customer Analytics
                </h4>
              </div>
              <div>
                <div className="d-flex justify-content-between align-items-center mx-4">
                  <p>Average Serving Time</p>
                  <p>
                    <Badge
                      className="ml-3"
                      style={{ color: "black", backgroundColor: "#fca318" }}
                      pill
                    >
                      {`${avgService} mins`}
                    </Badge>
                  </p>
                </div>

                <div className="d-flex justify-content-between align-items-center mx-4">
                  <p>Estimated Time of Queue</p>
                  <p>
                    <Badge
                      className="ml-3"
                      pill
                      style={{ color: "black", backgroundColor: "#fca318" }}
                    >
                      {`${
                        queue.line ? avgService * queue.line.length : 0
                      } mins`}
                    </Badge>
                  </p>
                </div>

                <div className="d-flex justify-content-between align-items-center mx-4">
                  <p>Average Waiting Time</p>
                  <p>
                    <Badge
                      className="ml-3"
                      pill
                      style={{ color: "black", backgroundColor: "#fca318" }}
                    >
                      {`${avgWait} mins`}
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
                <Form.Group controlId="queue.storeName">
                  <Form.Label>Store name*</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    placeholder="Enter store name"
                    value={queue.storeName}
                    // onChange={handleStoreName}
                  />
                </Form.Group>

                <Form.Group controlId="queue.location">
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
                    value={queue.location.address}
                  />
                  <div style={{ height: "300px" }}>
                    <MyMapComponent
                      lat={queue.location.lat}
                      lng={queue.location.lng}
                      address={queue.location.address}
                      isMarkerShown={true}
                    />
                  </div>
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
      )}
    </div>
  );
};

export default Line;
