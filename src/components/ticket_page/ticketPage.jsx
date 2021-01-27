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
  const [confirmLeaving, setConfirmLeaving] = useState();
  const [line, setLine] = useState();
  const [ticket, setTicket] = useState();
  const [leftLine, setLeftLine] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [replace, setReplace] = useState();
  const history = useHistory();

  useEffect(() => {
    const watchLine = async () => {
      let mounted = true;
      if (ticket) {
        const newLine = await watchLineById(lineId);
        if (mounted) {
          setLine(newLine);
          if (newLine.line[0].number === ticket.number) {
            // notify
          }
        }
      }
      return function cleanup() {
        mounted = false;
      };
    };
    watchLine();
  }, [line]);
  useEffect(() => {
    const removeFromLine = async () => {
      if (confirmLeaving === true) {
        const data = await leaveLine(ticket.lineId, ticket);
        await localforage.removeItem("shopper");
        setTicket(null);
        if (!replace) {
          setLeftLine(data);
          setTimeout(() => {
            history.push("/home");
          }, 2000);
        } else {
          window.location.reload();
        }
      }
      if (confirmLeaving === false) {
        setLeftLine("Redirection to your original ticket.");
        setTimeout(() => {
          history.push(`/ticket/${ticket.lineId}`);
          window.location.reload();
        }, 2000);
      }
    };
    removeFromLine();
  }, [confirmLeaving]);

  const ticketHolder = async (shopper) => {
    const serverLine = await getLineById(lineId);
    setLine(serverLine);
    setTicket(shopper);
  };
  const replaceTicket = (shopper) => {
    setReplace(true);
    setTicket(shopper);
    setModalShow(true);
  };
  const createNewTicket = async () => {
    const originalLine = await getLineById(lineId);
    const newShopper = {
      number:
        originalLine.line && originalLine.line.length > 0
          ? originalLine.line[originalLine.line.length - 1].number + 1
          : 1,
      joinTime: moment().format("MMMM Do YYYY, h:mm:ss a"),
      lineId: lineId,
    };
    const newLine = await addTicketToLine(lineId, newShopper);
    setLine(newLine);
    if (typeof newLine === "object") {
      await localforage.setItem("shopper", newShopper);
      setTicket(newShopper);
    }
  };

  useEffect(() => {
    const initTicketFunc = async () => {
      const shopper = await localforage.getItem("shopper");
      if (shopper && shopper.lineId === lineId) {
        ticketHolder(shopper);
      } else if (shopper) {
        replaceTicket(shopper);
      } else {
        createNewTicket();
      }
    };
    initTicketFunc();
  }, []);
  return (
    <div className="text-center">
      <LeaveLineModal
        replace={replace}
        show={modalShow}
        onHide={() => setModalShow(false)}
        confirmLeaving={setConfirmLeaving}
      />
      {leftLine && (
        <h2 className="p-3 white-text">{leftLine} Thanks for using easyQ!</h2>
      )}
      {typeof line === "string" && <h2 className="p-3 white-text">{line}</h2>}
      {ticket && typeof line === "object" && (
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
