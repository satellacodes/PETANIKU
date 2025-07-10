import React from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    tags: string[];
    farmer: {
      id: string;
      name: string;
      location: string;
    };
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          <p className="text-green-600 font-bold mt-1">
            Rp{product.price.toLocaleString()}
          </p>
          <div className="flex flex-wrap mt-2 gap-1">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {product.farmer.name}
              </p>
              <p className="text-sm text-gray-500">{product.farmer.location}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
