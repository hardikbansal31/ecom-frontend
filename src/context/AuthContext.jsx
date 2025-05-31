import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const login = ({ username, id }) => {
    localStorage.setItem("username", username);
    // localStorage.setItem("token", token);
    localStorage.setItem("user_id", id);
    setUsername(username);
  };

  const logout = () => {
    localStorage.clear();
    setUsername("");
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
