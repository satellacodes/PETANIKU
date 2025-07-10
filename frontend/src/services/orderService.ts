import api from "./api";

export const createOrder = async (orderData: any) => {
  const response = await api.post("/buyer/orders", orderData);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await api.get("/farmer/orders");
  return response.data;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const response = await api.put(`/farmer/orders/${id}`, { status });
  return response.data;
};
