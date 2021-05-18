import axios from "axios";

const token = localStorage.getItem("x-auth-token");

const unAuth = axios.create({
  baseURL: "http://localhost:3000/api",
});

const defAuth = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "X-Auth-Token": token,
  },
});

const authHeader = {
  defAuth,
  unAuth,
};

export default authHeader;
