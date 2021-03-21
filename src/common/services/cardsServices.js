import http from "./httpService";
import { apiUrl } from "../config.json";

/**
 * the function send to the server request to all cards
 */
export async function getCards() {
  const { data } = await http.get(`${apiUrl}/cards/all-cards`);
  return data;
}

/**
 * the function send to the server request to the create a new card
 * is getting 1 parameter
 * 1 the card data
 */
export async function newCard(cardData) {
  const { data } = await http.post(`${apiUrl}/cards/new-card`, cardData);
  return data;
}

/**
 * the function send to the server request to get card by id
 * the function getting 1 parameter
 * 1 the card id
 */
export async function getCard(id) {
  const { data } = await http.get(`${apiUrl}/cards/${id}`);
  return data;
}

/**
 * the function send to the server request to update Card
 * the function getting 2 parameters
 * 1 the id of the card
 * 2 the card data
 */
export async function updateCard(id, cardData) {
  const { data } = await http.put(`${apiUrl}/cards/${id}`, cardData);
  return data;
}

/**
 * the function send to the server request to update the image of the Card with gibeon id
 * the function getting 2 parameters
 * 1 the id of the card
 * 2 the card data (image)
 */
export async function updateCardImage(id, cardData) {
  const { data } = await http.put(`${apiUrl}/cards/${id}/upload-img`, cardData);
  return data;
}

/**
 * the function send to the server request to remove card
 * the function getting 1 parameter
 * 1 the id of the card
 */
export async function deleteCard(id) {
  const { data } = await http.delete(`${apiUrl}/cards/${id}`);
  return data;
}

/**
 * object to export all function
 */
const cardServices = {
  getCards,
  getCard,
  newCard,
  updateCard,
  updateCardImage,
  deleteCard,
};

export default cardServices;
