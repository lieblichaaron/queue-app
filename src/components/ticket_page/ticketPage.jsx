import TitleBanner from "../title_banner/titleBanner";
import Ticket from "../ticket/ticket";
import { Button } from "react-bootstrap";
const TicketPage = () => {
  return (
    <div>
      <TitleBanner title="Store Name" />
      <div style={{ margin: "2rem 1rem" }}>
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
        {/* <StoreInfo /> */}
      </div>
    </div>
  );
};

export default TicketPage;
