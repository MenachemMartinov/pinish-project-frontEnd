import http from "./httpService";
import { apiUrl } from "../config.json";

export async function newFavorites(id) {
  const { data } = await http.post(
    `${apiUrl}/favorites/${id}/new-favorites`,
    null
  );
  return data;
}

export async function ifExistFavorites(id) {
  const { data } = await http.get(`${apiUrl}/favorites/${id}`);
  return data;
}

export async function deleteFavorites(id) {
  const { data } = await http.delete(`${apiUrl}/favorites/${id}`);
  return data;
}

export async function getAllFavorites() {
  const { data } = await http.get(`${apiUrl}/favorites/all-favorites`);
  console.log(data);
  return data;
}

const favoritesService = {
  newFavorites,
  ifExistFavorites,
  getAllFavorites,
  deleteFavorites,
};

export default favoritesService;
