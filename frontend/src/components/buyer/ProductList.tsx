import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../../services/productService";
import { useAuth } from "../../context/AuthContext";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    location: "",
    tag: "",
    sort: "",
    search: "",
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

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <h1 className="text-3xl font-bold mb-4">Daftar Produk</h1>

        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            name="search"
            placeholder="Cari sayur..."
            className="border rounded p-2"
            value={filters.search}
            onChange={handleFilterChange}
          />
          <select
            name="location"
            onChange={handleFilterChange}
            className="border rounded p-2"
            value={filters.location}
          >
            <option value="">Semua Lokasi</option>
            {[
              "Cilacap",
              "Banyumas",
              "Purbalingga",
              "Banjarnegara",
              "Kebumen",
              "Purworejo",
              "Wonosobo",
              "Magelang",
              "Boyolali",
              "Klaten",
              "Sukoharjo",
              "Wonogiri",
              "Karanganyar",
              "Sragen",
              "Grobogan",
              "Blora",
              "Rembang",
              "Pati",
              "Kudus",
              "Jepara",
              "Demak",
              "Semarang",
              "Temanggung",
              "Kendal",
              "Batang",
              "Pekalongan",
              "Pemalang",
              "Tegal",
              "Brebes",
            ].map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <select
            name="tag"
            onChange={handleFilterChange}
            className="border rounded p-2"
            value={filters.tag}
          >
            <option value="">Semua Kategori</option>
            <option value="organik">Organik</option>
            <option value="hidroponik">Hidroponik</option>
            <option value="segar">Segar</option>
            <option value="lokal">Lokal</option>
          </select>

          <select
            name="sort"
            onChange={handleFilterChange}
            className="border rounded p-2"
            value={filters.sort}
          >
            <option value="">Urutkan</option>
            <option value="popular">Terpopuler</option>
            <option value="lowest">Harga Terendah</option>
            <option value="highest">Harga Tertinggi</option>
            <option value="newest">Terbaru</option>
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
