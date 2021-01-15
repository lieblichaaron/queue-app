import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Ticket from "./components/ticket/ticket";
import CreateLine from "./components/create_line/createLine";
import Line from "./components/line/line";
import About from "./components/about/about";
import Dashboard from "./components/dashboard/Dashboard";
import Account from "./components/account/account";
import CustomNavbar from "./components/navbar/customNavbar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <CustomNavbar />
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/ticket">
          <Ticket />
        </Route>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/create">
          <CreateLine />
        </Route>
        <Route path="/line">
          <Line />
        </Route>
        <Route path="/">
          <About />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
