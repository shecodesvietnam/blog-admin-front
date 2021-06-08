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

const MediaServices = {
  getAll,
  get,
  upload,
  deleteImg,
};

export default MediaServices;
