import React, { useState, useEffect } from "react";
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
import Cookie from "js-cookie";
import jwt_decode from "jwt-decode";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);
  const [currentUser, setCurrentUser] = useState(jwt_decode(Cookie.get("iQueue")));

  useEffect(() => {
    const newToken = Cookie.get("iQueue");
    if (newToken) {
      setCurrentUser(jwt_decode(newToken));
    }
  }, [showLoginModal]);

  const manageLoginModal = () => {
    setHasAccount(true);
    setShowLoginModal(!showLoginModal);
  };

  const manageSignUpModal = () => {
    setHasAccount(false);
    setShowLoginModal(!showLoginModal);
  };

  const changeModalType = () => {
    setHasAccount(!hasAccount);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleUserInfoChange = (userInfo) => {
    setCurrentUser(userInfo);
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
            <Account
              onUserInfoChange={(user) => {
                handleUserInfoChange(user);
              }}
            />
          </Route>
          <Route path="/create">
            <CreateLine />
          </Route>
          <Route path="/line/:lineId">
            <Line />
          </Route>
          <Route path="/">
            <About handleSignUp={() => manageSignUpModal()} />
            <LoginModal
              showModal={showLoginModal}
              closeModal={() => manageLoginModal()}
              hasAccount={hasAccount}
              changeModalType={() => changeModalType()}
            />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
