import Carous from "./feat-carousel.jsx";
import ProductCard from "./ProductCard.jsx";

export default function Home() {
  return (
    <div className="container mt-4">
      <Carous />
      <div className="row gy-4 mt-3">
        {/* Placeholder cards */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="col-sm-6 col-md-4">
            <ProductCard />
          </div>
        ))}
      </div>
    </div>
  );
}
