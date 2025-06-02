import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import chiron from "../assets/imgs/chiron.jpeg";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Spinner,
  Badge,
  Modal,
  Form,
} from "react-bootstrap";
import { FaCartPlus } from "react-icons/fa";

export default function ProductPg() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    fetch(`http://localhost:5001/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("error fetching product", err));
  }, [id]);

  if (!product) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading...</p>
      </div>
    );
  }

const handleBuyNow = async () => {
  setError("");
  setSuccess("");

  const userId = localStorage.getItem("user_id");
  if (!userId) {
    setError("Please log in first.");
    return;
  }

  setLoading(true);
  try {
    const res = await fetch("http://localhost:5001/api/order/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: parseInt(userId),
        productId: product.id,
        quantity,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to place order");

    setSuccess(`Order placed! Order ID: ${data.orderId}`);
    setShowConfirm(false);
    // Optional: redirect to order confirmation page
    // navigate(`/orders/${data.orderId}`);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};



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
    <Container className="mt-5">
      <Row>
        {/* Left column: Image + Buttons */}
        <Col md={5}>
          <Image
            src={product.imageUrl || chiron}
            alt={product.name}
            fluid
            rounded
            className="mb-4"
          />
          <Button
            variant="success"
            onClick={() => navigate(`/checkout/${product.id}`)}
          >
            Buy Now
          </Button>

          <button
            className="btn btn-outline-secondary"
            onClick={handleAddToCart}
            title="Add to Cart"
            disabled={loading}
          >
            {loading ? (
              "Adding..."
            ) : (
              <>
                <FaCartPlus className="me-1" />
                Add to Cart
              </>
            )}
          </button>
          {success && <p className="text-success mt-2">{success}</p>}
          {error && <p className="text-danger mt-2">{error}</p>}
        </Col>

        {/* Right column: Details */}
        <Col md={7}>
          <h2>{product.name}</h2>
          <h3>₹ {product.price}</h3>

          {/* Star rating out of 5 */}
          <div className="mb-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index}>
                {index < (product.rating || 0) ? "⭐" : "☆"}
              </span>
            ))}
            <Badge bg="secondary" className="ms-2">
              {product.rating || 0}/5
            </Badge>
          </div>

          {/* Link to reviews section */}
          <p>
            <a href="#reviews">Read Reviews</a>
          </p>

          <p>{product.description}</p>
        </Col>
      </Row>

      {/* Reviews section */}
      <Row className="mt-5" id="reviews">
        <Col>
          <h4>Customer Reviews</h4>
          <p>No reviews yet.</p>{" "}
          {/* Replace with actual reviews if available */}
        </Col>
      </Row>
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Purchase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You’re about to buy <strong>{product.name}</strong> for ₹
            {product.price} × {quantity} = ₹{product.price * quantity}
          </p>
          <Form.Group controlId="quantitySelect">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleBuyNow} disabled={loading}>
            {loading ? "Placing Order..." : "Confirm & Buy"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
  
}
