import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
      <Link to="/" className="text-xl font-bold text-green-600">
        Petaniku
      </Link>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/products" className="hover:underline">
          Products
        </Link>
        <Link to="/cart" className="hover:underline">
          Cart
        </Link>
        {user ? (
          <>
            <Link
              to={`/${user.role.toLowerCase()}`}
              className="hover:underline"
            >
              Dashboard
            </Link>
            <button onClick={logout} className="text-red-500 hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
