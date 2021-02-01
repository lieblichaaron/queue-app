import { useEffect, useState } from "react";
import TitleBanner from "../title_banner/titleBanner";
import Ticket from "../ticket/ticket";
import { Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import StoreInfo from "../store_info/storeInfo";
import localforage from "localforage";
import NextInLineModal from "../next_in_line/nextInLineModal";
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
  const [leaveLineModalShow, setLeaveLineModalShow] = useState(false);
  const [nextInLineModalShow, setNextInLineModalShow] = useState(false);
  const [replace, setReplace] = useState();
  const history = useHistory();

  useEffect(() => {
    const watchLine = async () => {
      let mounted = true;
      if (ticket) {
        const newLine = await watchLineById(lineId);
        if (mounted && typeof newLine === "object") {
          setLine(newLine);
          if (newLine.line[0].number >= ticket.number - 2) {
            document.getElementById("nowServing").classList.add("pulse");
            setNextInLineModalShow(true);
          }
        }
      }
      return function cleanup() {
        mounted = false;
      };
    };
    watchLine();
  }, [line, ticket]);

  const removeFromLine = async () => {
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
  };

  useEffect(() => {
    if (confirmLeaving === true) {
      removeFromLine();
    }
    if (confirmLeaving === false) {
      setLeftLine("Redirection to your original ticket.");
      setTimeout(() => {
        history.push(`/ticket/${ticket.lineId}`);
        window.location.reload();
      }, 2000);
    }
  }, [confirmLeaving]);

  const ticketHolder = async (shopper) => {
    const serverLine = await getLineById(lineId);
    setLine(serverLine);
    setTicket(shopper);
    if (serverLine.line[0].number >= shopper.number - 2) {
      document.getElementById("nowServing").classList.add("pulse");
      setNextInLineModalShow(true);
    }
  };

  const replaceTicket = (shopper) => {
    setReplace(true);
    setTicket(shopper);
    setLeaveLineModalShow(true);
  };

  const createNewTicket = async () => {
    const newLine = await addTicketToLine(lineId);
    setLine(newLine);
    if (typeof newLine === "object") {
      const shopper = newLine.line[newLine.line.length - 1];
      await localforage.setItem("shopper", shopper);
      setTicket(shopper);
    }
  };

  const inactiveLine = (shopper) => {
    setLine(
      `The line is currently closed, ${
        shopper
          ? "redirecting to your original ticket..."
          : "we're sorry for the inconvenience."
      }`
    );
    if (shopper) {
      setTimeout(() => {
        history.push(`/ticket/${shopper.lineId}`);
        window.location.reload();
      }, 2000);
    }
  };

  const initTicketFunc = async () => {
    const shopper = await localforage.getItem("shopper");
    const serverLine = await getLineById(lineId);
    if (shopper.lineId !== lineId || !serverLine.isActive) {
      inactiveLine(shopper);
    } else {
      if (shopper && shopper.lineId === lineId) {
        ticketHolder(shopper);
      } else if (shopper) {
        replaceTicket(shopper);
      } else {
        createNewTicket();
      }
    }
  };

  useEffect(() => {
    initTicketFunc();
  }, []);

  return (
    <div className="text-center">
      <LeaveLineModal
        replace={replace}
        show={leaveLineModalShow}
        onHide={() => setLeaveLineModalShow(false)}
        confirmLeaving={setConfirmLeaving}
      />
      <NextInLineModal
        show={nextInLineModalShow}
        onHide={() => setNextInLineModalShow(false)}
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
              onClick={() => setLeaveLineModalShow(true)}
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
