import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/productService";
import { useAuth } from "../context/AuthContext";
const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id!);
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product", error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);
  const handleAddToCart = () => {
    // Add to cart logic
    alert(`Added ${quantity} ${product.name} to cart`);
  };
  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-contain"
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl text-green-600 font-bold mb-4">
            Rp{product.price.toLocaleString()}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {product.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Deskripsi Produk</h2>
            <p className="text-gray-700">
              {product.description || "Tidak ada deskripsi"}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Petani</h2>
            <div className="flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              <div className="ml-4">
                <h3 className="font-medium">{product.farmer.name}</h3>
                <p className="text-gray-600">{product.farmer.location}</p>
              </div>
            </div>
          </div>

          {user && user.role === "buyer" && (
            <div className="border-t pt-6">
              <div className="flex items-center mb-4">
                <label className="mr-4">Jumlah:</label>
                <div className="flex items-center">
                  <button
                    className="bg-gray-200 px-3 py-1 rounded-l"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-y border-gray-200">
                    {quantity}
                  </span>
                  <button
                    className="bg-gray-200 px-3 py-1 rounded-r"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
              >
                Tambah ke Keranjang
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
