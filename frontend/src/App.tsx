import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProductList from "./components/buyer/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import FarmerProfile from "./pages/FarmerProfile";
import Cart from "./components/buyer/Cart";
import Checkout from "./components/buyer/Checkout";
import FarmerDashboard from "./components/farmer/Dashboard";
import ProductForm from "./components/farmer/ProductForm";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/common/ProtectedRoute";

function AppRouter() {
  const { redirect } = useAuth();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const location = useLocation();

  useEffect(() => {
    if (redirect) {
      navigate(redirect);
    }
  }, [redirect, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/farmer/:id" element={<FarmerProfile />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer/dashboard"
        element={
          <ProtectedRoute allowedRoles={["farmer"]}>
            <FarmerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer/products/new"
        element={
          <ProtectedRoute allowedRoles={["farmer"]}>
            <ProductForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer/products/edit/:id"
        element={
          <ProtectedRoute allowedRoles={["farmer"]}>
            <ProductForm />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <MainLayout>
      <AppRouter />
    </MainLayout>
  );
}

export default App;
