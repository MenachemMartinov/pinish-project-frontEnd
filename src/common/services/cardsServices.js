import http from "./httpService";
import { apiUrl } from "../config.json";

export async function getMyCards() {
  const { data } = await http.get(`${apiUrl}/cards/all-cards`);
  return data;
}

export async function newCard(cardData) {
  const { data } = await http.post(`${apiUrl}/cards/new-card`, cardData);
  return data;
}

export async function getCard(id) {
  const { data } = await http.get(`${apiUrl}/cards/${id}`);
  return data;
}

export async function updateCard(id, cardData) {
  const { data } = await http.put(`${apiUrl}/cards/${id}`, cardData);
  return data;
}

export async function updateCardImage(id, cardData) {
  const { data } = await http.put(`${apiUrl}/cards/${id}/upload-img`, cardData);
  return data;
}

export async function uploadCardImages(cardData) {
  const { data } = await http.post(`${apiUrl}/files/new-file`, cardData);
  return data;
}

export async function deleteCard(id) {
  const { data } = await http.delete(`${apiUrl}/cards/${id}`);
  return data;
}

const cardServices = {
  getMyCards,
  getCard,
  newCard,
  updateCard,
  updateCardImage,
  deleteCard,
  uploadCardImages,
};

export default cardServices;
