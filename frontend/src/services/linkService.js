import api from "./api";

export const getLinks = async () => {
  const { data } = await api.get("/links");
  return data;
};

export const createLink = async (linkData) => {
  const { data } = await api.post("/links", linkData);

  return data;
};

export const updateLink = async (id, linkData) => {
  const { data } = await api.put(`/links/${id}`, linkData);

  return data;
};

export const deleteLink = async (id) => {
  const { data } = await api.delete(`/links/${id}`);

  return data;
};
