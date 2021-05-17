import http from "./authHeader";

const getAll = () => {
  return http.defAuth.get("/posts");
};

const get = (id) => {
  return http.defAuth.get(`/posts/${id}`);
};

const create = (data) => {
  return http.defAuth.post("/posts", data);
};

const update = (id, data) => {
  return http.defAuth.put(`/posts/${id}`, data);
};

const remove = (id) => {
  return http.defAuth.delete(`/posts/${id}`);
};

const removeAll = () => {
  return http.defAuth.delete(`/posts`);
};

const findByTitle = (title) => {
  return http.defAuth.get(`/posts?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};
