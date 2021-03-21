import userService from "./services/userService";
import { Redirect, Route } from "react-router-dom";

/**
 * the component check if the user has been logged
 * if the user is logged the component will return the (component or render) what gibeon 
 */
const ProtectedRoute = ({ component: Component, render, biz, ...rest }) => {
  const currentUser = userService.getCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser || (biz && !currentUser.biz)) {
          return (
            <Redirect
              to={{
                pathname: "/sign-in",
                state: { from: props.location },
              }}
            />
          );
        }

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
