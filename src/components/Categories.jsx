// src/pages/Categories.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import CategoryCard from "../components/CategoryCard";
import Loader from "../components/Loader";
import { API_BASE_URL } from "../utils/const.js";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/categories`);
        if (!cancelled) setCategories(res.data || []);
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError("Не удалось загрузить категории");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchCategories();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <Loader />;
  if (error) return <p style={{ textAlign: "center", marginTop: 16 }}>{error}</p>;

  return (
    <div className="categories-page">
      <div className="phone-frame" role="main">
        <Header />
        <div className="section-header categories-bar">Категории</div>

        <div className="content-scroll">
          <div className="categories-grid">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} id={cat.id} name={cat.name} image={cat.image} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
