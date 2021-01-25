import { useEffect, useState } from "react";
import TitleBanner from "../title_banner/titleBanner";
import Ticket from "../ticket/ticket";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import StoreInfo from "../store_info/storeInfo";
const TicketPage = () => {
  const { lineId } = useParams();
  const [line, setLine] = useState();

  const removeFromLine = () => {};
  useEffect(async () => {
    const response = await fetch(`http://localhost:5000/line/${lineId}`);
    const originalLine = await response.json();
    const shopper = {
      number: originalLine.line[originalLine.line.length - 1].number + 1,
      joinTime: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
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
  }, []);
  return (
    <div className="text-center">
      {line && (
        <div>
          <TitleBanner title={line.storeName} />
          <div
            style={{
              margin: "2rem 1rem",
              maxWidth: "382px",
              display: "inline-block",
            }}
          >
            <Ticket line={line} />
            <Button
              style={{
                backgroundColor: "#fca311",
                color: "#14213d",
                border: "none",
                height: "3rem",
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
