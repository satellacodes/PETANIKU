import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm.trim()}`);
    }
  };

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              PETANIKU
            </Link>
          </div>

          <div className="flex-1 mx-10">
            <form onSubmit={handleSearch} className="max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari sayur..."
                  className="w-full py-2 px-4 rounded-full text-gray-800 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-2 text-gray-500"
                >
                  🔍
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                  <span>{user.name}</span>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-800 z-50">
                    <Link
                      to={
                        user.role === "farmer"
                          ? "/farmer/dashboard"
                          : "/profile"
                      }
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profil
                    </Link>
                    <Link
                      to="/cart"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Keranjang
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="hover:text-gray-200">
                  Login
                </Link>
                <Link to="/register" className="hover:text-gray-200">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
