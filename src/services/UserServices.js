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

const UserServices = {
  getMe,
  login,
  logout,
};

export default UserServices;
