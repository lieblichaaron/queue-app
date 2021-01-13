import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/ticket">
          <Ticket />
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
