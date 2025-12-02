// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, HOME_PAGE } from "../utils/const.js";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Неверный логин или пароль");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate(HOME_PAGE);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="phone-frame">
      <div className="section-header">Вход</div>
      <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
        <input
          className="search-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="search-input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "var(--primary)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          Войти
        </button>
      </form>
    </div>
  );
}
