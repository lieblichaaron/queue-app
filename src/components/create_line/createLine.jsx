import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Autocomplete from "react-google-autocomplete";
import MyMapComponent from "../map/map";
import TitleBanner from "../title_banner/titleBanner";
// import RNQRGenerator from "rn-qr-generator";

const CreateLine = () => {
  const [serviceTimeOptions, setServiceTimeOptions] = useState([
    ...Array(30).keys(),
  ]);
  const [storeName, setStoreName] = useState();
  const [serviceTime, setServiceTime] = useState();
  const [address, setAddress] = useState(null);
  const [lat, setLat] = useState(32.070343);
  const [lng, setLng] = useState(34.774254);
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
    const lineId = await data.json();
    console.log(lineId);
    // RNQRGenerator.generate({
    //   value: `http://localhost:3000/ticket/${lineId}`,
    //   height: 100,
    //   width: 100,
    // })
    //   .then((response) => {
    //     const { uri, width, height, base64 } = response;
    //     console.log(uri);
    //   })
    //   .catch((error) => console.log("Cannot create QR code", error));

    /*send info to db
                retreive store db id
                generate qr with /ticket/storeId
                send to email
                redirect to line page
                */
  };
  return (
    <div>
      <TitleBanner title="Line Setup" />
      <div className="p-3" style={{ color: "#ffffff" }}>
        <p className="text-center pb-3">
          After submitting this form you will recieve an email with your QR
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
          >
            Start queue
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateLine;
