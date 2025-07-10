import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductById,
  createProduct,
  updateProduct,
} from "../../services/productService";
import { useAuth } from "../../context/AuthContext";

const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    tags: "",
    image: null as File | null,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const loadProduct = async () => {
        try {
          const product = await fetchProductById(id);
          setFormData({
            name: product.name,
            price: product.price.toString(),
            tags: product.tags.join(","),
            image: null,
          });
        } catch (error) {
          console.error("Failed to load product", error);
        }
      };
      loadProduct();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("price", formData.price);
    productData.append("tags", formData.tags);
    if (formData.image) productData.append("image", formData.image);

    try {
      if (id) {
        await updateProduct(id, productData);
      } else {
        await createProduct(productData);
      }
      navigate("/farmer/dashboard");
    } catch (error: any) {
      setError(error.message || "Failed to save product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {id ? "Edit Produk" : "Tambah Produk Baru"}
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Produk
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Harga (Rp)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
            min="0"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags (pisahkan dengan koma)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Contoh: organik, segar, lokal"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gambar Produk (max 3MB)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required={!id}
          />
          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Preview" className="max-w-xs max-h-48" />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400"
        >
          {isLoading ? "Menyimpan..." : "Simpan Produk"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
