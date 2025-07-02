import React, { useEffect, useState } from "react";
import api from "../../utils/api";

export default function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(
      res.data.filter((p) => p.farmerId === JSON.parse(localStorage.user).id),
    );
  };

  const handleCreate = async () => {
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    await api.post("/products", data);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-4">Farmer Dashboard</h1>
      <div className="mb-6 bg-white p-4 rounded shadow-sm">
        <h2 className="text-2xl mb-2">Add New Product</h2>
        <input
          placeholder="Name"
          className="border p-2 mb-2 w-full"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Price"
          type="number"
          className="border p-2 mb-2 w-full"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="border p-2 mb-2 w-full"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          className="mb-2"
        />
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white py-2 rounded shadow"
        >
          Add Product
        </button>
      </div>
      <h2 className="text-2xl mb-2">Your Products</h2>
      <ul className="space-y-4">
        {products.map((p) => (
          <li
            key={p.id}
            className="border p-4 rounded shadow-md bg-white flex justify-between"
          >
            <span>
              {p.name} - Rp {p.price}
            </span>
            <button onClick={() => handleDelete(p.id)} className="text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
