import { useEffect, useState } from "react";
import TitleBanner from "../title_banner/titleBanner";
import Ticket from "../ticket/ticket";
import { Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import StoreInfo from "../store_info/storeInfo";
import localforage from "localforage";
import moment from "moment";
import LeaveLineModal from "../leave_line_modal/leaveLineModal";
import {
  leaveLine,
  getLineById,
  addTicketToLine,
  watchLineById,
} from "../../serverFuncs";

const TicketPage = () => {
  const { lineId } = useParams();
  const [confirmLeaving, setConfirmLeaving] = useState(false);
  const [line, setLine] = useState();
  const [ticket, setTicket] = useState();
  const [leftLine, setLeftLine] = useState();
  const [modalShow, setModalShow] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const watchLine = async () => {
      const newLine = await watchLineById(lineId);
      setLine(newLine);
    };
    watchLine();
  }, [line]);
  useEffect(() => {
    const removeFromLine = async () => {
      if (confirmLeaving) {
        const data = await leaveLine(lineId, ticket);
        await localforage.removeItem("shopper");
        setTicket(null);
        setLeftLine(data);
        setTimeout(() => {
          history.push("/about");
        }, 2000);
      }
    };
    removeFromLine();
  }, [confirmLeaving]);
  useEffect(() => {
    const initFunc = async () => {
      const shopper = await localforage.getItem("shopper");
      if (shopper) {
        const serverLine = await getLineById(lineId);
        setLine(serverLine);
        setTicket(shopper);
      } else {
        const originalLine = await getLineById(lineId);
        const newShopper = {
          number: originalLine.line[originalLine.line.length - 1].number + 1,
          joinTime: moment().format("MMMM Do YYYY, h:mm:ss a"),
        };
        const newLine = await addTicketToLine(lineId, newShopper);
        setLine(newLine);
        await localforage.setItem("shopper", newShopper);
        setTicket(newShopper);
      }
    };
    initFunc();
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
