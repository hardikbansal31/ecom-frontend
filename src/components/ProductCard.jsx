import { Link } from "react-router-dom";

export default function ProductCard({
  product = {
    id: 0,
    name: "Sample Product",
    description: "This is a placeholder product description.",
    imageUrl: "",
  },
}) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={product.imageUrl} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description.slice(0, 60)}...</p>
        {/* <a href={`/product/${product.id}`} className="btn btn-primary">
          View Details
        </a> */}
        <Link to={`/product/${product.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
}
