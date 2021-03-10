import http from "./httpService";

import { apiUrl } from "../config.json";

export const getCategories = async () => {
  const { data } = await http.get(`${apiUrl}/categories`);
  return data;
};

export const newCategory = async (formData) => {
  const { data } = await http.post(
    `${apiUrl}/categories/new-category/`,
    formData
  );
  return data;
};

const categoryService = {
  getCategories,
  newCategory,
};

export default categoryService;
