import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import LineList from "../line_list/LineList";
import "./Dashboard.css";

function Dashboard() {
  const user = useContext(UserContext);
  const lines = [
    {
      id: "600ed2a0c82668f8cafdc9ac",
      ownerID: "600ecbad5d601d64b43cac9c",
      isActive: true,
      storeName: "Burger Bar",
      estServiceTime: "3",
      customerAnalytics: {
        serviceTimes: [
          { $numberInt: "2" },
          { $numberInt: "5" },
          { $numberInt: "3" },
          { $numberInt: "8" },
        ],
        waitTimes: [
          { $numberInt: "5" },
          { $numberInt: "10" },
          { $numberInt: "8" },
          { $numberInt: "15" },
        ],       
      },
      tickets: [1, 2, 3, 4, 5],
      location: {
        lat: "32.080",
        lng: "34.785",
        address: "123 Road Street, Tel Aviv",
      },
    },
  ];

  return (
    <div>
      <h2 className="w-100 py-3 px-1 text-center text-wrap white-text">
        Welcome back, {user.displayName}!
      </h2>
      <p className="text-center mx-4 white-text">
        Create a new line or manage existing lines at the press of a button
      </p>
      <span className="d-flex justify-content-center">
        <Link to="/create">
          <Button className="create-line-btn py-4 px-5 my-5 font-weight-bolder">
            Create a new line
          </Button>
        </Link>
      </span>
      <div className="existing-lines-container p-2 pb-3 my-3">
        <h3 className="text-center black-text">Current Lines</h3>
        <LineList lines={lines} />
      </div>
      <span className="d-flex justify-content-center">
        <Link to="/account">
          <Button className="account-settings-btn mb-3">
            Account settings
          </Button>
        </Link>
      </span>
    </div>
  );
}

export default Dashboard;
