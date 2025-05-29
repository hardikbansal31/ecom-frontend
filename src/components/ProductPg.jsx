import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function ProductPg() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("error fetching product", err));
  }, [id]);
  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>{product.name}</h2>
      <img src={"null" || product.imageUrl} alt={product.name} />
      <p>{product.description}</p>
      <p>
        <strong>₹{product.price}</strong>
      </p>
    </div>
  );
}
