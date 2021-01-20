import TitleBanner from "../title_banner/titleBanner";
import Ticket from "../ticket/ticket";
import { Button } from "react-bootstrap";
import StoreInfo from "../store_info/storeInfo";
const TicketPage = () => {
  return (
    <div className="text-center">
      <TitleBanner title="Store Name" />
      <div
        style={{
          margin: "2rem 1rem",
          maxWidth: "382px",
          display: "inline-block",
        }}
      >
        <Ticket />
        <Button
          style={{
            backgroundColor: "#fca311",
            color: "#14213d",
            border: "none",
            height: "3rem",
          }}
          className="w-100"
          type="submit"
        >
          Confirm ticket/Leave line
        </Button>
        <StoreInfo />
      </div>
    </div>
  );
};

export default TicketPage;
