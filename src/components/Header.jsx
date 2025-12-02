// src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES_PAGE } from "../utils/const.js";

function Header() {
  const navigate = useNavigate();

  const goToCategories = () => {
    navigate(CATEGORIES_PAGE);
  };

  return (
    <header className="home-header">
      {/* Гамбургер-меню */}
      <div
        className="menu-icon"
        role="button"
        aria-label="Меню"
        onClick={goToCategories}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Название сайта */}
      <div style={{ fontWeight: 700 }}>SportNews</div>

      {/* Кнопки Вход/Регистрация */}
      <div style={{ display: "flex", gap: "8px", marginLeft: "-20px" }}>
        <button className="header-btn" onClick={() => navigate("/login")}>
          Вход
        </button>
        <button className="header-btn" onClick={() => navigate("/register")}>
          Регистрация
        </button>
      </div>
    </header>
  );
}

export default Header;
