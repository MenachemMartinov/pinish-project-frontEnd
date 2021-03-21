import http from "./httpService";

import { apiUrl } from "../config.json";

/**
 * the function send to the server request to get all categories
 */
export const getCategories = async () => {
  const { data } = await http.get(`${apiUrl}/categories`);
  return data;
};

/**
 * the function send to the server response to create new category
 * the function getting 1 parameter 
 * 1 the category data
 */
export const newCategory = async (formData) => {
  const { data } = await http.post(
    `${apiUrl}/categories/new-category/`,
    formData
  );
  return data;
};

/**
 * object to export all function
 */
const categoryService = {
  getCategories,
  newCategory,
};

export default categoryService;
