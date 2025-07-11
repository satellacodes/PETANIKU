import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const Home: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1505842381624-c6b0579625a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
  ];

  const vegetables = [
    { id: 1, name: "Bayam Organik", price: 5000, image: "🥬" },
    { id: 2, name: "Wortel Segar", price: 7000, image: "🥕" },
    { id: 3, name: "Brokoli Hijau", price: 10000, image: "🥦" },
    { id: 4, name: "Tomat Ceri", price: 12000, image: "🍅" },
    { id: 5, name: "Terong Ungu", price: 8000, image: "🍆" },
    { id: 6, name: "Cabai Merah", price: 15000, image: "🌶️" },
    { id: 7, name: "Kentang Premium", price: 9000, image: "🥔" },
    { id: 8, name: "Mentimun Segar", price: 6000, image: "🥒" },
  ];

  useEffect(() => {
    // Simulasi loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Rotate background images
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(imageInterval);
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[currentImage]})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <motion.div
            className="text-white max-w-3xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              animate={{
                textShadow: [
                  "0 0 0 rgba(0,0,0,0)",
                  "0 0 20px rgba(255,255,255,0.5)",
                  "0 0 0 rgba(0,0,0,0)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Selamat Datang di PETANIKU
            </motion.h1>
            <motion.p
              className="text-xl mb-8 opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              Platform jual beli sayuran segar langsung dari petani lokal
            </motion.p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {user ? (
                <Link
                  to="/products"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Belanja Sekarang
                </Link>
              ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/login"
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      Masuk
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/register"
                      className="bg-white hover:bg-gray-100 text-green-600 font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      Daftar
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 w-full"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,128L48,138.7C96,149,192,171,288,181.3C384,192,480,192,576,186.7C672,181,768,171,864,154.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto my-16 px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Mengapa Memilih Kami?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Petaniku memberikan pengalaman terbaik untuk mendapatkan sayuran
            segar langsung dari petani
          </p>
        </motion.div>

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
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg text-center border border-emerald-100 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ y: -10 }}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Section */}
      <div className="bg-emerald-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Produk Unggulan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sayuran terbaik yang paling dicari oleh pelanggan kami
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {vegetables.map((veg, index) => (
              <motion.div
                key={veg.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="h-48 bg-emerald-100 flex items-center justify-center">
                  <span className="text-7xl">{veg.image}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {veg.name}
                  </h3>
                  <p className="text-emerald-600 font-bold mt-2">
                    Rp {veg.price.toLocaleString()}
                  </p>
                  <Link
                    to={user ? `/products/${veg.id}` : "/login"}
                    className="mt-4 inline-block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition-colors"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-emerald-500 to-green-600 text-white">
        <div className="container mx-auto text-center px-4">
          <motion.h2
            className="text-3xl font-bold mb-6"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 3, -3, 0],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Siap Memulai Perjalanan Pertanian Anda?
          </motion.h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan petani dan pecinta sayuran lainnya
          </p>
          <motion.button
            className="bg-white text-emerald-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#f0fdf4",
              color: "#059669",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {user ? "Mulai Belanja" : "Daftar Sekarang"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// Komponen Loading Screen
const LoadingScreen: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "Menyiapkan sayuran segar...",
    "Memetik hasil panen terbaik...",
    "Menghubungkan ke petani lokal...",
    "Hampir siap...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <motion.div
        className="w-24 h-24 border-4 border-emerald-500 border-t-transparent rounded-full mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-xl text-emerald-600 font-medium"
        >
          {messages[currentMessage]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Home;
