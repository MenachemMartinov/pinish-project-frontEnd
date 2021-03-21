import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const tokenKay = "token";

/**
 * the function get the token from the localStorage
 */
export function getJWT() {
  return localStorage.getItem(tokenKay);
}

/**
 * the function clear the token from the localStorage
 */
export function logOut() {
  localStorage.removeItem(tokenKay);
  toast("התנתקת בהצלחה");
}

/**
 * the function check if the token is kind of the system
 */
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKay);
    const JWT = jwtDecode(jwt);
    if (JWT?.user || JWT?.business || JWT?.manager) {
      return JWT;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

/**
 * the function send to the server request to login
 * the function getting 2 parameters
 * 1 the email
 * 2 the password
 * the function save in the localStorage
 */
export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(tokenKay, data.token);
}

/**
 * the function send to the server request to subscribe to the site
 * the function getting 1 parameter
 * 1 the form data
 */
export async function signUp(formData) {
  const { data } = await http.post(`${apiUrl}/users/new-user`, formData);
  return data;
}

/**
 * object to export all function
 */
const userService = {
  login,
  signUp,
  getCurrentUser,
  logOut,
  getJWT,
};

export default userService;
