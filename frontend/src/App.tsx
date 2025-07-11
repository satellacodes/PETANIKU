import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AboutPage from "./pages/AboutPage";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
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
import LoadingScreen from "./components/LoadingScreen";
import AuthPage from "./components/auth/AuthPage"; // Import AuthPage

function AppRouter() {
  const { redirect } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const initialMount = useRef(true);

  // Handle redirect
  useEffect(() => {
    if (redirect) {
      navigate(redirect);
    }
  }, [redirect, navigate]);

  // Handle page loading indicator on route change
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.key]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Gunakan AuthPage untuk login dan register */}
        <Route path="/login" element={<AuthPage initialMode="login" />} />
        <Route path="/register" element={<AuthPage initialMode="register" />} />
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
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
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
