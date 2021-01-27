import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import Cookie from "js-cookie";
const cookie = Cookie.getJSON("easyQ");

const PrivateRoute = ({ children, ...rest }) => {
  const { currentUser } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={() => {
        return cookie || currentUser ? children : <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
