import NowServing from "../now_serving/nowServing";
import styles from "./ticket.module.css";
const Ticket = ({ line }) => {
  return (
    <div className={`${styles["ticket-container"]} text-center`}>
      <h3 className="text-center">
        Ticket #{line.line[line.line.length - 1].number}
      </h3>
      <NowServing
        textColor="#e5e5e5"
        backgroundColor="#14213d"
        currentCustomer={line.line[0].number}
      />
      <div className="p-3">
        <span>
          <b>Join time:</b> {line.line[line.line.length - 1].joinTime} <br />
        </span>
        <span>
          <b>Estimated wait time:</b> {line.line.length * line.estServiceTime}
          min
        </span>
      </div>
    </div>
  );
};

export default Ticket;
