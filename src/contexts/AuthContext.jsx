// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/const";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // временный подход: запрашиваем всех пользователей (json-server / mokky)
      const res = await axios.get(`${API_BASE_URL}/users`);
      const users = res.data || [];

      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        return { success: true };
      } else {
        return { success: false, error: "Неверный email или пароль" };
      }
    } catch (err) {
      console.error("Ошибка входа:", err);
      return { success: false, error: "Ошибка подключения к серверу" };
    }
  };

  const register = async (email, password, name) => {
    try {
      // проверяем, нет ли уже пользователя с таким email
      const checkRes = await axios.get(`${API_BASE_URL}/users`);
      const existingUser = (checkRes.data || []).find((u) => u.email === email);

      if (existingUser) {
        return { success: false, error: "Пользователь с таким email уже существует" };
      }

      const newUser = {
        email,
        password,
        name,
        createdAt: new Date().toISOString(),
      };

      const res = await axios.post(`${API_BASE_URL}/users`, newUser);
      const { password: _, ...userWithoutPassword } = res.data;

      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));

      return { success: true };
    } catch (err) {
      console.error("Ошибка регистрации:", err);
      return { success: false, error: "Ошибка при регистрации" };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
