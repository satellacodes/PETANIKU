import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import SidebarDrawer from "./components/Layout/SidebarDrawer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import BuyerDashboard from "./components/Dashboard/BuyerDashboard";
import FarmerDashboard from "./components/Dashboard/FarmerDashboard";
import PrivateRoute from "./components/Shared/PrivateRoute";
import Notification from "./components/Notification";

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <SidebarDrawer />
      <Notification />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute role="ADMIN">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/buyer"
          element={
            <PrivateRoute role="BUYER">
              <BuyerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer"
          element={
            <PrivateRoute role="FARMER">
              <FarmerDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
