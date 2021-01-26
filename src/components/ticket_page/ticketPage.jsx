import { useEffect, useState } from "react";
import TitleBanner from "../title_banner/titleBanner";
import Ticket from "../ticket/ticket";
import { Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import StoreInfo from "../store_info/storeInfo";
import localforage from "localforage";
import moment from "moment";
import LeaveLineModal from "../leave_line_modal/leaveLineModal";

const TicketPage = () => {
  const { lineId } = useParams();
  const [confirmLeaving, setConfirmLeaving] = useState(false);
  const [line, setLine] = useState();
  const [ticket, setTicket] = useState();
  const [leftLine, setLeftLine] = useState();
  const [modalShow, setModalShow] = useState(false);
  const history = useHistory();

  if (confirmLeaving) {
    const removeFromLine = async () => {
      const response = await fetch(
        `http://localhost:5000/line/remove-shopper/${lineId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ticket),
        }
      );
      const data = await response.json();
      await localforage.removeItem("shopper");
      setTicket(null);
      setLeftLine(data);
      setTimeout(() => {
        history.push("/about");
      }, 1000);
    };
    removeFromLine();
  }
  useEffect(async () => {
    const shopper = await localforage.getItem("shopper");
    if (shopper) {
      const response = await fetch(`http://localhost:5000/line/${lineId}`);
      const serverLine = await response.json();
      setLine(serverLine);
      setTicket(shopper);
    } else {
      const response = await fetch(`http://localhost:5000/line/${lineId}`);
      const originalLine = await response.json();
      const shopper = {
        number: originalLine.line[originalLine.line.length - 1].number + 1,
        joinTime: moment().format("MMMM Do YYYY, h:mm:ss a"),
      };
      const response2 = await fetch(
        `http://localhost:5000/line/add-shopper/${lineId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shopper),
        }
      );
      const newLine = await response2.json();
      setLine(newLine);
      await localforage.setItem("shopper", shopper);
      setTicket(shopper);
    }
  }, []);
  return (
    <div className="text-center">
      <LeaveLineModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        confirmLeaving={setConfirmLeaving}
      />
      {leftLine && (
        <h2 className="p-3 white-text">{leftLine}. Thanks for using IQueue!</h2>
      )}
      {ticket && (
        <div>
          <TitleBanner title={line.storeName} />
          <div
            style={{
              margin: "2rem 1rem",
              maxWidth: "382px",
              display: "inline-block",
            }}
          >
            <Ticket line={line} ticket={ticket} />
            <Button
              style={{
                backgroundColor: "#fca311",
                color: "#14213d",
                border: "none",
                height: "3rem",
                fontSize: "1.5rem",
              }}
              className="w-100"
              onClick={() => setModalShow(true)}
            >
              Leave line
            </Button>
            <StoreInfo line={line} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketPage;
