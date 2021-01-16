import styles from "./nowServing.module.css";
const NowServing = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.customer}>
        NOW SERVING <span style={{ fontSize: "5rem" }}>#60</span>
      </h1>
    </div>
  );
};

export default NowServing;
