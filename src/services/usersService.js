import http from "./httpService";

const endPoint ="/users";

export const register = ({ username, password, name }) => {
  return http.post(endPoint, {
    email: username,
    password,
    name,
  });
};
