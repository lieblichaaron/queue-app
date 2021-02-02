import styles from "./nowServing.module.css";
const NowServing = ({ textColor, backgroundColor, currentCustomer }) => {
  return (
    <div
      id="nowServing"
      className={styles.container}
      style={{ backgroundColor }}
    >
      <h1 className={styles.customer} style={{ color: textColor }}>
        NOW SERVING <span style={{ fontSize: "5rem" }}>#{currentCustomer}</span>
      </h1>
    </div>
  );
};

export default NowServing;
