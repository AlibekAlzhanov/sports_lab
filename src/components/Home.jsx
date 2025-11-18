import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";
import { API_BASE_URL } from "../utils/const.js";

export default function Home() {
  const [newsList, setNewsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // новое состояние для поиска

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("category");

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      try {
        const newsRes = await axios.get(`${API_BASE_URL}/news`);
        const catRes = await axios.get(`${API_BASE_URL}/categories`);

        if (!cancelled) {
          setNewsList(newsRes.data || []);
          setCategories(catRes.data || []);
        }
      } catch (err) {
        if (!cancelled) {
          console.log("Ошибка загрузки:", err);
          setError("Не удалось загрузить новости");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  // добавляем категорию к каждой новости
  const newsWithCategory = newsList.map((news) => {
    const cat = categories.find((c) => c.id === news.categoryId);
    return { ...news, categoryName: cat ? cat.name : "Без категории" };
  });

  // фильтрация по категории
  let displayedNews = categoryId
    ? newsWithCategory.filter((news) => String(news.categoryId) === categoryId)
    : newsWithCategory;

  // фильтрация по поиску
  displayedNews = displayedNews.filter(
    (news) =>
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div className="home-page">
      <div className="phone-frame">
        <Header />
        <div className="section-header">
          {categoryId
            ? `Новости категории: ${
                categories.find((c) => String(c.id) === categoryId)?.name || "Неизвестная"
              }`
            : "Все новости"}
        </div>

        {/* Поле поиска */}
        <input
          type="text"
          placeholder="Поиск новостей..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        {error && <div style={{ color: "red" }}>{error}</div>}

        <div className="content-scroll">
          {displayedNews.length > 0 ? (
            displayedNews.map((news) => (
              <NewsCard
                key={news.id}
                id={news.id}
                title={news.title}
                date={news.date}
                category={news.categoryName}
              />
            ))
          ) : (
            <div>Новости не найдены</div>
          )}
        </div>
      </div>
    </div>
  );
}
