import http from "./httpService";

const endPoin = process.env.REACT_APP_BASE_URL + "/genres";
export const getGenres = () => {
  return http.get(endPoin);
};
