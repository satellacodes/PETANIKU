import React from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import NotificationSidebar from "../farmer/NotificationSidebar";
import { useAuth } from "../../context/AuthContext";
import ChatInterface from "../common/ChatInterface";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      {user && user.role === "farmer" && <NotificationSidebar />}
      {user && (user.role === "farmer") === "buyer" && <ChatInterface />}
    </div>
  );
};

export default MainLayout;
