import React, { useState } from "react";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState([]);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Keranjang Belanja</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">
            Keranjang belanja Anda kosong
          </h2>
          <Link to="/products" className="text-green-600 hover:underline">
            Mulai berbelanja
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center py-4 border-b"
                  >
                    <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-lg"></div>
                    <div className="mt-4 sm:mt-0 sm:ml-6 flex-grow">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <p className="text-gray-500">{item.farmer}</p>
                      <p className="text-green-600 font-semibold">
                        Rp{item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="text-gray-500 hover:text-gray-700"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="text-gray-500 hover:text-gray-700"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Ringkasan Belanja</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rp{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pengiriman</span>
                  <span>Rp10,000</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>Rp{(subtotal + 10000).toLocaleString()}</span>
                </div>
                <Link
                  to="/checkout"
                  className="block mt-6 w-full bg-green-600 text-white text-center py-2 rounded-md hover:bg-green-700"
                >
                  Lanjut ke Pembayaran
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
