// src/components/NewsCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NewsCard({ id, title, date, category }) {
  return (
    <Link to={`/detail/${id}`} className="news-card" aria-label={title}>
      <p className="news-title">{title}</p>
      <div className="news-meta">
        <p className="news-date">{date}</p>
        <p className="news-category">· {category}</p>
      </div>
    </Link>
  );
}
