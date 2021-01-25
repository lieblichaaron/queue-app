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
  const [currentUser, setCurrentUser] = useState(null);
  //temp user state until we link to backend
  setCurrentUser({
    id: '600ecbad5d601d64b43cac9c',
    displayName: 'Jake',
    email: 'jakenudels@gmail.com',
    lines: [{
      isActive: true,
      storeName:'Burger Bar',
      customerAnalytics: {
        serviceTimes: [5, 2, 6, 9, 3],
        waitTimes: [0, 3, 4, 5, 6],
      },
      location: {
        lat: '32.080',
        lng: '34.785',
        address: '123 Street Road, Tel Aviv',
      },
      estServiceTime: 5,
    },
    {
      isActive: false,
      storeName:'Pizza Place',
      customerAnalytics: {
        serviceTimes: [],
        waitTimes: [],
      },
      location: {
        lat: '32.080',
        lng: '34.785',
        address: '321 Boulevard Avenue, Tel Aviv',
      },
      estServiceTime: 3,
    },
  ]
  })

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
