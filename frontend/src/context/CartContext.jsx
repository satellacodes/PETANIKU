// src/context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  // 1. Ubah state notifikasi untuk menyertakan 'type'
  const [notification, setNotification] = useState({ message: '', show: false, type: 'success' });

  // 2. Ubah fungsi showNotification untuk menerima tipe
  const showNotification = (message, type = 'success') => {
    setNotification({ message, show: true, type });
    setTimeout(() => {
      setNotification({ message: '', show: false, type: 'success' });
    }, 3000);
  };

  const addToCart = (productToAdd) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...productToAdd, quantity: 1 }];
    });
    // 3. Kirim notifikasi dengan tipe 'success' (hijau)
    showNotification(`"${productToAdd.nama}" telah ditambahkan!`, 'success');
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    // 4. Kirim notifikasi dengan tipe 'error' (merah)
    showNotification("Produk telah dihapus dari keranjang.", 'error');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.harga * item.quantity), 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartItemCount,
    cartTotal,
    notification,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
