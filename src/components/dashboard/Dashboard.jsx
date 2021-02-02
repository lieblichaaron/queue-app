import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import LineList from "../line_list/LineList";
import "./Dashboard.css";

function Dashboard() {
  const [lines, setLines] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useContext(UserContext);
  const getLines = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000" + "/owner/" + user._id + "/lines"
      );
      setLines(res.data);
    } catch (err) {}
    setIsLoading(false);
  };

  useEffect(() => {
    getLines();
  }, [user]);

  return (
    <div>
      {isLoading && <div className="loader" />}
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
        {isLoading ? <p>loading...</p> : <LineList lines={lines} />}
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
