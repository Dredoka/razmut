import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const u = localStorage.getItem("user");
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  // helper: fetch with auth
  const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem("token");
    const headers = options.headers ? options.headers : {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
    const res = await fetch(url, { ...options, headers });
    return res;
  };

  return (
    <UserContext.Provider value={{ user, login, logout, authFetch }}>
      {children}
    </UserContext.Provider>
  );
};
