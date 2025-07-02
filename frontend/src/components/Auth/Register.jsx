import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    origin: "",
    latitude: "",
    longitude: "",
    email: "",
    password: "",
    role: "BUYER",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({
        ...form,
        latitude: parseFloat(form.latitude),
        longitude: parseFloat(form.longitude),
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-6 animate-fade-in"
      >
        <h2 className="text-2xl font-semibold text-center">
          Register for Petaniku
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              name="fullName"
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring transition-shadow"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Origin</label>
            <input
              name="origin"
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring transition-shadow"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Latitude</label>
            <input
              name="latitude"
              type="number"
              step="any"
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring transition-shadow"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Longitude</label>
            <input
              name="longitude"
              type="number"
              step="any"
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring transition-shadow"
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring transition-shadow"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring transition-shadow"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Role</label>
          <select
            name="role"
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring transition-shadow"
          >
            <option value="BUYER">Buyer</option>
            <option value="FARMER">Farmer</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          Register
        </button>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
