import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { loginUser, registerUser, getProfile } from "../services/authService";
import api from "../services/api";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
  redirect: string | null; // Tambahkan ini
  clearRedirect: () => void; // Tambahkan ini (opsional, untuk reset nilai)
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "buyer" | "farmer";
  location?: string;
  description?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<string | null>(null);
  const clearRedirect = () => setRedirect(null);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    setRedirect("/login");
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      setRedirect("/");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      const response = await registerUser(data);
      setUser(response.user);
      localStorage.setItem("token", response.token);
      setRedirect("/");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const response = await api.post("/auth/refresh");
      localStorage.setItem("token", response.data.token);
      return response.data.token;
    } catch (error) {
      logout();
      return null;
    }
  }, [logout]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userData = await getProfile();
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        redirect,
        clearRedirect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
