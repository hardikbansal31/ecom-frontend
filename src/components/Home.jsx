import React, { useEffect, useState } from "react";
import Carous from "./feat-carousel.jsx";
import ProductCard from "./ProductCard.jsx";
// import { data } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("error fetching producs", err));
  }, []);

  return (
    <div className="container mt-4">
      <Carous />
      <div className="row gy-4 mt-3">
        {/* Placeholder cards */}
        {products.map((product) => (
          <div key={product.id} className="col-sm-6 col-md-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
