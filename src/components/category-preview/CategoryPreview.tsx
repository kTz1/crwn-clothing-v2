/* eslint-disable react/prop-types */
import { Link } from "react-router";
import ProductCard from "../product-card/ProductCard";
import "./category-preview.styles.scss";

type CategoryPreviewProps = {
  title: string;
  products: Array<{
    id: number;
    name: string;
    imageUrl: string;
    price: number;
  }>;
};

const CategoryPreview = ({ title, products }: CategoryPreviewProps) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link to={title} className="title">
          {title.toUpperCase()}
        </Link>
      </h2>

      <div className="preview">
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
