// File: src/pages/ProductsPage.jsx
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import api from "../utils/api";

const categories = ["Semua", "Sayuran", "Buah"];
const seasons = ["Semua", "Musim Panas", "Musim Hujan", "Musim Kemarau"];
const sortOptions = [
  { label: "Abjad A-Z", value: "name_asc" },
  { label: "Abjad Z-A", value: "name_desc" },
  { label: "Harga Terendah", value: "price_asc" },
  { label: "Harga Tertinggi", value: "price_desc" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "Semua",
    season: "Semua",
    sort: "",
    location: null,
  });
  const [loading, setLoading] = useState(true);

  // Get user location for nearest products
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setFilters((f) => ({
            ...f,
            location: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          })),
        () => setFilters((f) => ({ ...f, location: null })),
      );
    }
  }, []);

  // Fetch products on filters change
  useEffect(() => {
    setLoading(true);
    const params = {};
    if (filters.category !== "Semua") params.category = filters.category;
    if (filters.season !== "Semua") params.season = filters.season;
    if (filters.sort) params.sort = filters.sort;
    if (filters.location) {
      params.lat = filters.location.lat;
      params.lng = filters.location.lng;
    }
    api
      .get("/products", { params })
      .then((res) => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((f) => ({ ...f, [name]: value }));
  };

  return (
    <div className="p-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-4">Semua Produk</h1>
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border p-2 rounded-lg shadow-inner hover:shadow-md transition-shadow"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          name="season"
          value={filters.season}
          onChange={handleFilterChange}
          className="border p-2 rounded-lg shadow-inner hover:shadow-md transition-shadow"
        >
          {seasons.map((se) => (
            <option key={se} value={se}>
              {se}
            </option>
          ))}
        </select>
        <select
          name="sort"
          value={filters.sort}
          onChange={handleFilterChange}
          className="border p-2 rounded-lg shadow-inner hover:shadow-md transition-shadow"
        >
          <option value="">Urutkan</option>
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Loading produk...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
