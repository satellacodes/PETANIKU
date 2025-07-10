export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "buyer" | "farmer";
  location?: string;
  description?: string;
}
export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  tags: string[];
  farmer: {
    id: string;
    name: string;
    location: string;
  };
}
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  farmer: string;
}
export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: string;
  referenceId?: string;
}
