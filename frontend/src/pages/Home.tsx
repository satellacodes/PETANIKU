import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="relative h-screen bg-green-50">
        <div className="absolute inset-0 bg-black opacity-55"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Selamat Datang di PETANIKU
            </h1>
            <p className="text-xl mb-8">
              Platform jual beli sayuran segar langsung dari petani lokal
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {user ? (
                <Link
                  to="/products"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-lg"
                >
                  Belanja Sekarang
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-lg"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/register"
                    className="bg-white hover:bg-gray-100 text-green-600 font-bold py-3 px-6 rounded-full text-lg"
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto my-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Mengapa Memilih Kami?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            karena tidak ada pilihan lain lagi selain kami{" "}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Segar Langsung dari Petani",
              description:
                "Sayuran dipetik langsung dari kebun dan dikirim ke rumah Anda.",
              icon: "🥬",
            },
            {
              title: "Harga Terjangkau",
              description: "Harga lebih murah karena tanpa perantara.",
              icon: "💰",
            },
            {
              title: "Mendukung Petani Lokal",
              description:
                "Membantu meningkatkan kesejahteraan petani di Jawa Tengah.",
              icon: "👨‍🌾",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md text-center"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
