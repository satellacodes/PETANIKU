import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="h-48 bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {product.name}
          </h2>
          <p className="text-green-600 font-bold mb-2">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>
      </Link>
    </div>
  );
}
