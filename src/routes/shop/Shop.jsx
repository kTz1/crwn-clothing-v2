import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useDispatch } from "react-redux";
import CategoriesPreview from "../categories-preview/CategoriesPreview";
import Category from "../category/Category";
import { fetchCategoriesAsync } from "../../store/categories/categories.action";
import "./shop.styles.scss";

const Shop = () => {
  const dispatch = useDispatch();

  // dispatch an event to fetch categories
  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]); // dispatch is not going to change

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
