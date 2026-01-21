import api from "./api";

export const fetchProducts = async (filters: any) => {
  const response = await api.get("/products", { params: filters });
  return response.data;
};

export const fetchProductById = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData: any) => {
  const response = await api.post("/farmer/products", productData);
  return response.data;
};

export const updateProduct = async (id: string, productData: any) => {
  const response = await api.put(`/farmer/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/farmer/products/${id}`);
  return response.data;
};
