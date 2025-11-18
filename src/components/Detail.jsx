import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import BackBar from "../components/BackBar";
import Loader from "../components/Loader";
import { API_BASE_URL } from "../utils/const.js";
import "../assets/styles/Detail.css";

export default function Detail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [category, setCategory] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchDetail = async () => {
      setLoading(true);
      try {
        const newsRes = await axios.get(`${API_BASE_URL}/news/${id}`);
        const newsData = newsRes.data;
        if (!cancelled) setNews(newsData || null);

        if (newsData && newsData.categoryId) {
          const catRes = await axios.get(`${API_BASE_URL}/categories/${newsData.categoryId}`);
          if (!cancelled) setCategory(catRes.data || null);
        }

        try {
          const revRes = await axios.get(`${API_BASE_URL}/reviews`, { params: { newsId: id } });
          if (!cancelled) setReviews(revRes.data || []);
        } catch (e) {
          console.log("Отзывы не загрузились", e);
        }
      } catch (err) {
        if (!cancelled) console.log("Ошибка загрузки новости", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchDetail();
    return () => { cancelled = true; };
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    setSubmitting(true);

    try {
      const payload = { newsId: id, text: reviewText.trim(), date: new Date().toISOString() };
      const res = await axios.post(`${API_BASE_URL}/reviews`, payload);
      setReviews(prev => [res.data || payload, ...prev]);
      setReviewText("");
    } catch (err) {
      console.log("Ошибка отправки отзыва", err);
      alert("Не удалось отправить отзыв");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (!news) return <div className="detail-page"><Header /><p className="error-text">Новость не найдена</p></div>;

  return (
    <div className="detail-page">
      <div className="phone-frame">
        <Header />
        <BackBar />

        <div className="content-scroll">
          <div className="detail-content">
            <h2 className="detail-title">{news.title}</h2>
            <p className="detail-date">{news.date}</p>
            <p className="detail-text">{news.description}</p>

            {news.image && <img src={news.image} alt={news.title} className="detail-image" />}

            <p className="detail-source">Источник: {news.source || "—"}</p>

            <div className="reviews-section">
              <h3>Отзывы</h3>
              <form className="review-form" onSubmit={handleSubmitReview}>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Оставьте отзыв..."
                  rows={3}
                  className="review-textarea"
                />
                <button type="submit" disabled={submitting} className="review-button">
                  {submitting ? "Отправка..." : "Отправить"}
                </button>
              </form>

              {reviews.length > 0 && (
                <ul className="reviews-list">
                  {reviews.map((r, i) => (
                    <li key={r.id || i} className="review-item">
                      <div className="review-text">{r.text}</div>
                      <div className="review-date">{r.date}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="category-box">
              <p className="category-text">{category ? category.name : "Без категории"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
