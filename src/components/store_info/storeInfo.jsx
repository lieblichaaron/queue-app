import MyMapComponent from "../map/map";
import styles from "./storeInfo.module.css";
const StoreInfo = ({ line }) => {
  return (
    <div className={styles["ticket-container"]}>
      <h2 className="text-center">Store Info</h2>
      <div style={{ height: "200px" }}>
        <MyMapComponent
          lat={line.location.lat}
          lng={line.location.lng}
          address={line.location.address}
          isMarkerShown={true}
        />
      </div>
    </div>
  );
};

export default StoreInfo;
