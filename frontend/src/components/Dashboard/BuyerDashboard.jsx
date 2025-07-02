import React, { useEffect, useState } from "react";
import api from "../../utils/api";

export default function BuyerDashboard() {
  const [orders, setOrders] = useState([]);
  const [rating, setRating] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    const res = await api.get("/orders");
    setOrders(res.data);
  };
  const submitRating = async (orderId) => {
    await api.post(`/orders/${orderId}/rating`, { rating: rating[orderId] });
  };

  return (
    <div className="p-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-4">Buyer Dashboard</h1>
      <h2 className="text-2xl mb-2">Your Orders</h2>
      <ul className="space-y-4">
        {orders.map((o) => (
          <li key={o.id} className="border p-4 rounded shadow-md bg-white">
            <p>
              Order #{o.id} - Status: {o.status}
            </p>
            <div className="mt-2">
              <label>Rating:</label>
              <select
                onChange={(e) =>
                  setRating({ ...rating, [o.id]: e.target.value })
                }
                className="border ml-2 p-1"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
              <button
                onClick={() => submitRating(o.id)}
                className="ml-2 text-indigo-600"
              >
                Submit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
