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
    const [infoOpen, setInfoOpen] = useState(true);
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
          >
            {infoOpen && (
              <InfoWindow onCloseClick={() => setInfoOpen(false)}>
                <div style={{ margin: 0, color: "black" }}>{props.address}</div>
              </InfoWindow>
            )}
          </Marker>
        )}
      </GoogleMap>
    );
  })
);
export default MyMapComponent;
