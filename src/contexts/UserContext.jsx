import React from "react";

const UserContext = React.createContext(
  {
    id: '',
    displayName: '',
    email: '',
    lineIds: [""]
  }
)

export default UserContext;