import api from "./api";

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const registerUser = async (data: any) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

export const fetchFarmerProfile = async (id: string) => {
  const response = await api.get(`/farmer/profile/${id}`);
  return response.data;
};

export const fetchFarmerProducts = async (id: string) => {
  const response = await api.get(`/farmer/products/${id}`);
  return response.data;
};

export const refreshToken = async () => {
  const response = await api.post("/auth/refresh");
  return response.data;
};
