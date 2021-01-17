import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TicketPage from "./components/ticket_page/ticketPage";
import CreateLine from "./components/create_line/createLine";
import Line from "./components/line/line";
import About from "./components/about/about";
import Account from "./components/account/account";
import CustomNavbar from "./components/navbar/customNavbar";
import LoginModal from "./components/login/loginModal"
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      showLoginModal: false
    }
  }
  manageLoginModal() {
    this.setState({ showLoginModal: !this.state.showLoginModal })    
  }

  handleLogout() {
    this.setState({isLoggedIn:false})
  }

  render() {
    const { showLoginModal, isLoggedIn } = this.state;
  return (
    <Router>
      <CustomNavbar isLoggedIn={isLoggedIn} handleSignIn={ () => this.manageLoginModal() }/>
      
      <Switch>
        <Route path="/ticket">
          <TicketPage />
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
          <LoginModal showModal={showLoginModal} closeModal={ () => this.manageLoginModal() }/>
        </Route>
      </Switch>
    </Router>
    );
    }
}

export default App;
