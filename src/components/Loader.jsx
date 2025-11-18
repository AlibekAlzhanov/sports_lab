import React from "react";
import "../assets/styles/Loader.css"; // отдельный CSS файл для анимации

export default function Loader() {
  return (
    <div className="loader-wrapper">
      <div className="spinner"></div>
      <p>Загрузка...</p>
    </div>
  );
}
