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
    </header>
  );
}

export default Header;
