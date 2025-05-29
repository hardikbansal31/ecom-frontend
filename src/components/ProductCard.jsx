import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa"; // using react-icons for cart icon

export default function ProductCard({
  product = {
    id: 0,
    name: "Sample Product",
    description: "This is a placeholder product description.",
    price: 0,
    imageUrl: "null",
  },
  onAddToCart = () => alert("Add to cart clicked!"), // default handler
}) {
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
            onClick={() => onAddToCart(product)}
            title="Add to Cart"
          >
            <FaCartPlus />
          </button>
        </div>
      </div>
    </div>
  );
}
