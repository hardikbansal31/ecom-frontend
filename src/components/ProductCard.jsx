import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // adjust path as needed
import { useId } from "react";

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
  const [loading, setLoading] = useState(false);

  const { username } = useContext(AuthContext); // We use this to check login
  const handleAddToCart = async () => {
    setError("");
    setSuccess("");

    const userId = localStorage.getItem("user_id"); // ✅ move this inside
    console.log(userId);

    if (!userId) {
      setError("Please log in first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5001/api/cart/add/${userId}`, {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={
          product.imageUrl && product.imageUrl !== "null"
            ? product.imageUrl
            : "null"
        }
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
            disabled={loading}
          >
            {loading ? "Adding..." : <FaCartPlus />}
          </button>
        </div>
        {success && <p className="text-success mt-2">{success}</p>}
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </div>
  );
}
