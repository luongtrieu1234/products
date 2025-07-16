import axiosInstance from "../configs/axiosConfig";
import { ProductResponse } from "../types/product";
import { API_CONSTANTS } from "../constants";

export const fetchProducts = async (skip: number): Promise<ProductResponse> => {
  const res = await axiosInstance.get(`/products?limit=${API_CONSTANTS.PRODUCTS_LIMIT}&skip=${skip}`);
  return res.data;
};

export const searchProducts = async (
  query: string
): Promise<ProductResponse> => {
  const res = await axiosInstance.get(`/products/search?q=${query}`);
  return res.data;
};
