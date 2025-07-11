import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ProductCard from "../components/buyer/ProductCard";
import { fetchProducts } from "../services/productService";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    location: "",
    tag: "",
    sort: "",
  });
  const { user } = useAuth();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(filters);
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      }
    };

    if (user) loadProducts();
  }, [filters, user]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <h1 className="text-3xl font-bold mb-4">Daftar Produk</h1>

        <div className="flex flex-wrap gap-4">
          <select
            name="location"
            onChange={handleFilterChange}
            className="border rounded p-2"
          >
            <option value="">Semua Lokasi</option>
            {/* Populate with Jawa Tengah kabupaten */}
          </select>

          <select
            name="tag"
            onChange={handleFilterChange}
            className="border rounded p-2"
          >
            <option value="">Semua Kategori</option>
            {/* Populate with tags */}
          </select>

          <select
            name="sort"
            onChange={handleFilterChange}
            className="border rounded p-2"
          >
            <option value="">Urutkan</option>
            <option value="popular">Terpopuler</option>
            <option value="lowest">Harga Terendah</option>
            <option value="highest">Harga Tertinggi</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
