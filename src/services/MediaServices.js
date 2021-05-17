import http from "./authHeader";

const getAll = () => {
  return http.defAuth.get("/media/files");
};

const get = (filename) => {
  return http.defAuth.get(`/media/files/${filename}`);
};

const upload = (data) => {
  return http.defAuth.post("/media/upload", data);
};

const deleteImg = (filename) => {
  return http.defAuth.delete(`/media/files/${filename}`);
};

export default {
  getAll,
  get,
  upload,
  deleteImg,
};
