import MyMapComponent from "../map/map";
import styles from "./storeInfo.module.css";
const StoreInfo = ({ line }) => {
  return (
    <div className={styles["ticket-container"]}>
      <h2 className="text-center">Store Info</h2>
      <MyMapComponent
        lat={line.location.lat}
        lng={line.location.lng}
        address={line.location.address}
        isMarkerShown={true}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA0Kx9Y9puWzmvyo9yVW_fCZvAiDNnKhlA&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `200px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default StoreInfo;
