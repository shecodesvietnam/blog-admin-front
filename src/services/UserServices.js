import http from "./authHeader";

const getMe = () => {
  return http.defAuth.get("/me");
};

const login = (data) => {
  return http.unAuth.post("/auth", data);
};

const logout = () => {
  localStorage.removeItem("x-auth-token");
};

export default {
  getMe,
  login,
  logout,
};
