import React from "react";

const UserContext = React.createContext(
  {
    id: '',
    displayName: '',
    email: '',
    lines: [{
      isActive: true,
      storeName:'',
      customerAnalytics: {
        serviceTimes: [],
        waitTimes: [],
      },
      location: {
        lat: '',
        lng: '',
        address: '',
      },
      estServiceTime: 0,
    }]
  }
)

export default UserContext;