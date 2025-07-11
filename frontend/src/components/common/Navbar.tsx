import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Efek scroll untuk mengubah tampilan navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm.trim()}`);
    }
  };

  // Variasi animasi
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
    exit: { opacity: 0, y: -20 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg py-2"
          : "bg-gradient-to-r from-emerald-500 to-green-600 py-3"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo dengan animasi */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="flex items-center">
              <motion.div
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-2 shadow-md"
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-emerald-600 text-xl">🌱</span>
              </motion.div>
              <motion.span
                className={`text-xl font-bold ${
                  scrolled ? "text-emerald-600" : "text-white"
                }`}
                animate={{
                  textShadow: [
                    "0 0 0 rgba(0,0,0,0)",
                    "0 0 10px rgba(255,255,255,0.5)",
                    "0 0 0 rgba(0,0,0,0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                PETANIKU
              </motion.span>
            </Link>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="flex-1 mx-6 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSearch}>
              <motion.div className="relative" whileHover={{ scale: 1.02 }}>
                <input
                  type="text"
                  placeholder="Cari sayur, buah, atau produk..."
                  className={`w-full py-2 px-4 rounded-full focus:outline-none shadow-sm ${
                    scrolled
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-white bg-opacity-90 text-emerald-800"
                  }`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <motion.button
                  type="submit"
                  className={`absolute right-3 top-2 ${
                    scrolled ? "text-emerald-600" : "text-emerald-500"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  🔍
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-6">
            {/* About Us Link dengan animasi khusus */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/about"
                className={`font-medium transition-colors ${
                  scrolled
                    ? "text-emerald-600 hover:text-emerald-800"
                    : "text-white hover:text-emerald-100"
                }`}
              >
                <motion.span
                  animate={{
                    scale: [1, 1.1, 1],
                    textShadow: [
                      "0 0 0 rgba(0,0,0,0)",
                      "0 0 8px rgba(255,255,255,0.8)",
                      "0 0 0 rgba(0,0,0,0)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  About Us
                </motion.span>
              </Link>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(!isMenuOpen);
                  }}
                  className="flex items-center space-x-2 focus:outline-none group"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className={`w-10 h-10 rounded-full overflow-hidden border-2 flex items-center justify-center shadow ${
                      scrolled
                        ? "border-emerald-400 bg-emerald-100"
                        : "border-white bg-emerald-100"
                    }`}
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                  </motion.div>
                  <motion.span
                    className={`font-medium ${
                      scrolled ? "text-emerald-700" : "text-white"
                    }`}
                    animate={{
                      x: [0, 3, -3, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {user.name}
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 text-gray-800 z-50 overflow-hidden"
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <motion.div variants={itemVariants}>
                        <Link
                          to={
                            user.role === "farmer"
                              ? "/farmer/dashboard"
                              : "/profile"
                          }
                          className="flex items-center px-4 py-3 hover:bg-emerald-50 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="mr-2">👤</span>
                          <span>Profil</span>
                        </Link>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Link
                          to="/cart"
                          className="flex items-center px-4 py-3 hover:bg-emerald-50 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="mr-2">🛒</span>
                          <span>Keranjang</span>
                        </Link>
                      </motion.div>

                      <div className="border-t border-gray-100 my-1"></div>

                      <motion.div variants={itemVariants}>
                        <button
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center w-full text-left px-4 py-3 hover:bg-emerald-50 transition-colors"
                        >
                          <span className="mr-2">🚪</span>
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      scrolled
                        ? "text-emerald-600 hover:text-emerald-800"
                        : "text-white hover:text-emerald-100"
                    }`}
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-white text-emerald-600 font-medium rounded-full shadow-md hover:bg-emerald-50 transition-colors"
                  >
                    Register
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
