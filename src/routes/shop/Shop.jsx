import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useDispatch } from "react-redux";
import CategoriesPreview from "../categories-preview/CategoriesPreview";
import Category from "../category/Category";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategories } from "../../store/categories/categories.action";
import "./shop.styles.scss";

const Shop = () => {
  const dispatch = useDispatch();

  // Get categories and documents from firestore
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments("categories");
      dispatch(setCategories(categoriesArray));
    };
    getCategoriesMap();
  }, [dispatch]); // dispatch is not going to change

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
