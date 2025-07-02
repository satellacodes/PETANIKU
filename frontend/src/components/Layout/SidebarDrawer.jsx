import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

export default function SidebarDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)} className="p-2 md:hidden">
        <Menu />
      </button>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform ${open ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 z-50`}
      >
        <div className="p-4 border-b font-bold text-green-700">
          Petaniku Menu
        </div>
        <ul className="p-4 space-y-3">
          <li>
            <Link to="/upload" className="hover:text-green-600">
              Upload Produk
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-green-600">
              Lihat Sayur
            </Link>
          </li>
          <li>
            <Link to="/report" className="hover:text-green-600">
              Laporkan Bug
            </Link>
          </li>
        </ul>
      </div>
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}
