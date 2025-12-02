import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import Categories from "../components/Categories";
import Detail from "../components/Detail"; // если есть
import { HOME_PAGE, DETAIL_PAGE, CATEGORIES_PAGE } from "./const.js";
export const routes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
   { path: HOME_PAGE, element: <Home /> },
  { path: DETAIL_PAGE, element: <Detail /> },
  { path: CATEGORIES_PAGE, element: <Categories /> },
];
