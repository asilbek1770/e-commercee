import http from "./httpService";
import jwtDecode from "jwt-decode";

const endPoint = process.env.REACT_APP_BASE_URL + "/auth";
const tokenKey = "token";

const login = async (email, password) => {
  const { data: jwt } = await http.post(endPoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
};

const loginWithToken = (token) => {
  localStorage.setItem(tokenKey, token);
};

const logout = () => {
  localStorage.removeItem(tokenKey);
};

const getCurrentUser = () => {
  const token = localStorage.getItem(tokenKey);
  return jwtDecode(token);
};

const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

http.setJwt(getJwt());

export default {
  login,
  loginWithToken,
  logout,
  getCurrentUser,
  getJwt,
};
