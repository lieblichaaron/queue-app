import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TicketPage from "./components/ticket_page/ticketPage";
import CreateLine from "./components/create_line/createLine";
import Line from "./components/line/line";
import About from "./components/about/about";
import Dashboard from "./components/dashboard/Dashboard";
import Account from "./components/account/account";
import CustomNavbar from "./components/navbar/customNavbar";
import LoginModal from "./components/login/loginModal";
import UserContext from "./contexts/UserContext";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  //temp user state until we link to backend
  const [currentUser, setCurrentUser] = useState({
    id: '600ecbad5d601d64b43cac9c',
    displayName: 'Jake',
    email: 'jakenudels@gmail.com',
    lineIds: [
      "600ed2a0c82668f8cafdc9ac",
  ]
  });

  const manageLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };
  return (
    <UserContext.Provider value={currentUser}>
      <Router>
        <CustomNavbar
          isLoggedIn={isLoggedIn}
          handleSignIn={() => manageLoginModal()}
        />

        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/ticket/:lineId">
            <TicketPage />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/create">
            <CreateLine />
          </Route>
          <Route path="/line/:lineId">
            <Line />
          </Route>
          <Route path="/">
            <About handleSignIn={() => manageLoginModal()} />
            <LoginModal
              showModal={showLoginModal}
              closeModal={() => manageLoginModal()}
            />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
