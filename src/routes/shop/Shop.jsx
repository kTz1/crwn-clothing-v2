import { Routes, Route } from "react-router";
import CategoriesPreview from "../categories-preview/CategoriesPreview";
import Category from "../category/Category";
import "./shop.styles.scss";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
