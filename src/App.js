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
import PrivateRoute from "./components/private_route/privateRoute";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    displayName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = Cookie.get("easyQ");
    if (token) {
      setCurrentUser(jwt_decode(token));
      setIsLoggedIn(true);
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
    Cookie.set("easyQ", res.data.authToken, { path: "/" });
    setCurrentUser(jwt_decode(res.data.authToken));
    setShowLoginModal(false);
    setIsLoggedIn(true);
    window.location.assign(`${window.location.origin}/dashboard`);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setIsLoggedIn();
    Cookie.remove("easyQ");
    window.location.assign(window.location.origin);
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
          handleSignOut={() => {
            handleSignOut();
          }}
        />

        <Switch>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="/ticket/:lineId">
            <TicketPage />
          </Route>
          <PrivateRoute path="/account">
            <Account
              onUserInfoChange={(user) => {
                handleUserInfoChange(user);
              }}
            />
          </PrivateRoute>
          <PrivateRoute path="/create">
            <CreateLine />
          </PrivateRoute>
          <PrivateRoute path="/line/:lineId">
            <Line />
          </PrivateRoute>
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
