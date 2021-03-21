import http from "./httpService";
import { apiUrl } from "../config.json";

/**
 * the function send request to the server to save new favorite
 * the function getting 1 parameter
 * 1 the id of the favorite card
 */
export async function newFavorites(id) {
  const { data } = await http.post(
    `${apiUrl}/favorites/${id}/new-favorites`,
    null
  );
  return data;
}

/**
 * the function send request to the server to check if the card is favorite
 * the function getting 1 parameter
 * 1 the id of the card
 */
export async function ifExistFavorites(id) {
  const { data } = await http.get(`${apiUrl}/favorites/${id}`);
  return data;
}

/**
 * the function send request to the server to delete the card from the favorites cards list
 * the function getting 1 parameter
 * 1 the id of the card to delete from the favorites cards list
 */
export async function deleteFavorites(id) {
  const { data } = await http.delete(`${apiUrl}/favorites/${id}`);
  return data;
}

/**
 * the function send request to the server to get the list of all favorites cards
 */
export async function getAllFavorites() {
  const { data } = await http.get(`${apiUrl}/favorites/all-favorites`);
  console.log(data);
  return data;
}

/**
 * object to export all function
 */
const favoritesService = {
  newFavorites,
  ifExistFavorites,
  getAllFavorites,
  deleteFavorites,
};

export default favoritesService;
