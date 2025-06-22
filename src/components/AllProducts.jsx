import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/api/products/all")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        // `pool.query` in your backend returns data as `rows`
        const rows = data.rows || data;
        setProducts(rows);
      })
      .catch((err) => {
        console.error("Error in /all:", err.message);
        setError("Unable to load products.");
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Products</h2>
      {error && <p className="text-danger">{error}</p>}

      <div className="row gy-4 mt-3">
        {products.map((product) => (
          <div key={product.id} className="col-sm-6 col-md-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
