// src/components/Navbar.jsx
// DIUBAH: Kita ganti Link dengan NavLink
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Komponen ikon keranjang tidak berubah
const ShoppingCartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

function Navbar() {
  const { cartItemCount } = useCart();

  // Kita buat variabel untuk menyimpan kelas CSS agar lebih rapi
  const baseLinkClass = "px-3 py-2 rounded-md text-sm font-medium";
  const activeLinkClass = "text-green-600 font-bold bg-green-50"; // Style untuk link yang aktif
  const inactiveLinkClass = "text-gray-700 hover:text-green-600"; // Style untuk link biasa

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            {/* Link logo tidak perlu NavLink */}
            <NavLink to="/" className="text-2xl font-bold text-green-600">
              PETANIKU
            </NavLink>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {/* DIUBAH: Semua Link diganti menjadi NavLink */}
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${baseLinkClass} ${
                      isActive ? activeLinkClass : inactiveLinkClass
                    }`
                  }
                >
                  Beranda
                </NavLink>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `${baseLinkClass} ${
                      isActive ? activeLinkClass : inactiveLinkClass
                    }`
                  }
                >
                  Produk
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `${baseLinkClass} ${
                      isActive ? activeLinkClass : inactiveLinkClass
                    }`
                  }
                >
                  Tentang Kami
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `${baseLinkClass} ${
                      isActive ? activeLinkClass : inactiveLinkClass
                    }`
                  }
                >
                  Kontak
                </NavLink>
              </div>
            </div>
            <div className="ml-4 flex items-center">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `relative p-2 rounded-full ${
                    isActive
                      ? "bg-green-50 text-green-600"
                      : "text-gray-700 hover:text-green-600"
                  }`
                }
              >
                <ShoppingCartIcon />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
