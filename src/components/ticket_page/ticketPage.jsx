import { useEffect, useState } from "react";
import TitleBanner from "../title_banner/titleBanner";
import Ticket from "../ticket/ticket";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import StoreInfo from "../store_info/storeInfo";
import localforage from "localforage";
const TicketPage = () => {
  const { lineId } = useParams();
  const [line, setLine] = useState();
  const [ticket, setTicket] = useState();

  const removeFromLine = () => {};
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
        joinTime: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
      };
      const response2 = await fetch(`http://localhost:5000/line/${lineId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopper),
      });
      const newLine = await response2.json();
      setLine(newLine);
      await localforage.setItem("shopper", shopper);
      setTicket(shopper);
    }
  }, []);
  return (
    <div className="text-center">
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
              onClick={removeFromLine}
            >
              Leave line
            </Button>
            <StoreInfo />
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketPage;
