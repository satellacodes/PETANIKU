import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/buyer/ProductCard";
import {
  fetchFarmerProfile,
  fetchFarmerProducts,
} from "../services/authService";
const FarmerProfile: React.FC = () => {
  const { id } = useParams();
  const [farmer, setFarmer] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      try {
        const [farmerData, productsData] = await Promise.all([
          fetchFarmerProfile(id!),
          fetchFarmerProducts(id!),
        ]);
        setFarmer(farmerData);
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to load farmer profile", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);
  if (loading) return <div>Loading...</div>;
  if (!farmer) return <div>Farmer not found</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mb-4 md:mb-0 md:mr-6" />
          <div>
            <h1 className="text-3xl font-bold">{farmer.name}</h1>
            <p className="text-gray-600">{farmer.location}</p>
            <p className="mt-3">{farmer.description}</p>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Produk yang Dijual</h2>
      {products.length === 0 ? (
        <p className="text-center py-8">Belum ada produk yang dijual</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
export default FarmerProfile;
