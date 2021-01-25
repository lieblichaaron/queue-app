import { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
  InfoWindow,
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => {
    const [infoOpen, setInfoOpen] = useState(false);
    useEffect(() => {
      setInfoOpen(true);
    }, [props]);
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{
          lat: props.lat,
          lng: props.lng,
        }}
      >
        {props.isMarkerShown && (
          <Marker
            onClick={() => setInfoOpen(true)}
            position={{
              lat: props.lat,
              lng: props.lng,
            }}
          />
        )}
        {infoOpen && props.address && (
          <InfoWindow
            position={{ lat: props.lat + 0.0018, lng: props.lng }}
            onCloseClick={() => setInfoOpen(false)}
          >
            <span style={{ padding: "1rem", margin: 0, color: "black" }}>
              {props.address}
            </span>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  })
);
export default MyMapComponent;
