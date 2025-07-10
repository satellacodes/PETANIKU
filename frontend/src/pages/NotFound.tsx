import React from "react";
import { Link } from "react-router-dom";
const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-medium text-gray-600 mb-6">
        Halaman tidak ditemukan
      </h2>
      <p className="text-gray-500 mb-8">
        Maaf, halaman yang Anda cari tidak ada.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};
export default NotFound;
