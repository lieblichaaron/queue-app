import React from "react";
import { Button } from "react-bootstrap";
import Account from "../account/account";
import LineList from "../line_list/LineList";
import "./Dashboard.css";

function Dashboard() {
  const user = {
    displayName: "Jake",
    lines: [
      {
        store: "burgers",
        active: true,
        length: 4,
      },
      {
        store: "pizza",
        active: false,
        length: 0,
      },
    ],
  };

  return (
    <div>
      <h2 className="w-100 py-3 px-1 text-center text-wrap">
        Welcome back, {user.displayName}!
      </h2>
      <p className="text-center mx-4">
        Create a new line or manage existing lines at the press of a button
      </p>
      <span className="d-flex justify-content-center">
        <Button className="create-line-btn py-4 px-5 my-5">Create a new line</Button>
      </span>
      <div className="existing-lines-container p-2 pb-3 my-3">
        <h3 className="text-center">Current Lines</h3>
        <LineList lines={user.lines} />
      </div>
      {/* <div className="account-settings-container">
        <h3 className="text-center">Account Settings</h3>
        <Account />
      </div> */}
    </div>
  );
}

export default Dashboard;
