// src/utils/routes.js
import Home from "../components/Home.jsx";
import Categories from "../components/Categories.jsx";

import Detail from "../components/Detail.jsx";
import { HOME_PAGE, DETAIL_PAGE, CATEGORIES_PAGE } from "./const.js";

export const routes = [
  { path: HOME_PAGE, element: <Home /> },
  { path: DETAIL_PAGE, element: <Detail /> },
  { path: CATEGORIES_PAGE, element: <Categories /> },
  
];
