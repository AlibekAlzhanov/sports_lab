// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Показываем лоадер пока проверяется авторизация
  if (loading) {
    return <Loader />;
  }

  // Если пользователь не авторизован - редирект на страницу входа
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Если всё ок - показываем защищенный контент
  return children;
}

export default ProtectedRoute;
