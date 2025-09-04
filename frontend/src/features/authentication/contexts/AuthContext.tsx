import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import * as authService from "../services/authService";

// Define the shape of the user object (adjust fields as needed)
interface User {
  id: string;
  email: string;
}

// Define the context value type
interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Create context with proper type
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const currentUser: User = await authService.getCurrentUser(token);
        setUser(currentUser);
      } catch {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [token]);

  const login = async (email: string, password: string) => {
    const { token: newToken, user: loggedInUser } = await authService.login(email, password);
    setToken(newToken);
    localStorage.setItem("token", newToken);
    setUser(loggedInUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}