import UserService from "../../common/services/userService";

/***
 * the component run the "logOut" function from "userService"
 */
const LogOut = () => {
  UserService.logOut();
  window.location = "/";

  return null;
};

export default LogOut;
