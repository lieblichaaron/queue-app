import NowServing from "../now_serving/nowServing";
import styles from "./ticket.module.css";
const Ticket = () => {
  return (
    <div className={`${styles["ticket-container"]} text-center`}>
      <h3 className="text-center">Ticket #63</h3>
      <NowServing textColor="#e5e5e5" backgroundColor="#14213d" />
      <div className="p-3">
        <span>
          <b>Join time:</b> waiting for confirmation <br />
        </span>
        <span>
          <b>Estimated wait time:</b> 10min
        </span>
      </div>
    </div>
  );
};

export default Ticket;
