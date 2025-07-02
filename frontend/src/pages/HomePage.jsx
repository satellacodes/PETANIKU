import React from "react";
import ProductList from "../components/Product/ProductList";

export default function HomePage() {
  return (
    <div>
      <div className="bg-green-100 text-center p-10 shadow-inner">
        <h1 className="text-4xl font-bold text-green-800">
          Selamat Datang di Petaniku
        </h1>
        <p className="text-lg mt-2 text-green-700">
          Beli hasil pertanian langsung dari petani lokal!
        </p>
      </div>
      <ProductList />
    </div>
  );
}
