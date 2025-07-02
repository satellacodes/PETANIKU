import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. <Link to="/products" className="text-green-600 underline">Browse products</Link>.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow transition-shadow hover:shadow-lg">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>Qty: {item.quantity}</p>
                <p className="text-green-600">Rp {item.price}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">Remove</button>
            </div>
          ))}
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold text-green-600">Rp {total}</span>
          </div>
          <button onClick={clearCart} className="w-full bg-red-500 text-white py-2 rounded-lg shadow hover:shadow-lg transition-shadow">Clear Cart</button>
        </div>
      )}
    </div>


