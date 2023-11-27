import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
function ProductsList() {
  const products = useSelector((state) => state.app.products);
  return (
    <div className="container ">
      <div className="row container justify-content-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
