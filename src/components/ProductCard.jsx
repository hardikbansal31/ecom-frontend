import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { useState } from "react";

export default function ProductCard({
  product = {
    id: 0,
    name: "Sample Product",
    description: "This is a placeholder product description.",
    price: 0,
    imageUrl: "null",
  },
}) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddToCart = async () => {
    setError("");
    setSuccess("");

    // example: get user_id from localStorage
    const userId = localStorage.getItem("user_id"); // must be set at login

    if (!userId) {
      setError("Please log in first.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: parseInt(userId),
          prod_id: product.id,
        }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");
      setSuccess("Product added to cart!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={product.imageUrl || "null"}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description.slice(0, 60)}...</p>
        <p className="card-text fw-bold">₹{product.price}</p>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/product/${product.id}`} className="btn btn-primary">
            View Details
          </Link>
          <button
            className="btn btn-outline-secondary"
            onClick={handleAddToCart}
            title="Add to Cart"
          >
            <FaCartPlus />
          </button>
        </div>
        {success && <p className="text-success mt-2">{success}</p>}
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </div>
  );
}
