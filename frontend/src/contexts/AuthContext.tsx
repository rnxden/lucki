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

export function useAuth(): AuthContextType {
  return useContext(AuthContext)!;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getCredentials = () => localStorage.getItem("uuid");
  const setCredentials = (creds: string) => localStorage.setItem("uuid", creds);
  const resetCredentials = () => localStorage.removeItem("uuid");

  const fetchWithCredentials = (input: RequestInfo | URL, init?: RequestInit) => {
    const credentials = getCredentials();
    return fetch(input, {
      ...init,
      headers: {
        ...(init?.headers ?? {}),
        ...(credentials ? { Authorization: credentials } : {}),
      },
    });
  };

  const authenticate = async () => {
    setLoading(true);

    // Try authentication
    try {
      const res = await fetchWithCredentials("http://localhost:3000/api/auth", { method: "GET" });
      if (res.ok) {
        const data: User = await res.json();
        setUser(data);
        setCredentials(data.uuid);
        setLoading(false);
        return;
      }
    } catch {}

    // If authentication failed, create a new user
    try {
      const res = await fetchWithCredentials("http://localhost:3000/api/auth", { method: "POST" });
      if (res.ok) {
        const data: User = await res.json();
        setUser(data);
        setCredentials(data.uuid);
        setLoading(false);
        return;
      }
    } catch {}

    setUser(null);
    resetCredentials();
    setLoading(false);
  };

  // Authenticate on mount
  useEffect(() => {
    authenticate();
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}
