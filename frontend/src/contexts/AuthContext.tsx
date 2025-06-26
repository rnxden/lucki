import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface User {
  id: number;
  uuid: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType | null {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async () => {
    setLoading(true);

    const uuid = localStorage.getItem("uuid") ?? "";
    const headers = { Authorization: uuid };

    // Try login
    const loginRes = await fetch("http://localhost:3000/api/auth", { method: "GET", headers });
    if (loginRes.ok) {
      const data: User = await loginRes.json();
      setUser(data);
      setLoading(false);
      return;
    }

    // If login failed, register for a new user
    const registerRes = await fetch("http://localhost:3000/api/auth", { method: "POST", headers });
    if (registerRes.ok) {
      const data: User = await registerRes.json();
      setUser(data);
      setLoading(false);
      return;
    }

    setUser(null);
    setLoading(false);
  };

  // Login on mount
  useEffect(() => {
    login();
  }, []);

  // Save credentials when user changes (login successful)
  useEffect(() => {
    if (user) {
      localStorage.setItem("uuid", user.uuid);
    }
  }, [user]);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}
