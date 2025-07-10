import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NotificationSidebar from "./NotificationSidebar";
import { fetchProducts } from "../../services/productService";
import { fetchOrders } from "../../services/orderService";
import { useAuth } from "../../context/AuthContext";

const FarmerDashboard: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [prodData, ordData] = await Promise.all([
          fetchProducts({ farmerId: user?.id }),
          fetchOrders(),
        ]);
        setProducts(prodData);
        setOrders(ordData);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) loadData();
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard Petani</h1>
        <div className="flex space-x-4">
          <Link
            to="/farmer/products/new"
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Tambah Produk
          </Link>
          <NotificationSidebar />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Produk Saya</h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {products.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">Belum ada produk</p>
                <Link
                  to="/farmer/products/new"
                  className="text-green-600 hover:underline"
                >
                  Tambah produk pertama
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {products.map((product) => (
                  <li
                    key={product.id}
                    className="p-4 hover:bg-gray-50 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-green-600">
                        Rp{product.price.toLocaleString()}
                      </p>
                    </div>
                    <Link
                      to={`/farmer/products/edit/${product.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Pesanan Terbaru</h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {orders.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">Belum ada pesanan</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <li key={order.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">Pesanan #{order.id}</h3>
                        <p className="text-gray-500">{order.buyer.name}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status === "pending"
                          ? "Menunggu"
                          : order.status === "accepted"
                            ? "Diterima"
                            : "Ditolak"}
                      </span>
                    </div>
                    <p className="mt-2">
                      Total: Rp{order.total.toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
