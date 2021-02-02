import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

function MyMapComponent(props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA0Kx9Y9puWzmvyo9yVW_fCZvAiDNnKhlA",
  });
  const [infoOpen, setInfoOpen] = useState(true);
  const [map, setMap] = useState(null);

  const onUnmount = () => {
    setMap(null);
  };
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "100%",
      }}
      center={{
        lat: props.lat,
        lng: props.lng,
      }}
      zoom={15}
      onLoad={(map) => setMap(map)}
      onUnmount={onUnmount}
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
            <InfoWindow
              style={{ padding: "0px" }}
              onCloseClick={() => setInfoOpen(false)}
              position={{
                lat: props.lat + 0.0018,
                lng: props.lng,
              }}
            >
              <div style={{ color: "black", padding: "5px" }}>
                {props.address}
              </div>
            </InfoWindow>
          )}
        </Marker>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyMapComponent);
