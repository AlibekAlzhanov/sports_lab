// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, HOME_PAGE } from "../utils/const.js";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Ошибка регистрации");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate(HOME_PAGE);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="phone-frame">
      <div className="section-header">Регистрация</div>
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
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
