import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import MyMapComponent from "../map/map";
import TitleBanner from "../title_banner/titleBanner";
// import QRCode from "qrcode-svg";
import QRCode from "qrcode.react";
const saveSvgAsPng = require("save-svg-as-png");

const CreateLine = () => {
  const history = useHistory();
  const [serviceTimeOptions, setServiceTimeOptions] = useState([
    ...Array(30).keys(),
  ]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [storeName, setStoreName] = useState();
  const [lineId, setLineId] = useState();
  const [serviceTime, setServiceTime] = useState();
  const [address, setAddress] = useState(null);
  const [lat, setLat] = useState(32.070343);
  const [lng, setLng] = useState(34.774254);
  const [finished, setFinished] = useState(false);
  const setMap = (place) => {
    setLat(place.geometry.location.lat());
    setLng(place.geometry.location.lng());
    setAddress(place.formatted_address);
  };
  const handleServiceTime = (e) => {
    setServiceTime(e.target.value);
  };
  const handleStoreName = (e) => {
    setStoreName(e.target.value);
  };
  const createQueue = async (e) => {
    e.preventDefault();
    const lineObj = {
      ownerId: /*owner id from state*/ 123456789,
      isActive: false,
      storeName: storeName,
      estServiceTime: serviceTime,
      location: {
        lat: lat,
        lng: lng,
        address: address,
      },
    };
    const data = await fetch("http://localhost:5000/line", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lineObj),
    });
    setLineId(await data.json());
    await saveSvgAsPng.saveSvgAsPng(
      document.getElementById("qr"),
      "line-qr-code.png",
      {
        scale: 5,
      }
    );
    setButtonDisabled(true);
  };
  if (finished) {
    history.push({
      pathname: `/line/${lineId}`,
    });
  }
  return (
    <div>
      <TitleBanner title="Line Setup" />
      <div className="p-3" style={{ color: "#ffffff" }}>
        <p className="text-center pb-3">
          After submitting this form you will have the option to download the QR
          code. All you need to do is put it up and manage the line from your
          dashboard!
        </p>
        <Form onSubmit={createQueue}>
          <Form.Group controlId="storeName">
            <Form.Label>Store name*</Form.Label>
            <Form.Control
              required
              autoComplete="off"
              type="text"
              placeholder="Enter store name"
              onChange={handleStoreName}
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

          <Form.Group controlId="serviceTime">
            <Form.Label>Average service time - per customer*</Form.Label>
            <Form.Control required as="select" onChange={handleServiceTime}>
              <option value="" disabled selected>
                Select time
              </option>
              {serviceTimeOptions.map((option) => (
                <option key={option}>{option + 1 + " min"}</option>
              ))}
            </Form.Control>
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
            disabled={buttonDisabled}
          >
            Start queue
          </Button>
        </Form>
        {lineId && (
          <div className="text-center p-3">
            <QRCode
              id="qr"
              value={`http://localhost:3000/ticket?line-id=${lineId}`}
              renderAs="svg"
            />
            <Button
              style={{
                backgroundColor: "#fca311",
                color: "#14213d",
                border: "none",
                height: "2.5rem",
              }}
              className="w-100 mt-3"
              onClick={() => setFinished(true)}
            >
              Head to line!
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateLine;
