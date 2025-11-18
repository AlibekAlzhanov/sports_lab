// src/components/BackBar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackBar() {
  const navigate = useNavigate();
  return (
    <button
      className="back-bar"
      onClick={() => navigate(-1)}
      aria-label="Вернуться назад"
      type="button"
    >
      <svg
        className="back-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="red"
      >
        <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      </svg>
      <span className="back-text">Назад</span>
    </button>
  );
}
