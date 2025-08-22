// src/hooks/useAuth.js
import { useState } from "react";

export default function useAuth() {
  // Simulate user authentication (false means not logged in)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return { isAuthenticated, login, logout };
}
