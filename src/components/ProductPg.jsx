import { useParams } from "react-router-dom";

export default function ProductPg() {
  const { id } = useParams();

  return (
    <div className="container mt-5">
      <h2>Product Details for Product #{id}</h2>
      {/* Later: Fetch and show product data here */}
    </div>
  );
}
