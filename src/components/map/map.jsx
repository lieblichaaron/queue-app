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
        <InfoWindow position={{ lat: props.lat + 0.0018, lng: props.lng }}>
          <div>
            <span style={{ padding: 0, margin: 0, color: "black" }}>
              {props.address}
            </span>
          </div>
        </InfoWindow>
      </GoogleMap>
    );
  })
);
export default MyMapComponent;
