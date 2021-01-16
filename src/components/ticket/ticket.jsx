import NowServing from "../now_serving/nowServing";
import styles from "./ticket.module.css";
const Ticket = () => {
  return (
    <div className={styles["ticket-container"]}>
      <h5 className="text-center">Ticket #63</h5>
      <NowServing />
    </div>
  );
};

export default Ticket;
