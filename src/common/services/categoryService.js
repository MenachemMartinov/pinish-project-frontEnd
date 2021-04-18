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
 * the function send to the server response to update category
 * the function getting 2 parameters
 * 1 the category data
 * 2 the category id
 */
export const updateCategory = async (id, formData) => {
  const { data } = await http.put(`${apiUrl}/categories/${id}`, formData);
  return data;
};

/**
 * the function send to the server request to delete category
 */
export const deleteCategories = async (id) => {
  const { data } = await http.get(`${apiUrl}/categories/${id}`);
  return data;
};

/**
 * object to export all function
 */
const categoryService = {
  getCategories,
  newCategory,
  updateCategory,
  deleteCategories,
};

export default categoryService;
