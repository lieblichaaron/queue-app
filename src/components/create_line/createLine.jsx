import styles from "./createLine.module.css";
const CreateLine = () => {
  return (
    <div>
      <header className={styles.header}>
        <h3>Line Setup</h3>
      </header>
      <div className={styles["page-container"]}>
        <p className="text-center">
          Please enter the following information to start your queue.
        </p>
      </div>
    </div>
  );
};

export default CreateLine;
