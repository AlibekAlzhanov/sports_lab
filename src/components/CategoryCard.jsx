import React from "react";
import { Link } from "react-router-dom";
import { HOME_PAGE } from "../utils/const.js";

function CategoryCard({ id, name, image }) {
  const to = id === 1 ? HOME_PAGE : `${HOME_PAGE}?category=${id}`;

  return (
    <Link
      to={to}
      className="category-card"
      aria-label={`Перейти к ${name}`}
    >
      <img src={image} alt={name} className="category-img" />
      <p className="category-label">{name}</p>
    </Link>
  );
}

export default CategoryCard;
