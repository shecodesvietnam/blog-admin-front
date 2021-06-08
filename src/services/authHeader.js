import axios from "axios";
import { apiUrl } from "../config/endpoint.json";

const token = localStorage.getItem("x-auth-token");

const unAuth = axios.create({
  baseURL: apiUrl,
});

const defAuth = axios.create({
  baseURL: apiUrl,
  headers: {
    "X-Auth-Token": token,
  },
});

const authHeader = {
  defAuth,
  unAuth,
};

export default authHeader;
