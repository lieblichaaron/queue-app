import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TicketPage from "./components/ticket_page/ticketPage";
import CreateLine from "./components/create_line/createLine";
import Line from "./components/line/line";
import Home from "./components/home/home";
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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    displayName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = Cookie.get("iQueue");
    if (token) {
      setCurrentUser(jwt_decode(token));
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

  const handleSignIn = (res) => {
    Cookie.set("iQueue", res.data.authToken, { path: "/" });
    setCurrentUser(jwt_decode(res.data.authToken))
    setShowLoginModal(false)
    alert(`Welcome back ${res.data.displayName}!`);
    window.location.assign(`${window.location.origin}/dashboard`);

  };

  const handleSignOut = () => {
    setCurrentUser(null);
    Cookie.remove("iQueue");
    window.location.assign(window.location.origin);
  };

  const handleUserInfoChange = (userInfo) => {
    setCurrentUser(userInfo);
  };

  return (
    <UserContext.Provider value={currentUser}>
      <Router>
        <CustomNavbar
          isLoggedIn={currentUser ? true : false}
          handleSignIn={() => manageLoginModal()}
          handleSignOut={() => {
            handleSignOut();
          }}
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
            <Home handleSignUp={() => manageSignUpModal()} />
            <LoginModal
              showModal={showLoginModal}
              closeModal={() => manageLoginModal()}
              hasAccount={hasAccount}
              handleSignIn={(res) => {
                handleSignIn(res);
              }}
              changeModalType={() => changeModalType()}
            />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
