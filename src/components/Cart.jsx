import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Toast,
  ToastContainer,
  Form,
  Image,
  InputGroup,
} from "react-bootstrap";

import ProductCard from "./ProductCard.jsx";

const TAX_RATE = 0.1;
const DELIVERY_CHARGE = 50;

const Cart = () => {
  const { username } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    displayCart();
  }, []);

  const displayCart = async () => {
    setError("");
    setSuccess("");
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      setError("Please log in first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5001/api/cart/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch cart items");
      const data = await res.json();
      setCartItems(data); // ✅ Populate from DB
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isEmpty = cartItems.length === 0;

  const updateQuantity = async (id, change) => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setError("Please log in first");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5001/api/cart/update/${userId}/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ change }),
        }
      );
      if (!res.ok) throw new Error("Failed to update quantity");

      const updatedRes = await fetch(
        `http://localhost:5001/api/cart/${userId}`
      );
      const data = await updatedRes.json();
      setCartItems(data);
    } catch (err) {
      setError("Update failed: " + err.message);
    }
  };

  const removeItem = async (id) => {
    if (!window.confirm("Are you sure you want to remove this item?")) return;

    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setError("Please log in first");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5001/api/cart/remove/${userId}/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to remove item");

      // update UI
      const removedItem = cartItems.find((item) => item.id === id);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      setToastMessage(`${removedItem.name} removed from cart`);
      setShowToast(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + (isEmpty ? 0 : DELIVERY_CHARGE);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Your Cart</h2>

      {/* Toast Container */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="info"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Cart</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Row>
        {/* Left Column */}
        <Col md={8}>
          {isEmpty ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <Card
                key={item.id}
                className="mb-3 p-3 d-flex flex-row align-items-center"
              >
                <Link to={`/product/${item.id}`}>
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    thumbnail
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </Link>

                <div className="ms-3 flex-grow-1">
                  <h5>{item.name}</h5>
                  <p>Price: ₹{item.price}</p>
                  <div className="d-flex align-items-center">
                    <span className="me-2">Qty:</span>
                    <InputGroup style={{ width: "130px" }}>
                      <Button
                        variant="outline-secondary"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </Button>
                      <Form.Control
                        type="text"
                        readOnly
                        value={item.quantity}
                        className="text-center"
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </Button>
                    </InputGroup>
                  </div>
                </div>

                <div className="d-flex flex-column align-items-end">
                  <strong className="mb-2">
                    ₹{item.price * item.quantity}
                  </strong>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </Card>
            ))
          )}
        </Col>

        {/* Right Column */}
        <Col md={4}>
          <Card className="p-3">
            <h5 className="mb-3">Cost Breakdown</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between">
                <span>Items ({cartItems.length})</span>
                <span>₹{subtotal}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between">
                <span>Tax (10%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between">
                <span>Delivery</span>
                <span>₹{isEmpty ? 0 : DELIVERY_CHARGE}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </ListGroup.Item>
            </ListGroup>

            <Button
              variant="success"
              className="mt-3 w-100"
              disabled={isEmpty}
              onClick={() => alert("Proceeding to checkout...")}
            >
              Buy Now
            </Button>
          </Card>
        </Col>
      </Row>
      <h2 className="mt-5">You may also like...</h2>
      <ProductCard />
    </Container>
  );
};

export default Cart;
