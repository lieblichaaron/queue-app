import { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => {
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{
          lat: props.lat,
          lng: props.lng,
        }}
      >
        {props.isMarkerShown && (
          <Marker
            position={{
              lat: props.lat,
              lng: props.lng,
            }}
          />
        )}
      </GoogleMap>
    );
  })
);
export default MyMapComponent;
