import React, { useContext } from "react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart } = useContext(useCart);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Keranjang Belanja</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Keranjang kamu kosong.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item, index) => (
            <li key={index} className="border p-4 rounded shadow-md bg-white">
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p>Harga: Rp {item.price}</p>
              <button
                onClick={() => removeFromCart(index)}
                className="text-red-500 mt-2 hover:underline"
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
