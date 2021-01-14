import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Ticket from "./components/ticket/ticket";
import CreateLine from "./components/create_line/createLine";
import Line from "./components/line/line";
import About from "./components/about/about";
import Account from "./components/account/account";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
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
