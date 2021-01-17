import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Ticket from "./components/ticket/ticket";
import CreateLine from "./components/create_line/createLine";
import Line from "./components/line/line";
import About from "./components/about/about";
import Account from "./components/account/account";
import CustomNavbar from "./components/navbar/customNavbar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      hasAccount: true,
      isLoggedIn: false,
    }
  }


  render () {
  return (
    <Router>
      <CustomNavbar />
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
}

export default App;
