import { useState, useRef, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import MyMapComponent from "../map/map";
import TitleBanner from "../title_banner/titleBanner";
import QRCode from "qrcode.react";
import { addNewLine } from "../../serverFuncs";
const saveSvgAsPng = require("save-svg-as-png");

const CreateLine = () => {
  const currentUser = useContext(UserContext);
  const history = useHistory();
  const qrRef = useRef();
  const [serviceTimeOptions, setServiceTimeOptions] = useState([
    ...Array(30).keys(),
  ]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [storeName, setStoreName] = useState();
  const [lineId, setLineId] = useState();
  const [serviceTime, setServiceTime] = useState();
  const [isMarkerShown, setIsMarkerShown] = useState(false);
  const [address, setAddress] = useState(null);
  const [lat, setLat] = useState(32.070343);
  const [lng, setLng] = useState(34.774254);
  const [finished, setFinished] = useState(false);
  const setMap = (place) => {
    if (!place.geometry)
      return alert(
        "Please choose a location fron the autocomplete suggestions"
      );
    setLat(place.geometry.location.lat());
    setLng(place.geometry.location.lng());
    setAddress(place.formatted_address);
    setIsMarkerShown(true);
  };
  const handleServiceTime = (e) => {
    setServiceTime(parseInt(e.target.value.split(" ")[0]));
  };
  const handleStoreName = (e) => {
    setStoreName(e.target.value);
  };
  const createQueue = async (e) => {
    e.preventDefault();
    const lineObj = {
      ownerId: currentUser._id,
      isActive: false,
      storeName: storeName,
      estServiceTime: serviceTime,
      location: {
        lat: lat,
        lng: lng,
        address: address,
      },
    };
    setLineId(await addNewLine(lineObj));
    setButtonDisabled(true);
    generateQr();
  };
  const generateQr = async () => {
    await saveSvgAsPng.saveSvgAsPng(
      document.getElementById("qr"),
      "line-qr-code.png",
      {
        scale: 5,
      }
    );
    qrRef.current.scrollIntoView({ behavior: "smooth" });
  };
  if (finished) {
    history.push(`/line/${lineId}`);
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
              data-testid="Auto complete"
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
            <div style={{ height: "300px" }}>
              <MyMapComponent
                lat={lat}
                lng={lng}
                address={address}
                isMarkerShown={isMarkerShown}
              />
            </div>
          </Form.Group>

          <Form.Group controlId="serviceTime">
            <Form.Label>Average service time - per customer*</Form.Label>

            <Form.Control
              required
              as="select"
              onChange={handleServiceTime}
              data-testid="avg time select"
              defaultValue="0"
            >
              <option value="0" disabled>
                Select time
              </option>
              {serviceTimeOptions.map((option) => (
                <option key={option} value={option + 1}>
                  {option + 1 + " min"}
                </option>
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
            aria-label="submit"
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
          <div ref={qrRef} className="text-center p-3">
            <QRCode
              data-testid="qr"
              id="qr"
              value={`http://localhost:3000/ticket/${lineId}`}
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
