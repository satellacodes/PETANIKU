import React, { useEffect, useState } from "react";
import api from "../../utils/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [reports, setReports] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [u, p, r] = await Promise.all([
      api.get("/admin/users"),
      api.get("/admin/products"),
      api.get("/admin/reports"),
    ]);
    setUsers(u.data);
    setProducts(p.data);
    setReports(r.data);
  };

  const updateUser = async (id, data) => {
    await api.put(`/admin/users/${id}`, data);
    fetchData();
  };

  const deleteUser = async (id) => {
    await api.delete(`/admin/users/${id}`);
    fetchData();
  };

  const deleteProduct = async (id) => {
    await api.delete(`/admin/products/${id}`);
    fetchData();
  };

  const updateReport = async (id, data) => {
    await api.put(`/admin/reports/${id}`, data);
    fetchData();
  };

  return (
    <div className="p-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <section className="mb-6">
        <h2 className="text-2xl">Users</h2>
        <table className="w-full border mt-2 shadow-sm">
          <thead className="bg-gray-200">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-100">
                <td>{u.fullName}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl">Products</h2>
        <table className="w-full border mt-2 shadow-sm">
          <thead className="bg-gray-200">
            <tr>
              <th>Name</th>
              <th>Farmer</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-100">
                <td>{p.name}</td>
                <td>{p.farmer.email}</td>
                <td>Rp {p.price}</td>
                <td>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-2xl">Reports</h2>
        <ul className="mt-2 space-y-2">
          {reports.map((r) => (
            <li
              key={r.id}
              className="bg-white p-4 rounded shadow-sm flex justify-between"
            >
              <div>
                <p>
                  <strong>{r.user.email}</strong>: {r.message}
                </p>
                <select
                  value={r.status}
                  onChange={(e) =>
                    updateReport(r.id, { status: e.target.value })
                  }
                  className="border p-1 rounded"
                >
                  <option>OPEN</option>
                  <option>IN_PROGRESS</option>
                  <option>RESOLVED</option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
