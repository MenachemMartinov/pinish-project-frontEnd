import UserService from "../../common/services/userService";

const LogOut = () => {
  UserService.logOut();
  window.location = "/";

  return null;
};

export default LogOut;
