import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const tokenKay = "token";

export function getJWT() {
  return localStorage.getItem(tokenKay);
}

export function logOut() {
  localStorage.removeItem(tokenKay);
  toast("התנתקת בהצלחה");
}

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

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(tokenKay, data.token);
}

export async function signUp(formData) {
  const { data } = await http.post(`${apiUrl}/users/new-user`, formData);
  return data;
}

const userService = {
  login,
  signUp,
  getCurrentUser,
  logOut,
  getJWT,
};

export default userService;
