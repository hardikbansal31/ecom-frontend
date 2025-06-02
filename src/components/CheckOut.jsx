import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
  Card,
} from "react-bootstrap";

export default function CheckoutPg() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Cash on Delivery
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) {
      navigate("/login"); // force login if not logged in
    }
  }, [userId, navigate]);

  useEffect(() => {
    fetch(`http://localhost:5001/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => setError("Failed to load product"));
  }, [productId]);

  const handlePlaceOrder = async () => {
    setError("");
    setSuccess("");
    if (!product || !userId) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/order/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: parseInt(userId),
          productId: product.id,
          quantity,
          address,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to place order");

      setSuccess(`Order placed! Order ID: ${data.orderId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCartInstead = async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/cart/add/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  if (!product) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading product...</p>
      </div>
    );
  }

  const totalPrice = product.price * quantity;

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <h2>Checkout - {product.name}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Shipping Address (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Payment Method (Optional)</Form.Label>
              <Form.Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="COD">Cash on Delivery</option>
                <option value="CARD">Card (Coming soon)</option>
                <option value="UPI">UPI (Coming soon)</option>
              </Form.Select>
            </Form.Group>

            <Button
              variant="primary"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={handleAddToCartInstead}
              disabled={loading}
            >
              Add to Cart Instead
            </Button>
          </Form>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <h4>Price Summary</h4>
              <p>Price per unit: ₹{product.price}</p>
              <p>Quantity: {quantity}</p>
              <hr />
              <h5>Total: ₹{totalPrice}</h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
